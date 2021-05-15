import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLimitFps, useLimitFps } from "src/hooks/LimitFps";
import { RemoveObject3D } from "src/redux/actions";
import Folder from "src/tweakpane-react/Folder";
import Tab, { Content } from "src/tweakpane-react/Tab";
import { Button, Point3D, String } from "src/tweakpane-react/Input";
import { Separator } from "src/tweakpane-react/Separator";


export default function Object3D({ title = 'Object3D', number = 0, obj = undefined }) {

    const dispatch = useDispatch()

    const scene = useSelector(store => store.scene)
    const [isVisible, setVisibility] = useState(false)
    const [fullTitle, setFullTitle] = useState(title)
    const [name, setName] = useState(fullTitle)

    const handleRemove = () => {
        setVisibility(false)
        dispatch(RemoveObject3D(number))
    }

    const handleChangeName = () => {
        setFullTitle(name)
    }

    const fpsObject_position = setLimitFps(60)
    const handleChangePosition = (ev) => {
        useLimitFps(() => {
            obj.position.x = ev.value.x
            obj.position.y = ev.value.y
            obj.position.z = ev.value.z
        }, fpsObject_position)
    }

    const fpsObject_rotation = setLimitFps(60)
    const handleChangeRotation = (ev) => {
        useLimitFps(() => {
            obj.rotation.x = ev.value.x / 180 * Math.PI
            obj.rotation.y = ev.value.y / 180 * Math.PI
            obj.rotation.z = ev.value.z / 180 * Math.PI
        }, fpsObject_rotation)
    }

    const fpsObject_scale = setLimitFps(60)
    const handleChangeScale = (ev) => {
        useLimitFps(() => {
            obj.scale.x = ev.value.x
            obj.scale.y = ev.value.y
            obj.scale.z = ev.value.z
        }, fpsObject_scale)
    }

    useEffect(() => {
        scene.add(obj)
        setVisibility(true)

        return () => {
            scene.remove(obj)
        }
    }, [])


    return(
        <>
            {isVisible &&
                <Folder title={fullTitle}>
                    <Tab>
                        <Content title='Values'>
                            <Point3D position={obj.position} name='position' onChange={handleChangePosition}></Point3D>
                            <Point3D position={obj.scale} name='scale' onChange={handleChangeScale}></Point3D>
                            <Point3D position={{
                                x: obj.rotation.x * 180 / Math.PI,
                                y: obj.rotation.y * 180 / Math.PI,
                                z: obj.rotation.z * 180 / Math.PI
                            }} name='rotation' onChange={handleChangeRotation}></Point3D>
                        </Content>
                        <Content title='Actions'>
                            <Button title='Remove' onClick={handleRemove}></Button>
                            <Separator />
                            <String name='name' value={fullTitle} onChange={(ev) => setName(ev.value)}></String>
                            <Button title='Change name' onClick={handleChangeName}></Button>
                        </Content>
                    </Tab>
                </Folder>
            }
        </>
    )
}