import React, { useState } from 'react'
import './workingsteps.css'
import location from '../Assets/location.png'
import calendar from '../Assets/calendar.png'
import car from '../Assets/car.png'

const Workingsteps = () => {

    return (
        <div className='ContainerWorikingSteps'>
            <p className='title'>how it works</p>
            <h2>Our Working Steps</h2>
            <div className='Steps'>
                <div className='Step'>
                    <img src={location} alt="" style={{ width: "27%" }} />
                    <p className='stepname'>Choose Location</p>
                    <p className='stepdiscription'>Lorem Ipsum is simply dummy
                        text of the printing and typesetting industry.
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and scrambled it to make
                        a type specimen book.</p>
                </div>
                <div className='Step'>
                    <img src={calendar} alt="" style={{ width: "29%" }} />
                    <p className='stepname'>Pick Up Date</p>
                    <p className='stepdiscription'>Lorem Ipsum is simply dummy
                        text of the printing and typesetting industry.
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and scrambled it to make
                        a type specimen book.</p>
                </div>
                <div className='Step'>
                    <img src={car} alt="" style={{ width: "35%" }} />
                    <p className='stepname'>Book Your Car</p>
                    <p className='stepdiscription'>Lorem Ipsum is simply dummy
                        text of the printing and typesetting industry.
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and scrambled it to make
                        a type specimen book.</p>
                </div>
            </div>
        </div>
    )
}

export default Workingsteps