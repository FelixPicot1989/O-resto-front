/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import isValidDomain from 'is-valid-domain';
import axios from 'axios';

import './AuthForm.scss';

function AuthForm({ showLoginForm, toggleLoginForm }) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isSignUp, setIsSignUp] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!email.trim() || !password.trim() || (isSignUp && (!firstName.trim() || !lastName.trim()))) {
      setError('Veuillez remplir tous les champs');
      setLoading(false);
      return;
    }

    const emailParts = email.split('@');
    if (emailParts.length !== 2) {
      setError("L'email n'est pas valide");
      setLoading(false);
      return;
    }

    const domain = emailParts[1];
    if (!isValidDomain(domain)) {
      setError("Le domaine de l'email n'est pas valide");
      setLoading(false);
      return;
    }

    try {
      let response;
      if (isSignUp) {
        response = await axios.post('/api/signup', {
          email,
          password,
          firstName,
          lastName,
        });
      } else {
        response = await axios.post('/api/login', {
          email,
          password,
        });
      }

      setLoading(false);
      toggleLoginForm();
      setSuccess(`Vous êtes bien ${isSignUp ? 'inscrit' : 'connecté'}`);
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
      console.log(response.data);
    } catch (err) {
      setLoading(false);
      setError("Une erreur s'est produite");
      setTimeout(() => {
        setError(false);
      }, 3000);
      console.error(err);
    }
    setEmail('');
    setPassword('');
    setFirstName('');
    setLastName('');
  };

  return (
    <>
      <div className={` ${showLoginForm ? 'LoginForm' : 'LoginForm-close'}`}>
        <div className="container">
          <label
            htmlFor="show"
            onClick={() => {
              toggleLoginForm();
              setIsSignUp(false);
            }}
            className="close-btn fas fa-times"
            title="close"
          />
          <h3 className="text">{isSignUp ? 'Inscription' : 'Connexion'}</h3>
          <form onSubmit={handleSubmit}>
            {isSignUp && (
              <>
                <div className="data">
                  <label htmlFor="firstName">Prénom</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className="data">
                  <label htmlFor="lastName">Nom</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </>
            )}
            <div className="data">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                id="email"
                name="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="data">
              <label htmlFor="password">Mot de passe</label>
              <input
                className=""
                type={`${showPassword ? 'text' : 'password'}`}
                id="password"
                name="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span className="show-password" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <i className="fas fa-eye" /> : <i className="fas fa-eye-slash" />}
              </span>
            </div>
            <div className="btn">
              {loading ? (
                <div className="loader" />
              ) : (
                <button type="submit">{isSignUp ? "S'inscrire" : 'Se connecter'}</button>
              )}
            </div>
          </form>
          <span className="registration" onClick={() => setIsSignUp(!isSignUp)}>
            {isSignUp ? 'Vous avez déja un compte ?' : "Vous n'avez pas encore de compte ?"}
          </span>
        </div>
      </div>
      {success && <div>{success}</div>}
      {error && <div>{error}</div>}
    </>
  );
}

AuthForm.propTypes = {
  showLoginForm: PropTypes.bool.isRequired,
  toggleLoginForm: PropTypes.func.isRequired,
};

export default AuthForm;
