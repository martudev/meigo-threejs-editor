import { createStore } from 'redux'


const defaultState = {
    scene: undefined,
    camera: undefined,
    controls: undefined,
    renderer: undefined,
    grid: {
        x: 10,
        y: 10
    },
    added_objects: {
        AmbientLight: {
            idToAdd: 1,
            idToRemove: 0
        },
        PointLight: {
            idToAdd: 0,
            idToRemove: 0
        },
        Object3D: {
            idToAdd: 0,
            object: undefined,
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
        case 'SET_GLOBAL_GRID':
            return {
                ...state,
                grid: {
                    x: action.data.x,
                    y: action.data.y
                }
            }
        case 'ADD_AMBIENT_LIGHT':
            var prevId = state.added_objects.AmbientLight.idToAdd
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
        case 'ADD_POINT_LIGHT':
            var prevId = state.added_objects.PointLight.idToAdd
            state.added_objects.PointLight.idToAdd = prevId + 1
            return {
                ...state
            }
        case 'REMOVE_POINT_LIGHT':
            state.added_objects.PointLight.idToRemove = action.id
            return {
                ...state
            }
        case 'RESET_POINT_LIGHT':
            state.added_objects.PointLight.idToAdd = 0
            return {
                ...state
            }
        case 'ADD_OBJECT_3D':
            var prevId = state.added_objects.Object3D.idToAdd
            state.added_objects.Object3D.idToAdd = prevId + 1
            state.added_objects.Object3D.object = action.obj
            return {
                ...state
            }
        case 'REMOVE_OBJECT_3D':
            state.added_objects.Object3D.idToRemove = action.id
            return {
                ...state
            }
        case 'RESET_OBJECT_3D':
            state.added_objects.Object3D.idToAdd = 0
            state.added_objects.Object3D.object = null
            return {
                ...state
            }
        default:
            return state;
    }
}

export default createStore(reducer)