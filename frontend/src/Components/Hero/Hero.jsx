import React, { useState } from 'react'
import './Hero.css'
import SearchHomePage from '../searchHomePage/SearchHomePage'
import Car2 from '../Assets/car2.png'
import Button from '../Button/Button'
import { motion } from 'framer-motion'
import { FaCarSide } from "react-icons/fa";


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
                    <h2 className='sr-only' >{texth2}</h2>
                    <motion.h2 transition={{ staggerChildren: 0.2 }} initial="hidden" animate="visibale" aria-hidden>
                        {texth2.split("\n").map((char) => (
                            <motion.span style={{ display: "inline-block" }} variants={defaultAnimations}>{char}</motion.span>
                        ))}
                    </motion.h2>
                    <p className='infohero' align="justify">Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                        It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                        It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with
                        desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum</p>

                    <Button backgroundColor="#C2C8C8" width="50dvh" height="6dvh" text="Learn More" />

                </div>
                <motion.div
                    initial={{ x: -300, opacity: 0.2 }}
                    animate={{ x: 0, y: 0, opacity: 1 }}
                    transition={{ duration: 0.7, ease: "easeInOut" }}
                    className='Hero-right'>
                    <img src={Car2} alt="" />
                </motion.div>
            </div>
            <div className='Search'>
                <SearchHomePage />
            </div>
        </div>
    )
}

export default Hero