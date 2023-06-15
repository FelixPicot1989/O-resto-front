import React from 'react';
import PropTypes from 'prop-types';
import './Footer.scss';

// Reste à dynamiser les informations des paragraphes et de rajouter des LinkTo grâce à react-router-dom
function Footer({ infos }) {
  // console.log(infos);
  return (
    <div className="Footer">
      <div className="infos-pratiques">
        <div className="contact">
          <h3>Nous contacter</h3>
          <a href={`tel:${infos.phone}`}>{infos.phone}</a>
        </div>
        <div className="adresse">
          <h3>Adresse</h3>
          <p>{infos.address}</p>
        </div>
        <div className="horaires">
          <h3>Horaires</h3>
          <p>{infos.openingLunch}</p>
          <p>{infos.openingEvening}</p>
          <p>{infos.info}</p>
        </div>
      </div>
      <div className="legales">
        <ul>
          <li>Politique de confidentialité</li>
          <li>Mentions légales</li>
        </ul>
      </div>
    </div>
  );
}

Footer.propTypes = {
  infos: PropTypes.shape({
    phone: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    openingLunch: PropTypes.string.isRequired,
    openingEvening: PropTypes.string.isRequired,
    info: PropTypes.string.isRequired,
  }).isRequired,
};

export default Footer;
