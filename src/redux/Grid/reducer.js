
const defaultState = {
    value: {
        x: 10,
        y: 10
    }
}

const reducer = (state = defaultState, action) => {
    if (action.class == 'GRID') {
        switch(action.type) {
            case 'SET':
                return {
                    ...state,
                    value: {
                        x: action.data.x,
                        y: action.data.y
                    }
                }
            default:
                return state;
        }
    }
    return state;
}

export default reducer