import axios from 'axios';

const baseUrl = '/api'

const getStockData = async (ticker) => {
    try {
        const response = await axios.get(`${baseUrl}/financials/${ticker}`);
        return response.data;
    } catch (error) {
        console.log(error)
        return [];
    }
    
}

export default { getStockData }