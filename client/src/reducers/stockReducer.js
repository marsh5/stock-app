const stockReducer = (state = [], action) => {
    switch(action.type){
        case 'FOUND_STOCK':
            return action.data
    default:
        return state
    }
}

export const foundStock = (data) => {
    return {
        type: 'FOUND_STOCK',
        data
    }
}

export default stockReducer;

