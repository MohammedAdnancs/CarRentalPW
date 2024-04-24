import React from 'react';
import './Inputfield.css';

const Inputfield = () => {
    return (
        <div className='container'>
            <h1 className='login-header'>Login</h1>
            <div className='input-container'>
                <label htmlFor="username" className='label'>Username:</label>
                <input type="text" id="username" name="username" className='input-field'/>
            </div>
            <div className='input-container'>
                <label htmlFor="password" className='label'>Password:</label>
                <input type="password" id="password" name="password" className='input-field'/>
            </div>
            <button type="submit" className="login-button">Login</button>
        </div>
    );
};

export default Inputfield;
