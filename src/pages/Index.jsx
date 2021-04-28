import { useEffect } from 'react';
import '../styles/index.sass'
import { GUI } from '../meigo/threejs/GUI'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export default function Index() {

    useEffect(() => {
        // Debug
        const meigoGui = new GUI();


        let scene = new THREE.Scene();
        scene.background = new THREE.Color("#4d4d4d");

        let camera = new THREE.PerspectiveCamera(50, window.innerWidth/window.innerHeight,0.01,1000);

        camera.rotation.x = -25/180*Math.PI;
        camera.rotation.y = 0;
        camera.rotation.z = 0;

        camera.position.x = 0;
        camera.position.y = 5;
        camera.position.z = 10;


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

        const canvas = document.getElementsByTagName('canvas')[0];
        canvas.addEventListener('pointerdown', () => {
            canvas.classList.add('grabbing')
        });
        canvas.addEventListener('pointerup', () => {
            canvas.classList.remove('grabbing')
        });


        const controls = new OrbitControls( camera, renderer.domElement );
        controls.enableDamping = true;
        controls.maxDistance = 30;
        controls.minDistance = 5;


        let loader = new GLTFLoader();

        loader.load('public/models3d/lamp/scene.gltf', function (glb) {
            console.log(glb)
            let cube = glb.scene.children[0];
            cube.position.x = 0;
            cube.position.y = 3;
            cube.position.z = 0;
            cube.scale.set(0.03,0.03,0.03);
            scene.add(glb.scene);


            startPerformanceRender();
            animate();
        });

        function animate() {
            
            requestAnimationFrame( animate );

            checkPerformanceRender(() => {
                controls.update();
                renderer.render( scene, camera );
            });
        }

        var frameCount = 0;
        var fps, fpsInterval, startTime, now, then, elapsed;

        function startPerformanceRender() {
            fpsInterval = 1000 / 60;
            then = Date.now();
            startTime = then;
        }

        function checkPerformanceRender(callback) {
            now = Date.now();
            elapsed = now - then;

            // if enough time has elapsed, draw the next frame

            if (elapsed > fpsInterval) {

                // Get ready for next frame by setting then=now, but also adjust for your
                // specified fpsInterval not being a multiple of RAF's interval (16.7ms)
                then = now - (elapsed % fpsInterval);

                // Put your drawing code here
                callback();
            }
        }

        //https://stackoverflow.com/questions/19764018/controlling-fps-with-requestanimationframe
    }, [])

    return(
        <>
            <button>
                <span className="icon">
                    <span className="left"></span>
                </span>
                <span className="label">Click para explorar</span>
            </button>

            <canvas className="webgl"></canvas>
        </>
    );
}