import { useDispatch } from "react-redux";
import { AddAmbientLight, AddPointLight } from "src/redux/actions";
import Folder from "src/tweakpane-react/Folder";
import { Button } from "src/tweakpane-react/Input";


export default function Lights() {

    const dispatch = useDispatch()

    const handleAddAmbientLight = () => {
        dispatch(AddAmbientLight())
    }

    const handleAddPointLight = () => {
        dispatch(AddPointLight())
    }

    return(
        <>
            <Folder title='Lights'>
                <Button title='Add AmbientLight' onClick={handleAddAmbientLight}/>
                <Button title='Add PointLight' onClick={handleAddPointLight}/>
            </Folder>
        </>
    )
}