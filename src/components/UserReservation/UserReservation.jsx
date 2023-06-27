// Imports React, PropTypes for checking props types.
import React from 'react';
import PropTypes from 'prop-types';
// Import style
import './UserReservation.scss';

// UserReservation accepts an array of "reservations" objects as props
function UserReservation({ reservations }) {
  const now = new Date(); // Gets current date and time

  // Filter upcoming and past reservations by comparing the date of each reservation with the current date
  const upcomingReservations = reservations.filter((el) => new Date(el.date) >= now);
  const pastReservations = reservations.filter((el) => new Date(el.date) < now);

  // Sort upcoming and past reservations in chronological order
  upcomingReservations.sort((a, b) => new Date(a.date) - new Date(b.date));
  pastReservations.sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="UserReservation">
      <h1>Vos reservations :</h1>
      {/* Checks whether the reservations table is empty.
      If so, displays a message indicating that there are no reservations yet. */}
      {reservations.length === 0 ? (
        <p>Vous n&apos;avez pas encore de réservations</p>
      ) : (
        <>
          {/* Checks whether the reservations table is empty.
      If so, displays a message indicating that there are no reservations yet. */}
          <h2>Réservations à venir :</h2>
          {/* Checks whether the upcoming reservations table is empty. 
           If so, displays a message indicating that there are no upcoming reservations. */}
          {upcomingReservations.length === 0 ? (
            <p>Vous n&apos;avez pas de réservations à venir</p>
          ) : (
            // If this is not the case, then there are reservations to come and we display them.
            upcomingReservations.map((el) => (
              <div className="reservations" key={el.id}>
                {/* "toLocaleTimeString" is an options object that defines the formatting details. */}
                <p>Date: {new Date(el.date).toLocaleDateString('fr-FR')}</p>
                <p className="times">
                  Créneau horaire:&nbsp;
                  {/* "{ hour: '2-digit', minute: '2-digit' }" indicates that hours and minutes must be represented by two digits. */}
                  {new Date(el.timeSlots).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                </p>
                <p>Nombre de couverts: {el.numberOfCovers}</p>
              </div>
            ))
          )}
          <h2>Réservations passées :</h2>
          {/* Checks whether the table of past reservations is empty.
            If it is, displays a message indicating that there are no past reservations. */}
          {pastReservations.length === 0 ? (
            <p>Vous n&apos;avez pas de réservations passées</p>
          ) : (
            // If this is not the case, then there are past reservations and they are displayed.
            pastReservations.map((el) => (
              <div className="reservations" key={el.id}>
                {/* "toLocaleTimeString" is an options object that defines the formatting details. */}
                <p>Date: {new Date(el.date).toLocaleDateString('fr-FR')}</p>
                <p>
                  Créneau horaire:&nbsp;
                  {/* "{ hour: '2-digit', minute: '2-digit' }" indicates that hours and minutes must be represented by two digits. */}
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

// Defines props types for the UserReservation component
UserReservation.propTypes = {
  reservations: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      date: PropTypes.string.isRequired,
      numberOfCovers: PropTypes.number.isRequired,
      timeSlots: PropTypes.string.isRequired,
    })
  ),
};

// Set the default props for the UserReservation component
UserReservation.defaultProps = {
  // Set the default props for the UserReservation component
  reservations: [],
};

export default UserReservation;
