import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ResetAmbientLight, ResetObject3D, ResetPointLight } from 'src/redux/actions'
import AmbientLight from "./AmbientLight";
import Object3D from "./Object3D";
import PointLight from "./PointLight";


export default function AddedObjects() {

    const dispatch = useDispatch()

    const AmbientLight_idToAdd = useSelector(store => store.added_objects.AmbientLight.idToAdd)
    const AmbientLight_idToRemove = useSelector(store => store.added_objects.AmbientLight.idToRemove)
    const PointLight_idToAdd = useSelector(store => store.added_objects.PointLight.idToAdd)
    const PointLight_idToRemove = useSelector(store => store.added_objects.PointLight.idToRemove)
    const object3d = useSelector(store => store.added_objects.Object3D.object)
    const Object3D_idToAdd = useSelector(store => store.added_objects.Object3D.idToAdd)
    const Object3D_idToRemove = useSelector(store => store.added_objects.Object3D.idToRemove)
    
    const [objects, setObjects] = useState([])
    const [AmbientLight_removedState, AmbientLight_setRemovedState] = useState(false)
    const [PointLight_removedState, PointLight_setRemovedState] = useState(false)
    const [Object3D_removedState, Object3D_setRemovedState] = useState(false)


    const addAmbientLight = () => {
        if (AmbientLight_idToAdd <= 0) {
            AmbientLight_setRemovedState(false)
            return
        }

        const currentObjects = []

        const id = AmbientLight_idToAdd

        const obj = <AmbientLight number={id} key={'AmbientLight_' + id}></AmbientLight>

        if (!objects.includes(obj)) {
            currentObjects.push(obj);
        }

        const newer = [...objects, ...currentObjects]
        setObjects(newer)
    }

    const removeAmbientLight = () => {
        if(objects.length === 0) return

        const key = 'AmbientLight_' + AmbientLight_idToRemove
        const toRemoveObj = objects.find(obj => obj.key == key)
        const clone = [...objects]
        clone.splice(clone.indexOf(toRemoveObj), 1)
        setObjects(clone)
        AmbientLight_setRemovedState(true)
    }

    const addPointLight = () => {
        if (PointLight_idToAdd <= 0) {
            PointLight_setRemovedState(false)
            return
        }

        const currentObjects = []

        const id = PointLight_idToAdd

        const obj = <PointLight number={id} key={'PointLight_' + id}></PointLight>

        if (!objects.includes(obj)) {
            currentObjects.push(obj);
        }

        const newer = [...objects, ...currentObjects]
        setObjects(newer)
    }

    const removePointLight = () => {
        if(objects.length === 0) return

        const key = 'PointLight_' + PointLight_idToRemove
        const toRemoveObj = objects.find(obj => obj.key == key)
        const clone = [...objects]
        clone.splice(clone.indexOf(toRemoveObj), 1)
        setObjects(clone)
        PointLight_setRemovedState(true)
    }

    const addObject3D = () => {
        if (Object3D_idToAdd <= 0) {
            Object3D_setRemovedState(false)
            return
        }

        const currentObjects = []

        const id = Object3D_idToAdd

        const obj = <Object3D obj={object3d} number={id} key={'Object3D_' + id}></Object3D>

        if (!objects.includes(obj)) {
            currentObjects.push(obj);
        }

        const newer = [...objects, ...currentObjects]
        setObjects(newer)
    }

    const removeObject3D = () => {
        if(objects.length === 0) return

        const key = 'Object3D_' + Object3D_idToRemove
        const toRemoveObj = objects.find(obj => obj.key == key)
        const clone = [...objects]
        clone.splice(clone.indexOf(toRemoveObj), 1)
        setObjects(clone)
        Object3D_setRemovedState(true)
    }


    /* WE NEED THIS ORDER (FIRST REMOVE EVENTS) FOR NOT BUGS IN ADD AMBIENT LIGHTS */
    useEffect(removeAmbientLight, [AmbientLight_idToRemove])
    useEffect(removePointLight, [PointLight_idToRemove])
    useEffect(removeObject3D, [Object3D_idToRemove])
    useEffect(addAmbientLight, [AmbientLight_idToAdd])
    useEffect(addPointLight, [PointLight_idToAdd])
    useEffect(addObject3D, [Object3D_idToAdd])

    useEffect(() => {
        const currentObjects = []

        if (AmbientLight_idToAdd > 0) {
            currentObjects.push(
                <AmbientLight number={AmbientLight_idToAdd} key={'AmbientLight_' + AmbientLight_idToAdd}></AmbientLight>
            );
        }

        if (PointLight_idToAdd > 0) {
            currentObjects.push(
                <PointLight number={PointLight_idToAdd} key={'PointLight_' + PointLight_idToAdd}></PointLight>
            );
        }

        setObjects(currentObjects)
    }, [])

    useEffect(() => {
        const ambientLightNotExist = objects.find(obj => obj.key.includes('AmbientLight')) === undefined
        const pointLightNotExist = objects.find(obj => obj.key.includes('PointLight')) === undefined
        const object3DNotExist = objects.find(obj => obj.key.includes('Object3D')) === undefined

        if (AmbientLight_removedState == true && ambientLightNotExist) dispatch(ResetAmbientLight())
        if (PointLight_removedState == true && pointLightNotExist) dispatch(ResetPointLight())
        if (Object3D_removedState == true && object3DNotExist) dispatch(ResetObject3D())
    }, [objects])

    return(
        <>
            {objects}
        </>
    )
}