import { useContext, useEffect, useState } from "react";
import { PaneContext } from "./PaneContext";

export default function Tab({ children }) {
    
    const current = useContext(PaneContext).current;

    const [tab, setTab] = useState(null)

    useEffect(() => {
        if(current == null) return

        const data = {
            pages: [
                {title: 'Undefined'}
            ]
        }

        const currentTab = current.addTab(data)
        currentTab.removePage(0)

        setTab({
            current: currentTab
        })

        return () => {
            currentTab.dispose()
        }
    
    }, [current]);

    return(
        <>
            {tab &&
                <PaneContext.Provider value={tab}>
                    {children}
                </PaneContext.Provider>
            }
        </>
    );
}

export function Content({ children, title = 'Undefined' }) {

    const current = useContext(PaneContext).current;

    const [page, setPage] = useState(null)

    useEffect(() => {
        if(current == null) return

        const page = current.addPage({title: title})

        setPage({
            current: page
        })

    }, [current])

    return(
        <>
            {page &&
                <PaneContext.Provider value={page}>
                    {children}
                </PaneContext.Provider>
            }
        </>
    )
}