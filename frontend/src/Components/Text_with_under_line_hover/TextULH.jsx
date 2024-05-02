import React from 'react';
import './TextULH.css';

const TextULH = (props) => {
    return (
        <a className="TextULH" style={{ width: props.width, color: props.color, fontWeight: props.fontWeight }} href="#" onClick={props.registerlink}>{props.text}</a>
    );
};

export default TextULH;
