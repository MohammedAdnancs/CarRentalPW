import React, { useState, useContext, useEffect} from 'react';
import React, { useState, useContext } from 'react';
import './ListArea.css';
import IButton from '../Button/Button'
import { FaFileUpload } from "react-icons/fa";
import { useFormik } from 'formik';
import { ListingsSchemas } from '../schemas/ListingsSchemas';
import { UserContext } from "../../Context/userContext";
import axios from 'axios';
import Popup from '../popup/popup';
import { ColorRing } from 'react-loader-spinner'
import TextInputfield from '../Text_inputfield/TextInputfiled';
import { FaCar } from "react-icons/fa";
import { MdOutlineAttachMoney } from "react-icons/md";
import { GiCarDoor } from "react-icons/gi";
import { GiCarSeat } from "react-icons/gi";
import { FaMapLocationDot } from "react-icons/fa6";
import { MdDescription } from "react-icons/md";
import { IoCarSport } from "react-icons/io5";
import { FaCarSide } from "react-icons/fa6";
import { UserContext } from "../../Context/userContext";

const ListArea = () => {
  const { user, forceupdate } = useContext(UserContext);
  const [Popupnotification, setPopup] = useState(false);
  const [loading, setloading] = useState(false);
  const [email, setemail] = useState('');

  useEffect(() => {
    if (user) {
      setemail(user.email);
    }
  }, [user]);

  const SubmitListing = async (values, actions) => {
    // Ensure email is set before using it
    if (!email) return;

    ListingData.carName = values.carName;
    ListingData.carType = values.carType;
    ListingData.numDoors = values.numDoors;
    ListingData.numSeats = values.numSeats;
    ListingData.price = values.price;
    ListingData.location = values.location;
    ListingData.description = values.description;
    ListingData.email = email;

    try {
      const { carName, carType, numDoors, numSeats, price, location, description, email } = ListingData;

      setloading(true);
      let userId = user.id;
      await axios.post('/AddListing', { carName, carType, numDoors, numSeats, price, location, description, ImageUrl1, ImageUrl2 , userId});
      setListingData({
        carName: '',
        carType: '',
        numDoors: '',
        numSeats: '',
        price: '',
        location: '',
        description: '',
        ImageUrl1: '',
        ImageUrl2: '',
        email: '',
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

  const [ListingData, setListingData] = useState({
    carName: '',
    carType: '',
    numDoors: '',
    numSeats: '',
    price: '',
    location: '',
    description: '',
    ImageUrl1: '',
    ImageUrl2: '',
    email: '',
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
            <TextInputfield icon={<IoCarSport style={{ fontSize: "3dvw", color: "#C2C8C8" }} />} width="25dvw" placeholder="Car Name" name="carName" type="text" id="carName" onChange={handleChange} onBlur={handleBlur} value={values.carName} />
            {errors.carName && touched.carName ? <span className='error'>{errors.carName}</span> : <span></span>}
          </div>
          <div className="div5">
            <IoCarSport style={{ fontSize: "2.6dvw", color: "#C2C8C8" }} />
            <select
              id="carType"
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
            <TextInputfield icon={<MdOutlineAttachMoney style={{ fontSize: "3dvw", color: "#C2C8C8" }} />} width="25dvw" placeholder="Price" name="price" type="number" id="price" onChange={handleChange} onBlur={handleBlur} value={values.price} />
            {errors.price && touched.price ? <span className='error'>{errors.price}</span> : <span></span>}
          </div>
          <div className="div6">
            <TextInputfield icon={<GiCarDoor style={{ fontSize: "3dvw", color: "#C2C8C8" }} />} width="25dvw" placeholder="Number of Doors" name="numDoors" type="number" id="numDoors" onChange={handleChange} onBlur={handleBlur} value={values.numDoors} />
            {errors.numDoors && touched.numDoors ? <span className='error'>{errors.numDoors}</span> : <span></span>}
          </div>
          <div className="div7">
            <TextInputfield icon={<GiCarSeat style={{ fontSize: "3dvw", color: "#C2C8C8" }} />} width="25dvw" placeholder="Number of Seats" name="numSeats" type="number" id="numSeats" onChange={handleChange} onBlur={handleBlur} value={values.numSeats} />
            {errors.numSeats && touched.numSeats ? <span className='error'>{errors.numSeats}</span> : <span></span>}
          </div>
          <div className="div8">
            <TextInputfield icon={<FaMapLocationDot style={{ fontSize: "3dvw", color: "#C2C8C8" }} />} width="25dvw" placeholder="Location" name="location" type="text" id="location" onChange={handleChange} onBlur={handleBlur} value={values.location} />
            {errors.location && touched.location ? <span className='error'>{errors.location}</span> : <span></span>}
          </div>
          <div className="div9">

            <MdDescription style={{ fontSize: "3dvw", color: "#C2C8C8" }} />
            <textarea
              id="description"
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
            <IButton margintop="1dvh" backgroundColor="#C2C8C8" text="List Car" width="24dvh" height="5dvh" id="Lbutton" type="submit"></IButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ListArea;
