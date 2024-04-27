export const validateForm = (firstName, lastName, email) => {
    let valid = true;
    let errors = {};
    
    if (!firstName.trim()) {
        errors.firstName = 'First Name is required';
        valid = false;
    }

    if (!lastName.trim()) {
        errors.lastName = 'Last Name is required';
        valid = false;
    }

    if (!email.trim()) {
        errors.email = 'Email is required';
        valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
        errors.email = 'Email is invalid';
        valid = false;
    }

    return { valid, errors };
};