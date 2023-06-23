import React, { useRef, useEffect, useState } from 'react';
import './CarouselReview.scss';
import { Rating } from '@mui/material';
import axios from 'axios';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { reviews } from '../Recoil/Recoil';

function CarouselReview() {
  const wrapperRef = useRef(null);
  const carouselRef = useRef(null);
  const firstCardRef = useRef(null);
  const baseUrl = import.meta.env.VITE_BASE_URL;

  // stock la longueur précédente de reviewList

  // useRecoilValue pour obtenir les avis
  const reviewList = useRecoilValue(reviews);
  const setReviews = useSetRecoilState(reviews);

  const [prevLength, setPrevLength] = useState(reviewList.length);
  console.log(prevLength);
  // On recupere tous les avis au chargement de le page
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/reviews`);
        const { data } = response;
        setReviews(data); // met à jour l'état global des avis
      } catch (error) {
        console.log('Erreur API', error);
      }
    };
    fetchReviews();
  }, [setReviews]);

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
  console.log(reviewList.length);

  useEffect(() => {
    // vérifier si un nouvel avis a été ajouté
    if (reviewList.length > prevLength) {
      // si oui, scroll le carrousel vers la gauche
      handleLeftClick();
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
                <li key={el.id} className="card" ref={i === 0 ? firstCardRef : null}>
                  <p className="comment">{el.comment}</p>
                  <span className="date">{formatDate(el.createdAt)}</span>
                  <Rating className="rate" name="read-only" value={el.rating} readOnly precision={0.5} />
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
