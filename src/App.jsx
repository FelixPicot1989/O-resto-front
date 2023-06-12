import './App.css';
import { Route, Routes } from 'react-router-dom';

import HomePage from './HomePage/HomePage';
import ReviewPage from './ReviewPage/ReviewPage';
import ContactPage from './ContactPage/ContactPage';
import MenuCardPage from './MenuCardPage/MenuCardPage';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import StickyFooter from './components/StickyFooter/StickyFooter';

function App() {
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
