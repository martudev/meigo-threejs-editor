
const CLASS = 'POINT_LIGHT'

export class PointLightActions {
    static Add = ({ name = undefined, light = undefined, helper = undefined } = {}) => ({
        class: CLASS,
        type: 'ADD',
        data: {
            name,
            light,
            helper
        }
    });

    static SetName = (id, name) => ({
        class: CLASS,
        type: 'SET_NAME',
        data: {
            id,
            name
        }
    })

    static SetHelperColor = (id, color) => ({
        class: CLASS,
        type: 'SET_HELPER_COLOR',
        data: {
            id,
            color
        }
    })
    
    static SetLights = (data) => ({
        class: CLASS,
        type: 'SET_LIGHTS',
        data: data
    });
    
    static Remove = (id) => ({
        class: CLASS,
        type: 'REMOVE',
        data: {
            id
        }
    });
}