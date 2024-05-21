import axios from 'axios'


const getalllistings = async () => {
    const response = await axios.get('/ViewAllListing')

    return response.data
}

const DeleteListing = async (ListData) => {
    const response = await axios.post('/DeleteListing',ListData)

    return response.data
}

const listServices = {
    getalllistings,
    DeleteListing,
}

export default listServices