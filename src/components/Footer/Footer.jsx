import React from 'react';
import PropTypes from 'prop-types';
import './Footer.scss';
import { Link } from 'react-router-dom';

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
          <div className="maps">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2596.3666044718434!2d3.0011279768498325!3d49.40197246229911!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e87c7a31f44b9d%3A0xf7e247957180ab93!2s2%20Rue%20du%20March%C3%A9%2C%2060350%20Cuise-la-Motte!5e0!3m2!1sfr!2sfr!4v1687166411318!5m2!1sfr!2sfr"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="map_mobile"
            />
          </div>
        </div>
        <div className="horaires">
          <h3>Horaires</h3>
          <p>{infos.openingLunch}</p>
          <p>{infos.openingEvening}</p>
          <p>{infos.info}</p>
        </div>
      </div>
      <div className="maps-desktop">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2596.3666044718434!2d3.0011279768498325!3d49.40197246229911!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e87c7a31f44b9d%3A0xf7e247957180ab93!2s2%20Rue%20du%20March%C3%A9%2C%2060350%20Cuise-la-Motte!5e0!3m2!1sfr!2sfr!4v1687166411318!5m2!1sfr!2sfr"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="map_desktop"
        />
      </div>
      <div className="legales">
        <ul>
          <li>
            <Link to="/confidentialite">Politique de confidentialité</Link>
          </li>
          <li>
            <Link to="mentions-legales">Mentions légales</Link>
          </li>
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
