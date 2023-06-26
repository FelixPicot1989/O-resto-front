import React from 'react';
import './UserReservation.scss';
import PropTypes from 'prop-types';

function UserReservation({ reservations }) {
  if (!reservations) return <div>Chargement...</div>;

  // filtre les réservations passées et à venir
  const now = new Date();
  const upcomingReservations = reservations.filter((el) => new Date(el.date) >= now);
  const pastReservations = reservations.filter((el) => new Date(el.date) < now);

  // tris les réservations par ordre chronologique
  upcomingReservations.sort((a, b) => new Date(a.date) - new Date(b.date));
  pastReservations.sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="UserReservation">
      <h1>Vos reservations :</h1>
      {reservations.length === 0 ? (
        <p>Vous n&apos;avez pas encore de réservations</p>
      ) : (
        <>
          <h2>Réservations à venir :</h2>
          {upcomingReservations.length === 0 ? (
            <p>Vous n&apos;avez pas de réservations à venir</p>
          ) : (
            upcomingReservations.map((el) => (
              <div className="reservations" key={el.id}>
                <p>Date: {new Date(el.date).toLocaleDateString('fr-FR')}</p>
                <p className="times">
                  Créneau horaire:&nbsp;
                  {new Date(el.timeSlots).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                </p>
                <p>Nombre de couverts: {el.numberOfCovers}</p>
              </div>
            ))
          )}
          <h2>Réservations passées :</h2>
          {pastReservations.length === 0 ? (
            <p>Vous n&apos;avez pas de réservations passées</p>
          ) : (
            pastReservations.map((el) => (
              <div className="reservations" key={el.id}>
                <p>Date: {new Date(el.date).toLocaleDateString('fr-FR')}</p>
                <p>
                  Créneau horaire:&nbsp;
                  {new Date(el.timeSlots).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                </p>
                <p>Nombre de couverts: {el.numberOfCovers}</p>
              </div>
            ))
          )}
        </>
      )}
    </div>
  );
}

UserReservation.propTypes = {
  reservations: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        date: PropTypes.string.isRequired,
        numberOfCovers: PropTypes.number.isRequired,
        timeSlots: PropTypes.string.isRequired,
      })
    ),
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      date: PropTypes.string.isRequired,
      numberOfCovers: PropTypes.number.isRequired,
      timeSlots: PropTypes.string.isRequired,
    }),
  ]),
};

UserReservation.defaultProps = {
  reservations: [],
};

export default UserReservation;

// {reservations.length === 0 ? (
//         <p>Vous n&apos;avez pas encore de resevations</p>
