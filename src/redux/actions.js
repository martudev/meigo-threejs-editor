
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
export const AddAmbientLight = () => ({
    type: 'ADD_AMBIENT_LIGHT'
});

export const ResetAmbientLight = () => ({
    type: 'RESET_AMBIENT_LIGHT'
});

export const RemoveAmbientLight = (id) => ({
    type: 'REMOVE_AMBIENT_LIGHT',
    id: id
});


/* POINT LIGHT */
export const AddPointLight = () => ({
    type: 'ADD_POINT_LIGHT'
});

export const ResetPointLight = () => ({
    type: 'RESET_POINT_LIGHT'
});

export const RemovePointLight = (id) => ({
    type: 'REMOVE_POINT_LIGHT',
    id: id
});


/* OBJECT 3D */
export const AddObject3D = (obj) => ({
    type: 'ADD_OBJECT_3D',
    obj: obj
});

export const ResetObject3D = () => ({
    type: 'RESET_OBJECT_3D'
});

export const RemoveObject3D = (id) => ({
    type: 'REMOVE_OBJECT_3D',
    id: id
});