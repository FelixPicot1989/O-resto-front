import React, { useRef, useEffect, useState } from 'react';
import './CarouselReview.scss';
import { Rating } from '@mui/material';
import axios from 'axios';

function CarouselReview() {
  const wrapperRef = useRef(null);
  const carouselRef = useRef(null);
  const firstCardRef = useRef();
  const [reviews, setReviews] = useState([]);

  const baseUrl = 'http://felixpicot1989-server.eddi.cloud/projet-o-resto-back/public';
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/reviews`);
        const { data } = response;
        console.log(data);
        setReviews(data);
      } catch (error) {
        console.log('Erreur API', error);
      }
    };
    fetchReviews();
  }, []);

  // fonction pour gérer le clic gauche
  const handleLeftClick = () => {
    carouselRef.current.scrollLeft -= firstCardRef.current.offsetWidth;

    // boucle pour créer un effet de boucle infinie au scroll
    if (carouselRef.current.scrollLeft === 0) {
      carouselRef.current.scrollLeft = carouselRef.current.scrollWidth;
    }
  };

  // gérer le clic droit
  const handleRightClick = () => {
    carouselRef.current.scrollLeft += firstCardRef.current.offsetWidth;

    // boucle pour créer un effet de boucle infinie au scroll
    if (carouselRef.current.scrollLeft >= carouselRef.current.scrollWidth - carouselRef.current.offsetWidth) {
      carouselRef.current.scrollLeft = 0;
    }
  };

  // value sera supprimer
  const value = 3;
  return (
    <div className="CarouselReview">
      <h2 className="title">Avis</h2>
      <div className="wrapper" ref={wrapperRef}>
        <i id="left" className="fa-solid fa-angle-left" onClick={handleLeftClick} />
        <ul className="carousel" ref={carouselRef}>
          {reviews.map((el) => {
            return (
              <li key={el.id} className="card" ref={firstCardRef}>
                <h3 className="user-name">John Doe</h3>
                <p className="comment">{el.comment}</p>
                <span className="date">9 juin 2023</span>
                <Rating className="rate" name="read-only" value={el.rating} readOnly precision={0.5} />
              </li>
            );
          })}
          <li className="card" ref={firstCardRef}>
            <h3 className="user-name">John Doe</h3>
            <p className="comment">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod lacus nec neque commodo lacinia.
            </p>
            <span className="date">9 juin 2023</span>
            <Rating className="rate" name="read-only" value={value} readOnly />
          </li>
          <li className="card">
            <h3 className="user-name">John Doe</h3>
            <p className="comment">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod lacus nec neque commodo lacinia.
            </p>
            <span className="date">9 juin 2023</span>
            <Rating className="rate" name="read-only" value={value} readOnly />
          </li>
          <li className="card">
            <h3 className="user-name">John Doe</h3>
            <p className="comment">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod lacus nec neque commodo lacinia.
            </p>
            <span className="date">9 juin 2023</span>
            <Rating className="rate" name="read-only" value={value} readOnly />
          </li>
          <li className="card">
            <h3 className="user-name">John Doe</h3>
            <p className="comment">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod lacus nec neque commodo lacinia.
            </p>
            <span className="date">9 juin 2023</span>
            <Rating className="rate" name="read-only" value={value} readOnly />
          </li>
          <li className="card">
            <h3 className="user-name">John Doe</h3>
            <p className="comment">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod lacus nec neque commodo lacinia.
            </p>
            <span className="date">9 juin 2023</span>
            <Rating className="rate" name="read-only" value={value} readOnly />
          </li>
          <li className="card">
            <h3 className="user-name">John Doe</h3>
            <p className="comment">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod lacus nec neque commodo lacinia.
            </p>
            <span className="date">9 juin 2023</span>
            <Rating className="rate" name="read-only" value={value} readOnly />
          </li>
          <li className="card">
            <h3 className="user-name">John Doe</h3>
            <p className="comment">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod lacus nec neque commodo lacinia.
            </p>
            <span className="date">9 juin 2023</span>
            <Rating className="rate" name="read-only" value={value} readOnly />
          </li>
          <li className="card">
            <h3 className="user-name">John Doe</h3>
            <p className="comment">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod lacus nec neque commodo lacinia.
            </p>
            <span className="date">9 juin 2023</span>
            <Rating className="rate" name="read-only" value={value} readOnly />
          </li>
        </ul>
        <i id="right" className="fa-solid fa-angle-right" onClick={handleRightClick} />
      </div>
    </div>
  );
}

export default CarouselReview;
