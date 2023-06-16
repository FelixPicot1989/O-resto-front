import React from 'react';
import PropTypes from 'prop-types';
import './ListMenus.scss';

function ListMenus({ menus }) {
  console.log('menus :', menus);
  return (
    <div className="ListMenus">
      <ul className="menu-list">
        {menus.map(({ menuName, menuId, menuPrice, eatsByCategory }) => (
          <li className="menu-item" key={menuId}>
            <div className="menu-header">
              <h3 className="menu-title">{menuName}</h3>
              <span className="menu-price">{menuPrice} €</span>
            </div>
            {/* Object.entries renvoie un tableau de tableaux avec la clé et la valeur de l'objet eatsByCategory */}
            {Object.entries(eatsByCategory).map(([category, eats]) => (
              <div className="category-list" key={category}>
                <h4 className="category-name">{category}</h4>
                <ul className="eats-list">
                  {eats.map(({ eatName, eatId }) => (
                    <li className="eats-item" key={eatId}>
                      {eatName}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
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
