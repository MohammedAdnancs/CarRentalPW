import React, { useState } from 'react'
import './Footer.css'
import insta from '../Assets/insta.png'
import facebook from '../Assets/facebook.png'
import linkedin from '../Assets/linkedin.png'
const Footer = () => {

    return (
        <div className="ContaineraLL">
            <div className='FooterContainer'>
                <div className='Footer'>
                    <div className='Title'>
                        <h2>NileDrive</h2>
                        <p style={{ textAlign: "justify;" }}>
                            Location:Lorem ipsum dolor sit amet,
                            consectetur adipiscing elit,
                            sed do eiusmod tempor incididunt
                            ut labore et dolore magna aliqua. </p>
                    </div>
                    <div className='OurProducts'>
                        <h2>OurProducts</h2>
                        <a href="https://www.w3schools.com">Driver</a>
                        <a href="https://www.w3schools.com">Car</a>
                    </div>
                    <div className='Resources'>
                        <h2>Resources</h2>
                        <a href="https://www.w3schools.com">Community</a>
                        <a href="https://www.w3schools.com">Downlod</a>
                    </div>
                    <div className='AboutUs'>
                        <h2>AboutUs</h2>
                        <a href="https://www.w3schools.com">Why choose us</a>
                        <a href="https://www.w3schools.com">Our story</a>
                    </div>
                    <div className='GetInTouch'>
                        <h2>Get in touch</h2>
                        <div className='Socialmedia'>
                            <img src={facebook} style={{ width: "12%" , height:"10%"}} />
                            <img src={insta} style={{ width: "13.5%" , height:"10%" }} />
                            <img src={linkedin} style={{ width: "13.5%" , height:"10%"}} />
                        </div>
                    </div>
                </div>
            </div>
            <div className='rights'>
                <p>&copy; 2024 NileDrive. All right reserved</p>
            </div>
        </div>

    )
}

export default Footer