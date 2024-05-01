import React, { useState } from 'react';
import './popup.css';
import Button from '../Button/Button';
import TextULH from '../Text_with_under_line_hover/TextULH';

const Popup = (props) => {

    return (props.trigger) ? (
        <div className='popupContainer'>
            <div className="popup">
                <Button onClick={() => props.setPopup(false)} text="Close" width="5dvw" height="5dvh" />
                <TextULH fontWeight="bold" color="green" text={props.text} />
                {props.children}
            </div>
        </div>

    ) : "";

};

export default Popup;
