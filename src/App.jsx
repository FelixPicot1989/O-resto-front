import './App.css';
import { Route, Routes } from 'react-router-dom';
import { useEffect, useState, createContext } from 'react';
import axios from 'axios';
import ImageContextProvider from './context/ImageContextProvider';

import HomePage from './HomePage/HomePage';
import ReviewPage from './ReviewPage/ReviewPage';
import ContactPage from './ContactPage/ContactPage';
import MenuCardPage from './MenuCardPage/MenuCardPage';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import StickyFooter from './components/StickyFooter/StickyFooter';

export const imagesBgContext = createContext();

function App() {
  const baseUrl = 'http://felixpicot1989-server.eddi.cloud/projet-o-resto-back/public';
  const token =
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE2ODY3MzI5ODEsImV4cCI6MTY4Njc5Nzc4MSwicm9sZXMiOlsiUk9MRV9BRE1JTiIsIlJPTEVfVVNFUiJdLCJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSJ9.HlE9L1TyDGhVIs4iTTZtYGONX5ZBkZ87_G2QBWeg0A4043UZ14cfdeu4VYhBvkyo6mYwfoiypyVKyCqYbQXHZwiTLxrv-WY-7hNTfSpI4T2g0g5QKTvn85rZbYyeKsbOw7fhXnjUt0OthaUtJtlFnJDsvetBO4EOTng5SXgNaSdMAlg9po4tBK_lE8qOn6WcshsYgtIf2X-5ivdVAYMkP8msI2AEM6AJUemxzlEg4kJAQkVzZiSspVx-nQUGU2eY8C7hXBR9DGdNY5dTHNV2HuJnGSL7fE1VN1FYKOAgIrFR-CNGIWzabrCFi3lQczKdwWhKDdn6jfvLA4PJ6dWNsw';
  const [histoire, setHistoire] = useState('');
  const [imagesBgCarousel, setImagesBgCarousel] = useState([]);
  // Valeur par défaut initialisé pour éviter une erreur de PropTypes
  const [infos, setInfos] = useState({
    phone: '',
    address: '',
    openingLunch: '',
    openingEvening: '',
    info: '',
  });

  useEffect(() => {
    const fetchInfos = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/restaurants/2`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setHistoire(response.data.history);
        setInfos(response.data);
        setImagesBgCarousel(response.data.images);
      } catch (error) {
        console.log('Erreur API', error);
      }
    };
    fetchInfos();
  }, []);

  return (
    <>
      <Navbar />
      <ImageContextProvider imagesBgCarousel={imagesBgCarousel}>
        <Routes>
          <Route path="/" element={<HomePage history={histoire} />} />
          <Route path="/avis" element={<ReviewPage />} />
          <Route path="/reservations-contact" element={<ContactPage />} />
          <Route path="/carte" element={<MenuCardPage />} />
        </Routes>
      </ImageContextProvider>
      <Footer infos={infos} />
      <StickyFooter />
    </>
  );
}

export default App;
