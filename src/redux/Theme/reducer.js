
const defaultState = {
    value: 'light'
}

const reducer = (state = defaultState, action) => {
    if (action.class == 'THEME') {
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