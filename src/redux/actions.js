
export const setGlobalScene = (scene) => ({
    type: 'SET_GLOBAL_SCENE',
    data: scene
});

export const setGlobalCamera = (camera) => ({
    type: 'SET_GLOBAL_CAMERA',
    data: camera
});

export const setGlobalControls= (controls) => ({
    type: 'SET_GLOBAL_CONTROLS',
    data: controls
});

export const setGlobalRenderer = (renderer) => ({
    type: 'SET_GLOBAL_RENDERER',
    data: renderer
});

export const setGlobalGrid = (grid) => ({
    type: 'SET_GLOBAL_GRID',
    data: grid
});


/* AMBIENT LIGHT */
export const AddAmbientLight = ({ name = undefined } = {}) => ({
    type: 'ADD_AMBIENT_LIGHT',
    data: {
        name
    }
});

export const RemoveAmbientLight = (id) => ({
    type: 'REMOVE_AMBIENT_LIGHT',
    data: {
        id
    }
});


/* POINT LIGHT */
export const AddPointLight = ({ name = undefined } = {}) => ({
    type: 'ADD_POINT_LIGHT',
    data: {
        name
    }
});

export const RemovePointLight = (id) => ({
    type: 'REMOVE_POINT_LIGHT',
    data: {
        id
    }
});


/* OBJECT 3D */
export const AddObject3D = ({ name = undefined, obj = undefined } = {}) => ({
    type: 'ADD_OBJECT_3D',
    data: {
        name,
        obj
    }
});

export const RemoveObject3D = (id) => ({
    type: 'REMOVE_OBJECT_3D',
    data: {
        id
    }
});