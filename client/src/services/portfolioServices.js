const baseUrl = 'http://localhost:3003/portfolio'

const getPortfolio = async () => {
    try {
        
        const response = await fetch(`${baseUrl}/name`,{
                method: "GET",
                headers: { token: localStorage.token }
        })

        const parseRes = await response.json();
        return parseRes;

    } catch (err) {
        console.error(err.message)
        return err;
        //return []
    }
}

const stockCheck = async (ticker) => {
    try {
        console.log('AHHHHHH')
        const res = await fetch(`${baseUrl}/stockcheck`,{
            method: "GET",
            headers: { token: localStorage.token,
            ticker}
        })
        const parseRes = await res.json();
        console.log('stockCheck response:', parseRes)
        return parseRes;
        
    } catch (err) {
        console.error(err.message)
        return false;
    }
}

export default { getPortfolio, stockCheck }