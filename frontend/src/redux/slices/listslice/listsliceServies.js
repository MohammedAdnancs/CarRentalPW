import axios from 'axios'


const getalllistings = async () => {
    const response = await axios.get('/ViewAllListing')
    return response.data
}

const listServices = {
    getalllistings,
}

export default listServices