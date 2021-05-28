import { saveAs } from 'file-saver';
import LZString from 'lz-string'
import { AmbientLightActions } from 'src/redux/AmbientLight/actions';
import { setGrid } from 'src/redux/Grid/actions';
import { Object3DActions } from 'src/redux/Object3D/actions';
import { PointLightActions } from 'src/redux/PointLight/actions';
import { setScene } from 'src/redux/Scene/actions';
import * as THREE from 'three'



export default class Project {

    static compressScene(sceneJson, { grid, ambientLights, pointLights, object3ds }) {
        if(sceneJson == null) return

        const compressed = LZString.compressToUTF16(JSON.stringify({
            scene: sceneJson,
            grid: grid,
            ambientLights: ambientLights,
            pointLights: pointLights,
            object3ds: object3ds,
        }))
        return compressed
    }

    static prepareSceneToSave(scene) {
        scene.updateMatrixWorld()
        return scene.toJSON()
    }

    static saveSceneAsFile({ sceneJson, grid, ambientLights, pointLights, object3ds, fileName }) {
        if(sceneJson == null) return
        if(fileName == null || fileName === '') return

        const output = this.compressScene(sceneJson, { grid, ambientLights, pointLights, object3ds })
        var file = new File([output], `${fileName}.obj`, {type: "text/plain;charset=utf-16"});
        //saveAs(file)
        return file
    }

    static decompressScene(obj) {
        if(obj == null) return

        const stringJson = LZString.decompressFromUTF16(obj)
        return JSON.parse(stringJson)
    }

    static saveSceneAsLocalStorage({ scene, grid, ambientLights, pointLights, object3ds  }) {
        if(scene == null) return

        const sceneJson = this.prepareSceneToSave(scene)
        const output = this.compressScene(sceneJson, { grid, ambientLights, pointLights, object3ds })
        localStorage.setItem('threejsEditor.scene', output)
    }

    static getSceneFromLocalStorage() {
        const sceneString = localStorage.getItem('threejsEditor.scene')
        return this.decompressScene(sceneString)
    }

    static newScene() {
        localStorage.removeItem('threejsEditor.scene')
        location.reload()
    }

    static LoadSceneFromString(callback, string, dispatch) {
        const json = this.decompressScene(string)
        this.LoadScene(() => {
            callback()
        }, json, dispatch)
    }

    static LoadScene(callback, json, dispatch) {
        const { scene } = json;
        new THREE.ObjectLoader().parse(scene, (obj) => {
            dispatch(setScene(obj))
            this.setSceneExternalObjects(json, dispatch)
            callback()
        })
    }

    static CompareAndLoadSceneFromStorage(scene, dispatch) {
        const json = this.getSceneFromLocalStorage()
        
        if (json != null) {
            
            this.setSceneExternalObjects(json, dispatch)

            const sceneStorage = json.scene
            const sceneParsed = new THREE.ObjectLoader().parse(sceneStorage)

            if (sceneParsed.uuid != scene.uuid) {
                scene = sceneParsed
            }
        }
        return scene
    }

    static setSceneExternalObjects(json, dispatch) {
        const { grid } = json;
        const { ambientLights } = json;
        const { pointLights } = json;
        const { object3ds } = json;
        dispatch(setGrid(grid))
        dispatch(AmbientLightActions.SetLights(ambientLights))
        dispatch(PointLightActions.SetLights(pointLights))
        dispatch(Object3DActions.SetObjects(object3ds))
    }

}