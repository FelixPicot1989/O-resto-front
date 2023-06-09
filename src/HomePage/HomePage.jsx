import React from 'react';
import './HomePage.scss';
import CarouselBgImages from '../components/CarouselBgImages/CarouselBgImages';
import CarouselReview from '../components/CarouselReview/CarouselReview';

function HomePage() {
  return (
    <div className="HomePage">
      <CarouselBgImages />
      <div className="Oresto-story">
        <h2>Histoire du restaurant</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam odit nisi eaque esse aspernatur ratione eum
          cum quibusdam delectus optio nulla saepe dicta blanditiis ducimus excepturi incidunt totam culpa minima, ad
          deserunt sequi impedit beatae. Totam impedit, expedita magni debitis atque dolores modi illo illum odio
          repellendus fugit, voluptates vero! Neque adipisci hic ipsa incidunt. Necessitatibus eius labore fugiat?
          Nihil, laudantium ut enim nam excepturi eum doloribus unde quis distinctio quibusdam impedit esse perspiciatis
          illum non voluptatum. Sit sed soluta reiciendis aspernatur rem commodi error officiis libero odio excepturi
          eligendi atque, ab beatae natus! Facere vero ad animi reprehenderit laboriosam.
        </p>
      </div>
      <CarouselReview />
    </div>
  );
}

export default HomePage;
