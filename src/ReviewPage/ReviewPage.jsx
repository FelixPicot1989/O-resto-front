import React from 'react';
import './ReviewPage.scss';
import CarouselBgImages from '../components/CarouselBgImages/CarouselBgImages';
import CarouselReview from '../components/CarouselReview/CarouselReview';
import ReviewForm from '../components/ReviewForm/ReviewForm';

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
