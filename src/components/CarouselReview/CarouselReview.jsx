import React from 'react';

import './CarouselReview.scss';
import { Carousel } from 'react-responsive-carousel';
import { Rating } from '@mui/material';

function CarouselReview() {
  // value sera supprimer
  const value = 3;
  return (
    <div className="CarouselReview">
      <h2 className="title">Avis</h2>
      {/* sera dynamiquement dans un .map quand on aura acces au donnée */}
      <Carousel interval={5000} infiniteLoop showThumbs={false} showIndicators={false} showStatus={false}>
        <div className="Card-review">
          <h3 className="user-name">John Doe</h3>
          <p className="comment">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod lacus nec neque commodo lacinia.
          </p>
          <span className="date">9 juin 2023</span>
          <Rating className="rate" name="read-only" value={value} readOnly />
        </div>
        <div className="Card-review">
          <h3 className="user-name">John Doe</h3>
          <p className="comment">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod lacus nec neque commodo lacinia.
          </p>
          <span className="date">9 juin 2023</span>
          <Rating className="rate" name="read-only" value={value} readOnly />
        </div>
        <div className="Card-review">
          <h3 className="user-name">John Doe</h3>
          <p className="comment">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod lacus nec neque commodo lacinia.
          </p>
          <span className="date">9 juin 2023</span>
          <Rating className="rate" name="read-only" value={value} readOnly />
        </div>
      </Carousel>
    </div>
  );
}

export default CarouselReview;
