import { useDispatch, useSelector } from 'react-redux'
import Folder from "src/tweakpane-react/Folder";
import { Button } from "src/tweakpane-react/Input";
import { useRef, useState } from 'react';
import { useEventListener } from 'src/hooks/Listeners';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as THREE from 'three'
import JSZip from 'jszip'
import Project from 'src/models/Project';
import { Object3DActions } from 'src/redux/Object3D/actions';
import LoadScene from 'src/components/LoadScene';


const createBlobFromZip = async (zip, key) => {
    const dataArray = await zip.files[key].async('uint8array')
    return new Blob([dataArray])
}

export default function Load() {

    const dispatch = useDispatch()
    const scene = useSelector(store => store.scene.value)

    const LoadScene_Text = 'Load scene'
    const Load3dModel_Text = 'Load 3d Model'
    const [loadSceneText, setLoadSceneText] = useState(LoadScene_Text)
    const [load3dModelText, setLoad3dModelText] = useState(Load3dModel_Text)

    const inputZipRef = useRef()
    const inputObjRef = useRef()

    const onLoadModel = (ev) => {
        setLoad3dModelText('Loading...')

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
                setLoad3dModelText(Load3dModel_Text)
            })

        })
        
    }

    useEventListener('change', onLoadModel, inputZipRef)

    const onLoadSceneDone = () => {
        setLoadSceneText(LoadScene_Text)
    }

    const onLoadingScene = (ev) => {
        setLoadSceneText('Loading...')
    }

    const handleLoad3DModel = (ev) => {
        inputZipRef.current.click()
    }

    return(
        <>
            <input type="file" accept=".zip" style={{ display: 'none' }} ref={inputZipRef}></input>
            <input type="file" accept=".obj" style={{ display: 'none' }} ref={inputObjRef}></input>
            <Folder title='Load'>
                <LoadScene onLoading={onLoadingScene} onDone={onLoadSceneDone}>
                    <Button title={loadSceneText} />
                </LoadScene>
                <Button title={load3dModelText} onClick={handleLoad3DModel} />
            </Folder>
        </>
    )
}