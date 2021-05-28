import { useDispatch, useSelector } from 'react-redux'
import { Button, String } from 'src/tweakpane-react/Input';
import { useState, useEffect } from 'react';
import Project from 'src/models/Project';
import Folder from 'src/tweakpane-react/Folder'

import Worker from "src/workers/saveScene.worker.js";
import { useWebWorker } from 'src/hooks/useWebWorker';
import { saveAs } from 'file-saver';
import { Utf16Buffer } from 'src/models/Buffer';


const getCurrentDateTimeFormatted = () => {
    return new Date().toISOString()
}

export function Save() {

    const scene = useSelector(store => store.scene.value)
    const grid = useSelector(store => store.grid.value)
    const [fileNameSaveSection, setFileNameSaveSection] = useState(getCurrentDateTimeFormatted())
    const [titleSaveSection, setTitleSaveSection] = useState('Save scene')

    const AmbientLight_objects = useSelector(store => store.AmbientLight.value.objects);
    const PointLight_objects = useSelector(store => store.PointLight.value.objects);
    const Object3D_objects = useSelector(store => store.Object3D.value.objects);

    const listenerWorker = (event) => {
        console.log('isDone?:', event.data)
        saveAs(event.data)
        setTitleSaveSection('Save scene')
    }

    const [worker] = useWebWorker(Worker, listenerWorker)

    const handleSaveScene = async (ev) => {
        setTitleSaveSection('Saving...')

        const data = {
            sceneJson: Project.prepareSceneToSave(scene),
            grid: grid,
            ambientLights: AmbientLight_objects,
            pointLights: PointLight_objects,
            object3ds: Object3D_objects,
            fileName: fileNameSaveSection,
        }

        worker.postMessage(data)
    }

    const handleExportScene = (ev) => {
        // TODO: make an export here
    }

    const handleOnChangeFileName = (ev) => {
        setFileNameSaveSection(ev.value)
    }

    return(
        <>
            <Folder title='Save'>
                <String name='File name' value={fileNameSaveSection} onChange={handleOnChangeFileName}></String>
                <Button title={titleSaveSection} onClick={handleSaveScene} />
                <Button title='Export scene' onClick={handleExportScene} />
            </Folder>
        </>
    );
}