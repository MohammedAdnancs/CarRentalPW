import React, { useState } from 'react'
import './Button.css'
import { Link, useLocation } from 'react-router-dom';
const Button = (props) => {

    return (
        <Link style={{ textDecoration: 'none', color: 'inherit' }} to={props.link}>
            <button onClick={props.onClick} className='CustomButton' style={{ marginTop: props.margintop, width: props.width, height: props.height, backgroundColor: props.backgroundColor }}>
                <p>{props.text}</p>
                <span>
                    {props.icon}
                </span>

            </button>
        </Link>

    )
}

export default Button