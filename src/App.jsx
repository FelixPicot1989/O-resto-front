import './App.css';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import StickyFooter from './components/StickyFooter/StickyFooter';
import CarouselBgImages from './components/CarouselBgImages/CarouselBgImages';
import CarouselAvis from './components/CarouselReview/CarouselReview';

function App() {
  return (
    <>
      <Navbar />
      {/* Carousel censé être dans la page */}
      <CarouselBgImages />
      <CarouselAvis />
      <Footer />
      <StickyFooter />
    </>
  );
}

export default App;
