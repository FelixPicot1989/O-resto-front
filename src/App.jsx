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
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE2ODY4MTg5NDQsImV4cCI6MTY4Njg4Mzc0NCwicm9sZXMiOlsiUk9MRV9BRE1JTiIsIlJPTEVfVVNFUiJdLCJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSJ9.oRCbsBBG_9s1xlEbf_qlqaZao02AX-uVLsOa25iv8DQYZ_Jwdh7zJWB4cJ9Akker68i5jWmjAaUQIEWPWLuKQWpdIOl1z_gQO5XNi-Btx67yCTj1ikQtTW26CC_MjGZmtDkTkR-N9xMHWLxgsEE5Pq9ONhksGlqb3a-5x0P_p5VxSgQ0YigP14ewmhxBgC9Sfc1ZfZTdlrPDmqKJIv9NKEAlp_nMSrujrvFKOM3wTleVLf2XY8UESU_h7NTeS7OaNba6O2NvimwMr64-L4Rh7g64CR6j9KCRK5BRIpIrkZ6sNWiG6T2V56dDbWrbEzCPRCKxBDvDDNiiwG5mnyN7zA';
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
        </Routes>
      </ImageContextProvider>
      <Footer infos={infos} />
      <StickyFooter infos={infos} />
    </>
  );
}

export default App;
