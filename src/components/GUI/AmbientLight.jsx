import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLimitFps, useLimitFps } from "src/hooks/LimitFps";
import { AmbientLightActions } from "src/redux/AmbientLight/actions";
import Folder from "src/tweakpane-react/Folder";
import { Button, Color, Number, String } from "src/tweakpane-react/Input";
import { Separator } from "src/tweakpane-react/Separator";
import Tab, { Content } from "src/tweakpane-react/Tab";
import * as THREE from 'three'


export default function AmbientLight({ title = 'AmbientLight', id = 0, uuid = undefined,
                                    color = new THREE.Color('#4d4d4d'), intensity = 8 }) {

    const dispatch = useDispatch()
    const scene = useSelector(store => store.scene.value)

    const [isVisible, setVisibility] = useState(true)
    const [fullTitle, setFullTitle] = useState(title)
    const [name, setName] = useState(fullTitle)


    const getLight = () => {
        return scene.children.find(child => child.uuid == uuid)
    }

    const handleRemove = () => {
        setVisibility(false)
        scene.remove(getLight())
        dispatch(AmbientLightActions.Remove(id))
    }

    const handleChangeName = () => {
        setFullTitle(name)
        dispatch(AmbientLightActions.SetName(id, name))
    }

    const fpsObject_color = setLimitFps(60)
    const handleChangeColor = (ev) => {
        useLimitFps(() => {
            getLight().color = new THREE.Color(ev.value)
        }, fpsObject_color)
    }

    const fpsObject_intensity = setLimitFps(60)
    const handleChangeIntensity = (ev) => {
        useLimitFps(() => {
            getLight().intensity = ev.value
        }, fpsObject_intensity)
    }


    return(
        <>
            {isVisible &&
            <>
                <Folder title={fullTitle}>
                <Tab>
                    <Content title='Values'>
                        <Color color={color} name='color' onChange={handleChangeColor}></Color>
                        <Number value={intensity} name='intensity' onChange={handleChangeIntensity} ></Number>
                    </Content>
                    <Content title='Actions'>
                        <Button title='Remove' onClick={handleRemove}></Button>
                        <Separator />
                        <String name='name' value={fullTitle} onChange={(ev) => setName(ev.value)}></String>
                        <Button title='Change name' onClick={handleChangeName}></Button>
                    </Content>
                </Tab>
                </Folder>
            </>
            }
        </>
    )
}