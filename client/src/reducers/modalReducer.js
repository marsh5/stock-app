const modalReducer = (state = 'none', action) => {
    switch(action.type){
        case 'login':
            return 'login'
        case 'register':
            return 'register'
        case 'none':
            return 'none'
    default:
        return state
    }
}

export const modalDisplay = (type) => {
    return {
        type
    }
}

export default modalReducer;