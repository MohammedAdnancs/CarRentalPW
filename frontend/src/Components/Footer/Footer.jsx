import React, { useState } from 'react'
import './Footer.css'
import insta from '../Assets/insta.png'
import facebook from '../Assets/facebook.png'
import linkedin from '../Assets/linkedin.png'
import TextULH from '../Text_with_under_line_hover/TextULH'
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
                        <h2>Our Products</h2>
                        <TextULH width="30%" link="https://www.w3schools.com" text="Driver" />
                        <TextULH width="20%" link="https://www.w3schools.com" text="Car" />
                    </div>
                    <div className='Resources'>
                        <h2>Resources</h2>
                        <TextULH width="70%" link="https://www.w3schools.com" text="Community" />
                        <TextULH width="60%" link="https://www.w3schools.com" text="Download" />
                    </div>
                    <div className='AboutUs'>
                        <h2>About Us</h2>
                        <TextULH link="https://www.w3schools.com" text="Why choose us" />
                        <TextULH width="61%" link="https://www.w3schools.com" text="Our story" />
                    </div>
                    <div className='GetInTouch'>
                        <h2>Get in touch</h2>
                        <div className='Socialmedia'>
                            <img src={facebook} style={{ width: "12%", height: "10%" }} />
                            <img src={insta} style={{ width: "13.5%", height: "10%" }} />
                            <img src={linkedin} style={{ width: "13.5%", height: "10%" }} />
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