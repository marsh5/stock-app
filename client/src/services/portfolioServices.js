const baseUrl = 'http://localhost:3003/auth'

const getPortfolio = async () => {
    try {
        
        const response = await fetch("http://localhost:3003/portfolio/name",{
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

export default { getPortfolio }