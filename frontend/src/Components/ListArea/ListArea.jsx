import React, { useState } from 'react';
import './ListArea.css';
import IButton from '../Button/Button'
import { FaFileUpload } from "react-icons/fa";
import  { useFormik } from 'formik';
import {ListingsSchemas} from '../schemas/ListingsSchemas';
import axios from 'axios';
import Popup from '../popup/popup';
import { ColorRing } from 'react-loader-spinner'



const ListArea = () => {
  const [Popupnotification, setPopup] = useState(false);
  const [loading, setloading] = useState(false);
  const SubmitListing  = async (values,actions) => {
    ListingData.carName = values.carName
    ListingData.carType = values.carType
    ListingData.numDoors = values.numDoors
    ListingData.numSeats = values.numSeats
    ListingData.price = values.price
    ListingData.location = values.location
    ListingData.description = values.description
  
    try {
        const { carName, carType, numDoors,numSeats, price, location, description} = ListingData;
        //console.log(ImageUrl1)
        //console.log(ImageUrl2)
        setloading(true);
        await axios.post('/AddListing', { carName, carType, numDoors,numSeats, price, location, description, ImageUrl1, ImageUrl2 });
        setListingData({
          carName: '',
          carType: '',
          numDoors: '',
          numSeats: '',
          price: '',
          location: '',
          description: '',
          ImageUrl1: '',
          ImageUrl2: ''
        });
        setPopup(true);
        setloading(false);
    } catch (error) {
        if (error.response && error.response.status === 400) {
            console.log(error.response.data.error);
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
    },
    validationSchema: ListingsSchemas,
    onSubmit: SubmitListing, 
});
  
  const [ListingData,setListingData] = useState({
    carName: '',
      carType: '',
      numDoors: '',
      numSeats: '',
      price: '',
      location: '',
      description: '',
      ImageUrl1: '',
      ImageUrl2: ''
  })

  const [selectedImage1, setSelectedImage1] = useState('');
  const [fileinputstate, setfileinputstate] = useState(null);
  const [selectedImage2, setSelectedImage2] = useState(null);
  const [ImageUrl1, setImageUrl1] = useState('');
  const [ImageUrl2, setImageUrl2] = useState('');

  const handelfielinput1 = (e) => {
    const file1 = e.target.files[0];
    setSelectedImage1(URL.createObjectURL(file1)); // Set URL for preview
    const reader = new FileReader();
    reader.readAsDataURL(file1);
    reader.onload = () => {
      setImageUrl1(reader.result)
      //console.log(reader.result)
    }
}

const handelfielinput2 = (e) => {
  const file2 = e.target.files[0];
  setSelectedImage2(URL.createObjectURL(file2)); // Set URL for preview
  const reader = new FileReader();
  reader.readAsDataURL(file2);
  reader.onload = () => {
    setImageUrl2(reader.result)
    //console.log(reader.result)
  }
}

  return (
    <div className='bigContainer'>
      {loading && (
      <div className="loader-container">
        <ColorRing
          visible={loading}
          height="80"
          width="80"
          ariaLabel="color-ring-loading"
          wrapperStyle={{}}
          wrapperClass="color-ring-wrapper"
          colors={['#2192FF', '#F5EDED', '#2192FF', '#F5EDED', '#2192FF']}
          className="loader"
        />
      </div>
    )}
    <div className="AreaContainer">
      <Popup setPopup={setPopup} trigger={Popupnotification} text="Congrats Listing Uploaded Successfully" />
      
      <form className="parent" onSubmit={handleSubmit}>
        <div className="div1">
          <h1>List Your Car</h1>
        </div>
        
        <div className="div2">
  <button type='button' className='Ubtn' > 
    <FaFileUpload /> Choose Image
    <input
      id="carImage1"
      className='Lfile'
      type="file"
      accept="image/*"
      value={fileinputstate}
      onBlur={handleBlur}
      onChange={handelfielinput1}
      name="carImage1"
    />
  </button>
  {selectedImage1 && (
    <img
      src={selectedImage1}
      alt="Car"
    />
  )}
</div>

<div className="div3">
  <button type='button' className='Ubtn'> 
    <FaFileUpload /> Choose Image
    <input
      id="carImage2"
      className='Lfile'
      type="file"
      accept="image/*"
      value={fileinputstate}
      onBlur={handleBlur}
      onChange={handelfielinput2}
      name="carImage2"
    />
  </button>
  {selectedImage2 && (
    <img
      src={selectedImage2}
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
      </div>
  );
};

export default ListArea;
