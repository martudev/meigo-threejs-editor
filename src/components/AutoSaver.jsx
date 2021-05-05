import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Proyect from '../models/Project'


export default function AutoSaver() {
    const scene = useSelector(store => store.scene)

    useEffect(() => {

        const id = setInterval(() => {
            if(document.hasFocus()) {
                //Proyect.saveSceneAsLocalStorage(scene)
            }
        }, 10000)

        return () => {
            clearInterval(id)
        }
    }, [scene])

    return(
        <>
        </>
    );
}