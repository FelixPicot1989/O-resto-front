/* eslint-disable jsx-a11y/anchor-is-valid */
// Importe les hooks React useEffect et useState
import React, { useEffect, useState } from 'react';

// Imports several icons from the 'react-icons/fa' library.
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

// Imports the NavLink and Link components and the useLocation hook from the 'react-router-dom' library.
// NavLink and Link are used to navigate between pages, while useLocation is used to obtain information about the current page.
import { NavLink, useLocation, Link } from 'react-router-dom';
// Imports useRecoilState and useRecoilValue from 'recoil'. useRecoilState is used to read and write a state in Recoil, while useRecoilValue is only used to read a state.
import { useRecoilState, useRecoilValue } from 'recoil';
// Imports isUserLogged and userInfo atoms from the '../Recoil/Recoil' module. These atoms are used to manage user authentication status in the application.
import { isUserLogged, userInfo } from '../Recoil/Recoil';
// Import components.
import AuthForm from '../AuthForm/AuthForm';
import ToastNotif from '../ToastNotif/ToastNotif';
// import the O'Resto logo from the left navbar
import logoOresto from '../../assets/logo-oresto.png';
// import style
import './Navbar.scss';

function Navbar() {
  // URL of the API imported from the file .env
  const urlBackOffice = import.meta.env.VITE_BASE_URL_BACKOFFICE;

  // Use the useState hook to declare and initialize the navigation state (for the burger menu), the "Map" drop-down menu and the user drop-down menu that appears when the user is logged in.
  const [nav, setNav] = useState(false);
  const [openDropDown, setOpenDropDown] = useState(false);
  const [openUserDropdown, setopenUserDropdown] = useState(false);

  // Status for login form, success message
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [success, setSuccess] = useState(null);

  // Use the useRecoilState hook to read and write the state of the connected user.
  const [userLogged, setUserLogged] = useRecoilState(isUserLogged);
  // UseRecoilValue to read the user's information status.
  const userInfos = useRecoilValue(userInfo);

  // With functions that manage clicks by inverting values (false <=> true)
  const handleToggleNav = () => {
    setNav(!nav);
  };

  // Function to scroll up when changing page
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0 });
  };

  // Function toggleLoginForm to toggle the display of the login form and manage user logout.
  function toggleLoginForm() {
    // If the user is logged in (userLogged is true)
    if (userLogged) {
      // Deletes the authentication token stored in the localStorage.
      // The localStorage is used to store client-side data between sessions.
      localStorage.removeItem('token');
      // Updates the userLogged status to false, indicating that the user is now logged out.
      setUserLogged(false);
      // Displays a success message to inform the user that they have successfully logged out.
      setSuccess('Vous êtes bien déconnecté');
      // After 7 seconds, the success message is erased.
      setTimeout(() => {
        setSuccess(null);
      }, 7000);
    } else {
      // If the user is not logged in, toggles the state of showLoginForm.
      // This has the effect of showing or hiding the login form depending on its current state.
      setShowLoginForm(!showLoginForm);
    }
  }

  // Use the useLocation hook to obtain information about the current page.
  const location = useLocation();
  // Use the useEffect hook to update the openDropDown state whenever the URL changes.
  useEffect(() => {
    setOpenDropDown(false);
  }, [location]);

  return (
    <>
      <nav className="Navbar">
        {/* when you click on the logo, you return to the home page and go to the very top of the page */}
        <NavLink to="/" className="logo-oresto" onClick={handleScrollToTop}>
          <img src={logoOresto} alt="logo-oresto" className="logo-oresto" />
        </NavLink>
        {/* If you are on mobile and the navbar is open, the title is displayed at the top of the navbar */}
        <h1 className={!nav ? 'title-hidden' : 'title'}>O&apos;Resto</h1>
        {/* Desktop Navbar */}
        <div className="Navbar-desktop">
          <ul className="Navbar-list">
            <NavLink to="/" className="Navbar-list-item">
              Accueil
            </NavLink>
            <div className="dropdown">
              {/* Here we use Link instead of NavLink so as not to be bothered by the active class that NavLink offers */}
              <Link
                to="/carte/menus"
                // We add the active class 'manually' to the "Map" item if the url starts with "/map", so that if we're on the "/map/drinks" path, the active class is put on this item.
                className={`Navbar-list-item ${location.pathname.startsWith('/carte') ? 'active' : ''}`}
              >
                La carte
              </Link>
              <div onClick={() => setOpenDropDown(!openDropDown)} className="chevron">
                {/* We manage the direction of the chevron when you click on it for the drop-down menu */}
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
              Donnez votre avis
            </NavLink>
          </ul>
          <div className="login-social-desktop">
            {/* if the user is not logged in, the login button is displayed. */}
            {!userLogged && (
              // Clicking on this button displays the login form.
              <button onClick={toggleLoginForm} className="btn-login" type="button">
                Connexion
              </button>
            )}
            {/* if the user is logged in, a profile icon is displayed. */}
            {userLogged && (
              <div className="connected-user">
                {/* When this icon is clicked, a dropdown appears. */}
                <FaUserEdit className="profile-icon" onClick={() => setopenUserDropdown(!openUserDropdown)} />
                {/* We display its first name in the navbar next to the icon, which we retrieve using "Recoil" */}
                {userInfos && <div>Bonjour {userInfos.firstname}</div>}
              </div>
            )}
            {/* dropdown of logged-in user */}
            {openUserDropdown && (
              <ul className="dropdown-user-edit-list">
                {/* If he is an admin, he has access to an additional link that redirects him to the backoffice */}
                {userInfos.roles.includes('ROLE_ADMIN') && (
                  <li className="dropdown-user-edit-item">
                    <a href={urlBackOffice} target="_blank" rel="noopener noreferrer">
                      BackOffice
                    </a>
                  </li>
                )}
                <li className="dropdown-user-edit-item">
                  {/* This link leads to the "ProfilePage" */}
                  <Link
                    to="/profil"
                    className="profile-link"
                    onClick={() => {
                      handleScrollToTop();
                      setopenUserDropdown(!openUserDropdown);
                      handleToggleNav();
                    }}
                  >
                    Voir mon profil
                  </Link>
                </li>
                <li className="dropdown-user-edit-item">
                  <Link
                    // on logout, redirected to home page
                    to="/"
                    type="button"
                    onClick={() => {
                      // Close user dropdown
                      setopenUserDropdown(!openUserDropdown);
                      // Call the "toggleLoginForm" function, which deletes the token from the localstorage and sets userLogged to false.
                      toggleLoginForm();
                    }}
                    className="btn-logout"
                  >
                    Déconnexion
                  </Link>
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
        {/* Mobile menu */}
        {/* Button burger */}
        <div
          onClick={() => {
            // when on mobile we manage the burger menu, when we click on it it opens the navbar and changes the icon into a cross or a burger menu.
            handleToggleNav();
            // For UX reasons, we close the dropdown menu of the "Map" item when we open or close the navbar.
            setOpenDropDown(false);
          }}
          className="Navbar-burger"
        >
          {!nav ? <FaBars /> : <FaTimes />}
        </div>
        {/* If nav = false then navbar not displayed otherwise true it is displayed */}
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
              Donnez votre avis
            </NavLink>
          </ul>
          <div className="login-social-mobile">
            <div>
              {!userLogged && (
                <button onClick={toggleLoginForm} className="btn-login" type="button">
                  Connexion
                </button>
              )}
              {userLogged && (
                <>
                  <FaUserEdit className="profile-icon" onClick={() => setopenUserDropdown(!openUserDropdown)} />
                  {userInfos && <div>Bonjour {userInfos.firstname}</div>}
                </>
              )}
              {openUserDropdown && (
                <ul className="dropdown-user-edit-list">
                  {userInfos.roles.includes('ROLE_ADMIN') && (
                    <li className="dropdown-user-edit-item">
                      <a
                        href="http://felixpicot1989-server.eddi.cloud/projet-o-resto-back/public/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        BackOffice
                      </a>
                    </li>
                  )}
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
                    <Link
                      type="button"
                      onClick={() => {
                        setopenUserDropdown(!openUserDropdown);
                        toggleLoginForm();
                      }}
                      className="btn-logout"
                    >
                      Déconnexion
                    </Link>
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
      {/* the login form is displayed when the login button is clicked */}
      <AuthForm
        // pass to showLoginForm props to manage a style condition, whether the form is displayed or not
        showLoginForm={showLoginForm}
        // We give it a function that closes the form when you click on a cross and when you are properly connected
        toggleLoginForm={() => toggleLoginForm()}
      />
      {/* The "ToastNotif" component is used to display successes and errors, in this case it only handles connection successes */}
      <ToastNotif
        // we pass it in props success which is "truthy" that allows to manage some style conditions in the component and that contains the connection success message.
        success={success}
        // We give it a function to set to null succes what is used to close the notification
        toggleToast={() => {
          setSuccess(null);
        }}
      />
    </>
  );
}

export default Navbar;
