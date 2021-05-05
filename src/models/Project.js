import { saveAs } from 'file-saver';



export default class Project {

    static getStringScene(scene) {
        scene.updateMatrixWorld(); // es importante para el tamaño de los componentes
        const result = scene.toJSON();
        return JSON.stringify(result);
    }

    static saveSceneAsFile(scene, fileName) {
        if(scene == null) return
        if(fileName == null || fileName === '') return

        const output = this.getStringScene(scene)
        var file = new File([output], `${fileName}.json`, {type: "aplication/json;charset=utf-8"});
        saveAs(file)
    }

    static saveSceneAsLocalStorage(scene) {
        const output = this.getStringScene(scene)
        localStorage.setItem('threejsEditor.scene', output)
    }

    static getSceneFromLocalStorage() {
        const sceneString = localStorage.getItem('threejsEditor.scene')
        return JSON.parse(sceneString)
    }

}