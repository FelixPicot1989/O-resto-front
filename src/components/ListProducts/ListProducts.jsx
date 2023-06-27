import React from 'react';
// Import style and PropTypes library for type control
import PropTypes from 'prop-types';
import './ListProducts.scss';

function ListProducts({ products, baseUrl }) {
  return (
    <div className="ListProducts">
      <ul>
        {/* The list is built using the map method, which traverses the products array to create a new list of elements */}
        {products.map(({ id, name, description, price, image }) => (
          <li key={id} className="product-item">
            <div className="product-left">
              <div className="product-header">
                <p className="product-name">{name}</p>
                <p className="product-price">{price}&nbsp;€</p>
              </div>
              <p className="product-description">{description}</p>
            </div>
            {/* we retrieve the images via the API so that they are displayed as a prefix to the url in order to have the right path */}
            <img className="product-image" src={`${baseUrl}/uploads/${image.image}`} alt={name} />
          </li>
        ))}
      </ul>
    </div>
  );
}

// Here we use PropTypes to validate the props passed to the ListProducts component.
ListProducts.propTypes = {
  // The "products" prop is expected to be an array. This array must be composed of objects with a specific structure
  // That is, each object in the array must contain the following keys: 'id', 'name', 'description', 'price', 'image'.
  // Each of these keys must have a specific data type, and some are required
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string,
      price: PropTypes.string.isRequired,
      image: PropTypes.shape({
        image: PropTypes.string.isRequired,
      }),
    })
  ).isRequired, // The entire 'products' table is required.
  // 'baseUrl' must be a string and is required.
  baseUrl: PropTypes.string.isRequired,
};

export default ListProducts;
