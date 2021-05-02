import { useContext, useEffect, useState } from "react";
import { PaneContext } from "./PaneContext";

export default function Folder({ children, title = 'Undefined', expanded = false }) {
    
    const current = useContext(PaneContext).current;

    const [folder, setFolder] = useState({ current: current })

    useEffect(() => {
        if(current == null) return

        const sceneFolder = current.addFolder({
            title: title,
            expanded: expanded
        })

        setFolder({
            current: sceneFolder
        })
    
    }, [current]);

    return(
        <>
            <PaneContext.Provider value={folder}>
                {children}
            </PaneContext.Provider>
        </>
    );
}