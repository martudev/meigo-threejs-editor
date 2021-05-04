import { useSelector } from 'react-redux'
import { Color } from 'src/tweakpane-react/Input';
import Folder from '../../tweakpane-react/Folder';
import * as THREE from 'three'
import { setLimitFps, useLimitFps } from 'src/hooks/LimitFps';


export function SceneControls() {

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
                <Color color={scene.background} name='background' onChange={handleSceneBackground} />
            </Folder>
        </>
    );
}