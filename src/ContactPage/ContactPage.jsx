import React from 'react';
import CarouselBgImages from '../components/CarouselBgImages/CarouselBgImages';
import BookingTool from '../components/BookingTool/BookingTool';
import ContactForm from '../components/ContactForm/ContactForm';

function ContactPage() {
  return (
    <div className="ContactPage">
      <CarouselBgImages title="Réserver/ Contact" />
      <BookingTool />
      <ContactForm />
    </div>
  );
}

export default ContactPage;
