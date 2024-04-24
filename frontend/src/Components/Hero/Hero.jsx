import React, { useState } from 'react'
import './Hero.css'
import SearchHomePage from '../searchHomePage/SearchHomePage'
import Car2 from '../Assets/car2.png'
import { motion } from 'framer-motion'

const texth2 = "Drive the experience with NileDrive.From compact to\n luxury,our affordable rentals offer quality cars and \nexceptional service.Rent, drive,and make unforgettable \n memories on every journey.With us, every adventure \n always awaits."

const defaultAnimations = {
    hidden: {
        opacity: 0,
        y: 20,
    },
    visibale: {
        opacity: 1,
        y: 0,
    },
}

const Hero = () => {

    return (
        <div className='Container'>
            <div className='Hero'>
                <div className='Hero-left'>
                    <h2 className='sr-only' align="justify">{texth2}</h2>
                    <motion.h2 transition={{ staggerChildren: 0.2 }} initial="hidden" animate="visibale" aria-hidden align="justify">
                        {texth2.split("\n").map((char) => (
                            <motion.span style={{ display: "inline-block" }} variants={defaultAnimations}>{char}</motion.span>
                        ))}
                    </motion.h2>
                    <p align="justify">Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                        It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                        It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with
                        desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum</p>
                    <button>Learn More</button>
                </div>
                <div className='Hero-right'>
                    <img src={Car2} alt="" />
                </div>
            </div>
            <div className='Search'>
                <SearchHomePage />
            </div>
        </div>
    )
}

export default Hero