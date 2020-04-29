import axios from 'axios';
import endpoints from '../config/endpoints'
const { BASE_API } = endpoints;

const getFolders = async () => {
    let folders = await axios.get(`${BASE_API}/folders`)
    return folders || []
}

const getFolder = async (id) => {
    let folder = await axios.get(`${BASE_API}/folders/${id}`)
    return folder.data || null
}

export { getFolders, getFolder }