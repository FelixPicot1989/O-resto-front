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
  const baseUrl = 'http://felix-picot.vpnuser.lan:8000';
  const token =
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE2ODY2Njc4NzQsImV4cCI6MTY4NjczMjY3NCwicm9sZXMiOlsiUk9MRV9BRE1JTiIsIlJPTEVfVVNFUiJdLCJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSJ9.fCqDZQ5VuGSx7Wx0UNL4VzfdJumI8lbjqLknqZxsHDsqveq--BW95MhEWdth5wgG23hceNXUYrbWaF_-bAUIcReMxw3OxkivTRitXPW0uYEOdYVQHDrZPpFLmqilkNSzJssQ8EhiC7SMlhv5w1rpiwuLfvjI4wiwo3PDClqQqNDxS5Jd-QECfLA11g4W7aOc8sHUI7_SLx6vTU80riivh2NgCR24I1qsLlNZlqWn98Cv-wvIxMd8mZIwr8MdWPkHylE_fb2YkJK_oTs4ExIKmaZX2faqg08mEnCcZt45XU9ja81nFTOiWwvUqP0MgaAtFct4cubH8dATDBA7ZYTjlA';
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
