
const CLASS = 'POINT_LIGHT'

export class PointLightActions {
    static Add = ({ name = undefined } = {}) => ({
        class: CLASS,
        type: 'ADD',
        data: {
            name
        }
    });
    
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