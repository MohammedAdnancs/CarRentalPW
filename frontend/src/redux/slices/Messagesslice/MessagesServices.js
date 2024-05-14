import axios from 'axios'

const getUserContacts = async (userData) => {

    const response = await axios.get('/Gettheusersinconversations', userData)

    return response.data
}

const getUserMessages = async (userData) => {

    const response = await axios.post('/Getmessages', userData)

    return response.data
}

const SendUserMessages = async (userData) => {

    const response = await axios.post('/Send', userData)

    return response.data
}

const messageServices = {
    getUserContacts,
    getUserMessages,
    SendUserMessages
}

export default messageServices