import React from 'react';
import { NavLink } from 'react-router-dom';

import imgError from '../assets/img_error.png';

import './ErrorPage.scss';

// 404 page
function ErrorPage() {
  return (
    <div className="ErrorPage">
      <div className="error">
        <div className="number">4</div>
        <img src={imgError} alt="zero de la plage 404" />
        <div className="number">4</div>
      </div>
      <p>
        On dirait que cette page a été dévorée ! Retournons à la <NavLink to="/">page d&apos;accueil</NavLink> pour
        trouver quelque chose de délicieux.
      </p>
    </div>
  );
}

export default ErrorPage;
