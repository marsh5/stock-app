const authReducer = (state = false, action) => {

    
    switch (action.type){
        case 'SETISAUTH':
            return action.boolean
        default:
            return state
    }
}

export const isAuthenticated = (boolean) => {
    return{
        type: 'SETISAUTH',
        boolean: boolean
    }
}

export default authReducer