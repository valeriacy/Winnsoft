
function deshabilitarGuardar(){
    let boton = document.querySelector("#guardar");
    boton.disabled = true;
}

function habilitarGuardar(){
    let boton = document.querySelector("#guardar");
    boton.disabled = false;
}

function maestroRegistro(){
    if(formularioValido()){
        habilitarGuardar()
    }else{
        deshabilitarGuardar()
    }
}

function formularioValido(){
    return contrasCoinciden() && todoLleno();
}

function contrasCoinciden(){
    let contra = document.querySelector("#pass");
    let confirmacion = document.querySelector("#confirmar");
    let advertencia = document.querySelector("#advertencia");
    let coinciden = false;

    if(contra.value!=="" && confirmacion.value!==""){
        coinciden = contra.value === confirmacion.value;
    }

    if(coinciden){
        advertencia.style.display = "none";
    }else if(confirmacion.value!==""){
        advertencia.style.display = "block";
    }

    return coinciden;
}

function todoLleno(){
    let nombre = document.querySelector("#nombre");
    let apellido = document.querySelector("#apellido");
    let usuario = document.querySelector("#usuario");

    return nombre.value!=="" && apellido.value!=="" && usuario.value!=="";
}

function mostrarGifLoading(){
    let boton = document.querySelector("#guardar");
    let gif = document.querySelector("#loading");

    boton.style.display="none";
    gif.style.display="block";
}

function ocultarGifLoading(){
    let boton = document.querySelector("#guardar");
    let gif = document.querySelector("#loading");

    boton.style.display="block";
    gif.style.display="none";
}

function construirObjetoUsuario(){
    let name=document.querySelector("#nombre");
        let lastname=document.querySelector("#apellido");
        let rol=document.querySelector("#rol");
        let username=document.querySelector("#usuario");
        let pass=document.querySelector("#pass");
    
        return {
            name: name.value,
            lastname: lastname.value,
            rol: "estudiante",
            username: username.value,
            password: pass.value
        }
}

function validarNombreUsuarioYGuardar(httpService, location){
    let username=document.querySelector("#usuario").value;
    let req = {
        method: 'GET',
        url: "/api/verificarnombreusuario/"+username
    }

    httpService(req)
        .then( (response)=>{
            data = response.data;
            let advertencia = document.querySelector("#advertencia-usuario");
            if(data.length>0){
                advertencia.style.display="block";
            }else{
                advertencia.style.display="none";
                guardarUsuario(httpService, location);
            }
            ocultarGifLoading();
        })
        .catch((error)=>{
            console.error(error);
        });
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

function guardarUsuario(httpService, location){
    deshabilitarGuardar();
    let user = construirObjetoUsuario();
    let req = {
        method: 'POST',
        url: "/api/usuario",
        headers: {
            'Content-Type': 'application/json'
        },
        data : JSON.stringify(user)
    }

    httpService(req)
    .then((response)=>{
        if (response.status==200){
            alert("Se ha guardado el usuario exitosamente");
            location.path('/')
        }
    })
    .catch((error)=>{
        console.error(error);
    });
}