import React from 'react';
import './BookingTool.scss';

function BookingTool() {
  return (
    <div className="BookingTool">
      <h2>Réservation en ligne :</h2>
      {/* Lien du widget à changer par o'resto plutôt que popof qui est fait pour le test */}
      <iframe src="https://popof.resos.com/widget/booking?lang=fr"></iframe>
    </div>
  );
}

export default BookingTool;
