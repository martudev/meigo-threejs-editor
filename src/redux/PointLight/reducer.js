
const defaultState = {
    value: {
        objects: []
    }
}

const reducer = (state = defaultState, action) => {
    if (action.class == 'POINT_LIGHT') {
        switch(action.type) {
            case 'ADD':
                var objects = [...state.value.objects]
                var lastObj = objects[objects.length-1]
                var currentId = 1
                if (lastObj != null) currentId = lastObj.id + 1
                var name = action.data.name
                if (name == null) name = 'PointLight' + currentId
                var uuid = action.data.light.uuid
                var array = [
                    {
                        id: currentId,
                        name: name,
                        uuid: uuid,
                        helper: action.data.helper
                    }
                ]
                state.value.objects = [...objects, ...array]
                return {
                    ...state
                }
            case 'SET_NAME':
                var objects = [...state.value.objects]
                var obj = objects.find(obj => obj.id == action.data.id)
                if (obj != null) {
                    var index = objects.indexOf(obj)
                    obj.name = action.data.name
                    state.value.objects[index] = obj
                }
                return {
                    ...state
                }
            case 'SET_HELPER_COLOR':
                var objects = [...state.value.objects]
                var obj = objects.find(obj => obj.id == action.data.id)
                if (obj != null) {
                    var index = objects.indexOf(obj)
                    obj.helper.color = action.data.color
                    state.value.objects[index] = obj
                }
                return {
                    ...state
                }
            case 'SET_LIGHTS':
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