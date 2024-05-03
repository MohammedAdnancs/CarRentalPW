import React, { useState } from 'react';
import './ListArea.css';
import IButton from '../Button/Button'
import { FaFileUpload } from "react-icons/fa";
import  { useFormik } from 'formik';
import {ListingsSchemas} from '../schemas/ListingsSchemas';
import axios from 'axios';



const ListArea = () => {




  const SumbitListing  = async (values,actions) => {
    ListingData.carName = values.carName
    ListingData.carType = values.carType
    ListingData.numDoors = values.numDoors
    ListingData.numSeats = values.numSeats
    ListingData.price = values.price
    ListingData.location = values.location
    ListingData.description = values.description
    ListingData.carImage1 = values.carImage1
    ListingData.carImage2 = values.carImage2
  
    try {
        const { carName, carType, numDoors,numSeats, price, location, description, carImage1,  carImage2 } = ListingData;
        console.log(carName)
        await axios.post('/AddListing', { carName, carType, numDoors,numSeats, price, location, description, carImage1,  carImage2 });
        setListingData({
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
  
        
    } catch (error) {
        if (error.response && error.response.status === 400) {
            console.log(error.response.data.error);
            setemailexisterror(error.response.data.error);
        } else {
            console.log("An error occurred:", error.message);
        }
    }
  };
  

  const { values, errors, touched, handleChange, handleSubmit, handleBlur } = useFormik({
    initialValues: {
      carName: '',
      carType: '',
      numDoors: '',
      numSeats: '',
      price: '',
      location: '',
      description: '',
      carImage1: null,
      carImage2: null
    },
    validationSchema: ListingsSchemas,
    onSubmit: SumbitListing,
});
  
  const [ListingData,setListingData] = useState({
    carName: '',
      carType: '',
      numDoors: '',
      numSeats: '',
      price: '',
      location: '',
      description: '',
      carImage1: null,
      carImage2: null
  })




  return (
    <div className="AreaContainer">
      <form className="parent" onSubmit={handleSubmit}>
        <div className="div1">
          <h1>List Your Car</h1>
        </div>
        
        <div className="div2">
        <button type='button' className='Ubtn' > 
          <FaFileUpload /> Choose Image
          <input
            id = "carImage1"
            className='Lfile'
            type="file"
            accept="image/*"
            value={values.carImage1}
            onBlur={handleBlur}
            onChange={handleChange}
            name="carImage1"
          />
        </button>
          {values.carImage1 && (
            <img
              src={values.carImage1}
              alt="Car"
            />
          )}
        </div>
        <div className="div3">
          <button type='button' className='Ubtn'> 
            <FaFileUpload /> Choose Image
            <input
              id = "carImage2"
              className='Lfile'
              type="file"
              accept="image/*"
              value={values.carImage2}
              onBlur={handleBlur}
              onChange={handleChange}
              name="carImage2"
            />
          </button>
          {values.carImage2 && (
            <img
              src={values.carImage2}
              alt="Car"
            />
          )}
          
        </div>
        <div className="div4">
          <input
            id = "carName"
            type="text"
            className="Linput"
            placeholder="Car Name"
            value={values.carName}
            onBlur={handleBlur}
            onChange={handleChange}
            name="carName"
          />
          {errors.carName && touched.carName ? <span className='error'>{errors.carName}</span> : <span></span>}
        </div>
        <div className="div5">
          <select
            id = "carType"
            value={values.carType}
            onBlur={handleBlur}
            onChange={handleChange}
            name="carType"
          >
            <option value="">Select Car Type</option>
            <option value="SUV">SUV</option>
            <option value="Sedan">Sedan</option>
            <option value="Sport">Sport</option>
          </select>
          {errors.carType && touched.carType ? <span className='error'>{errors.carType}</span> : <span></span>}
        </div>
        <div className="divP">
          <input
            id = "price"
            className="Linput"
            type="number"
            min={0}
            placeholder="Price"
            value={values.price}
            onBlur={handleBlur}
            onChange={handleChange}
            name="price"
          />
          {errors.price && touched.price ? <span className='error'>{errors.price}</span> : <span></span>}
        </div>
        <div className="div6">
          <input
            id= "numDoors"
            className="Linput"
            type="number"
            min={0}
            placeholder="Number of Doors"
            value={values.numDoors}
            onBlur={handleBlur}
            onChange={handleChange}
            name="numDoors"
          />
          {errors.numDoors && touched.numDoors ? <span className='error'>{errors.numDoors}</span> : <span></span>}
        </div>
        <div className="div7">
          <input
            id = "numSeats"
            className="Linput"
            type="number"
            placeholder="Number of Seats"
            value={values.numSeats}
            onBlur={handleBlur}
            onChange={handleChange}
            name="numSeats"
          />
          {errors.numSeats && touched.numSeats ? <span className='error'>{errors.numSeats}</span> : <span></span>}
        </div>
        <div className="div8">
          <input
            id = "location"
            className="Linput"
            type="text"
            placeholder="Location"
            value={values.location}
            onBlur={handleBlur}
            onChange={handleChange}
            name="location"
          />
          {errors.location && touched.location ? <span className='error'>{errors.location}</span> : <span></span>}
        </div>
        <div className="div9">
          <textarea
            id = "description"
            className="Linput"
            placeholder="Description"
            value={values.description}
            onBlur={handleBlur}
            onChange={handleChange}
            name="description"
          />
          {errors.description && touched.description ? <span className='error'>{errors.description}</span> : <span></span>}
        </div>
        <div class="div10"> 
          <IButton  margintop="1dvh" backgroundColor="#C2C8C8" text="List Car" width="24dvh" height="5dvh" id="Lbutton" type="submit"></IButton>
        </div>
        </form>  
      </div>
  );
};

export default ListArea;
