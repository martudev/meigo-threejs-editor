import { useContext, useEffect } from "react";
import { PaneContext } from "./PaneContext";


export function Separator() {
    const current = useContext(PaneContext).current

    useEffect(() => {
        if(current == null) return

        current.addSeparator()

    }, [current])

    return(
        <>
        </>
    );
}