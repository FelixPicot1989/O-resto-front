import { Rating, Typography } from '@mui/material';
import React, { useState } from 'react';
import './ReviewPage.scss';

// LoginMessage et le bouton pour envoyer à afficher en fonction de si la personne est connecté ou non
// Il faudrait rajouter un loading ?
function ReviewPage() {
  // Les variables pour stocker l'avis et la note
  const [reviewComment, setReviewComment] = useState('');
  const [ratingValue, setRatingValue] = useState(3);
  const [loading, setLoading] = useState(false);
  // code temporaire à gerer avec le localStorage
  const [userLogged, setUserLogged] = useState(true);

  return (
    <div className="ReviewPage">
      <div className="ReviewForm">
        <form
          onSubmit={(e) => {
            // On empêche le rechargement de la page et on vérifie que l'avis n'est pas vide avant de faire quoi que ce soit
            e.preventDefault();

            // il faudra penser a le metter en false si le submit = succes
            setLoading(true);
            if (reviewComment !== '') {
              // Il faudra envoyer ces valeurs en post plutôt que de les log
              console.log(reviewComment, ratingValue);
            } else {
              alert('review vide !');
            }
            // On vide le texte d'avis et on remet la note par défaut pour éviter de pouvoir spammer l'envoi d'avis
            setReviewComment('');
            setRatingValue(3);
          }}
        >
          <label className="comment-review-label" htmlFor="comment-review">
            <span>Ecrivez votre avis :</span>
            <textarea
              name="comment-review"
              id="comment-review"
              value={reviewComment}
              onChange={(e) => {
                setReviewComment(e.target.value);
              }}
            />
          </label>
          <div className="rate">
            <Typography component="legend">Votre note</Typography>
            <Rating
              name="give-rating"
              id="rating"
              value={ratingValue}
              onChange={(e, newValue) => {
                e.preventDefault();
                setRatingValue(newValue);
              }}
            />
          </div>
          {userLogged ? (
            <button type="submit">{loading ? 'Envoie en cours...' : 'Envoyer'}</button>
          ) : (
            <div className="LoginMessage">
              <p>Pour poster un avis, merci de vous connecter.</p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default ReviewPage;
