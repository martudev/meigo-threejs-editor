import { useState } from "react";
import { useDispatch } from "react-redux";
import { RemoveAmbientLight } from "src/redux/actions";
import Folder from "src/tweakpane-react/Folder";
import { Button } from "src/tweakpane-react/Input";


export default function AmbientLight({ title = 'AmbientLight', number = 0 }) {

    const dispatch = useDispatch()

    const [isVisible, setVisibility] = useState(true)

    const handleRemove = () => {
        setVisibility(false)
        dispatch(RemoveAmbientLight(number))
    }

    return(
        <>
            {isVisible &&
                <Folder title={title + number}>
                    <Button title='Remove' onClick={handleRemove}></Button>
                </Folder>
            }
        </>
    )
}