import * as yup from 'yup';


export const editingschema = yup.object().shape({
    username: yup.string().min(5, 'Username must be at least 5 characters'),
    email: yup.string().email('Invalid email'),
});