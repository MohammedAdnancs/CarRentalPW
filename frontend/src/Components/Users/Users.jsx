import React, { useEffect, useState } from 'react';
import IButton from '../Button/Button'
import { FaLongArrowAltLeft } from "react-icons/fa";
import { FaLongArrowAltRight } from "react-icons/fa";
import '../Listings/Listings.css';
import axios from 'axios';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const numUsersPerPage = 4;
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    axios.get('/ViewAllUsers')
      .then(response => {
        setUsers(response.data);
        setLoading(false); // Set loading to false when data is fetched
      })
      .catch(err => {
        console.log(err);
        setLoading(false); // Set loading to false in case of error
      });
  }, []);

  const showNextUsers = () => {
    if (currentIndex + numUsersPerPage < users.length) {
      setCurrentIndex(currentIndex + numUsersPerPage);
    }
  };

  const showPreviousUsers = () => {
    if (currentIndex - numUsersPerPage >= 0) {
      setCurrentIndex(currentIndex - numUsersPerPage);
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Show loading indicator while data is being fetched
  }

  return (
    <div className='ListingsContainer'>
      <h1>All Users</h1>
      <div className='ListingsWrapper'>
        {users.slice(currentIndex, currentIndex + numUsersPerPage).map((User, index) => (
          <div className='Listing' key={index}>
            <div className="ListingPictures">
              <img className="firstPic" src={User.image} alt="Thumbnail 1" />
            </div>
            <div className='ListingName'>
              <h3>{User.username}</h3>
            </div>
            <div className='ListingButtons'>
              <IButton margintop="2.5dvh" backgroundColor="#9f0606" text="Delete" width="15dvh" height="5dvh" id="Lbutton"></IButton>
              <IButton margintop="2.5dvh" backgroundColor="#C2C8C8" text="Details" width="15dvh" height="5dvh" id="Lbutton"></IButton>
            </div>
          </div>
        ))}
        <div className="NavigationButtons">
          <button onClick={showPreviousUsers} className='NavB'><FaLongArrowAltLeft /></button>
          <button onClick={showNextUsers} className='NavB'><FaLongArrowAltRight /></button>
        </div>
      </div>
    </div>
  );
}

export default Users;
