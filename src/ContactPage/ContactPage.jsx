import React from 'react';
import { useRecoilValue } from 'recoil';
import CarouselBgImages from '../components/CarouselBgImages/CarouselBgImages';
// import BookingTool from '../components/BookingTool/BookingTool';
import ContactForm from '../components/ContactForm/ContactForm';
import ReservationForm from '../components/ReservationForm/ReservationForm';
import { isUserLogged } from '../components/Recoil/Recoil';

function ContactPage() {
  const userLogged = useRecoilValue(isUserLogged);

  return (
    <div className="ContactPage">
      <CarouselBgImages title="Réserver/ Contact" />
      {/* <BookingTool /> */}
      {userLogged ? <ReservationForm /> : 'Merci de vous connecter pour pouvoir réserver'}
      {/* <ReservationForm /> */}
      <ContactForm />
    </div>
  );
}

export default ContactPage;
