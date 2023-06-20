import './App.css';
import { Route, Routes } from 'react-router-dom';
import { useEffect, useState, createContext } from 'react';
import { useSetRecoilState } from 'recoil';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { isUserLogged } from './components/Recoil/Recoil';
import ImageContextProvider from './context/ImageContextProvider';

import HomePage from './HomePage/HomePage';
import ReviewPage from './ReviewPage/ReviewPage';
import ContactPage from './ContactPage/ContactPage';
import MenuCardPage from './MenuCardPage/MenuCardPage';
import LegalPage from './LegalPage/LegalPage';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import StickyFooter from './components/StickyFooter/StickyFooter';

export const imagesBgContext = createContext();

function App() {
  const baseUrl = 'http://felixpicot1989-server.eddi.cloud/projet-o-resto-back/public';

  const setUserLogged = useSetRecoilState(isUserLogged);

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
        const response = await axios.get(`${baseUrl}/api/restaurants/2`);
        setHistoire(response.data.history);
        setInfos(response.data);
        setImagesBgCarousel(response.data.images);
      } catch (error) {
        console.log('Erreur API', error);
      }
    };
    fetchInfos();

    if (localStorage.getItem('token')) {
      const token = localStorage.getItem('token');
      const decodedToken = jwt_decode(token);
      console.log(decodedToken);

      if (decodedToken.exp * 1000 > Date.now()) {
        setUserLogged(true);
      } else {
        setUserLogged(false);
      }
    }
  }, []);

  return (
    <>
      <Navbar />
      <ImageContextProvider imagesBgCarousel={imagesBgCarousel}>
        <Routes>
          <Route path="/" element={<HomePage history={histoire} />} />
          <Route path="/avis" element={<ReviewPage />} />
          <Route path="/reservations-contact" element={<ContactPage />} />
          <Route path="/carte/:category?" element={<MenuCardPage />} />
          <Route path="/mentions-legales" element={<LegalPage type="mentions" />} />
          <Route path="/confidentialite" element={<LegalPage type="politique" />} />
        </Routes>
      </ImageContextProvider>
      <Footer infos={infos} />
      <StickyFooter infos={infos} />
    </>
  );
}

export default App;
