import './App.css';
import Navbar from './Components/Navbar/Navbar';
import Home from './Pages/HomePage';
import Admin from './Pages/AdminPage';
import ListingInfo from './Pages/ListingInfo';
import Userprofile from './Pages/Userprofile';
import Chatting from './Pages/Chatting';
import Rentcars from './Pages/Rentcars';
import List from './Pages/List';
import AboutUs from './Pages/AboutUs';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Footer from './Components/Footer/Footer';
import Login_signup from './Pages/Login_signup';
import axios from 'axios';
import { Toaster } from 'react-hot-toast'
import { UserContextProvider } from './Context/userContext';

axios.defaults.baseURL = 'http://localhost:4000'
axios.defaults.withCredentials = true


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <UserContextProvider>
          <Navbar />
          <Toaster position='bottom-right' toastOptions={{ duration: 2000 }} />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/Rent' element={<Rentcars />} />
            <Route path='/List' element={<List />} />
            <Route path='/Admin' element={<Admin />} />
            <Route path='/AboutUs' element={<AboutUs />} />
            <Route path='/Login_signup' element={<Login_signup />} />
            <Route path='/Userprofile' element={<Userprofile />} />
            <Route path='/Chatting' element={<Chatting />} />
            <Route path='/ListingInfo/:_id' element={<ListingInfo />} />
          </Routes>
          <Footer />
        </UserContextProvider>
      </BrowserRouter>
    </div>

  );
}

export default App;