
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