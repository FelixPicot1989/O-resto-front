import './App.css';
import { Route, Routes } from 'react-router-dom';
import { useEffect, useState, createContext } from 'react';
import { useSetRecoilState } from 'recoil';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { isUserLogged, userInfo } from './components/Recoil/Recoil';
import ImageContextProvider from './context/ImageContextProvider';

import HomePage from './HomePage/HomePage';
import ReviewPage from './ReviewPage/ReviewPage';
import ContactPage from './ContactPage/ContactPage';
import MenuCardPage from './MenuCardPage/MenuCardPage';
import LegalPage from './LegalPage/LegalPage';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import StickyFooter from './components/StickyFooter/StickyFooter';
import ProfilePage from './ProfilePage/ProfilePage';

export const imagesBgContext = createContext();

function App() {
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const setUserLogged = useSetRecoilState(isUserLogged);
  const setUserInfo = useSetRecoilState(userInfo);

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

  const fetchUserInfo = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/users/me`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const { data } = response;
      console.log(data.reservations);
      setUserInfo({
        id: data.id,
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email,
        roles: data.roles,
        reservations: data.reservations,
      });
    } catch (error) {
      console.log('Erreur API', error);
    }
  };

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
      if (decodedToken.exp * 1000 > Date.now()) {
        setUserLogged(true);
        fetchUserInfo();
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
          <Route path="/profil" element={<ProfilePage />} />
        </Routes>
      </ImageContextProvider>
      <Footer infos={infos} />
      <StickyFooter infos={infos} />
    </>
  );
}

export default App;
