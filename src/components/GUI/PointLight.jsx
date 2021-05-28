import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLimitFps, useLimitFps } from "src/hooks/LimitFps";
import { PointLightActions } from "src/redux/PointLight/actions";
import Folder from "src/tweakpane-react/Folder";
import { Button, Color, Number, Point3D, String } from "src/tweakpane-react/Input";
import { Separator } from "src/tweakpane-react/Separator";
import Tab, { Content } from "src/tweakpane-react/Tab";
import * as THREE from 'three'


export default function PointLight({ title = 'PointLight', id = 0, uuid = undefined,
                                    helperData = undefined }) {

    const dispatch = useDispatch()
    const scene = useSelector(store => store.scene.value)

    const [isVisible, setVisibility] = useState(false)
    const [helper, setHelper] = useState(null)
    const [fullTitle, setFullTitle] = useState(title)
    const [name, setName] = useState(fullTitle)

    const getLight = () => {
        return scene.children.find(child => child.uuid == uuid)
    }

    const [light] = useState(getLight())

    const handleRemove = () => {
        setVisibility(false)
        scene.remove(light)
        dispatch(PointLightActions.Remove(id))
    }

    const handleChangeName = () => {
        setFullTitle(name)
        dispatch(PointLightActions.SetName(id, name))
    }

    const fpsObject_color = setLimitFps(60)
    const handleChangeColor = (ev) => {
        useLimitFps(() => {
            light.color = new THREE.Color(ev.value)
        }, fpsObject_color)
    }

    const fpsObject_helpercolor = setLimitFps(60)
    const handleChangeHelperColor = (ev) => {
        useLimitFps(() => {
            helper.material.color = new THREE.Color(ev.value)
            dispatch(PointLightActions.SetHelperColor(id, ev.value))
        }, fpsObject_helpercolor)
    }

    const fpsObject_intensity = setLimitFps(60)
    const handleChangeIntensity = (ev) => {
        useLimitFps(() => {
            light.intensity = ev.value
        }, fpsObject_intensity)
    }

    const fpsObject_size = setLimitFps(60)
    const handleChangeSize = (ev) => {
        useLimitFps(() => {
            const val = ev.value
            light.scale.set(val, val, val)
            helper.scale.set(val, val, val)
        }, fpsObject_size)
    }

    const fpsObject_position = setLimitFps(60)
    const handleChangePosition = (ev) => {
        useLimitFps(() => {
            light.position.x = ev.value.x
            light.position.y = ev.value.y
            light.position.z = ev.value.z
        }, fpsObject_position)
    }

    useEffect(() => {
        const helper = new THREE.PointLightHelper(getLight(), 1, helperData.color);
        scene.add(helper)

        setHelper(helper)
        setVisibility(true)

        return () => {
            console.log('testgin remove pointlight')
            scene.remove(helper)
        }
    }, [])


    return(
        <>
            {isVisible &&
                <Folder title={fullTitle}>
                    <Tab>
                        <Content title='Values'>
                            <Color color={light.color} name='color' onChange={handleChangeColor}></Color>
                            <Color color={helper.material.color} name='helperColor' onChange={handleChangeHelperColor}></Color>
                            <Number value={light.intensity} name='intensity' onChange={handleChangeIntensity}></Number>
                            <Number value={light.scale.x} name='size' onChange={handleChangeSize}></Number>
                            <Point3D position={light.position} name='position' onChange={handleChangePosition}></Point3D>
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