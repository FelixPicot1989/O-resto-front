import React from 'react';
import PropTypes from 'prop-types';
import './ListMenus.scss';

function ListMenus({ menus }) {
  console.log(menus);
  return (
    <div className="ListMenus">
      <ul className="menu-list">
        {/* .map() in the menus props to show the menus */}
        {menus.map(({ menuName, menuId, menuPrice, eatsByCategory }) => (
          <li className="menu-item" key={menuId}>
            <div className="menu-header">
              <h3 className="menu-title">{menuName}</h3>
              <span className="menu-price">{menuPrice}&nbsp;€</span>
            </div>
            {/* Object.entries returns an array of arrays with the key and value of the eatsByCategory object, then .map() to get the category and the foods */}
            {Object.entries(eatsByCategory).map(
              ([category, eats]) =>
                eats.length !== 0 && (
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
                )
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
ListMenus.propTypes = {
  menus: PropTypes.arrayOf(
    PropTypes.shape({
      menuId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      menuName: PropTypes.string.isRequired,
      menuPrice: PropTypes.string.isRequired,
      eatsByCategory: PropTypes.objectOf(
        PropTypes.arrayOf(
          PropTypes.shape({
            eatId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            eatName: PropTypes.string.isRequired,
          })
        )
      ).isRequired,
    })
  ).isRequired,
};

export default ListMenus;
