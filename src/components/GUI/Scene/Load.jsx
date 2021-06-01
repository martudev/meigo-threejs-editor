import { useDispatch, useSelector } from 'react-redux'
import Folder from "src/tweakpane-react/Folder";
import { Button } from "src/tweakpane-react/Input";
import { useRef } from 'react';
import { useEventListener } from 'src/hooks/Listeners';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as THREE from 'three'
import JSZip from 'jszip'
import Project from 'src/models/Project';
import { Object3DActions } from 'src/redux/Object3D/actions';


const createBlobFromZip = async (zip, key) => {
    const dataArray = await zip.files[key].async('uint8array')
    return new Blob([dataArray])
}

export default function Load() {

    const dispatch = useDispatch()
    const scene = useSelector(store => store.scene.value)

    const inputZipRef = useRef()
    const inputObjRef = useRef()

    const onLoadModel = (ev) => {

        const jszip = new JSZip()
        jszip.loadAsync(ev.target.files[0]).then(async (zip) => {
            const blobs = {}

            const files = zip.files
            const zipFilesKeys = Object.keys(files)
            const gltfFileName = zipFilesKeys.find(key => key.includes('.gltf'))
            if (gltfFileName == null) return

            blobs[gltfFileName] = await createBlobFromZip(zip, gltfFileName)

            const filteredKeys = zipFilesKeys.filter(key => !key.includes('.gltf'))
            for (const key of filteredKeys) {
                const key2 = `./${key}`
                blobs[key2] = await createBlobFromZip(zip, key)
            }
            
            const manager = new THREE.LoadingManager();
            const objectURLs = [];
            manager.setURLModifier((url) => {
                url = URL.createObjectURL(blobs[url]);
                objectURLs.push( url );
                return url;
            });
            const loader = new GLTFLoader(manager)
            loader.load(gltfFileName, (obj) => {
                obj.scene.type = 'Object3D'
                scene.add(obj.scene)
                dispatch(Object3DActions.Add({ obj: obj.scene }))
                objectURLs.forEach( (url) => URL.revokeObjectURL(url) );
                inputZipRef.current.value = '' // IMPORTANT cleaning the input type file
            })

        })
        
    }

    useEventListener('change', onLoadModel, inputZipRef)

    const onLoadScene = (event) => {
        const string = event.target.result
        /*Project.LoadSceneFromString(() => {
            inputObjRef.current.value = '' // IMPORTANT cleaning the input type file
        }, string, dispatch)*/
    }

    const onInputObjChange = (ev) => {
        const fileList = ev.target.files;
        var reader = new FileReader()
        reader.onload = onLoadScene
        reader.readAsText(fileList[0], 'text/plain;charset=utf-16')
    }

    useEventListener('change', onInputObjChange, inputObjRef)

    const handleLoad3DModel = (ev) => {
        inputZipRef.current.click()
    }

    const handleLoadScene = (ev) => {
        inputObjRef.current.click()
    }

    return(
        <>
            <input type="file" accept=".zip" style={{ display: 'none' }} ref={inputZipRef}></input>
            <input type="file" accept=".obj" style={{ display: 'none' }} ref={inputObjRef}></input>
            <Folder title='Load'>
                <Button title='Load scene' onClick={handleLoadScene} />
                <Button title='Load 3d Model' onClick={handleLoad3DModel} />
            </Folder>
        </>
    )
}