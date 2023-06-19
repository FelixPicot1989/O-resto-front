import React from 'react';
import PropTypes from 'prop-types';
import './ListProducts.scss';

function ListProducts({ products }) {
  return (
    <div className="ListProducts">
      <ul className="product-list">
        {products.map(({ id, name, description, price }) => (
          <li key={id} className="product-item">
            <div className="product-item-left">
              <h3 className="products-name">{name}</h3>
              <p className="products-description">{description}</p>
            </div>
            <p className="products-price">{price}&nbsp;€</p>
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
    })
  ).isRequired,
};

export default ListProducts;
