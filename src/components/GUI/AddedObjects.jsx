import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AmbientLight from "./AmbientLight";
import Object3D from "./Object3D";
import PointLight from "./PointLight";
import * as THREE from 'three'


export default function AddedObjects() {

    const [objects, setObjects] = useState([])

    const scene = useSelector(store => store.scene.value)

    const AmbientLight_objects = useSelector(store => store.AmbientLight.value.objects)
    const PointLight_objects = useSelector(store => store.PointLight.value.objects)
    const Object3D_objects = useSelector(store => store.Object3D.value.objects)

    // Used for delete all objects scene on load scene
    useEffect(() => {
        setObjects([])
    }, [scene])


    useEffect(() => {
        const scene_ambientLigts = scene.children.filter(child => child.type == 'AmbientLight')
        const objects_ambientLigts = objects.filter(child => child.key.includes('AmbientLight'))
        
        const scene_pointLigts = scene.children.filter(child => child.type == 'PointLight')
        const objects_pointLigts = objects.filter(child => child.key.includes('PointLight'))

        const scene_object3Ds = scene.children.filter(child => child.type == 'Object3D')
        const objects_object3Ds = objects.filter(child => child.key.includes('Object3D'))
        
        
        let array = objects

        // Used for REMOVE unused objects
        objects_ambientLigts.forEach((child) => {
            const id = child.props.id
            const uuid = child.props.uuid
            const itemDontExist = AmbientLight_objects.find(item => item.id == id) == null
            if (itemDontExist) {
                const key = generateAmbientLightKey(id, uuid)
                array = removeObject(key, array)
            }
        })

        // Used for ADD new objects
        AmbientLight_objects.forEach((child) => {
            const ambientLight = scene_ambientLigts.find(item => item.uuid == child.uuid)
            const key = generateAmbientLightKey(child.id, ambientLight.uuid)
            const isInObjects = array.find(obj => obj.key == key) != null
            if (!isInObjects) {
                array = addAmbientLight(child, array)
            }
        })

        // Used for REMOVE unused objects
        objects_pointLigts.forEach((child) => {
            const id = child.props.id
            const uuid = child.props.uuid
            const itemDontExist = PointLight_objects.find(item => item.id == id) == null
            if (itemDontExist) {
                const key = generatePointLightKey(id, uuid)
                array = removeObject(key, array)
            }
        })

        // Used for ADD new objects
        PointLight_objects.forEach((child) => {
            const pointLight = scene_pointLigts.find(item => item.uuid == child.uuid)
            const key = generatePointLightKey(child.id, pointLight.uuid)
            const isInObjects = array.find(obj => obj.key == key) != null
            if (!isInObjects) {
                array = addPointLight(child, array)
            }
        })


        objects_object3Ds.forEach((child) => {
            const id = child.props.id
            const uuid = child.props.uuid
            const itemDontExist = Object3D_objects.find(item => item.id == id) == null
            if (itemDontExist) {
                const key = generateObject3DKey(id, uuid)
                array = removeObject(key, array)
            }
        })

        // Used for ADD new objects
        Object3D_objects.forEach((child) => {
            const object3D = scene_object3Ds.find(item => item.uuid == child.uuid)
            const key = generateObject3DKey(child.id, object3D.uuid)
            const isInObjects = array.find(obj => obj.key == key) != null
            if (!isInObjects) {
                array = addObject3D(child, array)
            }
        })

        setObjects(array)
    }, [AmbientLight_objects, PointLight_objects, Object3D_objects])




    const removeObject = (key, array) => {
        if(array.length === 0) return

        const toRemoveObj = array.find(obj => obj.key == key)
        const clone = [...array]
        clone.splice(clone.indexOf(toRemoveObj), 1)
        return clone
    }
    
    const generateAmbientLightKey = (id, uuid) => {
        return `AmbientLight_${uuid}_${id}`
    }

    const addAmbientLight = (object, array) => {
        const currentObjects = []

        const { id } = object
        const { uuid } = object
        const { name } = object
        const key = generateAmbientLightKey(id, uuid)

        const obj = <AmbientLight id={id} uuid={uuid} title={name} key={key}></AmbientLight>

        if (!objects.includes(obj)) {
            currentObjects.push(obj);
        }

        const newer = [...array, ...currentObjects]
        return newer
    }

    const generatePointLightKey = (id, uuid) => {
        return `PointLight_${uuid}_${id}`
    }

    const addPointLight = (object, array) => {
        const currentObjects = []

        const { id } = object
        const { uuid } = object
        const { name } = object
        const { helper } = object
        const key = generatePointLightKey(id, uuid)

        const obj = <PointLight id={id} uuid={uuid} helperData={helper} title={name} key={key}></PointLight>

        if (!objects.includes(obj)) {
            currentObjects.push(obj);
        }

        const newer = [...array, ...currentObjects]
        return newer
    }

    const generateObject3DKey = (id, uuid) => {
        return `Object3D_${uuid}_${id}`
    }

    const addObject3D = (object, array) => {
        const currentObjects = []

        const { id } = object
        const { uuid } = object
        const { name } = object
        const key = generateObject3DKey(id, uuid)

        const obj = <Object3D id={id} uuid={uuid} title={name} key={key}></Object3D>

        if (!objects.includes(obj)) {
            currentObjects.push(obj);
        }

        const newer = [...array, ...currentObjects]
        return newer
    }

    /*const AmbientLight_objects = useSelector(store => store.added_objects.AmbientLight.objects)
    const AmbientLight_idToRemove = useSelector(store => store.added_objects.AmbientLight.idToRemove)

    const PointLight_objects = useSelector(store => store.added_objects.PointLight.objects)
    const PointLight_idToRemove = useSelector(store => store.added_objects.PointLight.idToRemove)

    const Object3D_objects = useSelector(store => store.added_objects.Object3D.objects)
    const Object3D_idToRemove = useSelector(store => store.added_objects.Object3D.idToRemove)
    
    useEffect(() => {
        const ambientLigts = scene.children.filter(child => child.type == 'AmbientLight')
        AmbientLight_objects.forEach((thisObj) => {
            const key = 'AmbientLight_' + thisObj.id
            const isObjInArray = objects.find(obj => obj.key == key) !== undefined
            if (isObjInArray) {
                removeAmbientLight(thisObj.id)
                addAmbientLight(thisObj)
            } else {
                addAmbientLight(thisObj)
            }
        })
        ambientLigts.forEach((child) => {
            console.log(child)
        })
    }, [])

    useEffect(() => removeAmbientLight(AmbientLight_idToRemove), [AmbientLight_idToRemove])

    useEffect(() => {
        PointLight_objects.forEach((thisObj) => {
            const key = 'PointLight_' + thisObj.id
            const isNotObjInArray = objects.find(obj => obj.key == key) === undefined
            if (isNotObjInArray) {
                addPointLight(thisObj)
            }
        })
    }, [PointLight_objects])

    useEffect(() => removePointLight(PointLight_idToRemove), [PointLight_idToRemove])

    useEffect(() => {
        Object3D_objects.forEach((thisObj) => {
            const key = 'Object3D_' + thisObj.id
            const isNotObjInArray = objects.find(obj => obj.key == key) === undefined
            if (isNotObjInArray) {
                addObject3D(thisObj)
            }
        })
    }, [Object3D_objects])

    useEffect(() => removeObject3D(Object3D_idToRemove), [Object3D_idToRemove])

    const addAmbientLight = (object) => {
        const currentObjects = []

        const { id } = object
        const { name } = object

        const obj = <AmbientLight number={id} title={name} key={'AmbientLight_' + id}></AmbientLight>

        if (!objects.includes(obj)) {
            currentObjects.push(obj);
        }

        const newer = [...objects, ...currentObjects]
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
        return clone
    }

    const addPointLight = (object) => {
        const currentObjects = []

        const { id } = object
        const { name } = object

        const obj = <PointLight number={id} title={name} key={'PointLight_' + id}></PointLight>

        if (!objects.includes(obj)) {
            currentObjects.push(obj);
        }

        const newer = [...objects, ...currentObjects]
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



    const addObject3D = (json) => {
        const currentObjects = []

        const { id } = json
        const { name } = json
        const { object } = json

        const obj = <Object3D obj={object} title={name} number={id} key={'Object3D_' + id}></Object3D>

        if (!objects.includes(obj)) {
            currentObjects.push(obj);
        }

        const newer = [...objects, ...currentObjects]
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
        AmbientLight_objects.forEach((thisObj) => {
            //addAmbientLight(thisObj)
        })
        PointLight_objects.forEach((thisObj) => {
            addPointLight(thisObj)
        })
        Object3D_objects.forEach((thisObj) => {
            addObject3D(thisObj)
        })
    }, [])*/

    return(
        <>
            {objects}
        </>
    )
}