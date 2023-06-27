// Imports React, PropTypes for checking props types, two icons from the react-icons module and the NavLink component for managing navigation links.
import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { FaRegCalendarAlt, FaPhoneAlt } from 'react-icons/fa';
// Import style
import './StickyFooter.scss';

function StickyFooter({ infos }) {
  return (
    <div className="StickyFooter">
      <div className="stickyFooter-items">
        <NavLink to="/reservations-contact" className="reserver">
          <FaRegCalendarAlt /> {/* Calendar icon */}
          <p>Réserver</p>
        </NavLink>
        {/* we get the phone number from {infos} */}
        <a href={`tel:${infos.phone}`}>
          <div className="appeler">
            <FaPhoneAlt /> {/* Phone icon */}
            <p>Contactez-nous</p>
          </div>
        </a>
      </div>
    </div>
  );
}

// Use PropTypes to check that the component receives an object-type "info" property,
// which must contain a string "phone" property. These properties are required.
StickyFooter.propTypes = {
  infos: PropTypes.shape({
    phone: PropTypes.string.isRequired,
  }).isRequired,
};

export default StickyFooter;
