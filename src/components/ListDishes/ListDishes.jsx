import PropTypes from 'prop-types';

import './ListDishes.scss';

function ListDishes({ dishes, baseUrl }) {
  return (
    <div className="ListDishes">
      {/* .map() in the dishes props to show the category */}
      {dishes.map((category) => (
        <div className="category" key={category.id}>
          <h2 className="category-name">{category.name}</h2>
          <ul>
            {/* .map() in dishes of each category */}
            {category.dishes.map(({ id, name, price, description, image }) => (
              <li className="dishe-item" key={id}>
                <div className="dishe-left">
                  <div className="dishe-header">
                    <p className="dishe-name">{name}</p>
                    <p className="dishe-price">{price}&nbsp;€</p>
                  </div>
                  <p className="dishe-description">{description}</p>
                </div>
                <img className="dishe-image" src={`${baseUrl}/uploads/${image.image}`} alt={name} />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

ListDishes.propTypes = {
  dishes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      dishes: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number.isRequired,
          name: PropTypes.string.isRequired,
          description: PropTypes.string,
          price: PropTypes.string.isRequired,
          image: PropTypes.shape({
            image: PropTypes.string.isRequired,
          }),
        })
      ).isRequired,
    })
  ).isRequired,
  baseUrl: PropTypes.string.isRequired,
};

export default ListDishes;
