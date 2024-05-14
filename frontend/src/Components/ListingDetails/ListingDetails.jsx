import React, { useState, useEffect } from 'react';
import './ListingDetails.css';
import p1 from "../Assets/p3.jpg"
import p2 from "../Assets/p4.jpg"

const ListingDetails = () => {
  const [imgId, setImgId] = useState(1);

  useEffect(() => {
    const slideImage = () => {
      const displayWidth = document.querySelector('.img-showcase img:first-child').clientWidth;
      document.querySelector('.img-showcase').style.transform = `translateX(${- (imgId - 1) * displayWidth}px)`;
    };

    slideImage();
    window.addEventListener('resize', slideImage);

    return () => window.removeEventListener('resize', slideImage);
  }, [imgId]);

  const handleImageClick = (id, event) => {
    event.preventDefault();
    setImgId(id);
  };

  return (
    <div className="Details-wrapper">
      <div className="Details-Container">
        {/* card left */}
        <div className="Car-imgs">
          <div className="img-display">
            <div className="img-showcase">
              <img src={p1} alt="car image" />
              <img src={p2} alt="car image" />
            </div>
          </div>
          <div className="img-select">
            <div className="img-item">
              <a href="#" data-id="1" onClick={(e) => handleImageClick(1, e)}>
                <img src={p1} alt="car image" />
              </a>
            </div>
            <div className="img-item">
              <a href="#" data-id="2" onClick={(e) => handleImageClick(2, e)}>
                <img src={p2} alt="car image" />
              </a>
            </div>
          </div>
        </div>
        {/* card right */}
        <div className="Listing-content">
          <h2 className="Listing-title">CarName</h2>
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
            <p className="Listing-price">Price per day: <span>$257.00</span></p>
            <p className="Listing-Location">Location: <span>Ghamra/ Cairo</span></p>
          </div>

          <div className="Listing-detail">
            <h2>About this Car: </h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo eveniet veniam tempora fuga tenetur placeat sapiente architecto illum soluta consequuntur, aspernatur quidem at sequi ipsa!</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur, perferendis eius. Dignissimos, labore suscipit. Unde.</p>
            <ul>
              <li>Car Type: <span>SUV</span></li>
              <li>Number of Doors: <span>4 Doors</span></li>
              <li>Number of seats: <span>5 Seats</span></li>
            </ul>
          </div>

          <div className="purchase-info">
            <button type="button" className="btn">Rent Car</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListingDetails;
