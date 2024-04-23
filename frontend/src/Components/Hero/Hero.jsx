import React, { useState } from 'react'
import './Hero.css'
import CarHero from '../Assets/CarHero.png'
import MG from '../Assets/mg.png'
import SearchHomePage from '../searchHomePage/SearchHomePage'


const Hero = () => {

    return (
        <div className='Container'>
            <div className='Hero'>
                <div className='Hero-left'>
                    <h2 align="justify">
                        Drive the experience with NileDrive. From compact to luxury,
                        our affordable rentals offer quality cars and exceptional service.
                        Rent, drive, and make unforgettable memories on every journey.
                        With us, every adventure awaits.
                    </h2>
                    <p align="justify">Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                        It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                        It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with
                        desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum</p>
                    <button>Learn More</button>
                </div>
                <div className='Hero-right'>
                    <img src={MG} alt="" />
                </div>
            </div>
            <div className='Search'>
                <SearchHomePage />
            </div>
        </div>
    )
}

export default Hero