const loadingReducer = (state = true, action) => {

    
    switch (action.type){
        case 'SETLOADING':
            return action.loading
        default:
            return state
    }
}

export const isLoading = (loading) => {
    return{
        type: 'SETLOADING',
        loading: loading
    }
}

export default loadingReducer