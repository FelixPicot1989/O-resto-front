import './App.css';
import HomePage from './HomePage/HomePage';
// import ReviewPage from './ReviewPage/ReviewPage';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import StickyFooter from './components/StickyFooter/StickyFooter';

function App() {
  return (
    <>
      <Navbar />
      {/* Page changera en fonction de l'URL */}
      {/* PageName : */}
      <HomePage />
      {/* <ReviewPage /> */}
      <Footer />
      <StickyFooter />
    </>
  );
}

export default App;
