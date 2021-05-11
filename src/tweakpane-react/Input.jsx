import { useContext, useEffect, useState } from "react";
import { useOnListener } from "src/hooks/Listeners";
import { PaneContext } from "./PaneContext";
import * as THREE from 'three'

const defaultFunction = () => {}

const getHexStringFormatted = (value) => {
    return '#' + value
}


export function Color({ color = new THREE.Color("#fff") , name = 'Undefined', picker = undefined, onChange = defaultFunction }) {

    const current = useContext(PaneContext).current

    const [currentInput, setCurrentInput] = useState(null)

    const defaultData = {}
    defaultData[name] = getHexStringFormatted(color.getHexString())
    const [data] = useState(defaultData)

    useEffect(() => {
        if(current == null) return

        const Input = current.addInput(data, name, {
            input: 'color',
            picker: picker
        })

        setCurrentInput(Input)

        return () => {
            Input.dispose()
        }
    }, [current])

    useEffect(() => {
        if(currentInput == null) return

        data[name] = getHexStringFormatted(color.getHexString())

        currentInput.refresh()
    }, [color])

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

        return () => {
            Input.dispose()
        }
    }, [current])

    useEffect(() => {
        if (currentInput == null) return

        currentInput.title = title
    }, [title])

    useOnListener('click', onClick, currentInput)

    return(
        <>
        </>
    );
}



export function String({ name = 'Undefined', value = '', onChange = defaultFunction }) {
    
    const current = useContext(PaneContext).current

    const [currentInput, setCurrentInput] = useState(null)

    useEffect(() => {
        if(current == null) return

        const data = {}
        data[name] = value

        const Input = current.addInput(data, name)

        setCurrentInput(Input)

        return () => {
            Input.dispose()
        }
    }, [current])

    useOnListener('change', onChange, currentInput)
    
    return(
        <>
        </>
    );
}



export function Number({ name = 'Undefined', value = 0, min = undefined, max = undefined, onChange = defaultFunction }) {
    
    const current = useContext(PaneContext).current

    const [currentInput, setCurrentInput] = useState(null)

    useEffect(() => {
        if(current == null) return

        const data = {}
        data[name] = value

        const Input = current.addInput(data, name, {
            min: min,
            max: max
        })

        setCurrentInput(Input)

        return () => {
            Input.dispose()
        }
    }, [current])

    useOnListener('change', onChange, currentInput)
    
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

        return () => {
            Input.dispose()
        }

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