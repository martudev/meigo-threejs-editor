import { useEffect, useState } from "react"
import { WebWorker } from "src/models/WebWorker"


const defaultFunction = (event) => {}

export function useWebWorker(Worker, onDoneListener = defaultFunction) {
    const [worker, setWorker] = useState(null)

    useEffect(() => {
        if (worker != null) worker.dispose()
        const webWorker = new WebWorker(Worker)
        webWorker.worker.addEventListener('message', onDoneListener)
        setWorker(webWorker)
    }, [Worker])

    return [
        worker?.worker,
        worker?.url
    ]
}