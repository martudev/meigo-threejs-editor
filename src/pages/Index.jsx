import { useEffect } from 'react';
import '../styles/index.sass'
import { GUI } from '../meigo/threejs/GUI'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import Tweakpane from 'tweakpane'
import { saveAs } from 'file-saver';

export default function Index() {

    useEffect(() => {
        const SCENE_BACKGROUND_COLOR = "#4d4d4d"
        const AMBIENT_LIGHT_COLOR = "#4d4d4d"
        const DIRECTIONAL_LIGHT_COLOR = "#4d4d4d"
        const POINT_LIGHT_COLOR = "#4d4d4d"

        const pane = new Tweakpane({
            container: document.getElementById('controls')
        });

        const editor = pane.addFolder({
            title: 'Meigo Editor - Tweakpane'
        })
        
        // Scene
        let scene = new THREE.Scene();
        scene.background = new THREE.Color(SCENE_BACKGROUND_COLOR);

        const sceneFolder = editor.addFolder({
            title: 'Scene'
        })

        const paramsSceneInput = {
            background: '#' + scene.background.getHexString()
        }
        let input = sceneFolder.addInput(paramsSceneInput, 'background')
        input.on('change', (ev) => {
            scene.background = new THREE.Color(ev.value);


            var fileS = document.getElementById('file-selector')

            fileS.addEventListener('change', (ev) => {
                const fileList = ev.target.files;
                var reader = new FileReader()
                reader.onload = (event) => {
                    var json = JSON.parse(event.target.result)
                    scene = new THREE.ObjectLoader().parse( json )
                    console.log(scene)
                    scene.updateMatrixWorld()
                }
                reader.readAsText(fileList[0], 'aplication/json;charset=utf-8')
            })

            fileS.click()
        })


        // Camera
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

            let box = glb.scene;

            box.traverse((child) => {
                if (child.isMesh) {

                    child.material = new THREE.MeshBasicMaterial()

                    child.material.wireframe = true
                    child.material.color = new THREE.Color(0x9aff)
                }
            });

            /*var file = new File([JSON.stringify(scene)], "test.json", {type: "aplication/json;charset=utf-8"});
            saveAs(file)*/

            console.log(scene.background)
            let data = JSON.stringify(scene.background)
            console.log(data)
            let json = JSON.parse(data)
            console.log(json)
            console.log(new THREE.Color(json))

            json = scene.toJSON()
            scene = new THREE.ObjectLoader().parse(json)

            console.log(scene)
            scene.updateWorldMatrix(true, true)


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
            <input type="file" id="file-selector" accept=".json" style={{ display: 'none' }}></input>
            <div id="controls"></div>
            <canvas className="webgl"></canvas>
        </>
    );
}