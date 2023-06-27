import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Carousel } from 'react-responsive-carousel';

import { ImageContext } from '../../context/ImageContextProvider';

import './CarouselBgImages.scss';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

// The carousel of images you see on the website
function CarouselBgImages({ title }) {
  const { imagesBgCarousel } = useContext(ImageContext);

  // URL of the API imported from the file .env
  const baseUrl = import.meta.env.VITE_BASE_URL;

  return (
    <div className="CarouselBgImages">
      {/* Title come from a props */}
      <h1 className="page-title">{title}</h1>
      {/* Carousel component from react-responsive-carousel */}
      <Carousel autoPlay infiniteLoop showThumbs={false} showIndicators={false} showArrows={false} showStatus={false}>
        {/* Check to not .map() on an empty array before the data from the API arrives and if array not empry then we map to get the URL of the images */}
        {imagesBgCarousel &&
          imagesBgCarousel.length !== 0 &&
          imagesBgCarousel.map((el) => (
            <div
              key={el.id}
              className="carou-img"
              style={{ backgroundImage: `url(${`${baseUrl}/uploads/${el.image}`})` }}
            />
          ))}
      </Carousel>
    </div>
  );
}

CarouselBgImages.propTypes = {
  title: PropTypes.string.isRequired,
};

export default CarouselBgImages;
