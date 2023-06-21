import React, { useEffect, useState } from 'react';
import {
  FaBars,
  FaTimes,
  FaFacebook,
  FaInstagram,
  FaTripadvisor,
  FaChevronRight,
  FaChevronDown,
  FaUserEdit,
} from 'react-icons/fa';
import { NavLink, useLocation, Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { isUserLogged } from '../Recoil/Recoil';

import logoOresto from '../../assets/logo-oresto.png';
import './Navbar.scss';
import AuthForm from '../AuthForm/AuthForm';
import ToastNotif from '../ToastNotif/ToastNotif';

// Il reste à mettre des LinkTo dans la nav au lieu des <li> (Attention au CSS !!)
function Navbar() {
  // Variable dans le state pour détecter si le user ouvre le menu burger ou le menu déroulant de "La carte"
  const [nav, setNav] = useState(false);
  const [openDropDown, setOpenDropDown] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [success, setSuccess] = useState(null);
  const [userLogged, setUserLogged] = useRecoilState(isUserLogged);
  const [openUserDropdown, setopenUserDropdown] = useState(false);

  // Avec les fonctions qui gère le clique en inversant les valeurs (false <=> true)
  const handleToggleNav = () => {
    setNav(!nav);
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0 });
  };

  function toggleLoginForm() {
    if (userLogged) {
      localStorage.removeItem('token');
      setUserLogged(false);
      setSuccess('Vous êtes bien déconnecté');
      setTimeout(() => {
        setSuccess(null);
      }, 7000);
    } else {
      setShowLoginForm(!showLoginForm);
    }
  }

  const location = useLocation();
  // met à false openDropDown quand l'URL change
  useEffect(() => {
    setOpenDropDown(false);
  }, [location]);

  return (
    <>
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
              <Link
                to="/carte/menus"
                className={`Navbar-list-item ${location.pathname.startsWith('/carte') ? 'active' : ''}`}
              >
                La carte
              </Link>
              <div onClick={() => setOpenDropDown(!openDropDown)} className="chevron">
                {!openDropDown ? <FaChevronRight /> : <FaChevronDown />}
                {openDropDown && (
                  <ul className="dropdown-list">
                    <Link to="/carte/menus">Menu</Link>
                    <Link to="/carte/entrees">Entrées</Link>
                    <Link to="/carte/plats">Plats</Link>
                    <Link to="/carte/desserts">Desserts</Link>
                    <Link to="/carte/boissons">Boissons</Link>
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
            {!userLogged && (
              <button onClick={toggleLoginForm} className="btn-login" type="button">
                Connexion
              </button>
            )}
            {userLogged && (
              // <span className="profile-username">
              <FaUserEdit className="profile-icon" onClick={() => setopenUserDropdown(!openUserDropdown)} />
              // </span>
            )}
            {openUserDropdown && (
              <ul className="dropdown-user-edit-list">
                <li className="dropdown-user-edit-item">
                  <NavLink
                    to="/profil"
                    className="profile-link"
                    onClick={() => {
                      setopenUserDropdown(!openUserDropdown);
                      handleToggleNav();
                    }}
                  >
                    Voir mon profil
                  </NavLink>
                </li>
                <li className="dropdown-user-edit-item">
                  <button
                    type="button"
                    onClick={() => {
                      setopenUserDropdown(!openUserDropdown);
                      toggleLoginForm();
                    }}
                    className="btn-login"
                  >
                    Se déconnecter
                  </button>
                </li>
              </ul>
            )}
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
                    <Link onClick={handleToggleNav} to="/carte/menus">
                      Menu
                    </Link>
                    <Link onClick={handleToggleNav} to="/carte/entrees">
                      Entrées
                    </Link>
                    <Link onClick={handleToggleNav} to="/carte/plats">
                      Plats
                    </Link>
                    <Link onClick={handleToggleNav} to="/carte/desserts">
                      Desserts
                    </Link>
                    <Link onClick={handleToggleNav} to="/carte/boissons">
                      Boissons
                    </Link>
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
              {!userLogged && (
                <button onClick={toggleLoginForm} className="btn-login" type="button">
                  Connexion
                </button>
              )}
              {userLogged && <FaUserEdit className="profile" onClick={() => setopenUserDropdown(!openUserDropdown)} />}
              {openUserDropdown && (
                <ul className="dropdown-user-edit-list">
                  <li className="dropdown-user-edit-item">
                    <NavLink
                      to="/profil"
                      className="profile-link"
                      onClick={() => {
                        setopenUserDropdown(!openUserDropdown);
                        handleToggleNav();
                      }}
                    >
                      Voir mon profil
                    </NavLink>
                  </li>
                  <li className="dropdown-user-edit-item">
                    <button
                      type="button"
                      onClick={() => {
                        setopenUserDropdown(!openUserDropdown);
                        toggleLoginForm();
                      }}
                      className="btn-login"
                    >
                      Se déconnecter
                    </button>
                  </li>
                </ul>
              )}
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
      </nav>
      <AuthForm showLoginForm={showLoginForm} toggleLoginForm={() => toggleLoginForm()} />
      <ToastNotif
        success={success}
        toggleToast={() => {
          setSuccess(null);
        }}
      />
    </>
  );
}

export default Navbar;
