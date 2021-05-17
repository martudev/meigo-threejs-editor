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
import Project from '../models/Project';
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
        let scene = new THREE.Scene();
        scene.background = new THREE.Color("#4d4d4d");

        scene = Project.CompareAndLoadSceneFromStorage(scene, dispatch)


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


        return ()  => {
            canvas.removeEventListener('pointerdown', addGrabbingCssClass)
            canvas.removeEventListener('pointerup', removeGrabbingCssClass)
            window.removeEventListener('resize', onWindowResize)
        }

    }, [])


    useEffect(() => {
        if(globalScene == null) return





        let hlight = new THREE.AmbientLight("#4d4d4d",8);
        //globalScene.add(hlight);

        let directionalLight = new THREE.DirectionalLight("#fff", 4);
        directionalLight.position.set(5,10,7.5);
        directionalLight.castShadow = true;
        //globalScene.add(directionalLight);

        let pointLight = new THREE.PointLight("#e0d89e", 8);
        pointLight.position.set(0, 2.3, 0);
        pointLight.castShadow = true;
        //globalScene.add(pointLight);

        let pointLightHelper = new THREE.PointLightHelper(pointLight, 1)
        //globalScene.add(pointLightHelper)





        /*const asd = new THREE.DirectionalLight( "#fff", 1 );
        asd.position.y = 5
        const ddd = new THREE.DirectionalLightHelper( asd, 1 );
        ddd.children[1].scale.z = 5
        globalScene.add( asd );
        globalScene.add( ddd );*/





        let loader = new GLTFLoader();
        loader.load('public/models3d/lamp/scene.gltf', function (glb) {
            let cube = glb.scene.children[0];
            cube.position.x = 0;
            cube.position.y = 3;
            cube.position.z = 0;
            cube.scale.set(0.03,0.03,0.03);
            //globalScene.add(glb.scene);

            /*let box = glb.scene;

            box.traverse((child) => {
                if (child.isMesh) {

                    child.material = new THREE.MeshBasicMaterial()

                    child.material.wireframe = true
                    child.material.color = new THREE.Color(0x9aff)
                }
            });*/

        });



        setIsReady(true)

    }, [globalScene])

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