import React from 'react';

import CarouselBgImages from '../components/CarouselBgImages/CarouselBgImages';
import CarouselReview from '../components/CarouselReview/CarouselReview';
import ReviewForm from '../components/ReviewForm/ReviewForm';

import './ReviewPage.scss';

function ReviewPage() {
  return (
    <div className="ReviewPage">
      {/* Props : title of the page */}
      <CarouselBgImages title="Avis" />
      <CarouselReview />
      <ReviewForm />
    </div>
  );
}

export default ReviewPage;
