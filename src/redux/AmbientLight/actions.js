

const CLASS = 'AMBIENT_LIGHT'

export class AmbientLightActions {
    static Add = ({ name = undefined, light = undefined } = {}) => ({
        class: CLASS,
        type: 'ADD',
        data: {
            name,
            light
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

    static SetLights = (data) => ({
        class: CLASS,
        type: 'SET_LIGHTS',
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