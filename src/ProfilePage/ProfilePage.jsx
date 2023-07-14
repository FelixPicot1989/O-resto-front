/* eslint-disable jsx-a11y/label-has-associated-control */
import './ProfilePage.scss';
import { useState, useEffect } from 'react';
import isValidDomain from 'is-valid-domain';
import axios from 'axios';
import { useRecoilState } from 'recoil';

import ToastNotif from '../components/ToastNotif/ToastNotif';
import { userInfo } from '../components/Recoil/Recoil';
import UserReservation from '../components/UserReservation/UserReservation';

function ProfilPage() {
  // URL of the API imported from the file .env
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const [userInfos, setUserInfo] = useRecoilState(userInfo);

  // States to manage the fields
  const [lastname, setLastname] = useState('');
  const [firstname, setFirstname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [reservations, setReservations] = useState([]);

  // States to manage the differents views (do the password need to be seen clearly...)
  const [showPasswordFirst, setShowPasswordFirst] = useState(false);
  const [showPasswordSecond, setShowPasswordSecond] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // States to verify if the password respect all the conditions
  const [hasUpperCase, setHasUpperCase] = useState(false);
  const [hasNumber, setHasNumber] = useState(false);
  const [hasSixChars, setHasSixChars] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(false);

  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  // With the token of the user (stocked in localStorage when he's connected) we get his informations and stocked them with setUserInfo
  const fetchUserInfo = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/users/me`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const { data } = response;
      setUserInfo({
        id: data.id,
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email,
        roles: data.roles,
        reservations: data.reservations,
      });
    } catch (err) {
      console.log('Erreur API', err);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  // Checks whether "password" and "confirmPassword" both have a value and whether they are identical.
  // This result is then converted to a Boolean and stored in "passwordsMatch".
  useEffect(() => {
    setPasswordsMatch(Boolean(password && confirmPassword === password));
  }, [confirmPassword, password]);

  // If userInfos change, re-render
  useEffect(() => {
    if (userInfos) {
      setFirstname(userInfos.firstname);
      setLastname(userInfos.lastname);
      setEmail(userInfos.email);
      setReservations(userInfos.reservations);
      console.log(userInfos.reservations);
    }
  }, [userInfos]);

  const handlePasswordChange = ({ target: { value } }) => {
    setPassword(value);
    // Check for capital letters
    setHasUpperCase(value.toLowerCase() !== value);
    // Check if there's a number
    setHasNumber(/\d/.test(value));
    // Check if there's at least 6 characters
    setHasSixChars(value.length >= 6);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Check that all fields are not empty
    if (!email.trim() || !password.trim() || !firstname.trim() || !lastname.trim()) {
      setError('Veuillez remplir tous les champs');
      setLoading(false);
      return;
    }
    // Check if it's an email
    const emailParts = email.split('@');
    if (emailParts.length !== 2) {
      setError("L'email n'est pas valide");
      setLoading(false);
      return;
    }
    // Check the domain
    const domain = emailParts[1];
    if (!isValidDomain(domain)) {
      setError("Le domaine de l'email n'est pas valide");
      setLoading(false);
      return;
    }

    // If everything is okay then we make a put request to modify the user with the new informations
    try {
      const response = await axios.put(
        `${baseUrl}/api/users/${userInfos.id}`,
        {
          firstname,
          lastname,
          email,
          password,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      if (response.status === 200) {
        setSuccess('Informations bien enregistrées');
        setUserInfo({
          id: userInfos.id,
          firstname,
          lastname,
          email: userInfos.email,
          roles: userInfos.roles,
        });
      }
    } catch (err) {
      setError("Une erreur s'est produite");
      console.error(err);
    }

    setLoading(false);
    // Setting to null at the end of the submit
    setTimeout(() => {
      setSuccess(null);
      setError(null);
    }, 7000);
  };

  return (
    <>
      <div className="Profil">
        <UserReservation reservations={reservations} />
        <h1>Informations personnelles</h1>
        <div className="infos-persos">
          <form onSubmit={handleSubmit}>
            <div className="info">
              <label htmlFor="email">Votre email : </label>
              <input
                type="text"
                name="email"
                id="email"
                value={email}
                // onChange={(e) => {
                //   setEmail(e.target.value);
                // }}
                // disabled because it prevents the user from modifying his identifier, thus avoiding problems with the JWT token.
                disabled
              />
            </div>
            <div className="info">
              <label htmlFor="nom">Changer votre nom : </label>
              <input
                type="text"
                name="nom"
                id="nom"
                value={lastname}
                onChange={(e) => {
                  setLastname(e.target.value);
                }}
              />
            </div>
            <div className="info">
              <label htmlFor="prenom">Changer votre prenom : </label>
              <input
                type="text"
                name="prenom"
                id="prenom"
                value={firstname}
                onChange={(e) => {
                  setFirstname(e.target.value);
                }}
              />
            </div>
            <div className="info">
              <label htmlFor="password">Mot de passe :</label>
              <input
                type={`${showPasswordFirst ? 'text' : 'password'}`}
                id="password"
                name="password"
                required
                value={password}
                onChange={handlePasswordChange}
                disabled={email === 'demo@demo.com'}
              />
              <span className="show-password-first" onClick={() => setShowPasswordFirst(!showPasswordFirst)}>
                {showPasswordFirst ? <i className="fas fa-eye" /> : <i className="fas fa-eye-slash" />}
              </span>
            </div>
            <div className="info">
              <input
                type={`${showPasswordSecond ? 'text' : 'password'}`}
                id="confirmPassword"
                name="user_confirm_password"
                placeholder="Confirmez votre mot de passe"
                value={confirmPassword}
                required
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={email === 'demo@demo.com'}
              />
              <span className="show-password-second" onClick={() => setShowPasswordSecond(!showPasswordSecond)}>
                {showPasswordSecond ? <i className="fas fa-eye" /> : <i className="fas fa-eye-slash" />}
              </span>
              <p className="explication">
                Si vous souhaitez changer votre mot de passe insérez un nouveau mot de passe.
              </p>
              <p className="explication">
                Ou bien, si vous souhaitez garder le meme mot de passe insérez votre mot de passe actuel
              </p>
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
            {loading ? <div className="loader" /> : <button type="submit">Sauvegarder les changements</button>}
          </form>
        </div>
      </div>
      <ToastNotif
        success={success}
        toggleToast={() => {
          setSuccess(null);
        }}
      />
      <ToastNotif
        error={error}
        toggleToast={() => {
          setError(null);
        }}
      />
    </>
  );
}

export default ProfilPage;
