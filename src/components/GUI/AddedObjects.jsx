import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AmbientLight from "./AmbientLight";
import Object3D from "./Object3D";
import PointLight from "./PointLight";


export default function AddedObjects() {

    const [objects, setObjects] = useState([])
    
    const AmbientLight_objects = useSelector(store => store.added_objects.AmbientLight.objects)
    const AmbientLight_idToRemove = useSelector(store => store.added_objects.AmbientLight.idToRemove)

    const PointLight_objects = useSelector(store => store.added_objects.PointLight.objects)
    const PointLight_idToRemove = useSelector(store => store.added_objects.PointLight.idToRemove)

    const Object3D_objects = useSelector(store => store.added_objects.Object3D.objects)
    const Object3D_idToRemove = useSelector(store => store.added_objects.Object3D.idToRemove)
    
    useEffect(() => {
        let arrayMem = []
        AmbientLight_objects.forEach((thisObj) => {
            const key = 'AmbientLight_' + thisObj.id
            const isNotObjInArray = objects.find(obj => obj.key == key) === undefined
            if (isNotObjInArray) {
                arrayMem = addAmbientLight(thisObj, arrayMem)
            }
        })
    }, [AmbientLight_objects])

    useEffect(() => removeAmbientLight(AmbientLight_idToRemove), [AmbientLight_idToRemove])

    useEffect(() => {
        let arrayMem = []
        PointLight_objects.forEach((thisObj) => {
            const key = 'PointLight_' + thisObj.id
            const isNotObjInArray = objects.find(obj => obj.key == key) === undefined
            if (isNotObjInArray) {
                arrayMem = addPointLight(thisObj, arrayMem)
            }
        })
    }, [PointLight_objects])

    useEffect(() => removePointLight(PointLight_idToRemove), [PointLight_idToRemove])

    useEffect(() => {
        let arrayMem = []
        Object3D_objects.forEach((thisObj) => {
            const key = 'Object3D_' + thisObj.id
            const isNotObjInArray = objects.find(obj => obj.key == key) === undefined
            if (isNotObjInArray) {
                arrayMem = addObject3D(thisObj, arrayMem)
            }
        })
    }, [Object3D_objects])

    useEffect(() => removeObject3D(Object3D_idToRemove), [Object3D_idToRemove])

    const addAmbientLight = (object, concatArr = []) => {
        const currentObjects = []

        const { id } = object
        const { name } = object

        const obj = <AmbientLight number={id} title={name} key={'AmbientLight_' + id}></AmbientLight>

        if (!objects.includes(obj)) {
            currentObjects.push(obj);
        }

        const newer = [...objects, ...concatArr, ...currentObjects]
        setObjects(newer)
        return newer
    }

    const removeAmbientLight = (id) => {
        if(objects.length === 0) return

        const key = 'AmbientLight_' + id
        const toRemoveObj = objects.find(obj => obj.key == key)
        const clone = [...objects]
        clone.splice(clone.indexOf(toRemoveObj), 1)
        setObjects(clone)
    }

    const addPointLight = (object, concatArr = []) => {
        const currentObjects = []

        const { id } = object
        const { name } = object

        const obj = <PointLight number={id} title={name} key={'PointLight_' + id}></PointLight>

        if (!objects.includes(obj)) {
            currentObjects.push(obj);
        }

        const newer = [...objects, ...concatArr, ...currentObjects]
        setObjects(newer)
        return newer
    }

    const removePointLight = (id) => {
        if(objects.length === 0) return

        const key = 'PointLight_' + id
        const toRemoveObj = objects.find(obj => obj.key == key)
        const clone = [...objects]
        clone.splice(clone.indexOf(toRemoveObj), 1)
        setObjects(clone)
    }



    const addObject3D = (json, concatArr = []) => {
        const currentObjects = []

        const { id } = json
        const { name } = json
        const { object } = json

        const obj = <Object3D obj={object} title={name} number={id} key={'Object3D_' + id}></Object3D>

        if (!objects.includes(obj)) {
            currentObjects.push(obj);
        }

        const newer = [...objects, ...concatArr, ...currentObjects]
        setObjects(newer)
    }

    const removeObject3D = (id) => {
        if(objects.length === 0) return

        const key = 'Object3D_' + id
        const toRemoveObj = objects.find(obj => obj.key == key)
        const clone = [...objects]
        clone.splice(clone.indexOf(toRemoveObj), 1)
        setObjects(clone)
    }


    useEffect(() => {
        let arrayMem = []
        AmbientLight_objects.forEach((thisObj) => {
            arrayMem = addAmbientLight(thisObj, arrayMem)
        })
        PointLight_objects.forEach((thisObj) => {
            arrayMem = addPointLight(thisObj, arrayMem)
        })
        Object3D_objects.forEach((thisObj) => {
            arrayMem = addObject3D(thisObj, arrayMem)
        })
    }, [])

    return(
        <>
            {objects}
        </>
    )
}