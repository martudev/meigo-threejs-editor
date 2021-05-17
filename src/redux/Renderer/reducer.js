
const defaultState = {
    value: undefined
}

const reducer = (state = defaultState, action) => {
    if (action.class == 'RENDERER') {
        switch(action.type) {
            case 'SET':
                return {
                    ...state,
                    value: action.data
                }
            default:
                return state;
        }
    }
    return state;
}

export default reducer