import React, { useState } from 'react';
import './cards.css';
import { FaCar } from "react-icons/fa";
import { GiCarDoor } from "react-icons/gi";
import { GiCarSeat } from "react-icons/gi";
import { TbAirConditioning } from "react-icons/tb";
import FilterBar from '../FilterBar/FilterBar';
import Mustang1 from '../Assets/mustang1.png';
import Mustang2 from '../Assets/mustang2.png';
import car from '../Assets/car-solid.png';
import fan from '../Assets/fan.png';
import user from '../Assets/user.png';
import door from '../Assets/door.png';
import t1 from '../Assets/t1.jpg';
import t2 from '../Assets/t2.jpg';
import mg1 from '../Assets/mg.png';
import mg2 from '../Assets/mg1.png';

const Cards = () => {
  const [filters, setFilters] = useState({
    priceRange: '',
    numDoors: '',
    carType: ''
  });

  const cardData = [
    {
      name: "BMW",
      thumbnail1: t1,
      thumbnail2: t2,
      type: "Sedan",
      doors: "4 Doors",
      Dprice: "$50 / Day",
      seats: "5 seats",
      priceRange: "30-59"
    },
    {
      name: "Mustang",
      thumbnail1: Mustang1,
      thumbnail2: Mustang2,
      type: "Sport",
      doors: "2 Doors",
      Dprice: "$120 / Day",
      seats: "2 seats",
      priceRange: "100-149"
    },
    {
      name: "MG RX5",
      thumbnail1: mg1,
      thumbnail2: mg2,
      type: "SUV",
      doors: "4 Doors",
      Dprice: "$70 / Day",
      seats: "5 seats",
      priceRange: "60-99"
    },
  ];

  const filteredCards = cardData.filter(card => {
    if (filters.priceRange && card.priceRange !== filters.priceRange) return false;
    if (filters.numDoors && card.doors !== `${filters.numDoors} Doors`) return false;
    if (filters.carType && card.type !== filters.carType) return false;
    return true;
  });


  return (
    <div class="Acontainer">
      <FilterBar setFilters={setFilters} />
      <div class="Cwrapper">
      {filteredCards.map((card, index) => (
          <div className="vehicle-card" key={index}>
            {
              <div class="details">
              <div class="thumb-gallery">
                <img class="first" src={card.thumbnail1} />
                <img class="second" src={card.thumbnail2} />
              </div>
              <h3 class="carName">-{card.name}-</h3>
              <div class="info">
                <div class="price">
                  <span>Starting at</span>
                </div>
                <h4>{card.Dprice}</h4>
              </div>
              <div class="grid-container">
                <div class="grid-item">
                  <FaCar class="Cicon" />
                  <p>{card.type}</p>
                </div>
                <div class="grid-item">
                <GiCarDoor  class="Cicon" />
                  <p>{card.doors}</p>
                </div>
                <div class="grid-item">
                  <GiCarSeat class="Cicon" />
                  <p>{card.seats}</p>
                </div>
                <div class="grid-item">
                  <TbAirConditioning class="Cicon" />
                  <p>AC / Heater</p>
                </div>
              </div>
              <div class="ctas">
                <a href="#" class="btn primary">
                  Details
                </a>
                <a href="#" class="btn secondary">
                  Book
                </a>
              </div>
            </div>
            }
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cards