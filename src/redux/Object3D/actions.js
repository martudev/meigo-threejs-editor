
const CLASS = 'OBJECT_3D'

export class Object3DActions {

    static Add = ({ name = undefined, obj = undefined } = {}) => ({
        class: CLASS,
        type: 'ADD',
        data: {
            name,
            obj
        }
    })

    static SetName = (id, name) => ({
        class: CLASS,
        type: 'SET_NAME',
        data: {
            id,
            name
        }
    })
    
    static SetObjects = (data) => ({
        class: CLASS,
        type: 'SET_OBJECTS',
        data: data
    })
    
    static Remove = (id) => ({
        class: CLASS,
        type: 'REMOVE',
        data: {
            id
        }
    })
}