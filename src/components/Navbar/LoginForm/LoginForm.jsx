/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import isValidDomain from 'is-valid-domain';
// import axios from 'axios';

import './LoginForm.scss';

function LoginForm({ showLoginForm, toggleLoginForm }) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  // Il faudra gerer l'affichage des erreurs
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const emailParts = email.split('@');
    if (emailParts.length !== 2) {
      setError("L'email n'est pas valide");
      return;
    }

    const domain = emailParts[1];
    if (!isValidDomain(domain)) {
      setError("Le domaine de l'email n'est pas valide");
    } else {
      try {
        const response = await axios.post('/api/login', {
          email,
          password,
        });
        // stop l'indice de chargement
        setLoading(false);
        // ferme de fromulaire de connection
        toggleLoginForm();
        // permet d'afficher un message pour la connection reussi
        setSuccess('Vous etês bien connecté');
        setTimeout(() => {
          setSuccess(false);
        }, 3000);
        console.log(response.data);
      } catch (err) {
        // stop l'indice de chargement
        setLoading(false);
        // permet d'afficher un message pour la connection échouée
        setError("Une erreur lors de la connexion c'est produite");
        setTimeout(() => {
          setError(false);
        }, 3000);
        console.error(err);
      }
      setEmail('');
      setPassword('');
    }
  };

  return (
    <>
      <div className={` ${showLoginForm ? 'LoginForm-open' : 'LoginForm'}`}>
        <div className="container">
          <label htmlFor="show" onClick={toggleLoginForm} className="close-btn fas fa-times" title="close" />
          <h3 className="text">Connexion</h3>
          <form onSubmit={handleSubmit}>
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
              {loading ? <div className="loader" /> : <button type="submit">Se connecter</button>}
            </div>
          </form>
        </div>
      </div>
      {success && <div>{success}</div>}
      {error && <div>{error}</div>}
    </>
  );
}

LoginForm.propTypes = {
  showLoginForm: PropTypes.bool.isRequired,
  toggleLoginForm: PropTypes.func.isRequired,
};

export default LoginForm;
