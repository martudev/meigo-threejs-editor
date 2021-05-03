import { createStore } from 'redux'
import { SET_GLOBAL_SCENE } from './actions'


const defaultState = {
    scene: undefined
}

const reducer = (state = defaultState, action) => {
    switch(action.type) {
        case SET_GLOBAL_SCENE:
            return {
                scene: action.data
            }
        default:
            return state;
    }
}

export default createStore(reducer)