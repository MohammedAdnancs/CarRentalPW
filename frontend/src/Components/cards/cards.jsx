// Cards.js
import React, { useEffect, useState } from 'react';
import './cards.css';
import axios from 'axios';
import { FaCar } from "react-icons/fa";
import { GiCarDoor, GiCarSeat } from "react-icons/gi";
import { TbAirConditioning } from "react-icons/tb";
import { useNavigate } from 'react-router-dom';
import FilterBar from '../FilterBar/FilterBar';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { ViewAllListing, resetlist } from '../../redux/slices/listslice/listslice';

const Cards = () => {

  const dispatch = useDispatch();
  const { ListInfo, isLoding, isError, isSucces, message } = useSelector((state) => state.list)

  const [listings, setListings] = useState([]);
  const [filters, setFilters] = useState({
    priceRange: '',
    numDoors: '',
    carType: ''
  });

  const navigate = useNavigate();

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
      await dispatch(ViewAllListing())
      //dispatch(getUserContacts(senderId))
    } catch (error) {
      console.error('Error fetching list info:', error);
    }
  };

  if (!ListInfo) {
    fetchData()
  }

  /*
  useEffect(() => {
    axios.get('/ViewAllListing')
      .then(response => setListings(response.data))
      .catch(err => console.log(err));
  }, []);
*/

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

  const cardData = ListInfo ? ListInfo.map(listing => ({
    id: listing._id, // Ensure you have an ID field in your listing
    name: listing.carName,
    thumbnail1: listing.image1,
    thumbnail2: listing.image2,
    type: listing.carType,
    doors: listing.numDoors,
    Dprice: listing.price,
    seats: listing.numSeats,
    priceRange: getPriceRange(listing.price)
  })) : null;

  const filteredCards = cardData ? cardData.filter(card => {
    if (filters.priceRange && card.priceRange !== filters.priceRange) return false;
    if (filters.numDoors && card.doors !== filters.numDoors) return false;
    if (filters.carType && card.type !== filters.carType) return false;
    return true;
  }) : null;

  const handleDetailsClick = (id) => {
    navigate(`/ListingInfo/${id}`);
  };

  return (
    <div className="Acontainer">
      <FilterBar setFilters={setFilters} className="ffc" />

      <div className="Cwrapper">
        {filteredCards && cardData ? filteredCards.map((card, index) => (
          <motion.div
            key={index}
            initial={{ x: 0, y: 100, opacity: 0.2 }}
            animate={{ x: 0, y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <div className="vehicle-card">
              <div className="details">
                <div className="thumb-gallery">
                  <img className="first" src={card.thumbnail1} alt="Thumbnail 1" />
                  <img className="second" src={card.thumbnail2} alt="Thumbnail 2" />
                </div>
                <div className="carName"><h3>-{card.name}-</h3></div>
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
                  <button onClick={() => handleDetailsClick(card.id)} className="btn">
                    Details
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )) : ""}
      </div>
    </div>
  );
};

export default Cards;
