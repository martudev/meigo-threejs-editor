import { saveAs } from 'file-saver';
import LZString from 'lz-string'
import { setGlobalGrid, setGlobalScene } from 'src/redux/actions';
import * as THREE from 'three'



export default class Project {

    static compressScene({ scene, grid}) {
        if(scene == null) return

        scene.updateMatrixWorld(); // es importante para el tamaño de los componentes
        const result = scene.toJSON();
        const compressed = LZString.compressToUTF16(JSON.stringify({
            scene: result,
            grid: grid
        }))
        return compressed
    }

    static saveSceneAsFile({ scene, grid, fileName }) {
        if(scene == null) return
        if(fileName == null || fileName === '') return

        const output = this.compressScene({ scene, grid })
        var file = new File([output], `${fileName}.obj`, {type: "text/plain;charset=utf-16"});
        saveAs(file)
    }

    static decompressScene(obj) {
        if(obj == null) return

        const stringJson = LZString.decompressFromUTF16(obj)
        return JSON.parse(stringJson)
    }

    static saveSceneAsLocalStorage({ scene, grid  }) {
        if(scene == null) return

        const output = this.compressScene({ scene, grid })
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
        const { grid } = json;
        new THREE.ObjectLoader().parse(scene, (obj) => {
            dispatch(setGlobalScene(obj))
            dispatch(setGlobalGrid(grid))
            callback()
        })
    }

    static CompareAndLoadSceneFromStorage(scene, dispatch) {
        const json = this.getSceneFromLocalStorage()
        
        if (json != null) {
            
            const { grid } = json;
            dispatch(setGlobalGrid(grid))

            const sceneStorage = json.scene
            const sceneParsed = new THREE.ObjectLoader().parse(sceneStorage)

            if (sceneParsed.uuid != scene.uuid) {
                scene = sceneParsed
            }
        }
        return scene
    }

}