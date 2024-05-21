import React, { useEffect, useState } from 'react';
import IButton from '../Button/Button'
import { FaLongArrowAltLeft } from "react-icons/fa";
import { FaLongArrowAltRight } from "react-icons/fa";
import '../Listings/Listings.css';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { ViewAllUsers, resetadmin, resetAllusers } from '../../redux/slices/adminslice/adminslice';

const Users = () => {

  const dispatch = useDispatch();
  const { Allusers, isLoding, isError, isSucces, message } = useSelector((state) => state.admin)

  const [users, setUsers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const numUsersPerPage = 4;
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {

    if (isError) {
      console.log(message);
    }
    if (isSucces) {
      dispatch(resetadmin())
      console.log()
    }

  }, [Allusers, isLoding, isError, isSucces, message])

  const fetchData = async () => {
    try {
      dispatch(ViewAllUsers())
      //dispatch(getUserContacts(senderId))
    } catch (error) {
      console.error('Error fetching list info:', error);
    }
  };

  if (!Allusers) {
    fetchData()
  }

  if (isLoding) {
    return <div>Loading...</div>; // Show loading indicator while data is being fetched
  }

  /*
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
*/

  const showNextUsers = () => {
    if (currentIndex + numUsersPerPage < Allusers.length) {
      setCurrentIndex(currentIndex + numUsersPerPage);
    }
  };

  const showPreviousUsers = () => {
    if (currentIndex - numUsersPerPage >= 0) {
      setCurrentIndex(currentIndex - numUsersPerPage);
    }
  };

  return (
    <div className='ListingsContainer'>
      <h1>All Users</h1>
      <div className='ListingsWrapper'>
        {Allusers ? Allusers.slice(currentIndex, currentIndex + numUsersPerPage).map((User, index) => (
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
        )) : ""}
        <div className="NavigationButtons">
          <button onClick={showPreviousUsers} className='NavB'><FaLongArrowAltLeft /></button>
          <button onClick={showNextUsers} className='NavB'><FaLongArrowAltRight /></button>
        </div>
      </div>
    </div>
  );
}

export default Users;
