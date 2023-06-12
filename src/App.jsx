import './App.css';
import { Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';

import HomePage from './HomePage/HomePage';
import ReviewPage from './ReviewPage/ReviewPage';
import ContactPage from './ContactPage/ContactPage';
import MenuCardPage from './MenuCardPage/MenuCardPage';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import StickyFooter from './components/StickyFooter/StickyFooter';

function App() {
  const baseUrl = 'http://192.168.89.127:8000';

  useEffect(() => {
    const fetchInfos = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/restaurants/2`);
        console.log(response);
      } catch (error) {
        console.log('Erreur API', error);
      }
    };
    fetchInfos();
  }, []);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/avis" element={<ReviewPage />} />
        <Route path="/reservations-contact" element={<ContactPage />} />
        <Route path="/carte" element={<MenuCardPage />} />
      </Routes>
      <Footer />
      <StickyFooter />
    </>
  );
}

export default App;
