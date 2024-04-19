import React, { useState } from 'react'
import './SearchHomePage.css'
import arrowicon from '../Assets/arrow.png'
import location from '../Assets/location.png'

const SearchHomePage = () => {

    return (
        <div className='SearchHomePage'>
            <div className="SearchContainer">

                <div className="input-icons">
                    <img src={location}></img>
                    <input type="text" id="Pickupplace" name="Pickupplace"></input>
                </div>

                <div className="input-icons">
                    <img src={arrowicon}></img>
                    <input type="text" id="Pickupplace" name="Pickupplace"></input>
                </div>

                <div className="input-icons">
                    <img src={arrowicon}></img>
                    <input type="text" id="Pickupplace" name="Pickupplace"></input>
                </div>

                <button type="submit"><p>Search</p><img src={arrowicon} /></button>
            </div>
        </div>
    )
}

export default SearchHomePage