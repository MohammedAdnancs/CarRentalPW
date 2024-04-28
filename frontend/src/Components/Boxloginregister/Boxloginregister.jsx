import React, { useState } from 'react';
import './Boxloginregister.css';
import { FaUserAlt, FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Button from '../Button/Button';
import TextULH from '../Text_with_under_line_hover/TextULH';

const schema = yup.object().shape({
    username: yup.string().min(5, 'Username must be at least 5 characters').required('Username is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string()
        .min(8, 'Password must be at least 8 characters')
        .matches(/^(?=.*[!@#$%^&*])/, 'Password must contain at least one special character')
        .required('Password is required'),
});

const LoginRegister = () => {
    const [action, setAction] = useState('');
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const registerlink = () => {
        setAction(' active');
    };

    const loginlink = () => {
        setAction('');
    };

    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <div className='Containerloginsignup'>
            <div className={`wrapper${action}`}>
                <div className="form-box login">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <h1>Login</h1>
                        <div className="input-box">
                            <input type="text" placeholder='Username' {...register('username')} />
                            <FaUserAlt className='icon' />
                            {errors.username && <span>{errors.username.message}</span>}
                        </div>
                        <div className="input-box">
                            <input type="password" placeholder='Password' {...register('password')} />
                            <FaLock className='icon' />
                            {errors.password && <span>{errors.password.message}</span>}
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
                <div className="form-box register">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <h1>Signup</h1>
                        <div className="input-box">
                            <input type="text" placeholder='Username' {...register('username')} />
                            <FaUserAlt className='icon' />
                            {errors.username && <span>{errors.username.message}</span>}
                        </div>
                        <div className="input-box">
                            <input type="email" placeholder='Email' {...register('email')} />
                            <MdEmail className='icon' />
                            {errors.email && <span>{errors.email.message}</span>}
                        </div>
                        <div className="input-box">
                            <input type="password" placeholder='Password' {...register('password')} />
                            <FaLock className='icon' />
                            {errors.password && <span>{errors.password.message}</span>}
                        </div>
                        <div className="remember-forgot">
                            <label> <input type="checkbox" />I Agree to the terms & conditions</label>
                        </div>
                        <Button color="white" width="100%" height="5dvh" type="submit" text="Signup" />
                        <div className="register-link">
                            <p>Already have an account?</p>
                            <TextULH text="Login" registerlink={loginlink} />
                        </div>
                    </form>
                </div>
            </div>
        </div>

    );
};

export default LoginRegister;
