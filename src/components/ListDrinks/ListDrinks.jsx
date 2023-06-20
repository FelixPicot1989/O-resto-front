import PropTypes from 'prop-types';
import './ListDrinks.scss';

function ListDrinks({ drinks }) {
  // console.log('drinks', drinks);
  return (
    <div className="ListDrinks">
      {/* Object.keys(drinks) renvoie un tableau de toutes les clés de l'objet drinks. */}
      {Object.keys(drinks).map((category, index) => (
        <div className="category" key={index}>
          <h2 className="category-name">{category}</h2>
          <ul className="drinks-list" key={category}>
            {drinks[category].map((drink) => (
              <li className="drinks-item" key={drink.id}>
                <div>
                  <p className="drinks-name">{drink.name}</p>
                  <p className="drinks-description">{drink.description}</p>
                </div>
                <p className="drinks-price">{drink.price}&nbsp;€</p>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
ListDrinks.propTypes = {
  drinks: PropTypes.objectOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        description: PropTypes.string,
        price: PropTypes.string.isRequired,
      })
    )
  ).isRequired,
};

export default ListDrinks;
