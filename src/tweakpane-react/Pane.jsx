import { useEffect, useState } from "react";
import { PaneContext } from "./PaneContext";
import Tweakpane from 'tweakpane'

export default function Pane({ children, container = undefined, title = 'Undefined', expanded = false }) {

    const [pane, setPane] = useState({ current: null })
    
    useEffect(() => {
        if (pane.current != null) pane.current.dispose()

        if(container === null) return

        const panel = new Tweakpane({
            container: container,
            title: title,
            expanded: expanded
        });

        setPane({
            current: panel
        })
    
    }, [container]);

    return(
        <>
            <PaneContext.Provider value={pane}>
                {children}
            </PaneContext.Provider>
        </>
    );
}