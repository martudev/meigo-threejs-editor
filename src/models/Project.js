import { saveAs } from 'file-saver';
import LZString from 'lz-string'



export default class Project {

    static getStringScene(scene) {
        if(scene == null) return

        scene.updateMatrixWorld(); // es importante para el tamaño de los componentes
        const result = scene.toJSON();
        const string = JSON.stringify(result);
        return LZString.compressToUTF16(string)
    }

    static saveSceneAsFile(scene, fileName) {
        if(scene == null) return
        if(fileName == null || fileName === '') return

        const output = this.getStringScene(scene)
        var file = new File([output], `${fileName}.obj`, {type: "text/plain;charset=utf-16"});
        saveAs(file)
    }

    static getSceneFromString(sceneString) {
        if(sceneString == null) return

        const stringJson = LZString.decompressFromUTF16(sceneString)
        return JSON.parse(stringJson)
    }

    static saveSceneAsLocalStorage(scene) {
        if(scene == null) return

        const output = this.getStringScene(scene)
        localStorage.setItem('threejsEditor.scene', output)
    }

    static getSceneFromLocalStorage() {
        const sceneString = localStorage.getItem('threejsEditor.scene')
        return this.getSceneFromString(sceneString)
    }

    static newScene() {
        localStorage.removeItem('threejsEditor.scene')
        location.reload()
    }

}