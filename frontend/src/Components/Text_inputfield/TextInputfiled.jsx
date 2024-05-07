import React, { useState } from 'react'
import './TextInputfiled.css'
import arrowRicon from '../Assets/arrowR.png'
import location from '../Assets/location.png'
import calendar from '../Assets/calendar.png'
import { FaArrowRightLong } from "react-icons/fa6";
import Button from '../Button/Button'

const TextInputfield = (props) => {
    return (
        <div className="custominputbox">
            {props.icon}
            <input required className='custominput' style={{ width: props.width }} name={props.name} id={props.id} onChange={props.onChange} onBlur={props.onBlur} type={props.type} value={props.value}></input>
            <span className='customspan'>{props.placeholder}</span>
        </div>
    )
}
export default TextInputfield