import { useSelector, useDispatch } from 'react-redux'
import { Button, String } from 'src/tweakpane-react/Input';
import * as THREE from 'three'
import { Separator } from 'src/tweakpane-react/Separator';
import { useState, useLayoutEffect } from 'react';
import { setGlobalScene } from 'src/redux/actions';
import ProjectSaver from 'src/models/Project';


const getCurrentDateTimeFormatted = () => {
    return new Date().toISOString()
}


export function ActionsControls() {

    const dispatch = useDispatch()

    const scene = useSelector(store => store.scene);
    const [fileNameSaveSection, setFileNameSaveSection] = useState(getCurrentDateTimeFormatted())
    const [titleSaveSection, setTitleSaveSection] = useState('Save scene')

    const onLoadScene = (event) => {
        var json = JSON.parse(event.target.result)
        new THREE.ObjectLoader().parse(json, (obj) => {
            dispatch(setGlobalScene(obj))
        })
    }

    useLayoutEffect(() => {
        const onChange = (ev) => {
            const fileList = ev.target.files;
            var reader = new FileReader()
            reader.onload = onLoadScene
            reader.readAsText(fileList[0], 'aplication/json;charset=utf-8')
        }

        const fileSelector = document.getElementById('file-selector')

        fileSelector.addEventListener('change', onChange)

        return () => {
            fileSelector.removeEventListener('change', onChange)
        }
    }, [])


    const handleLoadScene = (ev) => {
        document.getElementById('file-selector').click()
    }

    const handleSaveScene = (ev) => {
        setTitleSaveSection('Saving...')
        ProjectSaver.saveSceneAsFile(scene, fileNameSaveSection)
        setTitleSaveSection('Save scene')
    }

    const handleExportScene = (ev) => {
        // TODO: make an export here
    }

    const handleLoad3DModel = (ev) => {
        // TODO: make an load 3d here
    }

    const handleOnChangeFileName = (ev) => {
        setFileNameSaveSection(ev.value)
    }

    return(
        <>
            <input type="file" id="file-selector" accept=".json" style={{ display: 'none' }}></input>
            <Button title='Load scene' onClick={handleLoadScene} />
            <Separator />
            <String name='File name' value={getCurrentDateTimeFormatted()} onChange={handleOnChangeFileName}></String>
            <Button title={titleSaveSection} onClick={handleSaveScene} />
            <Button title='Export scene' onClick={handleExportScene} />
            <Separator />
            <Button title='Load 3d Model' onClick={handleLoad3DModel} />
        </>
    );
}