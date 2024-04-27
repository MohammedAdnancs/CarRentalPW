import './App.css';
import Navbar from './Components/Navbar/Navbar';
import Home from './Pages/HomePage';
import Rentcars from './Pages/Rentcars';
import Share from './Pages/Share';
import AboutUs from './Pages/AboutUs';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Footer from './Components/Footer/Footer';
import Login_signup from './Pages/Login_signup';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/Rent' element={<Rentcars />} />
          <Route path='/Share' element={<Share />} />
          <Route path='/AboutUs' element={<AboutUs />} />
          <Route path='/Login_signup' element={<Login_signup />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;