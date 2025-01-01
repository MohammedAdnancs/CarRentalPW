import React, { useEffect, useState,useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './ListingDetails.css';
import IButton from '../Button/Button';
import Popup from '../popup/popup';
import { useSelector } from 'react-redux';
import {SendUserMessages } from '../../redux/slices/Messagesslice/Messagesslice';
import messageSentSound from '../Assets/messageSentSound.mp3';
import { useDispatch} from 'react-redux';

const ListingDetails = () => {

  const dispatch = useDispatch();
  const { userInfo, isLodinglogin, isErrorlogin, isSucceslogin, messagelogin } = useSelector((state) => state.auth);
  console.log(userInfo);
  const audioRef = useRef(null);
  const { _id } = useParams();
  const [listing, setListing] = useState(null);
  const [Popupnotification1, setPopup1] = useState(false);
  const [Popupnotification2, setPopup2] = useState(false);
  const [imgId, setImgId] = useState(1);
  const [hoveredStar, setHoveredStar] = useState(0); // New state for star hover
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

  const handleSendMessage = async () => {
    setPopup2(true);
    let receiverId = listing.Lister._id
    let message = "hello" + listing.Lister.username
    console.log(message);
    console.log(userInfo.id);
    console.log(receiverId);
    audioRef.current.play();
    const senderId = userInfo.id;
      try {
          const Data = {
                message,
                senderId,
                receiverId
              }
              const newmessage = await dispatch(SendUserMessages(Data))
              console.log(newmessage)
      } catch (error) {
              console.log(error)
      }
  };

   // Function to render star icons
   const renderStars = () => {
    const stars = [];
    const totalStars = 5; // Define total number of stars
    for (let i = 1; i <= totalStars; i++) {
      stars.push(
        <i
          key={i}
          className={`fas fa-star ${i <= hoveredStar ? 'filled-star' : ''}`}
          onMouseEnter={() => setHoveredStar(i)}
          onMouseLeave={() => setHoveredStar(0)}
        ></i>
      );
    }
    return stars;
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
        <Popup setPopup={setPopup1} trigger={Popupnotification1} text="Congrats Car booked Successfully" />
        <Popup setPopup={setPopup2} trigger={Popupnotification2} text="Sent message got to messages" />
        <div className='ListingRight'>
          <div className='TopPart'>
            <div className='ListerInfo'>
              <h4>LISTER:</h4>
              <img src={listing.Lister.image} alt="lister" />
              <p>{listing.Lister.username}</p>
              <div className="Listing-rating">
                {renderStars()}
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
              <audio ref={audioRef} src={messageSentSound} />
              <IButton margintop="1dvh" backgroundColor="#C2C8C8" text="SendMessage" width="24dvh" height="5dvh" id="Lbutton" type="submit" onClick={() => { handleSendMessage() }}></IButton>
              <IButton margintop="1dvh" backgroundColor="#C2C8C8" text="Rent" width="24dvh" height="5dvh" id="Lbutton" type="submit" onClick={() => { setPopup1(true); }}></IButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingDetails;
