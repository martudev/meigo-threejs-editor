import { createStore } from 'redux'


const defaultState = {
    scene: undefined,
    camera: undefined,
    controls: undefined,
    renderer: undefined,
    added_objects: {
        AmbientLight: {
            idToAdd: 1,
            idToRemove: 0
        }
    }
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
        case 'ADD_AMBIENT_LIGHT':
            const prevId = state.added_objects.AmbientLight.idToAdd
            state.added_objects.AmbientLight.idToAdd = prevId + 1
            return {
                ...state
            }
        case 'REMOVE_AMBIENT_LIGHT':
            state.added_objects.AmbientLight.idToRemove = action.id
            return {
                ...state
            }
        case 'RESET_AMBIENT_LIGHT':
            state.added_objects.AmbientLight.idToAdd = 0
            return {
                ...state
            }
        default:
            return state;
    }
}

export default createStore(reducer)