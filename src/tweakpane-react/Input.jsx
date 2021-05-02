import { useContext, useEffect, useState } from "react";
import { useOnListener } from "src/hooks/Listeners";
import { PaneContext } from "./PaneContext";

const defaultFunction = () => {}

const getHexStringFormatted = (value) => {
    return '#' + value
}


export function Color({ color = 'fff', name = 'color', input = 'color', picker = undefined, onChange = defaultFunction }) {

    const current = useContext(PaneContext).current

    const [currentInput, setCurrentInput] = useState(null)

    useEffect(() => {
        if(current == null) return

        const data = {}
        data[name] = getHexStringFormatted(color.getHexString())

        const Input = current.addInput(data, name, {
            input: input,
            picker: picker
        })

        setCurrentInput(Input)
    }, [current])

    useOnListener('change', onChange, currentInput)

    return(
        <>
        </>
    );
}



export function Button({ title = 'Undefined', label = undefined, onClick = defaultFunction }) {

    const current = useContext(PaneContext).current

    const [currentInput, setCurrentInput] = useState(null)

    useEffect(() => {
        if(current == null) return

        const Input = current.addButton({
            title: title,
            label: label
        })

        setCurrentInput(Input)
    }, [current])

    useOnListener('click', onClick, currentInput)

    return(
        <>
        </>
    );
}



const defaultPosition3D = {
    x: 0,
    y: 0,
    z: 0
}

export function Point3D({ position = defaultPosition3D, name = 'Undefined',
                            picker = undefined, x = undefined, y = undefined,
                            z = undefined, onChange = defaultFunction }) {

    const current = useContext(PaneContext).current

    const [currentInput, setCurrentInput] = useState(null)

    const defaultState = {}
    defaultState[name] = position
    const [data] = useState(defaultState)
    
    useEffect(() => {
        if(current == null) return

        const Input = current.addInput(data, name, {
            picker: picker,
            x: x,
            y: y,
            z: z
        })

        setCurrentInput(Input)

    }, [current])

    useEffect(() => {
        if(currentInput == null) return

        data[name] = position

        currentInput.refresh()
    }, [position])

    useOnListener('change', onChange, currentInput)

    return(
        <>
        </>
    );
}