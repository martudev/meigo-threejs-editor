
//https://stackoverflow.com/questions/19764018/controlling-fps-with-requestanimationframe

export function setLimitFps(fps) {
    const fpsInterval = 1000 / fps;
    const then = Date.now();
    return {
        fpsInterval: fpsInterval,
        then: then
    }
}


export function useLimitFps(callback, fpsObject) {
    let now = Date.now();
    let elapsed = now - fpsObject.then;

    // if enough time has elapsed, draw the next frame

    if (elapsed > fpsObject.fpsInterval) {

        // Get ready for next frame by setting then=now, but also adjust for your
        // specified fpsInterval not being a multiple of RAF's interval (16.7ms)
        fpsObject.then = now - (elapsed % fpsObject.fpsInterval);

        // Put your drawing code here
        callback();
    }
}