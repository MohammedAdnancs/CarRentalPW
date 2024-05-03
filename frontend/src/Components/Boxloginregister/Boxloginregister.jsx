import React, { useState } from 'react';
import './Boxloginregister.css';
import { FaUserAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import Button from '../Button/Button';
import TextULH from '../Text_with_under_line_hover/TextULH';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import formik, { useFormik } from 'formik';
import Popup from '../popup/popup';
import { Signupschema, loginschema } from '../schemas/signinschema';
import { FaLock } from "react-icons/fa";
import { FaLockOpen } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

const LoginRegister = () => {
    const navigate = useNavigate();

    //to change between the login and signup boxes when the action = active we are in the signup action='' we are login
    const [action, setAction] = useState('');
    const [showhidepassword, setshowhidepassword] = useState(false);
    const [Popupnotification, setPopup] = useState(false);

    const registerlink = () => {
        setAction(' active');
        setshowhidepassword(false);
    };

    const loginlink = () => {
        setAction('');
        setshowhidepassword(false);
    };
    //end of to change between the login and signup boxes

    const [emailexisterror, setemailexisterror] = useState("")
    const [loginerrormail, setloginerrormail] = useState("")
    const [loginerrorpassword, setloginerrorpassword] = useState("")

    const [registerdatasignup, setRegisterData] = useState({
        username: '',
        email: '',
        password: ''
    });

    const [logindata, setLogindata] = useState({
        email: '',
        password: ''
    });

    const registerUser = async (registerValues, actions) => {
        registerdatasignup.email = registerValues.signup_email
        registerdatasignup.password = registerValues.signup_password
        registerdatasignup.username = registerValues.signup_username

        try {
            const { username, email, password } = registerdatasignup;
            await axios.post('/register', { username, email, password });
            setRegisterData({
                username: '',
                email: '',
                password: ''
            });
            setAction('');
            actions.resetForm();
            setemailexisterror("");
            setPopup(true);
        } catch (error) {
            if (error.response && error.response.status === 400) {
                console.log(error.response.data.error);
                setemailexisterror(error.response.data.error);
            } else {
                console.log("An error occurred:", error.message);
            }
        }
    };

    // Formik hook for signup form
    const { values: registerValues, errors: registerErrors, touched: registerTouched, handleChange: registerHandleChange, handleSubmit: registerHandleSubmit, handleBlur: registerHandleBlur } = useFormik({
        initialValues: {
            signup_username: "",
            signup_email: "",
            signup_password: "",
        },
        validationSchema: Signupschema,
        onSubmit: registerUser,
    });

    const loginUser = async (loginValues, actions) => {
        logindata.email = loginValues.login_email
        logindata.password = loginValues.login_password

        try {
            const { email, password } = logindata;
            await axios.post('/login', { email, password });
            setLogindata({
                username: '',
                email: '',
            });
            setAction('');
            actions.resetForm();
            navigate('/')
        } catch (error) {
            if (error.response && error.response.status === 400) {
                if (error.response.data.error == "No user found") {
                    console.log(error.response.data.error);
                    setloginerrormail(error.response.data.error);
                }
                if (error.response.data.error == "wrong password") {
                    console.log(error.response.data.error);
                    setloginerrorpassword(error.response.data.error);
                }
            } else {
                console.log("An error occurred:", error.message);
            }
        }
    };

    // Formik hook for login form
    const { values: loginValues, errors: loginErrors, touched: loginTouched, handleChange: loginHandleChange, handleSubmit: loginHandleSubmit, handleBlur: loginHandleBlur } = useFormik({
        initialValues: {
            login_email: "",
            login_password: "",
        },
        validationSchema: loginschema,
        onSubmit: loginUser,
    });

    const togglepassword = () => {
        setshowhidepassword(!showhidepassword)
    }

    return (
        <div className='Containerloginsignup'>
            <Popup setPopup={setPopup} trigger={Popupnotification} text="Congrats account created successfully" />
            <div className={`wrapper${action}`}>

                <div className="form-box register">
                    <form onSubmit={registerHandleSubmit}>
                        <h1>Signup</h1>
                        <div className={`input-box ${registerErrors.signup_username && registerTouched.signup_username ? 'error' : ''}`}>
                            <input id="signup_username" type="text" placeholder='username' value={registerValues.signup_username} onChange={registerHandleChange} onBlur={registerHandleBlur} />
                            <FaUserAlt className='icon' />
                            {registerErrors.signup_username && registerTouched.signup_username ? <span>{registerErrors.signup_username}</span> : <span></span>}
                        </div>
                        <div className={`input-box ${registerErrors.signup_email && registerTouched.signup_email || emailexisterror ? 'error' : ''}`}>
                            <input id="signup_email" type="email" placeholder='email' value={registerValues.signup_email} onChange={registerHandleChange} onBlur={registerHandleBlur} />
                            <MdEmail className='icon' />
                            {registerErrors.signup_email && registerTouched.signup_email ? <span>{registerErrors.signup_email}</span> : <span></span>}
                            {emailexisterror != "" ? <span className='uerror'>{emailexisterror}</span> : <span></span>}
                        </div>
                        <div className={`input-box ${registerErrors.signup_password && registerTouched.signup_password ? 'error' : ''}`}>
                            <input id="signup_password" type={showhidepassword ? 'text' : 'password'} placeholder='password' value={registerValues.signup_password} onChange={registerHandleChange} onBlur={registerHandleBlur} />
                            {showhidepassword ? <FaEye onClick={() => togglepassword()} className='eyeicon' /> : <FaEyeSlash onClick={() => togglepassword()} className='eyeicon' />}
                            {registerErrors.signup_password && registerTouched.signup_password ? <span>{registerErrors.signup_password}</span> : <span></span>}
                        </div>
                        <div className="remember-forgot">
                            <label> <input type="checkbox" />I Agree to the terms & conditions</label>
                        </div>
                        <Button type="submit" color="white" width="100%" height="5dvh" text="Signup" />
                        <div className="register-link">
                            <p>Already have an account?</p>
                            <TextULH text="Login" registerlink={loginlink} />
                        </div>
                    </form>
                </div>

                <div className="form-box login">

                    <form onSubmit={loginHandleSubmit}>
                        <h1>Login</h1>
                        <div className={`input-box ${loginErrors.login_email && loginTouched.login_email || loginerrormail ? 'error' : ''}`}>
                            <input id="login_email" type="text" placeholder='Email' value={loginValues.login_email} onChange={loginHandleChange} onBlur={loginHandleBlur} />
                            <FaUserAlt className='icon' />
                            {loginErrors.login_email && loginTouched.login_email ? <span>{loginErrors.login_email}</span> : <span></span>}
                            {loginerrormail != "" && !(loginErrors.hasOwnProperty("login_email")) ? <span className='uerror'>{loginerrormail}</span> : <span></span>}
                        </div>
                        <div className={`input-box ${(loginErrors.login_password && loginTouched.login_password) || loginerrorpassword ? 'error' : ''}`}>
                            <input id="login_password" type={showhidepassword ? 'text' : 'password'} placeholder="password" value={loginValues.login_password} onChange={loginHandleChange} onBlur={loginHandleBlur} />
                            {showhidepassword ? <FaEye onClick={() => togglepassword()} className='eyeicon' /> : <FaEyeSlash onClick={() => togglepassword()} className='eyeicon' />}
                            {loginErrors.login_password && loginTouched.login_password ? <span>{loginErrors.login_password}</span> : <span></span>}
                            {loginerrorpassword !== "" && !(loginErrors.hasOwnProperty("login_password")) ? <span className='uerror'>{loginerrorpassword}</span> : <span></span>}
                        </div>
                        <div className="remember-forgot">
                            <label> <input type="checkbox" />Remember me</label>
                            <TextULH text="Forgot password?" />
                        </div>
                        <Button backgroundColor="white" width="100%" height="5dvh" type="submit" text="Login" />
                        <div className="register-link">
                            <p>Don't have an account? </p>
                            <TextULH text="Register" registerlink={registerlink} />
                        </div>
                    </form>

                </div>
            </div>
        </div>

    );
};

export default LoginRegister;