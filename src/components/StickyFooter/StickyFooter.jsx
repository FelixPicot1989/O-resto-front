import React from 'react';
import './StickyFooter.scss';
import PropTypes from 'prop-types';
import { FaRegCalendarAlt, FaPhoneAlt } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

// Il faudra rajouter des LinkTo et faire en sorte que les icônes et le texte soit cliquable
function StickyFooter({ infos }) {
  return (
    <div className="StickyFooter">
      <div className="stickyFooter-items">
        <NavLink to="/reservations-contact" className="reserver">
          <FaRegCalendarAlt />
          <p>Réserver</p>
        </NavLink>
        <a href={`tel:${infos.phone}`}>
          <div className="appeler">
            <FaPhoneAlt />
            <p>Contactez-nous</p>
          </div>
        </a>
      </div>
    </div>
  );
}

StickyFooter.propTypes = {
  infos: PropTypes.shape({
    phone: PropTypes.string.isRequired,
  }).isRequired,
};

export default StickyFooter;
