import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './ListingDetails.css';
import IButton from '../Button/Button'
import { useDispatch, useSelector } from 'react-redux';

const ListingDetails = () => {

  const { userInfo, isLodinglogin, isErrorlogin, isSucceslogin, messagelogin } = useSelector((state) => state.auth)
  const { _id } = useParams();
  const [listing, setListing] = useState(null);
  const [imgId, setImgId] = useState(1);

  useEffect(() => {
    axios.get(`/ViewListing/${_id}`)
      .then(response => setListing(response.data))
      .catch(err => console.log(err));
  }, [_id]);

  if (!listing) {
    return <div>Loading...</div>;
  }

  const handleImageClick = (id) => {
    setImgId(id);
  };

  return (
    <div className="Details-wrapper">
      <div className="Details-Container">
        {/* card left */}
        <div className="Car-imgs">
          <div className="img-display">
            <div className="img-showcase" style={{ transform: `translateX(${- (imgId - 1) * 100}%)` }}>
              <img src={listing.listing.image1} alt="car image" />
              <img src={listing.listing.image2} alt="car image" />
            </div>
          </div>
          <div className="img-select">
            <div className="img-item">
              <a href="#" onClick={() => handleImageClick(1)}>
                <img src={listing.listing.image1} alt="car image" />
              </a>
            </div>
            <div className="img-item">
              <a href="#" onClick={() => handleImageClick(2)}>
                <img src={listing.listing.image2} alt="car image" />
              </a>
            </div>
          </div>
        </div>
        {/* card right */}
        <div className='ListingRight'>
        <div className='TopPart'>
          <div className='ListerInfo'>
            <h4>LISTER:</h4>
            <img src={listing.Lister.image}></img>
            <p>{listing.Lister.username}</p>
       
          <div className="Listing-rating">
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <span>5.0</span>
          </div>
          </div>
          </div>
        <div className="Listing-content">
          <div className="Listing-info">
          <h2 className="Listing-title">{listing.listing.carName}</h2>
            <p className="Listing-price">Price per day: <span>${listing.listing.price}</span></p>
            <p className="Listing-Location">Location: <span>{listing.listing.location}</span></p>
          </div>

          <div className="Listing-detail">
            <h2>About this Car: </h2>
            <p>{listing.listing.description}</p>
            <ul>
              <li>Car Type: <span>{listing.carType}</span></li>
              <li>Number of Doors: <span>{listing.listing.numDoors} Doors</span></li>
              <li>Number of seats: <span>{listing.listing.numSeats} Seats</span></li>
            </ul>
          </div>

          <div className="purchase-info">
            <IButton margintop="1dvh" backgroundColor="#C2C8C8" text="Rent" width="24dvh" height="5dvh" id="Lbutton" type="submit"></IButton>
          </div>
        </div>
          </div>
      </div>
    </div>
  );
};

export default ListingDetails;