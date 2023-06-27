import React from 'react';

import CarouselBgImages from '../components/CarouselBgImages/CarouselBgImages';
import ContactForm from '../components/ContactForm/ContactForm';
import ReservationForm from '../components/ReservationForm/ReservationForm';

function ContactPage() {
  return (
    <div className="ContactPage">
      <CarouselBgImages title="Réserver/ Contact" />
      <ReservationForm />
      <ContactForm />
    </div>
  );
}

export default ContactPage;
