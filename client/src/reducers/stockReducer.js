const stockReducer = (state = [], action) => {
    switch(action.type){
        case 'FOUND_STOCK':
            return action.data
    default:
        return []
    }
}

export const foundStock = (data) => {
    console.log('count')
    return {
        type: 'FOUND_STOCK',
        data
    }
}

export default stockReducer;