import axios from 'axios';

const baseUrl = '/api'

const getStockData = async (ticker) => {
    try {
        const response = await axios.get(`${baseUrl}/financials/${ticker}`);
        return response.data;
    } catch (error) {
        console.error(error)
        return [];
    }
    
}

export default { getStockData }