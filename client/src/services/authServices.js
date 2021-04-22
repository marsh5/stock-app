import axios from 'axios';

const baseUrl = 'http://localhost:3003/auth'

const isVerify = async () => {
    try {
        
        const response = await axios.get(`${baseUrl}/is-verify`, {
            headers: {token: localStorage.token}
            // headers: {token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiY2UyNzNjY2ItMTZkMy00MTdmLTlmZTktMTc3YWVjN2VhNThjIiwiaWF0IjoxNjE4OTY5NDc3LCJleHAiOjE2MTg5NzMwNzd9.DqEskDqrNqshE0ZRkm5ZB2_M7sbVZV21hEUyQO8JBP41'}
        });

        console.log(response);
        return response.data;

        // const response = await axios.get(`${baseUrl}/financials/${ticker}`);


    } catch (err) {
        console.log('isVerify error')
        console.error(err.message)
    }
    
}

const postLogin = async (email, password) => {
    try {
        const body = {email, password}

        const response = await axios.post(`${baseUrl}/login`, body, {
            headers: {"Content-Type": "application/json"},
        });
        return response.data;

        
    } catch (err) {
        console.error(err.message)
        return err;
    }
}

const postRegister = async (name, email, password) => {
    try {
        const body = {name, email, password}

        // const response = await axios.post(`${baseUrl}/register`, body)

        const response = await fetch(`${baseUrl}/register`, {
               method: "POST",
               headers: { "Content-Type": "application/json"},
               body: JSON.stringify(body)
           });

        const parseRes = await response.json();


        console.log('parseRes', parseRes)
        return parseRes;

    } catch (err) {
        console.error(err.message)
        return err;
    }
}

export default { isVerify, postLogin, postRegister }