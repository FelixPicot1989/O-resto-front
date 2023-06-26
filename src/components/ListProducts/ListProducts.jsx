import React from 'react';
import PropTypes from 'prop-types';
import './ListProducts.scss';

function ListProducts({ products, baseUrl }) {
  return (
    <div className="ListProducts">
      <ul>
        {products.map(({ id, name, description, price, image }) => (
          <li key={id} className="product-item">
            <div className="product-left">
              <div className="product-header">
                <p className="product-name">{name}</p>
                <p className="product-price">{price}&nbsp;€</p>
              </div>
              <p className="product-description">{description}</p>
            </div>
            <img className="product-image" src={`${baseUrl}/uploads/${image.image}`} alt={name} />
          </li>
        ))}
      </ul>
    </div>
  );
}

ListProducts.propTypes = {
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
  ).isRequired,
  baseUrl: PropTypes.string.isRequired,
};

export default ListProducts;
