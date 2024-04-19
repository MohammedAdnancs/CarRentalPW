import './App.css';
import Navbar from './Components/Navbar/Navbar';
import Home from './Pages/HomePage';
import Rentcars from './Pages/Rentcars';
import Share from './Pages/Share';
import AboutUs from './Pages/AboutUs';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

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
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
