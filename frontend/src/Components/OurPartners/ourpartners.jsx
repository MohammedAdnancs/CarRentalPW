import React, { useState } from 'react'
import './ourpartners.css'
import bmw from '../Assets/bmw.png'
import ferrari from '../Assets/ferrari.png'
import mercedes from '../Assets/mercedes.png'
import nissan from '../Assets/nissan.png'
import porsche from '../Assets/porsche.png'
import renault from '../Assets/renault.png'
import peugeot from '../Assets/peugeot.png'
import Toyota from '../Assets/Toyota.png'

const Hero = () => {

    const Partnerslogos = [bmw, ferrari, mercedes, nissan, porsche, renault, peugeot, Toyota]

    return (
        <div className='ourpartners'>
            <p>Our Partners</p>
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