import React, { useEffect, useState } from 'react';
import IButton from '../Button/Button'
import { FaLongArrowAltLeft } from "react-icons/fa";
import { FaLongArrowAltRight } from "react-icons/fa";
import './Listings.css';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { ViewAllListing, resetlist, DeleteListing } from '../../redux/slices/listslice/listslice';

const Listings = () => {

  const dispatch = useDispatch();
  const { ListInfo, isLoding, isError, isSucces, message } = useSelector((state) => state.list)

  const [listings, setListings] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const numListingsPerPage = 4;
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {

    if (isError) {
      console.log(message);
    }
    if (isSucces) {
      dispatch(resetlist())
      console.log()
    }

  }, [ListInfo, isLoding, isError, isSucces, message])

  const fetchData = async () => {
    try {
      dispatch(ViewAllListing())
      //dispatch(getUserContacts(senderId))
    } catch (error) {
      console.error('Error fetching list info:', error);
    }
  };

  if (!ListInfo) {
    fetchData()
  }

  const showNextListings = () => {
    if (currentIndex + numListingsPerPage < ListInfo.length) {
      setCurrentIndex(currentIndex + numListingsPerPage);
    }
  };

  const showPreviousListings = () => {
    if (currentIndex - numListingsPerPage >= 0) {
      setCurrentIndex(currentIndex - numListingsPerPage);
    }
  };

  if (isLoding) {
    return <div>Loading...</div>;
  }

  const Delete = async (_id) => {
    console.log(_id)
    try {
      dispatch(DeleteListing(_id))
    } catch (error) {
      console.error('Delete failed medo is a loser :(', error);
    }
  }

  return (
    <div className='ListingsContainer'>
      <h1>All listings</h1>
      <div className='ListingsWrapper'>
        {ListInfo ? ListInfo.slice(currentIndex, currentIndex + numListingsPerPage).map((listing, index) => (
          <div className='Listing' key={index}>
            <div className="ListingPictures">
              <img className="firstPic" src={listing.image1} alt="Thumbnail 1" />
            </div>
            <div className='ListingName'>
              <h3>{listing.carName}</h3>
            </div>
            <div className='ListingButtons'>
              <IButton margintop="2.5dvh" backgroundColor="#9f0606" text="Delete" width="15dvh" height="5dvh" id="Lbutton" onClick={() => Delete(listing._id)}></IButton>
              <IButton margintop="2.5dvh" backgroundColor="#C2C8C8" text="Details" width="15dvh" height="5dvh" id="Lbutton"></IButton>
            </div>
          </div>
        )) : ""}
        <div className="NavigationButtons">
          <button onClick={showPreviousListings} className='NavB'><FaLongArrowAltLeft /></button>
          <button onClick={showNextListings} className='NavB'><FaLongArrowAltRight /></button>
        </div>
      </div>
    </div>
  );
}

export default Listings;
