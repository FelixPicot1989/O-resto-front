import React from 'react';
import './Footer.scss';

// Reste à dynamiser les informations des paragraphes et de rajouter des LinkTo grâce à react-router-dom
function Footer() {
  return (
    <div className="Footer">
      <div className="infos-pratiques">
        <div className="contact">
          <h3>Nous contacter</h3>
          <p>06.xx.xx.xx.xx</p>
        </div>
        <div className="adresse">
          <h3>Adresse</h3>
          <p>24 rue de Penthièvre</p>
          <p>Quimper</p>
        </div>
        <div className="horaires">
          <h3>Horaires</h3>
          <p>12h - 14h</p>
          <p>19h - 22h</p>
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

export default Footer;
