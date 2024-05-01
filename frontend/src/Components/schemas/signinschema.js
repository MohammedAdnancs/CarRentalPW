import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';


const Signupschema = yup.object().shape({
    username: yup.string().min(5, 'Username must be at least 5 characters').required('Username is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string()
        .min(8, 'Password must be at least 8 characters')
        .matches(/^(?=.*[!@#$%^&*])/, 'Password must contain at least one special character')
        .required('Password is required'),
});

export default Signupschema;