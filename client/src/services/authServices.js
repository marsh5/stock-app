import axios from 'axios';

const baseUrl = 'http://localhost:3003/auth'

const isVerify = async () => {
    try {
        
        const response = await axios.get(`${baseUrl}/is-verify`, {
            // headers: {token: localStorage.token}
            headers: {token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiY2UyNzNjY2ItMTZkMy00MTdmLTlmZTktMTc3YWVjN2VhNThjIiwiaWF0IjoxNjE4OTU0NzkzLCJleHAiOjE2MTg5NTgzOTN9.40wqtTN85rtWQavvXA7yPHAFeNnZPMaF4erymiTYh7w'}
        });

        console.log(response);
        return response.data;

        // const response = await axios.get(`${baseUrl}/financials/${ticker}`);


    } catch (err) {
        console.log('isVerify error')
        console.error(err.message)
    }
    
}

export default { isVerify }