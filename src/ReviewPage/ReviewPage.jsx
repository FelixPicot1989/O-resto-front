import React from 'react';
import './ReviewPage.scss';
import CarouselBgImages from '../components/CarouselBgImages/CarouselBgImages';
import CarouselReview from '../components/CarouselReview/CarouselReview';
import ReviewForm from '../components/ReviewForm/ReviewForm';

// LoginMessage et le bouton pour envoyer à afficher en fonction de si la personne est connecté ou non
// Il faudrait rajouter un loading ?
function ReviewPage() {
  return (
    <div className="ReviewPage">
      {/* Props : title (titre de la page) + images (tableau d'image recupéré) */}
      <CarouselBgImages title="Avis" />
      <CarouselReview />
      <ReviewForm />
    </div>
  );
}

export default ReviewPage;
