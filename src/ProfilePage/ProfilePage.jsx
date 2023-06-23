/* eslint-disable jsx-a11y/label-has-associated-control */
import './ProfilePage.scss';
import { useState, useEffect } from 'react';
import isValidDomain from 'is-valid-domain';
import axios from 'axios';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import ToastNotif from '../components/ToastNotif/ToastNotif';

import { userInfo } from '../components/Recoil/Recoil';

function ProfilPage() {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const userInfos = useRecoilValue(userInfo);
  const setUserInfo = useSetRecoilState(userInfo);

  const [lastname, setLastname] = useState('');
  const [firstname, setFirstname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  const [hasUpperCase, setHasUpperCase] = useState(false);
  const [hasNumber, setHasNumber] = useState(false);
  const [hasSixChars, setHasSixChars] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(false);
  const [showPasswordFirst, setShowPasswordFirst] = useState(false);
  const [showPasswordSecond, setShowPasswordSecond] = useState(false);

  // Vérifie si "password" et "confirmPassword" ont tous les deux une valeur et si elles sont identiques.
  // Ce résultat est ensuite converti en un booléen et stocké dans "passwordsMatch".
  useEffect(() => {
    setPasswordsMatch(Boolean(password && confirmPassword === password));
  }, [confirmPassword, password]);

  useEffect(() => {
    if (userInfos) {
      setFirstname(userInfos.firstname);
      setLastname(userInfos.lastname);
      setEmail(userInfos.email);
    }
  }, [userInfos]);

  const handlePasswordChange = ({ target: { value } }) => {
    setPassword(value);
    // Vérifier la présence de lettres majuscules
    setHasUpperCase(value.toLowerCase() !== value);
    // Vérifier la présence d'un chiffre
    setHasNumber(/\d/.test(value));
    // Vérifier la présence d'au moins 6 caractères
    setHasSixChars(value.length >= 6);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // On verifie si tous les champs ne sont pas vide
    if (!email.trim() || !password.trim() || !firstname.trim() || !lastname.trim()) {
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
    // On set à null success et error à la fin du submit
    setTimeout(() => {
      setSuccess(null);
      setError(null);
    }, 7000);
  };

  return (
    <>
      <div className="Profil">
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
                // onChange pour l'email non utile
                // onChange={(e) => {
                //   setEmail(e.target.value);
                // }}
                // disabled car comme ca on empeche le user de modifier son identifiant ce qui eviter les problemes avec le token JWT
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
