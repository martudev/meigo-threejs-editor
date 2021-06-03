import React, { useRef } from "react"
import { useDispatch } from "react-redux"
import { useEventListener } from "src/hooks/Listeners"
import Project from "src/models/Project"

const defaultFunction = () => {}

export default function LoadScene({ children, onLoading = defaultFunction, onDone = defaultFunction }) {

    const dispatch = useDispatch()

    const inputRef = useRef()
    
    const onLoadSceneDone = () => {
        inputRef.current.value = '' // IMPORTANT cleaning the input type file

        onDone()
    }

    const onInputChange = (ev) => {
        const fileList = ev.target.files;
        Project.ReadFileAndLoadScene(onLoadSceneDone, fileList[0], dispatch)

        onLoading()
    }

    useEventListener('change', onInputChange, inputRef)

    const handleClick = (ev) => {
        inputRef.current.click()
    }


    return(
        <>
            <input type="file" accept="*" style={{ display: 'none' }} ref={inputRef}></input>
            {React.Children.map(children, (element, idx) => {
                return React.cloneElement(element, {onClick: handleClick})
            })}
        </>
    )
}