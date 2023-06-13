import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import './CarouselBgImages.scss';

import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import { ImageContext } from '../../context/ImageContextProvider';

// Pour le moment les images sont importés en statique
function CarouselBgImages({ title }) {
  const { imagesBgCarousel } = useContext(ImageContext);
  console.log(imagesBgCarousel);

  return (
    <div className="CarouselBgImages">
      {/* Le titre au milieu de la page que l'on remplacera avec une props quand on pourra avoir les données en dynamiques */}
      <h1 className="page-title">{title}</h1>
      {/* Le composant du carousel de la librairie react-responsive-carousel, on mapera pour créer les div */}
      <Carousel autoPlay infiniteLoop showThumbs={false} showIndicators={false} showArrows={false} showStatus={false}>
        {imagesBgCarousel &&
          imagesBgCarousel.length !== 0 &&
          imagesBgCarousel.map((el) => (
            <div key={el.id} className="carou-img" style={{ backgroundImage: `url(${el.url})` }} />
          ))}
      </Carousel>
    </div>
  );
}

CarouselBgImages.propTypes = {
  title: PropTypes.string.isRequired,
};

export default CarouselBgImages;
