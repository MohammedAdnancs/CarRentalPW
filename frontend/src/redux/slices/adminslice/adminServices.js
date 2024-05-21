import axios from 'axios'

const getAllUser = async () => {

    const response = await axios.get('/ViewAllUsers')

    return response.data
}

const messageServices = {
    getAllUser,
}

export default messageServices