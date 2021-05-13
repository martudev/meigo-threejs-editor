import { useContext, useEffect, useState } from "react";
import { PaneContext } from "./PaneContext";

export default function Folder({ children, title = 'Undefined', expanded = false }) {
    
    const current = useContext(PaneContext).current;

    const [folder, setFolder] = useState(null)

    useEffect(() => {
        if(current == null) return

        const sceneFolder = current.addFolder({
            title: title,
            expanded: expanded
        })

        setFolder({
            current: sceneFolder
        })

        return () => {
            sceneFolder.dispose()
        }
    
    }, [current]);

    useEffect(() => {
        if (folder == null) return
        folder.current.title = title
    }, [title])

    return(
        <>
            {folder &&
                <PaneContext.Provider value={folder}>
                    {children}
                </PaneContext.Provider>
            }
        </>
    );
}