import React, { useState } from 'react';
import './ListArea.css';
import IButton from '../Button/Button'
import { FaFileUpload } from "react-icons/fa";

const ListArea = () => {
  const [carDetails, setCarDetails] = useState({
    carName: '',
    carType: '',
    numDoors: '',
    numSeats: '',
    price: '',
    location: '',
    description: '',
    carImage1: null,
    carImage2: null
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setCarDetails(prevState => ({
        ...prevState,
        [name]: URL.createObjectURL(files[0])
      }));
    } else {
      setCarDetails(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  return (
    <div className="AreaContainer">
      <form className="parent">
        <div className="div1">
          <h1>List Your Car</h1>
        </div>
        
        <div className="div2">
        <button type='button' className='Ubtn' > 
          <FaFileUpload /> Choose Image
          <input
            className='Lfile'
            type="file"
            accept="image/*"
            onChange={handleChange}
            name="carImage1"
          />
        </button>
          {carDetails.carImage1 && (
            <img
              src={carDetails.carImage1}
              alt="Car"
            />
          )}
        </div>
        <div className="div3">
          <button type='button' className='Ubtn'> 
            <FaFileUpload /> Choose Image
            <input
              className='Lfile'
              type="file"
              accept="image/*"
              onChange={handleChange}
              name="carImage2"
            />
          </button>
          
          {carDetails.carImage2 && (
            <img
              src={carDetails.carImage2}
              alt="Car"
            />
          )}
        </div>
        <div className="div4">
          <input
            type="text"
            className="Linput"
            placeholder="Car Name"
            value={carDetails.carName}
            onChange={handleChange}
            name="carName"
          />
        </div>
        <div className="div5">
          <select
            value={carDetails.carType}
            onChange={handleChange}
            name="carType"
          >
            <option value="">Select Car Type</option>
            <option value="SUV">SUV</option>
            <option value="Sedan">Sedan</option>
            <option value="Sport">Sport</option>
          </select>
        </div>
        <div className="divP">
          <input
            className="Linput"
            type="number"
            min={0}
            placeholder="Price"
            value={carDetails.price}
            onChange={handleChange}
            name="price"
          />
        </div>
        <div className="div6">
          <input
            className="Linput"
            type="number"
            min={0}
            placeholder="Number of Doors"
            value={carDetails.numDoors}
            onChange={handleChange}
            name="numDoors"
          />
        </div>
        <div className="div7">
          <input
            className="Linput"
            type="number"
            placeholder="Number of Seats"
            value={carDetails.numSeats}
            onChange={handleChange}
            name="numSeats"
          />
        </div>
        <div className="div8">
          <input
            className="Linput"
            type="text"
            placeholder="Location"
            value={carDetails.location}
            onChange={handleChange}
            name="location"
          />
        </div>
        <div className="div9">
          <textarea
            className="Linput"
            placeholder="Description"
            value={carDetails.description}
            onChange={handleChange}
            name="description"
          />
        </div>
        <div class="div10"> 
          <IButton  margintop="1dvh" backgroundColor="#C2C8C8" text="List Car" width="24dvh" height="5dvh" id="Lbutton"></IButton>
        </div>
        </form>  
      </div>
  );
};

export default ListArea;
