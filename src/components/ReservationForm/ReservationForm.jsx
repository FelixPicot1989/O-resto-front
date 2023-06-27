import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import axios from 'axios';
import Calendar from 'react-calendar';

import ToastNotif from '../ToastNotif/ToastNotif';
import { isUserLogged } from '../Recoil/Recoil';

import './ReservationForm.scss';

// Calendar and select to make a reservation
function ReservationForm() {
  // URL of the API imported from the file .env
  const baseUrl = import.meta.env.VITE_BASE_URL;

  // States to manage the fields
  const [date, setDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState('');
  const [numberOfCovers, setNumberOfCovers] = useState(1);

  // States to manage the differents views (if the user is not logged then he can't submit his reservation...)
  const [loading, setLoading] = useState(false);
  const userLogged = useRecoilValue(isUserLogged);

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const horaires = [
    '12:00',
    '12:30',
    '13:00',
    '13:30',
    '14:00',
    '19:00',
    '19:30',
    '20:00',
    '20:30',
    '21:00',
    '21:30',
    '22:00',
  ];

  const personnes = [];

  for (let i = 1; i <= 10; i++) {
    personnes.push(i);
  }

  // The back-end need the date in AA-MM-DD format, this function is here to do that
  const handleDateChange = (selectedDate) => {
    const year = selectedDate.getFullYear().toString().padStart(2, '0');
    const month = (selectedDate.getMonth() + 1).toString().padStart(2, '0');
    const day = selectedDate.getDate().toString().padStart(2, '0');

    // Format the date to AA-MM-DD
    const formattedDate = `${year}-${month}-${day}`;

    // Update the state with the new formated date
    setDate(formattedDate);
  };

  // Transform a string into a number
  const handleNumberOfCovers = (stringToInt) => {
    const numberOfCoversToInt = parseInt(stringToInt, 10);
    setNumberOfCovers(numberOfCoversToInt);
  };

  // API call to send the reservation
  const sendReservation = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${baseUrl}/api/reservations`,
        {
          numberOfCovers,
          date,
          timeSlots: selectedTime,
          createdAt: 'now',
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      // Manage sucess or error
      if (response.status === 201) {
        setSuccess('Réservation confirmée');
      } else {
        setError('Une erreur est survenue lors de la réservation.');
      }
    } catch (err) {
      setError("Une erreur s'est produite");
      console.error(err);
    }

    setLoading(false);
    // Setting to null at the end of the submit
    setTimeout(() => {
      setSuccess(null);
      setError(null);
    }, 7000);
  };

  // Trigger when the user submit the reservation
  const handleReservation = (e) => {
    e.preventDefault();

    // Check if he selected a date, a time and a number of people between 1 and 10
    if (typeof date !== 'string' || selectedTime === '' || numberOfCovers > 10 || numberOfCovers < 1) {
      if (typeof date !== 'string') {
        setError('Pas de date choisie');
      }

      if (selectedTime === '') {
        setError("Pas d'heure choisie");
      }

      if (numberOfCovers > 10 || numberOfCovers < 1) {
        setError('Problème de couverts');
      }
      // if all is okay, then we make the API call
    } else {
      sendReservation();
    }
    setTimeout(() => {
      setError(null);
    }, 7000);
  };

  return (
    <>
      <div className="ReservationForm">
        <h2>Réservation en ligne :</h2>
        <form onSubmit={handleReservation}>
          <Calendar onChange={handleDateChange} value={date} />
          <div className="select-div">
            <select
              onChange={(e) => {
                setSelectedTime(e.target.value);
              }}
              value={selectedTime}
            >
              <option>Sélectionnez une heure</option>
              {horaires.map((el) => (
                <option key={el}>{el}</option>
              ))}
            </select>

            <select
              onChange={(e) => {
                handleNumberOfCovers(e.target.value);
              }}
              value={numberOfCovers}
            >
              <option>Sélectionnez le nombre de personnes</option>
              {personnes.map((el) => (
                <option key={el}>{el}</option>
              ))}
            </select>
          </div>
          {userLogged ? (
            <div className="btn">
              {loading ? (
                <div className="loader" />
              ) : (
                <button type="submit" className="submit">
                  Confirmer ma réservation
                </button>
              )}
            </div>
          ) : (
            <p className="login-message">Pour réserver, merci de vous connecter</p>
          )}
        </form>
      </div>
      <ToastNotif
        success={success}
        toggleToast={() => {
          setSuccess(null);
        }}
      />
      <ToastNotif
        error={error}
        toggleToast={() => {
          setError(null);
        }}
      />
    </>
  );
}

export default ReservationForm;
