import LZString from 'lz-string'
import { AmbientLightActions } from 'src/redux/AmbientLight/actions';
import { setGrid } from 'src/redux/Grid/actions';
import { Object3DActions } from 'src/redux/Object3D/actions';
import { PointLightActions } from 'src/redux/PointLight/actions';
import { setScene } from 'src/redux/Scene/actions';
import * as THREE from 'three'
import Worker from 'src/workers/decompress.worker'



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
        return file
    }

    static async decompressScene(obj) {
        return new Promise((resolve, reject) => {
            if(obj == null) {
                reject()
                return
            }

            const worker = new Worker()
            worker.postMessage(obj)

            worker.addEventListener('message', (event) => {
                resolve(JSON.parse(event.data))
            })
        })
    }

    static saveSceneAsLocalStorage({ scene, grid, ambientLights, pointLights, object3ds  }) {
        if(scene == null) return

        const sceneJson = this.prepareSceneToSave(scene)
        const output = this.compressScene(sceneJson, { grid, ambientLights, pointLights, object3ds })
        localStorage.setItem('threejsEditor.scene', output)
    }

    static async getSceneFromLocalStorage() {
        const sceneString = localStorage.getItem('threejsEditor.scene')
        return await this.decompressScene(sceneString)
    }

    static newScene() {
        localStorage.removeItem('threejsEditor.scene')
        location.reload()
    }

    static async LoadSceneFromString(callback, string, dispatch) {
        const json = await this.decompressScene(string)
        this.LoadScene(() => {
            callback()
        }, json, dispatch)
    }

    static LoadScene(callback, json, dispatch) {
        const { scene } = json
        const objLoader = new THREE.ObjectLoader()
        objLoader.parse(scene, (obj) => {
            dispatch(setScene(obj))
            this.setSceneExternalObjects(json, dispatch)
            callback()
        })
    }

    static async CompareAndLoadSceneFromStorage(scene, dispatch) {
        const json = await this.getSceneFromLocalStorage()
        
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


    static ReadFileAndLoadScene(callback, file, dispatch) {
        const onLoadScene = (event) => {
            const string = event.target.result
            this.LoadSceneFromString(callback, string, dispatch)
        }

        const reader = new FileReader()
        reader.onload = onLoadScene
        reader.readAsText(file, 'text/plain;charset=utf-16')
    }

}