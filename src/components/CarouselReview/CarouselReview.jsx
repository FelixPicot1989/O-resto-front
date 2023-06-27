// Imports React hooks, useRef, useEffect and useState
// useRef to create references to DOM elements
// useEffect triggers effects in certain cases.
// useState declares a state in components
import React, { useRef, useEffect, useState } from 'react';

// Imports "Rating" components from @mui/material, a library of user interface components.
import { Rating } from '@mui/material';

// Imports the Recoil library's useRecoilState hook for global state management.
// useRecoilState is a custom hook that returns an array of two elements.
// The first element is the value of the Recoil state (atom or selector) and
// the second is a function to update this state.
// This allows you to subscribe to changes in a state and update it in the same hook call.
import { useRecoilState } from 'recoil';

// Imports the axios library for HTTP requests
import axios from 'axios';

// Imports the Recoil reviews atom, which represents the status of notices on the application
import { reviews } from '../Recoil/Recoil';

// Import style
import './CarouselReview.scss';

function CarouselReview() {
  // baseUrl retrieved from environment variables
  const baseUrl = import.meta.env.VITE_BASE_URL;

  // Use the useRef hook to create references to specific DOM elements
  const wrapperRef = useRef(null);
  const carouselRef = useRef(null);
  const firstCardRef = useRef(null);

  // Use the useRecoilState hook to subscribe to the global status of notices and retrieve a function to update this status
  const [reviewList, setReviews] = useRecoilState(reviews);

  // Creates a report to store the previous length of reviewList
  const [prevLength, setPrevLength] = useState(0);

  // Use the useEffect hook to perform an action (retrieve notices) when assembling the component
  useEffect(() => {
    // Defines an asynchronous function for retrieving notices
    const fetchReviews = async () => {
      try {
        // Use axios to send a GET request to the API
        const response = await axios.get(`${baseUrl}/api/reviews`);
        // Recovers response data by destructuring
        const { data } = response;
        // Updates the global status of notices with recovered data
        setReviews(data);
      } catch (error) {
        // In the event of an error when calling the API, log the error
        console.log('Erreur API', error);
      }
    };
    // Calls the fetchReviews function
    fetchReviews();
  }, []);

  // Function for formatting a date in French format
  const formatDate = (dateToFormat) => {
    const date = new Date(dateToFormat);
    // "toLocaleTimeString" is an options object that defines formatting details.
    return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  // "toLocaleTimeString" is an options object that defines formatting details.
  const handleLeftClick = () => {
    // Scrolls the carousel to the left
    // "offsetWidth" is used here to determine the distance to scroll when the user clicks on the left button.
    carouselRef.current.scrollLeft -= firstCardRef.current.offsetWidth;
    // If we reach the beginning of the carousel, we return to the end to create a loop
    // If "carouselRef.current.scrollLeft" is equal to 0, we have reached the beginning of the carousel,)
    if (carouselRef.current.scrollLeft === 0) {
      // If we reach the beginning of the carousel, i.e. if "carouselRef.current.scrollLeft" is equal to 0,
      // then "scrollLeft" is reset to the value of "scrollWidth", which is the total width of the content inside the element,
      // including content outside the visible scroll zone. This gives the impression of an infinite loop.
      carouselRef.current.scrollLeft = carouselRef.current.scrollWidth;
    }
  };

  // Function to manage the right button click, scrolls the carousel to the right
  const handleRightClick = () => {
    // "offsetWidth" is used here to determine the distance to be scrolled when the user clicks on the right-hand button.
    // This is the total width of the element referenced by "firstCardRef", including content outside the visible scrolling area.
    carouselRef.current.scrollLeft += firstCardRef.current.offsetWidth;
    // If we reach the end of the carousel, i.e. if "carouselRef.current.scrollLeft" is greater than or equal to
    // the total width of the content inside the element, given by "carouselRef.current.scrollWidth
    // minus the width of the first card "firstCardRef.current.offsetWidth", we return to the beginning to create a loop.
    if (carouselRef.current.scrollLeft >= carouselRef.current.scrollWidth - carouselRef.current.offsetWidth) {
      // By resetting "scrollLeft" to 0, scrolling returns to the beginning of the carousel, creating the impression of infinite scrolling.
      carouselRef.current.scrollLeft = 0;
    }
  };

  // Function to scroll the carousel to the first notice
  const scrollToFirst = () => {
    carouselRef.current.scrollLeft = 0;
  };

  // Use the useEffect hook to check whether a new notice has been added
  useEffect(() => {
    // If the length of the notification list is greater than the previous length, a new notification has been added.
    if (prevLength !== 0 && reviewList.length > prevLength) {
      // If so, scroll the carousel to the first notice
      scrollToFirst();
    }
    // Updates prevLength with the new length of the notification list
    setPrevLength(reviewList.length);
    // triggers the effect whenever reviewList or prevLength changes
  }, [reviewList, prevLength]);

  return (
    <div className="CarouselReview">
      <h2 className="title">Avis</h2>
      {/* It uses the wrapperRef reference to access the DOM element directly. */}
      <div className="wrapper" ref={wrapperRef}>
        {/* Left arrow icon for navigating the carousel, triggers the handleLeftClick function when clicked. */}
        <i id="left" className="fa-solid fa-angle-left" onClick={handleLeftClick} />
        {/* La liste ul est le conteneur du carrousel où chaque li est une carte du carrousel. 
            Elle utilise la référence carouselRef pour accéder à l'élément DOM directement. */}
        <ul className="carousel" ref={carouselRef}>
          {/* For each element in reviewList, we create a new list of elements. 
              We first sort the array in descending order of "id", then map onto the new sorted reviewList array. 
              The first card is associated with the reference firstCardRef, which is essential for the handelRight/LeftClick functions to work correctly. */}
          {[...reviewList]
            .sort((a, b) => b.id - a.id)
            .map((el, i) => {
              return (
                <li key={el.id} className="card" ref={i === 0 ? firstCardRef : null}>
                  <p className="comment">{el.comment}</p>
                  <span className="date">{formatDate(el.createdAt)}</span>
                  <Rating className="rate" name="read-only" value={el.rating} readOnly precision={0.5} />
                  {/* Displays user name if user exists */}
                  <h3 className="user-name">{el.user && `${el.user.firstname} ${el.user.lastname}`}</h3>
                </li>
              );
            })}
        </ul>
        {/* Right arrow icon for navigating the carousel, triggers the handleRightClick function when clicked. */}
        <i id="right" className="fa-solid fa-angle-right" onClick={handleRightClick} />
      </div>
    </div>
  );
}

export default CarouselReview;
