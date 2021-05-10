import { useSelector } from 'react-redux'
import { Button, String } from 'src/tweakpane-react/Input';
import { useState } from 'react';
import Project from 'src/models/Project';
import Folder from 'src/tweakpane-react/Folder';


const getCurrentDateTimeFormatted = () => {
    return new Date().toISOString()
}

export function Save() {

    const scene = useSelector(store => store.scene);
    const [fileNameSaveSection, setFileNameSaveSection] = useState(getCurrentDateTimeFormatted())
    const [titleSaveSection, setTitleSaveSection] = useState('Save scene')

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

    return(
        <>
            <Folder title='Save'>
                <String name='File name' value={getCurrentDateTimeFormatted()} onChange={handleOnChangeFileName}></String>
                <Button title={titleSaveSection} onClick={handleSaveScene} />
                <Button title='Export scene' onClick={handleExportScene} />
            </Folder>
        </>
    );
}