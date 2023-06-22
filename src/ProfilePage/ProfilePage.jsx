/* eslint-disable jsx-a11y/label-has-associated-control */
import './ProfilePage.scss';
import { useState, useEffect } from 'react';
import isValidDomain from 'is-valid-domain';
import axios from 'axios';
import { useRecoilValue } from 'recoil';
import ToastNotif from '../components/ToastNotif/ToastNotif';

import { userInfo } from '../components/Recoil/Recoil';

function ProfilPage() {
  const [lastname, setLastname] = useState('');
  const [firstname, setFirstname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  const userInfos = useRecoilValue(userInfo);

  useEffect(() => {
    if (userInfos) {
      setFirstname(userInfos.firstname);
      setLastname(userInfos.lastname);
      setEmail(userInfos.email);
    }
  }, [userInfos]);

  const baseUrl = import.meta.env.VITE_BASE_URL;

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
              <label htmlFor="email">Changer votre email : </label>
              <input
                type="text"
                name="email"
                id="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div className="info">
              <label htmlFor="password">Changer votre mot de passe : </label>
              <input
                type="text"
                id="password"
                name="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
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
