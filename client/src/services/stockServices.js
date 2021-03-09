import axios from 'axios';

const baseUrl = 'http://localhost:3003/api'

const getStockData = async (ticker) => {
    try {
        const response = await axios.get(`${baseUrl}/financials/${ticker}`);
        return response.data;
    } catch (error) {
        console.log(error)
    }
    
   
}

export default { getStockData }