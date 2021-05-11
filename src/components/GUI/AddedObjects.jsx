import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ResetAmbientLight } from 'src/redux/actions'
import AmbientLight from "./AmbientLight";


export default function AddedObjects() {

    const dispatch = useDispatch()
    const idToAdd = useSelector(store => store.added_objects.AmbientLight.idToAdd)
    const idToRemove = useSelector(store => store.added_objects.AmbientLight.idToRemove)
    
    const [objects, setObjects] = useState([])
    const [removedState, setRemovedState] = useState(false)


    const addAmbientLight = () => {
        if (idToAdd == 0) return

        const currentObjects = []

        const id = idToAdd
            
        currentObjects.push(
            <AmbientLight number={id} key={id}></AmbientLight>
        );

        const newer = [...objects, ...currentObjects]
        setObjects(newer)
    }

    const removeAmbientLight = () => {
        if(objects.length === 0) return

        const clone = [...objects]
        const AmbientLightComponents = clone.filter(obj => obj.type.name === 'AmbientLight')
        const notAmbientLightComponents = clone.filter(obj => obj.type.name !== 'AmbientLight')
        const cleaned = AmbientLightComponents.filter(obj => obj.key != idToRemove)
        setObjects([...notAmbientLightComponents, ...cleaned])
        setRemovedState(true)
    }
    

    useEffect(addAmbientLight, [idToAdd])
    useEffect(removeAmbientLight, [idToRemove])

    useEffect(() => {
        if (removedState == true && objects.length === 0) dispatch(ResetAmbientLight())
    }, [objects])

    return(
        <>
            {objects}
        </>
    )
}