/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
// Import React and useState (a Hook) from the React library.
// useState is used to manage local state in a React functional component.
import React, { useState } from 'react';

// Import specific components (Rating, Typography) from @mui/material, a library of user interface components.
import { Rating, Typography } from '@mui/material';

// Import axios library to make HTTP requests.
import axios from 'axios';

// Import specific Recoil hooks (useRecoilValue, useSetRecoilState) to manage the application's global state.
// useRecoilValue is used to read the value of an atom or selector,
// useSetRecoilState is used to obtain an atom state update function.
import { useRecoilValue, useSetRecoilState } from 'recoil';

// Import two atoms defined elsewhere in the application (isUserLogged and reviews) from a file called Recoil.
import { isUserLogged, reviews } from '../Recoil/Recoil';

// Import an authentication component and a component for displaying notifications.
import AuthForm from '../AuthForm/AuthForm';
import ToastNotif from '../ToastNotif/ToastNotif';

// Import style.
import './ReviewForm.scss';

function ReviewForm() {
  // import.meta.env.VITE_BASE_URL accesses an environment variable defined in the .env file
  const baseUrl = import.meta.env.VITE_BASE_URL;

  // UseState to create state variables for notification comment, rating, loading and error/success messages
  const [reviewComment, setReviewComment] = useState('');
  const [ratingValue, setRatingValue] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  // UseSetRecoilState to obtain a function for updating the state of a Recoil atom.
  // This updates the global list of notices.
  const setReviews = useSetRecoilState(reviews);

  // UseRecoilValue to read the value of the isUserLogged atom, which indicates whether the user is logged in.
  const userLogged = useRecoilValue(isUserLogged);

  // Function to display/close the login form.
  function toggleLoginForm() {
    setShowLoginForm(!showLoginForm);
  }

  // Asynchronous function to manage form submission.
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Activate loading indicator

    // We check that the comment and note are not empty.
    // the trim() method deletes spaces, so if the user just makes spaces in the form, the form won't be submissive.
    const trimmedReviewComment = reviewComment.trim();
    if (!trimmedReviewComment) {
      setError("Le commentaire de l'avis est vide"); // If the comment is empty, an error is displayed.
      setLoading(false);
      return;
    }

    if (ratingValue === null) {
      setError('Veuillez donner une note'); // If the note is not defined, an error is displayed.
      setLoading(false);
      return;
    }

    // Submit the notification via a POST request to the API.
    try {
      const response = await axios.post(
        `${baseUrl}/api/reviews`,
        {
          comment: reviewComment, // send notice content
          rating: ratingValue, // send notice note
          createdAt: 'now', // we send the date, back side it didn't work without
        },
        {
          // send the JWT token in the request so that the notice is linked to a user, which will display the user's name under his comment in the notice carousel
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      // if response are OK
      if (response.status === 201) {
        setSuccess('Votre avis a bien été envoyé. Merci de votre retour.'); // We set a success message
        setReviewComment(''); // empty the comment field
        setRatingValue(null); // set the note to null
        // once the notice has been posted, we launch a new request to retrieve all notices and update the global status of notices with Recoil.
        // this allows for a kind of "instant" post.
        const fetchReviews = async () => {
          try {
            const reviewsList = await axios.get(`${baseUrl}/api/reviews`);
            const { data } = reviewsList;
            // Update global notification status
            setReviews(data);
          } catch (err) {
            console.log('Erreur API', err);
          }
        };
        // with async await you must remember to call the function to execute it
        fetchReviews();
      } else {
        setError("Une erreur est survenue lors de l'envoi de l'avis."); // if there was an error when sending, an error message is displayed
      }
    } catch (err) {
      setError("Une erreur s'est produite"); // displays an error message
      console.error(err);
    }
    setLoading(false); // Set loading indicator to false

    // After 7 seconds, success/error messages are cleared.
    setTimeout(() => {
      setSuccess(null);
      setError(null);
    }, 7000);
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
              disabled={!userLogged} // if the user is not logged in, they are prevented from writing a review
              onChange={(e) => {
                setReviewComment(e.target.value);
              }}
            />
          </label>
          <div className="rate">
            <Typography component="legend">Votre note :</Typography>
            <Rating
              // using the Rating component according to the specified documentation
              name="give-rating"
              id="rating"
              value={ratingValue}
              onChange={(e, newValue) => {
                e.preventDefault();
                setRatingValue(newValue);
              }}
              precision={0.5}
              disabled={!userLogged} // if the user is not logged in, he/she is prevented from giving a note
            />
          </div>
          {/* If the user is logged in, the send button is displayed, and once he clicks on it loadind becomes true, so it displays "Sending..." once the sending is complete it returns to "Send" */}
          {userLogged ? (
            <button className="btn-login" type="submit">
              {loading ? 'Envoie en cours...' : 'Envoyer'}
            </button>
          ) : (
            // if the user is not logged in, this message is displayed, with a link to the login form
            <p className="login-message">
              Pour poster un avis, merci de vous connecter. <br /> Cliquer <em onClick={toggleLoginForm}>ici</em> pour
              vous connecter
            </p>
          )}
        </form>
      </div>
      {/* the login form is displayed when the login button is clicked */}
      <AuthForm
        // pass to showLoginForm props to manage a style condition, whether the form is displayed or not
        showLoginForm={showLoginForm}
        // We give it a function that closes the form when you click on a cross and when you are properly connected
        toggleLoginForm={() => toggleLoginForm()}
      />
      {/* The "ToastNotif" component is used to display successes and errors, in this case it only manages successes when a notice is posted correctly */}
      <ToastNotif
        // we pass it in props success which is "truthy" that allows to manage some style conditions in the component and that contains the connection success message.
        success={success}
        // We give it a function to set to null succes what is used to close the notification
        toggleToast={() => {
          setSuccess(null);
        }}
      />
      {/* The "ToastNotif" component is used to display success and error messages, in this case it only handles connection messages */}
      <ToastNotif
        // we pass it in props error which is "falsy" that allows to manage some style conditions in the component and which contains the error message due to the sending of a notice
        error={error}
        // We give it a function that sets error to null, which closes the notification.
        toggleToast={() => {
          setError(null);
        }}
      />
    </>
  );
}

export default ReviewForm;
