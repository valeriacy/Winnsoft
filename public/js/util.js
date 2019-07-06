const RAIZ="/login";
const PUBLICA="/";
let formData = new FormData();

function modificarBotonesEnDiv(selector, disabled){
    let buttons = document.querySelectorAll(selector + " button");
    for(button of buttons){
        button.disabled = disabled;
    }
}

function logIn(httpService, req, contra, location){
    httpService(req)
    .then((response)=>{
        usuario = response.data[0];
        let mensaje;
        let coinciden = false;
        if(usuario){
            coinciden = usuario.contra === contra;
            mensaje = coinciden ? "":"Usuario o contraseña incorrectos";
        }else{
            interCambioBlock("#entrar","#loading");
        }
        if(coinciden) {
            guardarUsuarioEnLS(usuario);
            location.path("/principal")
        }else{
            alert("Usuario o contraseña incorrectos");
            interCambioBlock("#entrar","#loading");
        }
    })
    .catch((error)=>{
        console.error(error);
    });
}

function estaEnLista(idMateria, array){
    encontrado=false;
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

function obtenerInscripciones(httpService, scope, usuario){
    if(usuario.rol === "estudiante")
        obtenerMateriasPorInscripcion(httpService, scope, usuario.id);
    else if(usuario.rol === "docente")
        obtenerMateriasDictadas(httpService, scope, usuario.id);
    else
        obtenerMateriasAuxiliadas(httpService, scope, usuario.id);
}

function obtenerMateriasAuxiliadas(httpService, scope, idUsuario){
    consumirApi(httpService,
                {
                    method: 'GET',
                    url: "/api/obtenerAuxiliadas/"+idUsuario,
                },
                (response)=>{
                    scope.auxiliadas = response.data;  
                },
                (error)=>{
                    console.error(error);
                })
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
                if(idMateria==scope.inscripciones[i][2].id){
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

function cargarMenuAuxiliar(location, scope){
    menu=funcionColapsable();
    scope.mostrar_menu=menu;
    scope.inicioD = () => {
        location.path("/principal");
    };
    scope.materiasA = () => {
        location.path("/verMaterias");
    }; 
    scope.logOut = () => {
        logOut(location);
    }
    
}
function cargarMenuAdministrador(location, scope){
    menu=funcionColapsable();
    scope.mostrar_menu=menu;
    scope.inicioD = () => {
        location.path("/principal");
    };
    scope.usuariosA= () => {
        location.path("/usuariosA");
    };
    scope.gruposA = () => {
        location.path("/gruposA");
    }; 
    scope.materiasA = () => {
        location.path("/materiasA");
    }; 
    scope.gestionarA = () => {
        location.path("/usuariosA");
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
        case 'auxiliar':
          cargarMenuAuxiliar(location, scope);
          break;
          case 'administrador':
          cargarMenuAdministrador(location,scope);
          break;
        default:
          console.log('Lo lamentamos, por el momento no disponemos de ' + rol + '.');
      }
}

function cargarEntregasPorProducto(httpService, scope, productoId){
    let req = {
        method: 'GET',
        url: "/api/Producto/"+productoId
    }
    consumirApi(httpService,
                    req, 
                    (response)=>{
                        scope.producto = response.data;
                        scope.entregas = response.data.entregas;
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

function obtenerInscritosPorGrupo(httpService, scope, grupoId){
    consumirApi(httpService,
                {
                    method: 'GET',
                    url: "/api/inscritos/"+grupoId
                },
                (response)=>{
                    scope.inscritos = response.data;
                    scope.asistencias = crearArrayAsistencias(scope.inscritos);
                }, 
                (error)=>{
                    console.error(error);
                });
}

function revisarSiYaSeRegistro(httpService, scope, sesionId, grupoId){
    consumirApi(httpService,
        {
            method: 'GET',
            url: "/api/asistenciasHoy/"+sesionId
        },
        (response)=>{
            if(response.data > 0){
                scope.nuevo = false;
                obtenerAsistenciasPorSesion(httpService, scope, sesionId);
            }else{
                obtenerInscritosPorGrupo(httpService, scope, grupoId);
            }
        }, 
        (error)=>{
            console.error(error);
        });
}

function obtenerAsistenciasPorSesion(httpService, scope, sesionId){
    consumirApi(httpService,
        {
            method: 'GET',
            url: "/api/asistenciasHoyCompleto/"+sesionId
        },
        (response)=>{
            scope.inscritos = response.data.inscritos;
            scope.asistencias = response.data.asistencias;
        }, 
        (error)=>{
            console.error(error);
        });
}

function crearArrayAsistencias(inscritos){
    let asistencias = [];
    for(inscrito of inscritos){
        asistencias.push({
            inscripcion_id : inscrito.inscripcionId,
            descripcion : "Ninguna",
            observacion : "Ninguna",
            asistio : false
        });
    }
    return asistencias;
}

function obtenerSesionAbiertaPorGrupoId(httpService, scope, grupoId){
    consumirApi(httpService,
        {
            method: 'GET',
            url: "/api/sesionAbierta/"+grupoId
        },
        (response)=>{
            scope.sesion = response.data
            revisarSiYaSeRegistro(httpService, scope, scope.sesion.id, grupoId);
        }, 
        (error)=>{
            console.error(error);
        });
}

function obtenerSesionPorId(httpService, scope, sesionId){
    consumirApi(httpService,
        {
            method: 'GET',
            url: "/api/Sesion/"+sesionId
        },
        (response)=>{
            scope.sesion = response.data
        }, 
        (error)=>{
            console.error(error);
        });
}

function cargarDocentes(httpService, scope){
    cargaGenerica(httpService, 
                (response) => {
                    scope.docentes = response.data;
                }, 
                  "/api/todosDocente");
}

function cargarAuxiliares(httpService, scope){
    cargaGenerica(httpService,
                 (response) => {
                     scope.auxiliares = response.data;
                 }, 
                  "/api/todosAuxi");
}

function cargarMaterias(httpService, scope){
    cargaGenerica(httpService, 
        (response) => {
        scope.materias = response.data;
        }, 
        "/api/materias");
}

function cargaGenerica(httpService, responseFunction, url){

    consumirApi(httpService,
        {
            method: 'GET',
            url: url
        },responseFunction
        , 
        (error)=>{
            console.error(error);
        });
}

function limpiarForm(){
    let inputs = document.querySelectorAll("input");
    let selects = document.querySelectorAll("select");
    let arrays = [];
    arrays.push(inputs);
    arrays.push(selects);

    for(array of arrays){
        for(element of array){
            switch (element.type) {
                case "time":
                    element.value="07:15";
                  break;
                case "number":
                    element.value = 0;
                  break;
                default:
                    element.value="";
                  break;
              }
        }
    }
}

function validarCamposEntrega(productoId){
    let textArea=document.querySelector("#descripcion-"+productoId);
    let fileInput=document.querySelector("#file-"+productoId);

    return textArea.value !== "" || fileInput.value !== "";
}

function validarArchivoEstudiante(file){
    let tokens = file.value.split('.');
    let tamanhoTokens = tokens.length;
    switch(tokens[tamanhoTokens - 1]){
        case 'zip':
            return true;
        case 'rar':
            return true;
        case '7z':
            return true;
        case 'gz':
            return true;
        default:
            alert('Tipo de archivo no admitido, debe ser [zip, rar, 7z]')
            return false;
    }
}

function interCambioBlock(aMostrar, aOcultar){
    let ocultar = document.querySelector(aOcultar);
    let mostrar = document.querySelector(aMostrar);

    ocultar.style.display="none";
    mostrar.style.display="block";
}

function pararContadores(){
    for (let i = 1; i < 9999; i++)
            window.clearInterval(i);
}

function setCounter(fecha, selector, sesion){
    fecha = stringDateToVector(fecha);
    timer(fecha['year'], fecha['month'], fecha['date'], selector, sesion);
}

function stringDateToVector(fecha){
    let divido = fecha.split('-');
    return {
        'year':divido[0],
        'month':divido[1] - 1,
        'date':divido[2]
    };
}

function timer(year, month, date, selector, sesion){
    // Set the date we're counting down to
    let countDownDate = new Date(year, month, date).getTime();
    // Update the count down every 1 second
    let counter = setInterval(() => {

    // Get today's date and time
    let now = new Date().getTime();
        
    // Find the distance between now and the count down date
    let distance = countDownDate - now;
        
    // Time calculations for days, hours, minutes and seconds
    let days = Math.floor(distance / (1000 * 60 * 60 * 24));
    let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
    // Output the result in an element with id="demo"
    document.getElementById(selector).innerHTML = days + "d " + hours + "h "
    + minutes + "m " + seconds + "s ";
        
    // If the count down is over, write some text 
    if (distance < 0) {
        sesion.cerrado = 1;
        clearInterval(counter);
        document.getElementById(selector).innerHTML = "EXPIRADO";
    }
    }, 1000);
}

function obtenerStringFecha(date){
    let anho = date.getFullYear();
    let mes = (date.getMonth() + 1) >=10 ? (date.getMonth() + 1) : "0" + (date.getMonth() + 1);
    let dia = date.getDate()>=10 ? date.getDate() : "0" + date.getDate();
    let fecha = anho +"-"+ mes +"-"+ dia;
    return fecha;
}