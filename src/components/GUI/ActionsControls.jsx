import { useSelector, useDispatch } from 'react-redux'
import { Button, String } from 'src/tweakpane-react/Input';
import * as THREE from 'three'
import { Separator } from 'src/tweakpane-react/Separator';
import { useState, useLayoutEffect } from 'react';
import { setGlobalScene } from 'src/redux/actions';
import { saveAs } from 'file-saver';


const getCurrentDateTimeFormatted = () => {
    return new Date().toISOString()
}


export function ActionsControls() {

    const dispatch = useDispatch()
    const scene = useSelector(store => store.scene)

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
        scene.updateMatrixWorld(); // es importante para el tamaño de los componentes
        const result = scene.toJSON();
        const output = JSON.stringify(result);
        var file = new File([output], `${fileNameSaveSection}.json`, {type: "aplication/json;charset=utf-8"});
        saveAs(file)
        setTitleSaveSection('Save scene')
    }

    const handleExportScene = (ev) => {
        scene.updateMatrixWorld(); // es importante para el tamaño de los componentes
        const result = scene.toJSON();
        const output = JSON.stringify(result);
        var file = new File([output], `${fileNameSaveSection}.json`, {type: "aplication/json;charset=utf-8"});
        //saveAs(file)
    }

    const handleLoad3DModel = (ev) => {
        console.log('load 3d..')
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