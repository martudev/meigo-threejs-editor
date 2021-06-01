import { useState, useLayoutEffect, useEffect } from 'react';
import '../styles/index.sass'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import GUI from 'src/components/GUI/GUI';
import { setLimitFps } from 'src/hooks/LimitFps';
import { useLimitFps } from 'src/hooks/LimitFps';
import { useDispatch, useSelector } from 'react-redux'
import AutoSaver from 'src/components/AutoSaver';
import { setCamera } from 'src/redux/Camera/actions';
import { setControls } from 'src/redux/Controls/actions';
import { setRenderer } from 'src/redux/Renderer/actions';
import { setScene } from 'src/redux/Scene/actions';

export default function Editor() {

    const dispatch = useDispatch()

    const globalScene = useSelector(store => store.scene.value)
    const [isReady, setIsReady] = useState(false)

    useLayoutEffect(() => {

        
        // Scene
        let scene = null
        
        if(globalScene == null) {
            scene = new THREE.Scene();
            scene.background = new THREE.Color("#4d4d4d");
        } else if(globalScene != null) {
            scene = globalScene
        }

        /*
        TODO: Restore prev session
        Project.CompareAndLoadSceneFromStorage(scene, dispatch)
        .then((sceneStorage) => {
            dispatch(setScene(sceneStorage))
            setIsReady(true)
        })
        */

        // Camera
        let camera = new THREE.PerspectiveCamera(50, window.innerWidth/window.innerHeight,0.01,1000);

        camera.rotation.x = -25/180*Math.PI;
        camera.rotation.y = 0;
        camera.rotation.z = 0;

        camera.position.x = 0;
        camera.position.y = 5;
        camera.position.z = 10;

        let renderer = new THREE.WebGLRenderer({
            antialias: true,
            canvas: document.querySelector('canvas[class="webgl"]')
        });
        renderer.setSize(window.innerWidth, window.innerHeight);


        const controls = new OrbitControls( camera, renderer.domElement );
        controls.enableDamping = true;


        const canvas = document.querySelector('canvas[class="webgl"]')
        const addGrabbingCssClass = () => {
            canvas.classList.add('grabbing')
        }
        const removeGrabbingCssClass = () => {
            canvas.classList.remove('grabbing')
        }
        const onWindowResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight
            camera.updateProjectionMatrix()
            renderer.setSize( window.innerWidth, window.innerHeight )
        }

        canvas.addEventListener('pointerdown', addGrabbingCssClass)
        canvas.addEventListener('pointerup', removeGrabbingCssClass)
        window.addEventListener('resize', onWindowResize)

        
        
        dispatch(setCamera(camera))
        dispatch(setControls(controls))
        dispatch(setRenderer(renderer))
        dispatch(setScene(scene))
        setIsReady(true)


        return ()  => {
            canvas.removeEventListener('pointerdown', addGrabbingCssClass)
            canvas.removeEventListener('pointerup', removeGrabbingCssClass)
            window.removeEventListener('resize', onWindowResize)
        }

    }, [])


    return(
        <>
            <canvas className="webgl"></canvas>
            {isReady && <RenderWebGL />}
        </>
    );
}


function RenderWebGL() {

    const scene = useSelector(store => store.scene.value)
    const camera = useSelector(store => store.camera.value)
    const controls = useSelector(store => store.controls.value)
    const renderer = useSelector(store => store.renderer.value)

    useEffect(() => {

        const fpsObject = setLimitFps(60);
        let id = null
        const animate = (fpsObject) => {
            
            id = requestAnimationFrame(() => {
                animate(fpsObject)
            });

            useLimitFps(() => {
                controls.update();
                renderer.render( scene, camera );
            }, fpsObject)
        }

        animate(fpsObject);

        return () => {
            cancelAnimationFrame(id)
        }

    }, [scene])

    return(
        <>
            <AutoSaver />
            <GUI />
        </>
    );
}