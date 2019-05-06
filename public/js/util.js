function logIn(httpService, req, contra, location){
    httpService(req)
    .then((response)=>{
        usuario = response.data[0];
        let mensaje;
        let coinciden = usuario.contra === contra;
        mensaje = coinciden ? "Datos ingresados correctamente":"Usuario o Contraseña incorrecto";
        alert(mensaje);
        if(coinciden) location.path("/principal")
    })
    .catch((error)=>{
        console.error(error);
    });
}

function obtener_ofertas(httpService, scope){
    let req={
        method: 'GET',
        url: "/api/Ofertas",
    };

    httpService(req)
    .then((response)=>{
        scope.ofertas = response.data;
    })
    .catch((error)=>{
        console.error(error);
    });
}

function estaEnLista(idMateria, array){
    encontrado=false;
    for(let i=0; i<array.length;i++){
        if(idMateria===array[i].id){
            encontrado=true;
            break;
        }
    }
    return encontrado;
}

function obtenerInscripciones(httpService, scope, idUsuario){
    let req={
        method: 'GET',
        url: "api/obtenerInscripciones/"+idUsuario,
    };

    httpService(req)
    .then((response)=>{
        scope.inscripciones = response.data;
        console.log(response.data);
    })
    .catch((error)=>{
        console.error(error);
    });
}
function eventosRegistro(){
    maestroRegistro();
    let campos = [];
    campos.push(document.querySelector("#nombre"));
    campos.push(document.querySelector("#apellido"));
    campos.push(document.querySelector("#usuario"));
    campos.push(document.querySelector("#pass"));
    campos.push(document.querySelector("#confirmar"));

   for (let campo of campos) {
        campo.addEventListener("keyup", maestroRegistro)   
   }    
}
function mostrarContenido (event){
    console.log (event.target.value)
}
function inicial_menu(){
    let coll = document.getElementsByClassName("collapsible");
    let i; 

    return (event) => {
       let element=event.target;

        element.classList.toggle("active");
        let content = element.nextElementSibling;
        if (content.style.display === "block") {
        content.style.display = "none";
        } else {
        content.style.display = "block";
        }
    }
}
