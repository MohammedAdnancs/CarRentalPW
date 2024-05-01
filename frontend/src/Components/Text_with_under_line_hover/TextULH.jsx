import React from 'react';
import './TextULH.css';

const TextULH = (props) => {
    return (
        <a style={{ color: props.color , fontWeight:props.fontWeight }} className='TextULH' href="#" onClick={props.registerlink}>{props.text}</a>
    );
};

export default TextULH;
