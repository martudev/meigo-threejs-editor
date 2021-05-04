import { createStore } from 'redux'


const defaultState = {
    scene: undefined,
    camera: undefined,
    controls: undefined,
    renderer: undefined
}

const reducer = (state = defaultState, action) => {
    switch(action.type) {
        case 'SET_GLOBAL_SCENE':
            return {
                ...state,
                scene: action.data
            }
        case 'SET_GLOBAL_CAMERA':
            return {
                ...state,
                camera: action.data
            }
        case 'SET_GLOBAL_CONTROLS':
            return {
                ...state,
                controls: action.data
            }
        case 'SET_GLOBAL_RENDERER':
            return {
                ...state,
                renderer: action.data
            }
        default:
            return state;
    }
}

export default createStore(reducer)