import { useSelector } from 'react-redux'
import { Color } from 'src/tweakpane-react/Input';
import { Separator } from 'src/tweakpane-react/Separator';
import Folder from '../../../tweakpane-react/Folder';
import * as THREE from 'three'
import { setLimitFps, useLimitFps } from 'src/hooks/LimitFps';
import Load from './Load';
import { Save } from './Save';
import Lights from './Lights';


export function Scene() {

    const scene = useSelector(store => store.scene)

    const fpsObject = setLimitFps(60)
    const handleSceneBackground = (ev) => {
        useLimitFps(() => {
            scene.background = new THREE.Color(ev.value);
        }, fpsObject)
    }


    return(
        <>
            <Folder title='Scene' expanded={true}>
                <Load />
                <Save />
                <Lights />
                <Separator />
                <Color color={scene.background} name='background' onChange={handleSceneBackground} />
            </Folder>
        </>
    );
}