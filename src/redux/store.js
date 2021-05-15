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
            objects: [
                {id: 1, name: 'AmbientLight1'},
            ],
            idToRemove: 0
        },
        PointLight: {
            objects: [],
            idToRemove: 0
        },
        Object3D: {
            objects: [],
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
            var objects = [...state.added_objects.AmbientLight.objects]
            var lastObj = objects[objects.length-1]
            var currentId = 1
            if (lastObj != null) currentId = lastObj.id + 1
            var name = action.data.name
            if (name == null) name = 'AmbientLight' + currentId
            var array = [
                {
                    id: currentId,
                    name: name
                }
            ]
            state.added_objects.AmbientLight.objects = [...state.added_objects.AmbientLight.objects, ...array]
            return {
                ...state
            }
        case 'REMOVE_AMBIENT_LIGHT':
            var objects = [...state.added_objects.AmbientLight.objects]
            var obj = objects.find(obj => obj.id == action.data.id)
            objects.splice(objects.indexOf(obj), 1)
            state.added_objects.AmbientLight.objects = objects
            state.added_objects.AmbientLight.idToRemove = obj.id
            return {
                ...state
            }
        case 'ADD_POINT_LIGHT':
            var objects = [...state.added_objects.PointLight.objects]
            var lastObj = objects[objects.length-1]
            var currentId = 1
            if (lastObj != null) currentId = lastObj.id + 1
            var name = action.data.name
            if (name == null) name = 'PointLight' + currentId
            var array = [
                {
                    id: currentId,
                    name: name
                }
            ]
            state.added_objects.PointLight.objects = [...state.added_objects.PointLight.objects, ...array]
            return {
                ...state
            }
        case 'REMOVE_POINT_LIGHT':
            var objects = [...state.added_objects.PointLight.objects]
            var obj = objects.find(obj => obj.id == action.data.id)
            objects.splice(objects.indexOf(obj), 1)
            state.added_objects.PointLight.objects = objects
            state.added_objects.PointLight.idToRemove = obj.id
            return {
                ...state
            }
        case 'ADD_OBJECT_3D':
            var objects = [...state.added_objects.Object3D.objects]
            var lastObj = objects[objects.length-1]
            var currentId = 1
            if (lastObj != null) currentId = lastObj.id + 1
            var name = action.data.name
            if (name == null) name = 'Object3D' + currentId
            var array = [
                {
                    id: currentId,
                    name: name,
                    object: action.data.obj
                }
            ]
            state.added_objects.Object3D.objects = [...state.added_objects.Object3D.objects, ...array]
            return {
                ...state
            }
        case 'REMOVE_OBJECT_3D':
            var objects = [...state.added_objects.Object3D.objects]
            var obj = objects.find(obj => obj.id == action.data.id)
            objects.splice(objects.indexOf(obj), 1)
            state.added_objects.Object3D.objects = objects
            state.added_objects.Object3D.idToRemove = obj.id
            return {
                ...state
            }
        default:
            return state;
    }
}

export default createStore(reducer)