import React from 'react';
import './Signupfield.css';

const Inputfield = () => {
    return (
        <div className='container'>
            <h1 className='login-header'>Sign Up</h1>
            <div className='input-container'>
                <label htmlFor="username" className='label'>Username:</label>
                <input type="text" id="username" name="username" className='input-field'/>
            </div>
            <div className='input-container'>
                <label htmlFor="username" className='label'>Email:</label>
                <input type="text" id="username" name="Email" className='input-field'/>
            </div>
            <div className='input-container'>
                <label htmlFor="password" className='label'>Password:</label>
                <input type="password" id="password" name="password" className='input-field'/>
            </div>
            <div className='input-container'>
                <label htmlFor="password" className='label'>Confirm Password:</label>
                <input type="password" id="password" name="Confirm Password" className='input-field'/>
            </div>
            <button type="submit" className="login-button">Login</button>
        </div>
    );
};

export default Inputfield;
