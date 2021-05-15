import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLimitFps, useLimitFps } from "src/hooks/LimitFps";
import { RemoveAmbientLight } from "src/redux/actions";
import Folder from "src/tweakpane-react/Folder";
import { Button, Color, Number, String } from "src/tweakpane-react/Input";
import { Separator } from "src/tweakpane-react/Separator";
import Tab, { Content } from "src/tweakpane-react/Tab";
import * as THREE from 'three'


export default function AmbientLight({ title = 'AmbientLight', number = 0, color = '#4d4d4d', intensity = 8 }) {

    const dispatch = useDispatch()
    const scene = useSelector(store => store.scene)

    const [isVisible, setVisibility] = useState(false)
    const [light, setLight] = useState(null)
    const [fullTitle, setFullTitle] = useState(title)
    const [name, setName] = useState(fullTitle)

    const handleRemove = () => {
        setVisibility(false)
        dispatch(RemoveAmbientLight(number))
    }

    const handleChangeName = () => {
        setFullTitle(name)
    }

    const fpsObject_color = setLimitFps(60)
    const handleChangeColor = (ev) => {
        useLimitFps(() => {
            light.color = new THREE.Color(ev.value)
        }, fpsObject_color)
    }

    const fpsObject_intensity = setLimitFps(60)
    const handleChangeIntensity = (ev) => {
        useLimitFps(() => {
            light.intensity = ev.value
        }, fpsObject_intensity)
    }

    useEffect(() => {
        const light = new THREE.AmbientLight(color, intensity);
        scene.add(light)

        setLight(light)
        setVisibility(true)

        return () => {
            scene.remove(light)
        }
    }, [])


    return(
        <>
            {isVisible &&
            <>
                <Folder title={fullTitle}>
                <Tab>
                    <Content title='Values'>
                        <Color color={light.color} name='color' onChange={handleChangeColor}></Color>
                        <Number value={light.intensity} name='intensity' onChange={handleChangeIntensity} ></Number>
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