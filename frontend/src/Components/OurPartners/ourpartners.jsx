import React, { useRef, useState } from 'react'
import './ourpartners.css'
import bmw from '../Assets/bmw.png'
import ferrari from '../Assets/ferrari.png'
import mercedes from '../Assets/mercedes.png'
import nissan from '../Assets/nissan.png'
import porsche from '../Assets/porsche.png'
import renault from '../Assets/renault.png'
import peugeot from '../Assets/peugeot.png'
import toyota from '../Assets/Toyota.png'
import { motion, useInView } from 'framer-motion'


const Hero = () => {

    const Partnerslogos = [bmw, ferrari, mercedes, nissan, porsche, renault, peugeot, toyota]
    const textP = "Partnerships"

    const defaultAnimations = {
        hidden: {
            opacity: 0,
            y: 20,
        },
        visible: {
            opacity: 1,
            y: 0,
        },
    }
    const ref = useRef(null);
    const isInView = useInView(ref, { amount: 0.5 });

    return (
        <div className='ourpartners'>

            <motion.p ref={ref} transition={{ staggerChildren: 0.1 }} initial="hidden" animate={isInView ? "visible" : "hidden"} aria-hidden align="justify">{textP.split("").map((char) => (
                <motion.span style={{ display: "inline-block" }} variants={defaultAnimations}>{char}</motion.span>
            ))}</motion.p>

            <div className='Wrapper'>
                <div className='Marquee'>
                    <div className='Marqueegroup'>
                        {
                            Partnerslogos.map(PI => (
                                <div className='Imagegroup'>
                                    <img src={PI} alt='' />
                                </div>
                            ))
                        }
                    </div>
                    <div className='Marqueegroup'>
                        {
                            Partnerslogos.map(PI => (
                                <div className='Imagegroup'>
                                    <img src={PI} alt='' />
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hero