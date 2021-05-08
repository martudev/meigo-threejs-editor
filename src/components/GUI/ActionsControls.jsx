import { useSelector, useDispatch } from 'react-redux'
import { Button, String } from 'src/tweakpane-react/Input';
import * as THREE from 'three'
import { Separator } from 'src/tweakpane-react/Separator';
import { useState, useLayoutEffect, useRef } from 'react';
import { setGlobalScene } from 'src/redux/actions';
import Project from 'src/models/Project';


const getCurrentDateTimeFormatted = () => {
    return new Date().toISOString()
}


export function ActionsControls() {

    const dispatch = useDispatch()

    const scene = useSelector(store => store.scene);
    const [fileNameSaveSection, setFileNameSaveSection] = useState(getCurrentDateTimeFormatted())
    const [titleSaveSection, setTitleSaveSection] = useState('Save scene')
    const inputRef = useRef()

    const onLoadScene = (event) => {
        const json = Project.getSceneFromString(event.target.result)
        new THREE.ObjectLoader().parse(json, (obj) => {
            dispatch(setGlobalScene(obj))
        })
    }

    useLayoutEffect(() => {
        const onChange = (ev) => {
            const fileList = ev.target.files;
            var reader = new FileReader()
            reader.onload = onLoadScene
            reader.readAsText(fileList[0], 'text/plain;charset=utf-16')
        }

        const fileSelector = inputRef.current

        fileSelector.addEventListener('change', onChange)

        return () => {
            fileSelector.removeEventListener('change', onChange)
        }
    }, [])


    const handleLoadScene = (ev) => {
        inputRef.current.click()
    }

    const handleSaveScene = (ev) => {
        setTitleSaveSection('Saving...')
        Project.saveSceneAsFile(scene, fileNameSaveSection)
        setTitleSaveSection('Save scene')
    }

    const handleExportScene = (ev) => {
        // TODO: make an export here
    }

    const handleOnChangeFileName = (ev) => {
        setFileNameSaveSection(ev.value)
    }

    const handleNewScene = () => {
        Project.newScene()
    }

    return(
        <>
            <input type="file" accept=".obj" style={{ display: 'none' }} ref={inputRef}></input>
            <Separator />
            <Button title='New scene' onClick={handleNewScene} />
            <Button title='Load scene' onClick={handleLoadScene} />
            <Separator />
            <String name='File name' value={getCurrentDateTimeFormatted()} onChange={handleOnChangeFileName}></String>
            <Button title={titleSaveSection} onClick={handleSaveScene} />
            <Button title='Export scene' onClick={handleExportScene} />
        </>
    );
}