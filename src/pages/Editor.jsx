import { useState, useLayoutEffect, useEffect } from 'react';
import '../styles/index.sass'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import GUI from 'src/components/GUI/GUI';
import { setLimitFps } from 'src/hooks/LimitFps';
import { useLimitFps } from 'src/hooks/LimitFps';
import { setGlobalScene } from 'src/redux/actions';
import { useDispatch, useSelector } from 'react-redux'

export default function Editor() {

    const dispatch = useDispatch()

    const globalScene = useSelector(store => store.scene)

    useLayoutEffect(() => {

        // Scene
        let scene = new THREE.Scene();
        scene.background = new THREE.Color("#4d4d4d");

        dispatch(setGlobalScene(scene))

    }, [])

    return(
        <>
            {globalScene && <RenderWebGL />}
        </>
    );
}


function RenderWebGL() {

    const scene = useSelector(store => store.scene)

    const [camera, setCamera] = useState(null)
    const [controls, setControls] = useState(null)
    const [renderer, setRenderer] = useState(null)

    useEffect(() => {

        // Camera
        let camera = new THREE.PerspectiveCamera(50, window.innerWidth/window.innerHeight,0.01,1000);

        camera.rotation.x = -25/180*Math.PI;
        camera.rotation.y = 0;
        camera.rotation.z = 0;

        camera.position.x = 0;
        camera.position.y = 5;
        camera.position.z = 10;

        setCamera(camera)


        let hlight = new THREE.AmbientLight("#4d4d4d",8);
        scene.add(hlight);

        let directionalLight = new THREE.DirectionalLight("#fff", 4);
        directionalLight.position.set(5,10,7.5);
        directionalLight.castShadow = true;
        scene.add(directionalLight);

        let pointLight = new THREE.PointLight("#e0d89e", 8);
        pointLight.position.set(0, 2.3, 0);
        pointLight.castShadow = true;
        scene.add(pointLight);

        let pointLightHelper = new THREE.PointLightHelper(pointLight, 1)
        scene.add(pointLightHelper)

        let renderer = new THREE.WebGLRenderer({
            antialias: true,
            canvas: document.querySelector('canvas[class="webgl"]')
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        setRenderer(renderer)

        const canvas = document.querySelector('canvas[class="webgl"]')
        canvas.addEventListener('pointerdown', () => {
            canvas.classList.add('grabbing')
        });
        canvas.addEventListener('pointerup', () => {
            canvas.classList.remove('grabbing')
        });


        const controls = new OrbitControls( camera, renderer.domElement );
        controls.enableDamping = true;
        setControls(controls)

        // Creating ground grid
        const gridHelper = new THREE.GridHelper(10, 10);
        scene.add(gridHelper);

        let loader = new GLTFLoader();

        loader.load('public/models3d/lamp/scene.gltf', function (glb) {
            let cube = glb.scene.children[0];
            cube.position.x = 0;
            cube.position.y = 3;
            cube.position.z = 0;
            cube.scale.set(0.03,0.03,0.03);
            scene.add(glb.scene);

            /*let box = glb.scene;

            box.traverse((child) => {
                if (child.isMesh) {

                    child.material = new THREE.MeshBasicMaterial()

                    child.material.wireframe = true
                    child.material.color = new THREE.Color(0x9aff)
                }
            });*/

        });


        const fpsObject = setLimitFps(60);
        const animate = (fpsObject) => {
            
            requestAnimationFrame(() => animate(fpsObject) );

            useLimitFps(() => {
                controls.update();
                renderer.render( scene, camera );
            }, fpsObject)
        }
        animate(fpsObject);
    }, [])

    return(
        <>
            {camera && controls && <GUI camera={camera} controls={controls} />}
            <canvas className="webgl"></canvas>
        </>
    );
}