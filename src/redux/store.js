import { createStore, combineReducers } from 'redux'
import sceneReducer from './Scene/reducer'
import cameraReducer from './Camera/reducer'
import controlsReducer from './Controls/reducer'
import rendererReducer from './Renderer/reducer'
import gridReducer from './Grid/reducer'
import ambientLightReducer from './AmbientLight/reducer'
import pointLightReducer from './PointLight/reducer'
import object3DReducer from './Object3D/reducer'

const rootReducer = combineReducers({
    scene: sceneReducer,
    camera: cameraReducer,
    controls: controlsReducer,
    renderer: rendererReducer,
    grid: gridReducer,
    AmbientLight: ambientLightReducer,
    PointLight: pointLightReducer,
    Object3D: object3DReducer,
})

export default createStore(rootReducer)