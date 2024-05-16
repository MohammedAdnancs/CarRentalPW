import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './ListingDetails.css';
import IButton from '../Button/Button'

const ListingDetails = () => {
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
              <img src={listing.image1} alt="car image" />
              <img src={listing.image2} alt="car image" />
            </div>
          </div>
          <div className="img-select">
            <div className="img-item">
              <a href="#" onClick={() => handleImageClick(1)}>
                <img src={listing.image1} alt="car image" />
              </a>
            </div>
            <div className="img-item">
              <a href="#" onClick={() => handleImageClick(2)}>
                <img src={listing.image2} alt="car image" />
              </a>
            </div>
          </div>
        </div>
        {/* card right */}
        <div className="Listing-content">
          <h2 className="Listing-title">{listing.carName}</h2>
          <a href="#" className="User-link">User Name</a>
          <div className="Listing-rating">
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <span>5.0</span>
          </div>

          <div className="Listing-info">
            <p className="Listing-price">Price per day: <span>${listing.price}</span></p>
            <p className="Listing-Location">Location: <span>{listing.location}</span></p>
          </div>

          <div className="Listing-detail">
            <h2>About this Car: </h2>
            <p>{listing.description}</p>
            <ul>
              <li>Car Type: <span>{listing.carType}</span></li>
              <li>Number of Doors: <span>{listing.numDoors} Doors</span></li>
              <li>Number of seats: <span>{listing.numSeats} Seats</span></li>
            </ul>
          </div>

          <div className="purchase-info">
          <IButton margintop="1dvh" backgroundColor="#C2C8C8" text="Rent" width="24dvh" height="5dvh" id="Lbutton" type="submit"></IButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingDetails;
