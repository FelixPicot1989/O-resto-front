/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import isValidDomain from 'is-valid-domain';
import axios from 'axios';

import './AuthForm.scss';

function AuthForm({ showLoginForm, toggleLoginForm }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [showPasswordFirst, setShowPasswordFirst] = useState(false);
  const [showPasswordSecond, setShowPasswordSecond] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [hasUpperCase, setHasUpperCase] = useState(false);
  const [hasNumber, setHasNumber] = useState(false);
  const [hasSixChars, setHasSixChars] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const resetForm = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setHasNumber(false);
    setHasSixChars(false);
    setHasUpperCase(false);
    setPasswordsMatch(false);
  };

  const handlePasswordChange = ({ target: { value } }) => {
    setPassword(value);
    // Vérifier la présence de lettres majuscules
    setHasUpperCase(value.toLowerCase() !== value);
    // Vérifier la présence d'un chiffre
    setHasNumber(/\d/.test(value));
    // Vérifier la présence d'au moins 6 caractères
    setHasSixChars(value.length >= 6);
  };

  // Vérifie si "password" et "confirmPassword" ont tous les deux une valeur et si elles sont identiques.
  // Ce résultat est ensuite converti en un booléen et stocké dans "passwordsMatch".
  useEffect(() => {
    setPasswordsMatch(Boolean(password && confirmPassword === password));
  }, [confirmPassword, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // On verifie si tous les champs ne sont pas vide
    if (!email.trim() || !password.trim() || (isSignUp && (!firstName.trim() || !lastName.trim()))) {
      setError('Veuillez remplir tous les champs');
      setLoading(false);
      return;
    }
    // On verifie si c'est bien un email
    const emailParts = email.split('@');
    if (emailParts.length !== 2) {
      setError("L'email n'est pas valide");
      setLoading(false);
      return;
    }
    // On verifie le domaine
    const domain = emailParts[1];
    if (!isValidDomain(domain)) {
      setError("Le domaine de l'email n'est pas valide");
      setLoading(false);
      return;
    }
    // On verifie si le mdp respect les attentes
    if (isSignUp && (!hasNumber || !hasSixChars || !passwordsMatch)) {
      setError('Le mot de passe ne répond pas aux exigences');
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

    resetForm();
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
              resetForm();
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
                type="email"
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
                type={`${showPasswordFirst ? 'text' : 'password'}`}
                id="password"
                name="password"
                required
                value={password}
                onChange={handlePasswordChange}
              />
              <span
                className="show-password-first"
                // onMouseEnter={() => setShowPasswordFirst(true)}
                // onMouseLeave={() => setShowPasswordFirst(false)}
                onClick={() => setShowPasswordFirst(!showPasswordFirst)}
              >
                {showPasswordFirst ? <i className="fas fa-eye" /> : <i className="fas fa-eye-slash" />}
              </span>
            </div>
            {isSignUp && (
              <>
                <div className="data confirmPassword">
                  <input
                    className=""
                    type={`${showPasswordSecond ? 'text' : 'password'}`}
                    id="confirmPassword"
                    name="user_confirm_password"
                    placeholder="Confirmez votre mot de passe"
                    value={confirmPassword}
                    required
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <span
                    className="show-password-second"
                    //! à voir si on garde le onMouse
                    // onMouseEnter={() => setShowPasswordSecond(true)}
                    // onMouseLeave={() => setShowPasswordSecond(false)}
                    onClick={() => setShowPasswordSecond(!showPasswordSecond)}
                  >
                    {showPasswordSecond ? <i className="fas fa-eye" /> : <i className="fas fa-eye-slash" />}
                  </span>
                </div>
                <div className="check-password">
                  <span>Le mot de passe doit répondre aux exigences suivantes :</span>
                  <ul>
                    <li style={{ color: hasUpperCase ? '#31c431d1' : '#fd3939ce' }}>
                      Contient au moins une lettre majuscule
                    </li>
                    <li style={{ color: hasNumber ? '#31c431d1' : '#fd3939ce' }}>Contient au moins un chiffre</li>
                    <li style={{ color: hasSixChars ? '#31c431d1' : '#fd3939ce' }}>Contient au moins 6 caractères</li>
                    <li style={{ color: passwordsMatch ? '#31c431d1' : '#fd3939ce' }}>
                      Les deux mot de passe {passwordsMatch ? 'sont' : 'ne sont pas'} identiques
                    </li>
                  </ul>
                </div>
              </>
            )}
            <div className="btn">
              {loading ? (
                <div className="loader" />
              ) : (
                <button type="submit">{isSignUp ? "S'inscrire" : 'Se connecter'}</button>
              )}
            </div>
          </form>
          <span
            className="registration"
            onClick={() => {
              setIsSignUp(!isSignUp);
              resetForm();
            }}
          >
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
