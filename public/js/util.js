const RAIZ="/login";
const PUBLICA="/";

function logIn(httpService, req, contra, location){
    httpService(req)
    .then((response)=>{
        usuario = response.data[0];
        let mensaje;
        let coinciden = false;
        if(usuario){
            coinciden = usuario.contra === contra;
            mensaje = coinciden ? "Datos ingresados correctamente":"Usuario o Contraseña incorrecto";
        }else{
            mensaje = "Usuario o Contraseña incorrecto";
        }
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
    console.log(idMateria);
    console.log(array);
    if(array){
        for(let i=0; i<array.length; i++){
            if(idMateria===array[i].id){
                encontrado=true;
                break;
            }
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

function obtenerInscripciones(httpService, scope, usuario){
    if(usuario.rol === "estudiante")
        obtenerMateriasPorInscripcion(httpService, scope, usuario.id);
    else if(usuario.rol === "docente")
        obtenerMateriasDictadas(httpService, scope, usuario.id);    
}

function obtenerMateriasDictadas(httpService, scope, idUsuario){
    let req={
        method: 'GET',
        url: "/api/obtenerDictadas/"+idUsuario,
    };

    httpService(req)
    .then((response)=>{
        scope.dictadas = response.data;
    })
    .catch((error)=>{
        console.error(error);
    });
}

function obtenerMateriasPorInscripcion(httpService, scope, idUsuario){
    let req={
        method: 'GET',
        url: "/api/obtenerInscripciones/"+idUsuario,
    };

    httpService(req)
    .then((response)=>{
        scope.inscripciones = response.data;
        scope.estaEnLista = (idMateria)=>{
            encontrado=false;
            for(let i=0; i<scope.inscripciones.length; i++){
                if(idMateria==scope.inscripciones[i][0].id){
                    encontrado=true;
                    break;
                }
            }
            return encontrado;
        }
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
    let value=JSON.stringify(usuario.id);
    guardarEnlocalStorage(key, value);
}
function comprobarSesion(httpService, location){
    let key="usuario";
    let usuarioId = obtenerDelocalStorage(key);
    if(usuarioId){
        let req = {
            method: 'GET',
            url: "/api/basic/"+usuarioId
        }
        consumirApi(httpService,
                        req, 
                        (response)=>{
                            usuario = response.data;
                            location.path("/principal");
                        },
                        (error)=>{
                            console.error(error);
                        }
                    )
    }
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
    scope.inicioD = () => {
        location.path("/principal");
    };
    scope.materiasD = () => {
        location.path("/verMaterias");
    }; 
    scope.logOut = () => {
        logOut(location);
    }
    
}

function cargarMenuPara(rol, location, scope){
    switch (rol) {
        case 'estudiante':
          cargarMenuEstudiante(location, scope);
          break;
        case 'docente':
          cargarMenuDocente(location, scope);
          break;
        default:
          console.log('Lo lamentamos, por el momento no disponemos de ' + rol + '.');
      }
}

function cargarEntregasPorProducto(httpService, scope, productoId){
    let req = {
        method: 'GET',
        url: "/api/entregas/"+productoId
    }
    consumirApi(httpService,
                    req, 
                    (response)=>{
                        scope.entregas = response.data;
                    },
                    (error)=>{
                        console.error(error);
                    }
                )
}

function cargarEntregaPorId(httpService, scope, entregaId){
    let req = {
        method: 'GET',
        url: "/api/Entrega/"+entregaId
    }
    consumirApi(httpService,
                    req, 
                    (response)=>{
                        scope.entrega = response.data;
                        obtenerNombresPorId(httpService, scope, response.data.usuario_id);
                    },
                    (error)=>{
                        console.error(error);
                    }
                )
}

function obtenerNombresPorId(httpService, scope, usuarioId){
    let req = {
        method: 'GET',
        url: "/api/usuarioNombres/"+usuarioId
    }
    consumirApi(httpService,
                    req, 
                    (response)=>{
                        scope.estudiante = response.data;
                    },
                    (error)=>{
                        console.error(error);
                    }
                )
}


function nuevaSesion(grupoId, httpService, scope, usuarioId){
    let grupo={
        grupoId:grupoId
    }

    let req = {
        method: 'POST',
        url: "/api/Sesion",
        headers: {
            'Content-Type': 'application/json'
        },
        data : JSON.stringify(grupo)
    }
    consumirApi(httpService,
                    req, 
                    (response)=>{
                        obtenerSesionesDeGrupo(httpService,scope,grupoId, usuarioId);
                    },
                    (error)=>{
                        console.error(error);
                    }
                )
}

function showElementById(elementId){
    let element = document.querySelector("#"+elementId);
    element.classList.remove("hidden");
}   

function hideElementById(elementId){
    let element = document.querySelector("#"+elementId);
    element.classList.add("hidden");
}

function mostrarFormProducto(sesionId){
    let formId = "productoForm-"+sesionId;
    let triggerButtonId = "newProducto-"+sesionId;
    showElementById(formId);
    hideElementById(triggerButtonId);
}

function ocultarFormProducto(sesionId){
    let formId = "productoForm-"+sesionId;
    let triggerButtonId = "newProducto-"+sesionId;
    hideElementById(formId);
    showElementById(triggerButtonId);
}

function enviarNuevoProducto(producto, httpService, scope, usuarioId, grupoId){
    let req = {
        method: 'POST',
        url: "/api/Producto",
        headers: {
            'Content-Type': 'application/json'
        },
        data : JSON.stringify(producto)
    }
    consumirApi(httpService,
                    req, 
                    (response)=>{
                        ocultarFormProducto(producto.sesionId);
                        obtenerSesionesDeGrupo(httpService, scope, grupoId, usuarioId);
                    },
                    (error)=>{
                        console.error(error);
                    }
                )
}

function hideMainLoad(){
    let id = "main-load-div";
    let loadingDiv = document.querySelector("#"+id);
    if(loadingDiv)
        loadingDiv.classList.add("hidden")
}

function watchFunction(oldValue, newValue){
    if(oldValue===newValue)
        return;
    hideMainLoad();
}