import React from 'react';
import PropTypes from 'prop-types';
import './ListMenus.scss';

function ListMenus({ menus }) {
  console.log('menus :', menus);
  return (
    <div className="ListMenus">
      <ul className="menu-list">
        {menus.map(({ id, name, eats, price }) => (
          // ajout d'une accolade fermante ici
          <li key={id} className="menu-item">
            <div className="menu-item-left">
              <h3 className="menus-name">{name}</h3>
              {eats.map((plat) => {
                return (
                  <p key={plat.id} className="menus-description">
                    {plat.name}
                  </p>
                );
              })}
            </div>
            <p className="menus-price">{price} €</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
ListMenus.propTypes = {
  menus: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      eats: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.number.isRequired, name: PropTypes.string.isRequired })),
      price: PropTypes.string.isRequired,
    })
  ).isRequired,
};
export default ListMenus;
