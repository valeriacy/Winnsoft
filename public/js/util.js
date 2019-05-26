const RAIZ="/login";
const PUBLICA="/";

function logIn(httpService, req, contra, location){
    httpService(req)
    .then((response)=>{
        usuario = response.data[0];
        let mensaje;
        let coinciden = usuario.contra === contra;
        mensaje = coinciden ? "Datos ingresados correctamente":"Usuario o Contraseña incorrecto";
        alert(mensaje);
        if(coinciden) {
            guardarUsuarioEnLS(usuario);
            location.path("/principal")
        }
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
function obtenerOfertaPorId(httpService, scope, idOferta){
    let req={
        method: 'GET',
        url: "/api/Oferta/"+idOferta,
    };

    httpService(req)
    .then((response)=>{
        scope.oferta = response.data;
        console.log(response.data);
    })
    .catch((error)=>{
        console.error(error);
    });
}

function obtenerSesionesDeGrupo(httpService, scope, idOferta, idUsuario){
    let req={
        method: 'GET',
        url: "/api/sesiones/"+idOferta,
    };

    httpService(req)
    .then((response)=>{
        let data=response.data;
        filtrarEntregaUsuario(data, idUsuario);
        scope.sesiones = data;
        console.log(data);
    })
    .catch((error)=>{
        console.error(error);
    });
}

function filtrarEntregaUsuario(sesiones, id){
    if(sesiones)
        sesiones.reverse();
    for(let sesion of sesiones){
        filtrarEntregaUsuarioEnSesion(sesion, id);
    }
}

function filtrarEntregaUsuarioEnSesion(sesion, id){
    let productos = sesion.productos;
    if(productos)
        productos.reverse()
    for(let producto of productos){
        let entregasGlobales=producto.entregas;
        let entregasUsuario = entregasGlobales.filter(entrega => entrega.usuario_id===id);
        producto.entregas=entregasUsuario;
    }
}

function obtenerInscripciones(httpService, scope, idUsuario){
    let req={
        method: 'GET',
        url: "/api/obtenerInscripciones/"+idUsuario,
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
function funcionColapsable(){
    return (event) => {
        let element=event.target.parentElement;

        element.classList.toggle("active");
        let content = element.nextElementSibling;
        if (content.style.display === "block") {
        content.style.display = "none";
        } else {
        content.style.display = "block";
        }
    }
}
function cargarMenuEstudiante(location, scope){
    menu=funcionColapsable();
    scope.mostrar_menu=menu;
    scope.inscribir = () => {
        location.path("/inscripcion");
    };
    scope.irMaterias = () => {
        location.path("/verMaterias");
    };
    scope.irPrincipal = () => {
        location.path("/principal");
    };
    scope.irAgregarPortafolio = () => {
        location.path("/agregarPortafolio");
    }
    scope.logOut = () => {
        logOut(location);
    }
}
function obtenerMaterias(scope, httpService){
    let req = {
        method: 'GET',
        url: "/api/usuario/121221",
        headers: {
            'Content-Type': 'application/json'
        }
    }
    httpService(req)
    .then((response)=>{
        scope.lista=response.data;
    })
    .catch((error)=>{
        console.error(error);
    });
}
function guardarEnlocalStorage(key, value){
    window.localStorage.setItem(key,value);
}
function obtenerDelocalStorage(key){
    return window.localStorage.getItem(key);
}
function borrarDelocalStorage(key){
    window.localStorage.removeItem(key)
}
function guardarUsuarioEnLS(usuario){
    let key="usuario";
    let value=JSON.stringify(usuario);
    guardarEnlocalStorage(key, value);
}
function comprobarSesion(){
    let key="usuario";
    let jsonUsuario = obtenerDelocalStorage(key);
    if(jsonUsuario)
        usuario = JSON.parse(jsonUsuario);
}
function logOut(location){
    let key = "usuario";
    usuario = null;
    borrarDelocalStorage(key);
    location.path(PUBLICA)
}

function crearEntrega(entrega, httpService){
    let req = {
        method: 'POST',
        url: "/api/Entrega",
        headers: {
            'Content-Type': 'application/json'
        },
        data : JSON.stringify(entrega)
    }
    consumirApi(httpService,
                    req, 
                    (response)=>{
                        reemplazarDivEntrega(entrega);
                    },
                    (error)=>{
                        console.error(error);
                    }
                )
}

function reemplazarDivEntrega(entrega){
    let productoId = entrega.productoId;
    let entregaDiv = document.querySelector("#div-crear-entrega-"+productoId);
    let newEntregaDiv = crearElementoHTMLEntrega(entrega);
    entregaDiv.innerHTML = newEntregaDiv.innerHTML;
}

function crearElementoHTMLEntrega(entrega){
    let containerDiv = document.createElement("div");
    let lbArchivo = document.createElement("label");
    let lbDescripcion = document.createElement("label");
    let lbContenidoArchivo = document.createElement("label");
    let pContenidoDescripcion = document.createElement("p");

    lbArchivo.innerText="Cargar Archivo:";
    lbContenidoArchivo.innerText=entrega.nombreArchivo;
    lbDescripcion.innerText="Descripción:";
    pContenidoDescripcion.innerText=entrega.descripcion;

    containerDiv.appendChild(lbArchivo);
    containerDiv.appendChild(lbContenidoArchivo);
    containerDiv.appendChild(lbDescripcion);
    containerDiv.appendChild(pContenidoDescripcion);

    return containerDiv;
}

function consumirApi(httpService, req, successCallBack, errorCallBack){
    httpService(req)
    .then(successCallBack)
    .catch(errorCallBack);
}
function cargarMenuDocente(location, scope){
    menu=funcionColapsable();
    scope.mostrar_menu=menu;
    scope.datosD = () => {
        location.path("/datosD");
    };
    scope.materiasD = () => {
        location.path("/materiasD");
    }; 
    scope.tareasD = () =>{
        location.path ("/tareasD");
    };
}
s