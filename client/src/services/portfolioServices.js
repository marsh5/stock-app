const baseUrl = '/portfolio'

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
    }
}

const stockCheck = async (ticker) => {
    try {
        const res = await fetch(`${baseUrl}/stockcheck`,{
            method: "GET",
            headers: { token: localStorage.token,
            ticker}
        })
        const parseRes = await res.json();
        return parseRes;
        
    } catch (err) {
        console.error(err.message)
        return false;
    }
}

const addStock = async (ticker) => {
    try {
        
        
        const res = await fetch(`${baseUrl}/add`, {
            method: "POST",
            headers: { "Content-Type": "application/json", token: localStorage.token},
            body: JSON.stringify({ticker})
        });
        const parseRes = await res.json();
        return parseRes;

    } catch (err) {
        console.error(err.message)
       }
}

const removeStock = async (ticker) => {
    try {
        const res = await fetch(`${baseUrl}/remove`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json", token: localStorage.token},
            body: JSON.stringify({ticker})
        });
        const parseRes = await res.json();
        return parseRes;
    } catch (err) {
        console.error(err.message)
    }
}



export default { getPortfolio, stockCheck, addStock, removeStock }