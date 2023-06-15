import React, { useEffect, useState } from 'react';
import { FaBars, FaTimes, FaFacebook, FaInstagram, FaTripadvisor, FaChevronRight, FaChevronDown } from 'react-icons/fa';
import { NavLink, useLocation } from 'react-router-dom';

import logoOresto from '../../assets/logo-oresto.png';
import './Navbar.scss';
import AuthForm from './AuthForm/AuthForm';

// Il reste à mettre des LinkTo dans la nav au lieu des <li> (Attention au CSS !!)
function Navbar() {
  // Variable dans le state pour détecter si le user ouvre le menu burger ou le menu déroulant de "La carte"
  const [nav, setNav] = useState(false);
  const [openDropDown, setOpenDropDown] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  // Avec les fonctions qui gère le clique en inversant les valeurs (false <=> true)
  const handleToggleNav = () => {
    setNav(!nav);
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0 });
  };

  function toggleLoginForm() {
    setShowLoginForm(!showLoginForm);
  }

  const location = useLocation();
  // met à `false` l'état `openDropDown` quand l'URL change
  useEffect(() => {
    setOpenDropDown(false);
  }, [location]);

  return (
    <nav className="Navbar">
      <NavLink className="logo-oresto" to="/" onClick={handleScrollToTop}>
        <img src={logoOresto} alt="logo-oresto" className="logo-oresto" />
      </NavLink>
      <h1 className={!nav ? 'title-hidden' : 'title'}>O&apos;Resto</h1>
      {/* Desktop menu */}
      <div className="Navbar-desktop">
        <ul className="Navbar-list">
          <NavLink to="/" className="Navbar-list-item">
            Accueil
          </NavLink>
          <div className="dropdown">
            <NavLink to="/carte" className="Navbar-list-item">
              La carte
            </NavLink>
            <div onClick={() => setOpenDropDown(!openDropDown)} className="chevron">
              {!openDropDown ? <FaChevronRight /> : <FaChevronDown />}
              {openDropDown && (
                <ul className="dropdown-list">
                  <li>Menu</li>
                  <li>Entrées</li>
                  <li>Plats</li>
                  <li>Desserts</li>
                  <li>Boissons</li>
                </ul>
              )}
            </div>
          </div>
          <NavLink to="/reservations-contact" className="Navbar-list-item">
            Réserver/Contact
          </NavLink>
          <NavLink className="Navbar-list-item" to="/avis">
            Donner votre avis
          </NavLink>
        </ul>
        <div className="login-social-desktop">
          <div>
            <button onClick={toggleLoginForm} className="btn-login" type="button">
              Connexion
            </button>
          </div>
          <div className="social-desktop">
            <a href="#" target="_blank" rel="noopener noreferrer">
              <FaFacebook />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <FaTripadvisor />
            </a>
          </div>
        </div>
      </div>
      {/* Bouton burger */}
      <div
        onClick={() => {
          handleToggleNav();
          setOpenDropDown(false);
        }}
        className="Navbar-burger"
      >
        {!nav ? <FaBars /> : <FaTimes />}
      </div>
      {/* Mobile menu */}
      <div className={!nav ? 'Navbar-mobile-hidden' : 'Navbar-mobile'}>
        <ul>
          <NavLink
            to="/"
            onClick={() => {
              handleToggleNav();
              handleScrollToTop();
            }}
            className="Navbar-mobile-item"
          >
            Accueil
          </NavLink>
          <li className="Navbar-mobile-item dropdown">
            <div>
              <div>
                <NavLink
                  onClick={() => {
                    handleToggleNav();
                    handleScrollToTop();
                  }}
                  to="/carte"
                >
                  La carte
                </NavLink>
                <div onClick={() => setOpenDropDown(!openDropDown)} className="chevron">
                  {!openDropDown ? <FaChevronRight /> : <FaChevronDown />}
                </div>
              </div>
              {openDropDown && (
                <ul className="dropdown-list">
                  <li>Menu</li>
                  <li>Entrées</li>
                  <li>Plats</li>
                  <li>Desserts</li>
                  <li>Boissons</li>
                </ul>
              )}
            </div>
          </li>
          <NavLink
            onClick={() => {
              handleToggleNav();
              handleScrollToTop();
            }}
            to="/reservations-contact"
            className="Navbar-mobile-item"
          >
            Réserver/Contact
          </NavLink>
          <NavLink
            onClick={() => {
              handleToggleNav();
              handleScrollToTop();
            }}
            to="/avis"
            className="Navbar-mobile-item"
          >
            Donner votre avis
          </NavLink>
        </ul>
        <div className="login-social-mobile">
          <div>
            <button onClick={toggleLoginForm} className="btn-login" type="button">
              Connexion
            </button>
          </div>
          <div className="social-media">
            <a href="#" target="_blank" rel="noopener noreferrer">
              <FaFacebook />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <FaTripadvisor />
            </a>
          </div>
        </div>
      </div>
      <AuthForm showLoginForm={showLoginForm} toggleLoginForm={() => toggleLoginForm()} />
    </nav>
  );
}

export default Navbar;
