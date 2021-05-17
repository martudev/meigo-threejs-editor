
const defaultState = {
    value: {
        objects: []
    }
}

const reducer = (state = defaultState, action) => {
    if (action.class == 'OBJECT_3D') {
        switch(action.type) {
            case 'ADD':
            var objects = [...state.value.objects]
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
            state.value.objects = [...objects, ...array]
            return {
                ...state
            }
        case 'SET_OBJECTS':
            state.value.objects = action.data
            return {
                ...state
            }
        case 'REMOVE':
            var objects = [...state.value.objects]
            var obj = objects.find(obj => obj.id == action.data.id)
            objects.splice(objects.indexOf(obj), 1)
            state.value.objects = objects
            return {
                ...state
            }
            default:
                return state;
        }
    }
    return state;
}

export default reducer