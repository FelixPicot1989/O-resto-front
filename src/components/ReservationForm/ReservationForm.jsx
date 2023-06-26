import './ReservationForm.scss';
import React, { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import axios from 'axios';
import { userInfo } from '../Recoil/Recoil';
import Calendar from 'react-calendar';
import ToastNotif from '../ToastNotif/ToastNotif';

function ReservationForm() {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const [loading, setLoading] = useState(false);
  const userInfos = useRecoilValue(userInfo);

  const [date, setDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState('');
  const [numberOfCovers, setNumberOfCovers] = useState(1);
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

  const handleDateChange = (selectedDate) => {
    const year = selectedDate.getFullYear().toString().padStart(2, '0');
    const month = (selectedDate.getMonth() + 1).toString().padStart(2, '0');
    const day = selectedDate.getDate().toString().padStart(2, '0');

    // Formater la date au format "AA-MM-DD"
    const formattedDate = `${year}-${month}-${day}`;

    // Mettre à jour l'état avec la date formatée
    setDate(formattedDate);
  };

  const handleNumberOfCovers = (stringToInt) => {
    const numberOfCoversToInt = parseInt(stringToInt, 10);
    setNumberOfCovers(numberOfCoversToInt);
  };

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

      if (response.status === 201) {
        setSuccess('Réservation confirmée');
        console.log(response);
      } else {
        setError('Une erreur est survenue lors de la réservation.');
      }
    } catch (err) {
      setError("Une erreur s'est produite");
      console.error(err);
    }

    setLoading(false);
    // On set à null success et error à la fin du submit
    setTimeout(() => {
      setSuccess(null);
      setError(null);
    }, 7000);
  };

  const handleReservation = (e) => {
    e.preventDefault();

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
          <div className="btn">
            {loading ? (
              <div className="loader" />
            ) : (
              <button type="submit" className="submit">
                Confirmer ma réservation
              </button>
            )}
          </div>
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
