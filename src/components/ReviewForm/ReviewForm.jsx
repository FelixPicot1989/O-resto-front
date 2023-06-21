/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState } from 'react';
import { Rating, Typography } from '@mui/material';
import axios from 'axios';

import { useRecoilValue } from 'recoil';
import { isUserLogged } from '../Recoil/Recoil';
import './ReviewForm.scss';
import AuthForm from '../AuthForm/AuthForm';
import ToastNotif from '../ToastNotif/ToastNotif';

function ReviewForm() {
  // Les variables pour stocker l'avis et la note
  const [reviewComment, setReviewComment] = useState('');
  const [ratingValue, setRatingValue] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const baseUrl = import.meta.env.VITE_BASE_URL;

  const userLogged = useRecoilValue(isUserLogged);

  function toggleLoginForm() {
    setShowLoginForm(!showLoginForm);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const trimmedReviewComment = reviewComment.trim();

    if (!trimmedReviewComment) {
      setError("Le commentaire de l'avis est vide");
      setLoading(false);
      return;
    }

    if (ratingValue === null) {
      setError('Veuillez donner une note');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        `${baseUrl}/api/reviews`,
        {
          comment: reviewComment,
          rating: ratingValue,
          createdAt: 'now',
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      if (response.status === 201) {
        setSuccess('Votre avis a bien été envoyé. Merci pour votre retour.');
        setReviewComment('');
        setRatingValue(null);
      } else {
        setError("Une erreur est survenue lors de l'envoi de l'avis.");
      }
    } catch (err) {
      setError("Une erreur s'est produite");
      console.error(err);
    }
    setLoading(false);

    setTimeout(() => {
      setSuccess(null);
      setError(null);
    }, 3000);
  };

  return (
    <>
      <div className="ReviewForm">
        <h3 className="title">Donnez votre avis</h3>
        <form onSubmit={handleSubmit}>
          <label className="comment-review-label" htmlFor="comment-review">
            <span>Ecrivez votre avis :</span>
            <textarea
              name="comment-review"
              id="comment-review"
              value={reviewComment}
              disabled={!userLogged}
              onChange={(e) => {
                setReviewComment(e.target.value);
              }}
            />
          </label>
          <div className="rate">
            <Typography component="legend">Votre note :</Typography>
            <Rating
              name="give-rating"
              id="rating"
              value={ratingValue}
              onChange={(e, newValue) => {
                e.preventDefault();
                setRatingValue(newValue);
              }}
              precision={0.5}
              disabled={!userLogged}
            />
          </div>
          {userLogged ? (
            <button className="btn-login" type="submit">
              {loading ? 'Envoie en cours...' : 'Envoyer'}
            </button>
          ) : (
            <p className="login-message">
              Pour poster un avis, merci de vous connecter. <br /> Cliquer <em onClick={toggleLoginForm}>ici</em> pour
              vous connecter
            </p>
          )}
        </form>
      </div>
      <AuthForm showLoginForm={showLoginForm} toggleLoginForm={() => toggleLoginForm()} />
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

export default ReviewForm;
