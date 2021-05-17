import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Proyect from '../models/Project'


export default function AutoSaver() {

    const scene = useSelector(store => store.scene.value)
    const grid = useSelector(store => store.grid.value)
    const ambientLights = useSelector(store => store.AmbientLight.value.objects);
    const pointLights = useSelector(store => store.PointLight.value.objects);
    const object3ds = useSelector(store => store.Object3D.value.objects);

    useEffect(() => {

        const id = setInterval(() => {
            if(document.hasFocus()) {
                //Proyect.saveSceneAsLocalStorage({ scene, grid, ambientLights, pointLights, object3ds })
            }
        }, 15000)

        return () => {
            clearInterval(id)
        }
    }, [scene])

    return(
        <>
        </>
    );
}