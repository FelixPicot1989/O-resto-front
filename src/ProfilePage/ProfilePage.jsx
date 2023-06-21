/* eslint-disable jsx-a11y/label-has-associated-control */
import './ProfilePage.scss';
import { useState } from 'react';
import isValidDomain from 'is-valid-domain';
import axios from 'axios';
import ToastNotif from '../components/ToastNotif/ToastNotif';

function ProfilPage() {
  const [email, setEmail] = useState('test@test.com');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  const baseUrl = import.meta.env.VITE_BASE_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
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
      // quand on se connecte
      const response = await axios.post(`${baseUrl}/api/login_check`, {
        email,
        password,
      });
      if (response.status === 200) {
        setSuccess('Vous êtes bien connecté');
      }
    } catch (err) {
      if (err.response.status === 401) {
        setError('Email ou mot de passe incorrect');
      } else {
        setError("Une erreur s'est produite");
        console.error(err);
      }
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
        <p>Bonjour !</p>
        <p>Nom</p>
        <p>Prenom</p>
        <form onSubmit={handleSubmit}>
          <div>
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
          <div>
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
