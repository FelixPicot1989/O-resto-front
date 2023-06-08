import React from 'react';
import './StickyFooter.scss';

import { FaRegCalendarAlt, FaPhoneAlt } from 'react-icons/fa';

function StickyFooter() {
  return (
    <div className="StickyFooter">
      <div className="stickyFooter-items">
        <div className="reserver">
          <FaRegCalendarAlt />
          <p>Réserver</p>
        </div>
        <div className="appeler">
          <FaPhoneAlt />
          <p>Contactez-nous</p>
        </div>
      </div>
    </div>
  );
}

export default StickyFooter;
