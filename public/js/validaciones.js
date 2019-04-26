
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