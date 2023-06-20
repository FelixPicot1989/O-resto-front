import PropTypes from 'prop-types';
import './ListDishes.scss';

function ListDishes({ dishes }) {
  return (
    <div className="ListDishes">
      {dishes.map((category) => (
        <div className="category" key={category.id}>
          <h2 className="category-name">{category.name}</h2>
          <ul className="dishes-list">
            {category.dishes.map((dish) => (
              <li className="dishes-item" key={dish.id}>
                <div>
                  <p className="dishes-name">{dish.name}</p>
                  <p className="dishes-description">{dish.description}</p>
                </div>
                <p className="dishes-price">{dish.price}&nbsp;€</p>
                {/* <img className="dishes-image" src={dish.image.url} alt={dish.name} /> */}
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
          // image: PropTypes.shape({
          //   id: PropTypes.number.isRequired,
          //   url: PropTypes.string.isRequired,
          // }),
        })
      ).isRequired,
    })
  ).isRequired,
};

export default ListDishes;
