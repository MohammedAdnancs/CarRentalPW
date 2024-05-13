import axios from 'axios'

const register = async (userData) => {
    const response = await axios.post('/register', userData)

    return response.data
}

const login = async (userData) => {
    const response = await axios.post('/login', userData)

    return response.data
}

const Logout = async () => {
    const response = await axios.post('/logout')
    return response
}

const editUser = async (userData) => {
    const response = await axios.post('/EditUser', userData)
    return response.data
}

const authServices = {
    register,
    login,
    Logout,
    editUser
}

export default authServices