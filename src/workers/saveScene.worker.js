import Project from "src/models/Project";


self.addEventListener('message', ({ data: { sceneJson, grid, ambientLights, pointLights, object3ds, fileName } }) => {

    const file = Project.saveSceneAsFile({ 
        sceneJson,
        grid,
        ambientLights,
        pointLights,
        object3ds,
        fileName,
    })

    postMessage(file);
})