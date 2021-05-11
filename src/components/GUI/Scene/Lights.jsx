import { useDispatch } from "react-redux";
import { AddAmbientLight } from "src/redux/actions";
import Folder from "src/tweakpane-react/Folder";
import { Button } from "src/tweakpane-react/Input";


export default function Lights() {

    const dispatch = useDispatch()

    const handleClick = () => {
        dispatch(AddAmbientLight())
    }

    return(
        <>
            <Folder title='Lights'>
                <Button title='Add AmbientLight' onClick={handleClick}/>
            </Folder>
        </>
    )
}