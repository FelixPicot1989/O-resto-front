import PropTypes from 'prop-types';
import './ListDrinks.scss';

function ListDrinks({ drinks }) {
  console.log(typeof drinks);
  return (
    <div className="ListDrinks">
      {/* Object.keys(drinks) renvoie un tableau de toutes les clés de l'objet drinks. */}
      {Object.keys(drinks).map((category) => (
        <div className="category">
          <h2 className="category-title">{category}</h2>
          <ul className="drinks-list" key={category}>
            {drinks[category].map((drink) => (
              <li className="drinks-item" key={drink.id}>
                <div>
                  <p>{drink.name}</p>
                  <p>{drink.description}</p>
                </div>
                <p className="price">{drink.price} €</p>
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
        description: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
      })
    )
  ).isRequired,
};

export default ListDrinks;
