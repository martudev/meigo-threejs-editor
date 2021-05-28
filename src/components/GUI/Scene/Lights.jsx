import { useDispatch, useSelector} from "react-redux";
import { AmbientLightActions } from "src/redux/AmbientLight/actions";
import { PointLightActions } from "src/redux/PointLight/actions";
import Folder from "src/tweakpane-react/Folder";
import { Button } from "src/tweakpane-react/Input";
import * as THREE from 'three'


export default function Lights() {

    const dispatch = useDispatch()

    const scene = useSelector(store => store.scene.value)

    const handleAddAmbientLight = () => {
        const light = new THREE.AmbientLight('#4d4d4d', 8);
        scene.add(light)
        dispatch(AmbientLightActions.Add({
            light: light
        }))
    }

    const handleAddPointLight = () => {
        const light = new THREE.PointLight('#e0d89e', 8);
        scene.add(light)
        dispatch(PointLightActions.Add({
            light: light,
            helper: {
                color: '#e0d89e'
            }
        }))
    }

    return(
        <>
            <Folder title='Lights'>
                <Button title='Add AmbientLight' onClick={handleAddAmbientLight}/>
                <Button title='Add PointLight' onClick={handleAddPointLight}/>
            </Folder>
        </>
    )
}