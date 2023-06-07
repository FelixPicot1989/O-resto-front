import React from 'react'
import { useState } from 'react';
import {
  FaBars,
  FaTimes,
  FaFacebook,
  FaInstagram,
  FaTripadvisor
} from 'react-icons/fa';

import logoOresto from '../../assets/logo-oresto.png';
import './Navbar.scss';

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const handleClick = () => {
    setNav(!nav);
  };

  return (
    <nav className="Navbar">
        <img src={logoOresto} alt='logo-oresto' className='logo-oresto' />
        <h1 className={!nav
            ? 'title-hidden'
            : 'title'}>O'Resto</h1>
        {/* Desktop menu */}
        <div className="Navbar-desktop">
          <ul className="Navbar-list" >
            <li className="Navbar-list-item">
                Accueil
            </li>
            <li className="Navbar-list-item">
                La carte
            </li>
            <li className="Navbar-list-item">
                Réserver/Contact
            </li>
            <li className="Navbar-list-item">
                Donner votre avis
            </li>
          </ul>
          <div className='login-social-desktop'>
            <button className='btn-login' type='button'>Connexion</button>
            <div className='social-desktop'>
              <FaFacebook />
              <FaInstagram />
              <FaTripadvisor />
            </div>
          </div>
        </div>
        {/* Bouton burger */}
        <div onClick={handleClick} className="Navbar-burger">
          {!nav ? <FaBars /> : <FaTimes />}
        </div>
        {/* Mobile menu */}
        <div className={!nav
            ? 'Navbar-mobile-hidden'
            : 'Navbar-mobile'}>
          <ul>
            <li className="Navbar-mobile-item">
                Accueil
            </li>
            <li className="Navbar-mobile-item">
                La carte
            </li>
            <li className="Navbar-mobile-item">
                Réserver/Contact
            </li>
            <li className="Navbar-mobile-item">
                Donner votre avis
            </li>
          </ul>
          <div className='login-social-mobile'>
            <button className='btn-login' type='button'>Connexion</button>
            <div className='social-media'>
              <FaFacebook />
              <FaInstagram />
              <FaTripadvisor />
            </div>
          </div>
        </div>
      </nav>
  )
}

export default Navbar