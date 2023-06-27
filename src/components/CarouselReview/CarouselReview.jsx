import React, { useRef, useEffect, useState } from 'react';
import { Rating } from '@mui/material';
import axios from 'axios';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { reviews } from '../Recoil/Recoil';

import './CarouselReview.scss';

function CarouselReview() {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const wrapperRef = useRef(null);
  const carouselRef = useRef(null);
  const firstCardRef = useRef(null);

  // useRecoilValue pour obtenir les avis
  const reviewList = useRecoilValue(reviews);
  const setReviews = useSetRecoilState(reviews);

  // stock la longueur précédente de reviewList
  const [prevLength, setPrevLength] = useState(0);

  // On recupere tous les avis au chargement de le page
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/reviews`);
        const { data } = response;
        // met à jour l'état global des avis
        setReviews(data);
      } catch (error) {
        console.log('Erreur API', error);
      }
    };
    fetchReviews();
  }, []);

  const formatDate = (dateToFormat) => {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const date = new Date(dateToFormat);
    return date.toLocaleDateString('fr-FR', options);
  };

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

  // fonction pour revenir au dernier avis posté
  const scrollToFirst = () => {
    carouselRef.current.scrollLeft = 0;
  };

  useEffect(() => {
    // vérifier si un nouvel avis a été ajouté
    if (prevLength !== 0 && reviewList.length > prevLength) {
      // si oui, scroll le carrousel jusqu'au premier avis
      scrollToFirst();
    }
    // met à jour setPrevLength
    setPrevLength(reviewList.length);
  }, [reviewList, prevLength]);

  return (
    <div className="CarouselReview">
      <h2 className="title">Avis</h2>
      <div className="wrapper" ref={wrapperRef}>
        <i id="left" className="fa-solid fa-angle-left" onClick={handleLeftClick} />
        <ul className="carousel" ref={carouselRef}>
          {[...reviewList]
            .sort((a, b) => b.id - a.id)
            .map((el, i) => {
              return (
                // i est l'index de chaque entrée du tableau reviewList, vu qu'on est dans un map on fait une condition pour definir la ref firstCardRef (premiere card)
                <li key={el.id} className="card" ref={i === 0 ? firstCardRef : null}>
                  <p className="comment">{el.comment}</p>
                  <span className="date">{formatDate(el.createdAt)}</span>
                  <Rating className="rate" name="read-only" value={el.rating} readOnly precision={0.5} />
                  {/* Condition car on a des avis qui sont sans user... */}
                  <h3 className="user-name">{el.user && `${el.user.firstname} ${el.user.lastname}`}</h3>
                </li>
              );
            })}
        </ul>
        <i id="right" className="fa-solid fa-angle-right" onClick={handleRightClick} />
      </div>
    </div>
  );
}
export default CarouselReview;
