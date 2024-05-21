import axios from 'axios'

const getAllUser = async () => {

    const response = await axios.get('/ViewAllUsers')

    return response.data
}

const DeleteUser = async (UserData) => {
    const response = await axios.post('/DeleteUser',UserData)

    return response.data
}

const messageServices = {
    getAllUser,
    DeleteUser,
}

export default messageServices