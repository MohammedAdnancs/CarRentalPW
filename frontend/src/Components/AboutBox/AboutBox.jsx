import React from 'react';
import './AboutBox.css';
import ServiceImage1 from '../Assets/asem.jpg';
import ServiceImage2 from '../Assets/tameya.jpg';
import ServiceImage3 from '../Assets/medo55.jpg';
import ServiceImage4 from '../Assets/mr.pepsi.jpg';
import Video from '../Assets/alfa_vid.mp4';
import { Link } from 'react-router-dom'; 

const AboutUs = () => {
  return (
    <div className="about-us">
      <section className="hero">
        <div className="hero-text">
          <h1>Your Premier Car Rental Service in Egypt</h1>
          <p>Whether you need a luxury car for a special occasion, a reliable vehicle for business trips, or an economic option for everyday use, we have got you covered.</p>
          <Link to="/rent" className="call-button">Book Now</Link>
        </div>
        <div className="hero-video">
          <video src={Video} autoPlay loop muted playsInline />
        </div>
      </section>
      <section className="services">
        <div className="service">
          <div className="service-image-container">
            <img src={ServiceImage1} alt="Assem Omar" className="service-image" />
          </div>
          <h2>Assem Omar</h2>
          <p>Founder & CEO</p>
          <p>Assem Omar has a passion for cars and a vision to provide top-notch rental services, ensuring every customer enjoys a premium experience.</p>
        </div>
        <div className="service">
          <div className="service-image-container">
            <img src={ServiceImage2} alt="Andrew Magdy" className="service-image" />
          </div>
          <h2>Andrew Magdy</h2>
          <p>Chief Technology Officer</p>
          <p>Andrew Magdy is the tech genius behind our state-of-the-art booking system, making it easier and faster for you to rent a car anytime, anywhere.</p>
        </div>
        <div className="service">
          <div className="service-image-container">
            <img src={ServiceImage3} alt="Medo Adnan" className="service-image" />
          </div>
          <h2>Medo Adnan </h2>
          <p>Operations Manager</p>
          <p>Medo Adnan ensures that our fleet is always in top condition and ready to meet the needs of our diverse clientele.</p>
        </div>
        <div className="service">
          <div className="service-image-container">
            <img src={ServiceImage4} alt="Medo Adnan" className="service-image" />
          </div>
          <h2>Abulwafa </h2>
          <p>Sales Manager</p>
          <p>Abulwafa ensures that our products are sold with customer satisfaction.........................</p>
        </div>
      </section>
    </div>
  );
}

export default AboutUs;
