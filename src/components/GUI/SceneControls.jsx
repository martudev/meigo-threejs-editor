import { useSelector } from 'react-redux'
import { Color, Button } from 'src/tweakpane-react/Input';
import { Separator } from 'src/tweakpane-react/Separator';
import Folder from '../../tweakpane-react/Folder';
import * as THREE from 'three'
import { setLimitFps, useLimitFps } from 'src/hooks/LimitFps';
import { useRef } from 'react';
import { useEventListener } from 'src/hooks/Listeners';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import JSZip from 'jszip'


const createBlobFromZip = async (zip, key) => {
    const dataArray = await zip.files[key].async('uint8array')
    return new Blob([dataArray])
}

export function SceneControls() {

    const scene = useSelector(store => store.scene)
    const inputRef = useRef()

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
                console.log(url)
                objectURLs.push( url );
                return url;
            });
            const loader = new GLTFLoader(manager)
            loader.load(gltfFileName, (obj) => {
                scene.add(obj.scene)
                objectURLs.forEach( (url) => URL.revokeObjectURL(url) );
            })

        })
        
    }

    useEventListener('change', onLoadModel, inputRef.current)

    const fpsObject = setLimitFps(60)
    const handleSceneBackground = (ev) => {
        useLimitFps(() => {
            scene.background = new THREE.Color(ev.value);
        }, fpsObject)
    }

    const handleLoad3DModel = (ev) => {
        inputRef.current.click()
    }


    return(
        <>
            <input type="file" multiple="multiple" accept=".zip" style={{ display: 'none' }} ref={inputRef}></input>
            <Folder title='Scene' expanded={true}>
                <Button title='Load 3d Model' onClick={handleLoad3DModel} />
                <Separator />
                <Color color={scene.background} name='background' onChange={handleSceneBackground} />
            </Folder>
        </>
    );
}