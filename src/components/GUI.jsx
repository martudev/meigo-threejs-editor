import Pane from '../tweakpane-react/Pane';
import Folder from '../tweakpane-react/Folder';
import { Color, Button } from 'src/tweakpane-react/Input';
import * as THREE from 'three'
import { Separator } from 'src/tweakpane-react/Separator';
import { useLayoutEffect, useState, useEffect } from 'react';
import { Point3D } from 'src/tweakpane-react/Input';
import { useLimitFps } from 'src/hooks/LimitFps';
import { setLimitFps } from 'src/hooks/LimitFps';


export default function GUI({ scene, camera, controls }) {

    const [container, setContainer] = useState(null)
    const [popUpWindow, setPopUpWindow] = useState(null)
    const [cameraPosition, setCameraPosition] = useState({
        x:camera.position.x,
        y:camera.position.y,
        z:camera.position.z
    })
    const [cameraRotation, setCameraRotation] = useState({
        x:camera.rotation.x * 180 / Math.PI,
        y:camera.rotation.y * 180 / Math.PI,
        z:camera.rotation.z * 180 / Math.PI
    })

    useLayoutEffect(() => {
        const controls = document.getElementById('controls')
        setContainer(controls)
    }, [])

    const refreshCameraValues = () => {

        const fpsObject = setLimitFps(30)

        const change = (ev) => {
            useLimitFps(() => {
                setCameraPosition({
                    x: camera.position.x,
                    y: camera.position.y,
                    z: camera.position.z
                })
                setCameraRotation({
                    x: camera.rotation.x * 180 / Math.PI,
                    y: camera.rotation.y * 180 / Math.PI,
                    z: camera.rotation.z * 180 / Math.PI
                })
            }, fpsObject)
        }

        controls.addEventListener('change', change)

        return () => {
            controls.removeEventListener('change', change)
        }
    }

    useEffect(refreshCameraValues, [])

    const handleCameraPosition_fpsObject = setLimitFps(60)
    const handleCameraPosition = (ev) => {
        useLimitFps(() => {
            camera.position.x = ev.value.x
            camera.position.y = ev.value.y
            camera.position.z = ev.value.z
        }, handleCameraPosition_fpsObject)
    }

    const handleCameraRotation_fpsObject = setLimitFps(60)
    const handleCameraRotation = (ev) => {
        useLimitFps(() => {
            camera.rotation.x = ev.value.x/180*Math.PI
            camera.rotation.y = ev.value.y/180*Math.PI
            camera.rotation.z = ev.value.z/180*Math.PI
        }, handleCameraRotation_fpsObject)
    }

    const handleSceneBackground_fpsObject = setLimitFps(60)
    const handleSceneBackground = (ev) => {
        useLimitFps(() => {
            scene.background = new THREE.Color(ev.value);
        }, handleSceneBackground_fpsObject)
    }

    const handleLoadScene = (ev) => {
        console.log('load scene..')
    }

    const handleSaveScene = (ev) => {
        console.log('save scene..')
    }

    const handleLoad3DModel = (ev) => {
        console.log('load 3d..')
    }

    const handleOpenConfInNewWindow = (ev) => {
        const custom = window.open("", "", `width=${window.innerWidth},height=${window.innerHeight}`)
        const style = document.querySelector('style[data-tp-style]')
        custom.document.head.appendChild(style)
        const div = custom.document.createElement('div')
        div.id = 'controls'
        const controls = custom.document.body.appendChild(div)
        setPopUpWindow(custom)
        setContainer(controls)
    }

    const handleCloseConfWindow = (ev) => {
        const controls = document.getElementById('controls')
        setContainer(controls)
        popUpWindow.close()
        setPopUpWindow(null)
    }

    return(
        <>
            <div id="controls"></div>
            <Pane title='Meigo Editor - Tweakpane' expanded={true} container={container}>
                {!popUpWindow && <Button title='Open in new window' onClick={handleOpenConfInNewWindow} />}
                {popUpWindow && <Button title='Close this window' onClick={handleCloseConfWindow} />}
                <Button title='Load scene' onClick={handleLoadScene} />
                <Button title='Save scene' onClick={handleSaveScene} />
                <Separator />
                <Button title='Load 3d Model' onClick={handleLoad3DModel} />
                <Folder title='Scene' expanded={true}>
                    <Color color={scene.background} name='background' onChange={handleSceneBackground} />
                </Folder>
                <Folder title='Camera' expanded={true}>
                    <Point3D position={cameraPosition} name='position' onChange={handleCameraPosition}></Point3D>
                    <Point3D position={cameraRotation} name='rotation' onChange={handleCameraRotation}></Point3D>
                </Folder>
            </Pane>
        </>
    );
}
