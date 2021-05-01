import { useLayoutEffect, useState } from 'react';
import { useOnListener } from 'src/hooks/Listeners';
import Tweakpane from 'tweakpane'
import * as THREE from 'three'


export default function GUI({ scene }) {

    const [background, setBackground] = useState(null);

    useLayoutEffect(() => {
        const pane = new Tweakpane({
            container: document.getElementById('controls')
        });
    
        const editor = pane.addFolder({
            title: 'Meigo Editor - Tweakpane'
        })
    
        const sceneFolder = editor.addFolder({
            title: 'Scene'
        })
    
        let input = sceneFolder.addInput({
            background: '#' + scene.background.getHexString()
        }, 'background')
        setBackground(input)
    }, []);

    useOnListener('change', (ev) => {
        scene.background = new THREE.Color(ev.value);
    }, background)


    return(
        <>
            <div id="controls"></div>
        </>
    );
}
