import { useLayoutEffect, useRef } from 'react';


export function useEventListener(eventName, handler, refElement) {
    // Create a ref that stores handler
    const savedHandler = useRef();
    const element = useRef();
    // Update ref.current value if handler changes.
    // This allows our effect below to always get latest handler ...
    // ... without us needing to pass it in effect deps array ...
    // ... and potentially cause effect to re-run every render.
    useLayoutEffect(() => {
      savedHandler.current = handler;
    }, [handler]);

    useLayoutEffect(() => {
      element.current = refElement.current
    }, [refElement])
    
    useLayoutEffect(() => {
        // Make sure element supports addEventListener
        // On
        const isSupported = element.current && element.current.addEventListener;
        if (!isSupported) return;
        // Create event listener that calls handler function stored in ref
        const eventListener = (event) => savedHandler.current(event);
        // Add event listener
        element.current.addEventListener(eventName, eventListener);
        // Remove event listener on cleanup
        return () => {
          element.current.removeEventListener(eventName, eventListener);
        };
      },
      [eventName, element.current] // Re-run if eventName or element changes
    );
}



export function useOnListener(eventName, handler, element) {
    // Create a ref that stores handler
    const savedHandler = useRef();
    // Update ref.current value if handler changes.
    // This allows our effect below to always get latest handler ...
    // ... without us needing to pass it in effect deps array ...
    // ... and potentially cause effect to re-run every render.
    useLayoutEffect(() => {
      savedHandler.current = handler;
    }, [handler]);
    
    useLayoutEffect(() => {
        // Make sure element supports addEventListener
        // On
        const isSupported = element && element.on;
        if (!isSupported) return;
        // Create event listener that calls handler function stored in ref
        const eventListener = (event) => savedHandler.current(event);
        // Add event listener
        element.on(eventName, eventListener);
        // Remove event listener on cleanup
        return () => {
            element.dispose();
        };
      },
      [eventName, element] // Re-run if eventName or element changes
    );
}