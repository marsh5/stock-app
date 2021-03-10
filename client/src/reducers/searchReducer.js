const searchReducer = (state = '', action) => {

    
    switch (action.type){
        case 'SET_STOCK_SEARCH':
            return action.ticker
        default:
            return state
    }
}

export const tickerChange = ticker => {
    return{
        type: 'SET_STOCK_SEARCH',
        ticker
    }
}

export default searchReducer