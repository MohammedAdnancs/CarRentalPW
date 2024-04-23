import './App.css';
import Navbar from './Components/Navbar/Navbar';
import Home from './Pages/HomePage';
import Rentcars from './Pages/Rentcars';
import Share from './Pages/Share';
import AboutUs from './Pages/AboutUs';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Footer from './Components/Footer/Footer';
import Login from './Pages/Login';
import Signup from './Pages/Signup';

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
          <Route path='/Login' element={<Login />} />
          <Route path='/Signup' element={<Signup/>} />

        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;