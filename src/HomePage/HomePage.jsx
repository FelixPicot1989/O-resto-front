import React from 'react';
import PropTypes from 'prop-types';

import CarouselBgImages from '../components/CarouselBgImages/CarouselBgImages';
import CarouselReview from '../components/CarouselReview/CarouselReview';

import './HomePage.scss';

function HomePage({ history }) {
  return (
    <div className="HomePage">
      {/* Props : title of the page */}
      <CarouselBgImages title="O'resto" />
      <div className="Oresto-story">
        <h2>Histoire du restaurant</h2>
        <p>{history}</p>
      </div>
      <CarouselReview />
    </div>
  );
}

HomePage.propTypes = {
  history: PropTypes.string.isRequired,
};

export default HomePage;
