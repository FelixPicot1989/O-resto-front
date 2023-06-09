import './App.css';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import StickyFooter from './components/StickyFooter/StickyFooter';
import CarouselBgImages from './components/CarouselBgImages/CarouselBgImages';
import ReviewPage from './ReviewPage/ReviewPage';

function App() {
  return (
    <>
      <Navbar />
      {/* Carousel censé être dans la page */}
      <CarouselBgImages />
      <ReviewPage />
      <Footer />
      <StickyFooter />
    </>
  );
}

export default App;
