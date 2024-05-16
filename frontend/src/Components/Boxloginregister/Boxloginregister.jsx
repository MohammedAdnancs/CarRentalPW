import React, { useState, useContext, useEffect } from 'react';
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
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { register, resetUser, login } from '../../redux/slices/authslice/authslice';

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

    const dispatch = useDispatch();
    const { userInfo, isLodingsignup, isErrorsignup, isSuccessignup, messagesignup,
        isLodinglogin, isErrorlogin, isSucceslogin, messagelogin } = useSelector((state) => state.auth)
    //for redux if any values changes
    useEffect(() => {
        if (isErrorsignup) {
            if (messagesignup === "Email is taken already") {
                setemailexisterror("Email Taken");
            } else {
                console.log(messagesignup);
            }
        }
        if (isSuccessignup) {
            dispatch(resetUser())
            setAction('');
            setPopup(true);
        }
    }, [userInfo, isErrorsignup, isSuccessignup, messagesignup])

    //register user with redux
    const registerUser = async (registerValues, actions) => {
        registerdatasignup.email = registerValues.signup_email
        registerdatasignup.password = registerValues.signup_password
        registerdatasignup.username = registerValues.signup_username
        const { username, email, password } = registerdatasignup;
        const userData = {
            username,
            email,
            password
        }

        await dispatch(register(userData))

        if (isErrorsignup) {
            if (messagesignup === "Email is taken already") {
                setemailexisterror("Email Taken Already");
            }
        }

        if (isSuccessignup) {
            dispatch(resetUser())
            setAction('');
            setPopup(true);
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

    useEffect(() => {

        if (isErrorlogin) {
            if (messagelogin === "No user found") {
                setloginerrormail(messagelogin);
            }
            if (messagelogin === "wrong password") {
                setloginerrorpassword(messagelogin);
            }
        }
        if (isSucceslogin) {
            dispatch(resetUser())
            navigate('/')
            setAction('');
        }
    }, [userInfo, isErrorlogin, isSucceslogin, messagelogin, navigate])

    const loginUser = async (loginValues, actions) => {
        logindata.email = loginValues.login_email
        logindata.password = loginValues.login_password

        const { email, password } = logindata;
        const userData = {
            email,
            password
        }

        await dispatch(login(userData))

        if (isErrorlogin) {
            if (messagelogin === "No user found") {
                setloginerrormail(messagelogin);
            } else {
                setloginerrormail("");
            }
            if (messagelogin === "wrong password") {
                setloginerrorpassword(messagelogin);
            } else {
                setloginerrorpassword("");
            }
        }

        if (isSucceslogin) {
            dispatch(resetUser())
            actions.resetForm();
            navigate('/')
            setAction('');
        }

    };

    useEffect(() => {

        if (loginerrormail !== "") {

            const timeoutId = setTimeout(() => {
                setloginerrormail("");
            }, 5000);

            return () => clearTimeout(timeoutId);
        }
        if (loginerrorpassword !== "") {

            const timeoutId = setTimeout(() => {
                setloginerrorpassword("");
            }, 5000);

            return () => clearTimeout(timeoutId);
        }
        if (emailexisterror !== "") {

            const timeoutId = setTimeout(() => {
                setemailexisterror("");
            }, 5000);

            return () => clearTimeout(timeoutId);
        }

    }, [loginerrormail, loginerrorpassword, emailexisterror]);

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
                            {emailexisterror != "" && registerErrors.signup_email == null ? <span className='uerror'>{emailexisterror}</span> : <span></span>}
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