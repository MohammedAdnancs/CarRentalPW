import React, { useState } from 'react'
import './SearchHomePage.css'
import arrowicon from '../Assets/arrow.png'
import location from '../Assets/location.png'
import calendar from '../Assets/calendar.png'

const SearchHomePage = () => {

    return (
        <div className='SearchHomePage'>
            <h2>Find The Car Thats Suits You</h2>
            <div className="SearchContainer">

                <div className="inputbox">
                    <img src={location} style={{ width: "45px" }} />
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
                    <span>Return location</span>
                </div>

                <button>
                    <p>Search</p>
                    <img src={arrowicon} alt='' />
                </button>
            </div>

        </div>

    )
}

export default SearchHomePage