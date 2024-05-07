import React, { useEffect, useState } from 'react';
import './cards.css';
import axios from 'axios';
import { FaCar } from "react-icons/fa";
import { GiCarDoor } from "react-icons/gi";
import { GiCarSeat } from "react-icons/gi";
import { TbAirConditioning } from "react-icons/tb";
import FilterBar from '../FilterBar/FilterBar';

const Cards = () => {
  
  const [listings, setListings] = useState([])
  useEffect(()=>{
    axios.get('/ViewAllListing')
    .then(listings => setListings(listings.data))
    .catch(err => console.log(err))
  },[])

  const [filters, setFilters] = useState({
    priceRange: '',
    numDoors: '',
    carType: ''
  });
  const getPriceRange = (price) => {
    if (price >= 0 && price <= 29) {
      return '0-29';
    } else if (price >= 30 && price <= 59) {
      return '30-59';
    } else if (price >= 60 && price <= 99) {
      return '60-99';
    } else if (price >= 100 && price <= 149) {
      return '100-149';
    } else if (price >= 150 && price <= 199) {
      return '150-199';
    } else {
      return '200+';
    }
  };
  
  // Update cardData mapping to include price range
  const cardData = listings.map(listing => ({
    name: listing.carName,
    thumbnail1: listing.image1,
    thumbnail2: listing.image2,
    type: listing.carType,
    doors: listing.numDoors,
    Dprice: listing.price,
    seats: listing.numSeats,
    priceRange: getPriceRange(listing.price) // Determine price range
  }));
 
  const filteredCards = cardData.filter(card => {
    if (filters.priceRange && card.priceRange !== filters.priceRange) return false;
    if (filters.numDoors && card.doors !== filters.numDoors) return false; // Compare integer value directly
    if (filters.carType && card.type !== filters.carType) return false;
    return true;
  });


  return (
    <div className="Acontainer">
      <FilterBar setFilters={setFilters} />
      <div className="Cwrapper">
        {filteredCards.map((card, index) => (
          <div className="vehicle-card" key={index}>
            <div className="details">
              <div className="thumb-gallery">
                <img className="first" src={card.thumbnail1} alt="Thumbnail 1" />
                <img className="second" src={card.thumbnail2} alt="Thumbnail 2" />
              </div>
              <div className="carName"><h3 >-{card.name}-</h3></div>
              <div className="info">
                <div className="price">
                  <span>Starting at</span>
                </div>
                <h4>{card.Dprice}$ / Day</h4>
              </div>
              <div className="grid-container">
                <div className="grid-item">
                  <FaCar className="Cicon" />
                  <p>{card.type}</p>
                </div>
                <div className="grid-item">
                  <GiCarDoor className="Cicon" />
                  <p>{card.doors} Doors</p>
                </div>
                <div className="grid-item">
                  <GiCarSeat className="Cicon" />
                  <p>{card.seats} Seats</p>
                </div>
                <div className="grid-item">
                  <TbAirConditioning className="Cicon" />
                  <p>AC / Heater</p>
                </div>
              </div>
              <div className="ctas">
                <a href="#" className="btn primary">
                  Details
                </a>
                <a href="#" className="btn secondary">
                  Book
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );  
};

export default Cards