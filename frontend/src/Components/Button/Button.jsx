import React, { useState } from 'react'
import './Button.css'
import { Link, useLocation } from 'react-router-dom';
const Button = (props) => {

    if (props.link) {
        return (
            <Link style={{ textDecoration: 'none', color: 'inherit' }} to={props.link}>
                <button type={props.type} onClick={props.onClick} className='CustomButton' style={{ marginTop: props.margintop, width: props.width, height: props.height, backgroundColor: props.backgroundColor }}>
                    <p>{props.text}</p>
                    <span>
                        {props.icon}
                    </span>
                </button>
            </Link>
        );
    } else {
        return (
            <button type={props.type} onClick={props.onClick} className='CustomButton' style={{ color: props.color, marginTop: props.margintop, width: props.width, height: props.height, backgroundColor: props.backgroundColor }}>
                <p>{props.text}</p>
                <span>
                    {props.icon}
                </span>
            </button>
        );
    }

}

export default Button