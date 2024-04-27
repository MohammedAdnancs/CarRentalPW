import React from 'react';
import './TextULH.css';

const TextULH = (props) => {
    return (
        <a className='TextULH' href="#" onClick={props.registerlink}>{props.text}</a>
    );
};

export default TextULH;
