import { useDispatch, useSelector } from 'react-redux'
import { Color, Point2D } from 'src/tweakpane-react/Input';
import { Separator } from 'src/tweakpane-react/Separator';
import Folder from '../../../tweakpane-react/Folder';
import * as THREE from 'three'
import { setLimitFps, useLimitFps } from 'src/hooks/LimitFps';
import Load from './Load';
import { Save } from './Save';
import Lights from './Lights';
import { useEffect } from 'react';
import { setGrid } from 'src/redux/Grid/actions';


export function Scene() {

    const dispatch = useDispatch()

    const scene = useSelector(store => store.scene.value)
    const grid = useSelector(store => store.grid.value)

    const fpsObject_background = setLimitFps(60)
    const handleSceneBackground = (ev) => {
        useLimitFps(() => {
            scene.background = new THREE.Color(ev.value);
        }, fpsObject_background)
    }

    const fpsObject_grid = setLimitFps(60)
    const handleChangeGrid = (ev) => {
        useLimitFps(() => {
            dispatch(setGrid({
                x: ev.value.x,
                y: ev.value.y
            }))
        }, fpsObject_grid)
    }

    useEffect(() => {
        const currentGrid = scene.children.filter(child => child.type.includes('GridHelper'))[0]
        if (currentGrid != null) scene.remove(currentGrid)
        const gridHelper = new THREE.GridHelper(grid.x, grid.y)
        scene.add(gridHelper)
    }, [grid])


    return(
        <>
            <Folder title='Scene' expanded={true}>
                <Load />
                <Save />
                <Lights />
                <Separator />
                <Color color={scene.background} name='background' onChange={handleSceneBackground} />
                <Point2D position={grid} x={{ min:0, max: 1000 }} y={{ min: 0, max: 1000 }} name='grid' onChange={handleChangeGrid} ></Point2D>
            </Folder>
        </>
    );
}