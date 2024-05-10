import React, { useEffect, useState } from 'react';
import IButton from '../Button/Button'
import { FaLongArrowAltLeft } from "react-icons/fa";
import { FaLongArrowAltRight } from "react-icons/fa";
import './Listings.css';
import axios from 'axios';

const Listings = () => {
  const [listings, setListings] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const numListingsPerPage = 4;
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    axios.get('/ViewAllListing')
      .then(response => {
        setListings(response.data);
        setLoading(false); // Set loading to false when data is fetched
      })
      .catch(err => {
        console.log(err);
        setLoading(false); // Set loading to false in case of error
      });
  }, []);

  const showNextListings = () => {
    if (currentIndex + numListingsPerPage < listings.length) {
      setCurrentIndex(currentIndex + numListingsPerPage);
    }
  };

  const showPreviousListings = () => {
    if (currentIndex - numListingsPerPage >= 0) {
      setCurrentIndex(currentIndex - numListingsPerPage);
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Show loading indicator while data is being fetched
  }

  return (
    <div className='ListingsContainer'>
      <h1>All listings</h1>
      <div className='ListingsWrapper'>
        {listings.slice(currentIndex, currentIndex + numListingsPerPage).map((listing, index) => (
          <div className='Listing' key={index}>
            <div className="ListingPictures">
              <img className="firstPic" src={listing.image1} alt="Thumbnail 1" />
            </div>
            <div className='ListingName'>
              <h3>{listing.carName}</h3>
            </div>
            <div className='ListingButtons'>
              <IButton margintop="2.5dvh" backgroundColor="#9f0606" text="Delete" width="15dvh" height="5dvh" id="Lbutton"></IButton>
              <IButton margintop="2.5dvh" backgroundColor="#C2C8C8" text="Details" width="15dvh" height="5dvh" id="Lbutton"></IButton>
            </div>
          </div>
        ))}
        <div className="NavigationButtons">
          <button onClick={showPreviousListings} className='NavB'><FaLongArrowAltLeft /></button>
          <button onClick={showNextListings} className='NavB'><FaLongArrowAltRight /></button>
        </div>
      </div>
    </div>
  );
}

export default Listings;
