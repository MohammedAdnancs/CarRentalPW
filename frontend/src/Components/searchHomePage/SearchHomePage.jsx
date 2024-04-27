import React, { useState } from 'react'
import './SearchHomePage.css'
import arrowRicon from '../Assets/arrowR.png'
import location from '../Assets/location.png'
import calendar from '../Assets/calendar.png'
import { FaArrowRightLong } from "react-icons/fa6";
import Button from '../Button/Button'

const SearchHomePage = () => {

    return (
        <div className='SearchHomePage'>
            <h2>Find The Car Thats Suits You</h2>
            <div className="SearchContainer">

                <div className="inputbox" style={{ width: "60%" }}>
                    <img src={location} style={{ width: "50px" }} />
                    <input type="text" id="PickupLocation" name="PickupLocation" required></input>
                    <span>Pickup Location</span>
                </div>

                <div className="inputbox">
                    <img src={calendar} style={{ width: "45px" }} />
                    <input type="text" id="PickupDate" name="PickupLocation" required></input>
                    <span>Pickup Date</span>
                </div>

                <div className="inputbox">
                    <img src={calendar} style={{ width: "45px" }} />
                    <input type="text" id="PickupLocation" name="PickupLocation" required></input>
                    <span>Return Date</span>
                </div>
                <Button backgroundColor="#C2C8C8" text="Search" width="30dvh" height="6dvh" icon={<FaArrowRightLong color="#212227" fontSize="1.5em" style={{ marginTop: "30%" }} />} />
            </div>

        </div>

    )
}

export default SearchHomePage