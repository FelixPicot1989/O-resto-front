import './App.css';
import { Route, Routes } from 'react-router-dom';

import HomePage from './HomePage/HomePage';
import ReviewPage from './ReviewPage/ReviewPage';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import StickyFooter from './components/StickyFooter/StickyFooter';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        {/* Page changera en fonction de l'URL */}
        {/* PageName : */}
        <Route path="/" element={<HomePage />} />
        <Route path="/avis" element={<ReviewPage />} />
      </Routes>
      <Footer />
      <StickyFooter />
    </>
  );
}

export default App;
