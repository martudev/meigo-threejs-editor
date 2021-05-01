// FUNCION PARA CONVERTIR UNA scene EN JSON Y VOLVERLA A CARGARLA
/*scene.updateMatrixWorld(); // es importante para el tamaño de los componentes
let result = scene.toJSON();
result = JSON.stringify( result );
new THREE.ObjectLoader().parse(JSON.parse(result), (obj) => {
    scene = obj;
})*/


// FUNCION PARA GUARDAR EL ARCHIVO output DEBE SER STRINGIFY
/*var file = new File([output], "test.json", {type: "aplication/json;charset=utf-8"});
saveAs(file)*/



/*input.on('change', (ev) => {
        scene.background = new THREE.Color(ev.value);


        var fileS = document.getElementById('file-selector')

        fileS.addEventListener('change', (ev) => {
            const fileList = ev.target.files;
            var reader = new FileReader()
            reader.onload = (event) => {
                var json = JSON.parse(event.target.result)
                scene = new THREE.ObjectLoader().parse( json )
                console.log(scene)
            }
            reader.readAsText(fileList[0], 'aplication/json;charset=utf-8')
        })

        fileS.click()
    })*/