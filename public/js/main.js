let usuario;

let app = angular.module("myApp", ["ngRoute", "ngAnimate"]);
app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "/publica.html",
        controller : "mainCtrl"
    })
    .when("/login", {
        templateUrl : "/inicio.html",
        controller : "loginCtrl"
    })
    .when("/registrar", {
        templateUrl : "/registro.html",
        controller : "registroCtrl"
    })
    .when ("/principal",{
        templateUrl :"/principal.html",
        controller : "principalCtrl"
     })
    .when("/inscripcion",{
         templateUrl : "/inscripcion.html",
         controller : "inscripcionCtrl"
     })
    .when("/verMaterias",
    {
      templateUrl:"/verMaterias.html",
      controller: "misMateriasCtrl" 
    })
    .when("/sesiones/:id",
    {
      templateUrl:"/verSesiones.html",
      controller: "sesionesCtrl" 
    })
    .when("/agregarPortafolio",
    {
        templateUrl:"/agregarPortafolio.html",
        controller: "agregarPortafolioCtrl",
    })
    .when("/verEntregas/:productoId",
    {
        templateUrl:"/tablaEntregas.html",
        controller:"entregasCtrl",
    })
    .when("/verEntrega/:entregaId",
    {
        templateUrl:"/entregaEstudiante.html",
        controller:"entregaCtrl",
    })
    .when ("/tareasD",
    {
        templateUrl:"tareasD.html",
        controller:"tareasDCtrl",
    })
    .when("/sesionesAux/:grupoId",{
        templateUrl:"/sesionAux.html",
        controller:"sesionesAuxCtrl"
    })
    .when("/reporteSesion/:sesionId",{
        templateUrl:"/sesionAux.html",
        controller:"reporteSesionCtrl"
    })
    .when("/reporteGrupo/:grupoId",{
        templateUrl:"/reporteEstudiantes.html",
        controller:"reporteGeneralCtrl"
    })
    .when("/usuariosA",
    {
    templateUrl:"/tablaUsuarios.html",
    controller:"usuariosACtrl"
    })
    .when("/gruposA",
    {
   templateUrl:"/crearGrupo.html",
   controller: "crearGrupoCtrl"
    })
    .when("/materiasA",
    {
    templateUrl:"/crearMaterias.html",
    controller:"crearMateriasCtrl"
    })
    
});

app.controller("mainCtrl", mainCtrl);
app.controller("loginCtrl", loginCtrl);
app.controller("registroCtrl", registerCtrl);
app.controller("principalCtrl",principalCtrl);
app.controller("inscripcionCtrl",inscripcionCtrl);
app.controller("misMateriasCtrl",misMateriasCtrl);
app.controller("agregarPortafolioCtrl",agregarPortafolioCtrl);
app.controller("sesionesCtrl",sesionesCtrl);
app.controller("entregasCtrl",entregasCtrl);
app.controller("entregaCtrl",entregaCtrl);
app.controller("sesionesAuxCtrl",sesionesAuxCtrl);
app.controller("reporteSesionCtrl",reporteSesionCtrl);
app.controller("reporteGeneralCtrl",reporteGeneralCtrl);
app.controller("usuariosACtrl",usuariosACtrl);
app.controller("crearGrupoCtrl",crearGrupoCtrl);
app.controller("crearMateriasCtrl",crearMateriasCtrl)

function inscripcionCtrl($scope,$location,$http){
    if(usuario){
        $scope.user = usuario;
        cargarMenuPara(usuario.rol, $location, $scope)
        obtener_ofertas($http, $scope);
        obtenerInscripciones($http,$scope,usuario);
        $scope.$watch("inscripciones", watchFunction);
        $scope.inscribir = (idOferta) => {
            let inscripcion = {
                ofertaId: idOferta,
                usuarioId: usuario.id
            }

            let req={
                method: 'POST',
                url: "/api/Inscripcion",
                headers: {
                    'Content-Type': 'application/json'
                },
                data : JSON.stringify(inscripcion)
            };

            $http(req)
            .then((response)=>{
                alert("Inscripcion correcta")
                $location.path("/principal");    
            });
        }
    }
    else
        $location.path(RAIZ);
}
function principalCtrl($scope, $location, $http){
    if(usuario){
        $scope.user = usuario;
        $scope.$watch("ofertas",watchFunction);
        obtener_ofertas($http, $scope);
        cargarMenuPara(usuario.rol, $location, $scope);
    }
    else
        $location.path(RAIZ);
}
function mainCtrl($scope, $http, $location){
    $scope.iniciarS = () =>{
        $location.path("/login")
    }
    
}
function loginCtrl($scope, $http, $location){
    comprobarSesion($http, $location);
    $scope.entrar = () => {
        let usuario = document.querySelector("#usuario");
        let contra = document.querySelector("#contra");

        let credenciales = {
            nombre:usuario.value,
            contra:contra.value
        };

        let req = {
            method: 'POST',
            url: "/api/login",
            headers: {
                'Content-Type': 'application/json'
            },
            data : JSON.stringify(credenciales)
        }
        logIn($http, req, contra.value, $location);
    };
}
function registerCtrl($scope, $http, $location){
    eventosRegistro();
    $scope.send=()=>{    
        mostrarGifLoading();
        validarNombreUsuarioYGuardar($http, $location);
    };
}
function usuariosACtrl($scope,$http,$location){
    if(usuario && usuario.rol === "administrador"){
        $scope.user = usuario;
        cargarMenuAdministrador($location, $scope);
    }else{
        $location.path(RAIZ);
    }
}
function crearGrupoCtrl($scope,$http,$location){
    if(usuario && usuario.rol === "administrador"){
        $scope.user = usuario;
        cargarMenuAdministrador($location, $scope);
    }else{
        $location.path(RAIZ);
    }
}
function crearMateriasCtrl($scope,$http,$location){
    if(usuario && usuario.rol === "administrador"){
        $scope.user = usuario;
        cargarMenuAdministrador($location, $scope);
    }else{
        $location.path(RAIZ);
    }
}

function misMateriasCtrl($http,$scope,$location){
    if(usuario){
        $scope.user = usuario;
        $scope.$watch("inscripciones",watchFunction);
        $scope.$watch("dictadas",watchFunction);
        $scope.$watch("auxiliadas",watchFunction);
        obtenerInscripciones($http,$scope,usuario);
        cargarMenuPara(usuario.rol, $location, $scope);//carga el menu de estudiante
    }
    else
        $location.path(RAIZ);
}
function entregasCtrl($http, $scope, $location, $routeParams){
    if(usuario && usuario.rol === "docente"){
        $scope.user = usuario;
        $scope.$watch("entregas", watchFunction);
        $scope.atras = () =>{
            $location.path('/sesiones/'+$scope.producto.grupoId);
        }
        let productoId = $routeParams.productoId;
        cargarMenuPara(usuario.rol, $location, $scope);
        cargarEntregasPorProducto($http, $scope, productoId);
        
    }
    else
        $location.path(RAIZ);

} 
function entregaCtrl ($http,$scope,$location, $routeParams){
    if(usuario && usuario.rol === "docente"){
        $scope.user = usuario;
        cargarMenuPara(usuario.rol, $location, $scope);
        $scope.$watch("estudiante", watchFunction);
        $scope.atras = () => {
            window.history.back();
        }
        cargarEntregaPorId($http, $scope, $routeParams.entregaId)
    }
    else
        $location.path(RAIZ);
}
function sesionesAuxCtrl ($http, $scope, $location, $routeParams){
    if(usuario && usuario.rol === "auxiliar"){
        $scope.user = usuario;
        $scope.nuevo = true;
        $scope.fechaActual = new Date();
        $scope.$watch('inscritos', (oldValue, newValue)=>{
            if(oldValue===newValue)
                return;
            hideMainLoad();
            if(!$scope.nuevo)
                alert("Ya se registro las asistencias de esta sesion, pero puede editarlas");
        });
        $scope.enviar = () => {
            let contador = 0;
            let tamanho = $scope.asistencias.length;
            for(asistencia of $scope.asistencias){
                mostrarGifLoading();
                let fecha = $scope.fechaActual.getFullYear()+"-"+($scope.fechaActual.getMonth()+1)+"-"+$scope.fechaActual.getDate();
                let obj = {
                    fecha : fecha,
                    sesionId : $scope.sesion.id,
                    descripcion : asistencia.descripcion,
                    observacion : asistencia.observacion,
                    asistio : asistencia.asistio,
                    inscripcionId : asistencia.inscripcion_id
                };
                consumirApi($http,
                    {
                        method: 'POST',
                        url: "/api/Asistencia",
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        data : JSON.stringify(obj)
                    },
                    (response)=>{
                        contador++; 
                        if(contador===tamanho){
                            ocultarGifLoading();
                            alert("Se guardaron todos los registros exitosamente");
                            $location.path("/principal");
                        }
                    },
                    (error)=>{console.error(error);}
                    );
            }
        };
        $scope.actualizar = () => {
            let contador = 0;
            let tamanho = $scope.asistencias.length;
            for(asistencia of $scope.asistencias){
                mostrarGifLoading();
                let fecha = $scope.fechaActual.getFullYear()+"-"+($scope.fechaActual.getMonth()+1)+"-"+$scope.fechaActual.getDate();
                let obj = {
                    descripcion : asistencia.descripcion,
                    observacion : asistencia.observacion,
                    asistio : asistencia.asistio
                };
                consumirApi($http,
                    {
                        method: 'PUT',
                        url: "/api/Asistencia/"+asistencia.id,
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        data : JSON.stringify(obj)
                    },
                    (response)=>{
                        contador++; 
                        if(contador===tamanho){
                            ocultarGifLoading();
                            alert("Se actualizaron los registros exitosamente");
                            $location.path("/principal");
                        }
                    },
                    (error)=>{console.error(error);}
                    );
            }
        }
        $scope.cambiar = (index) => {
            $scope.asistencias[index].asistio = $scope.asistencias[index].asistio-1 === 0 ? true:false;
        }
        cargarMenuAuxiliar( $location, $scope);
        obtenerSesionAbiertaPorGrupoId($http, $scope, $routeParams.grupoId);
    }
    else
        $location.path(RAIZ);
}
function agregarPortafolioCtrl($http,$scope,$location){
    if(usuario){
        $scope.user = usuario;
        obtenerInscripciones($http,$scope,usuario);
        cargarMenuPara(usuario.rol, $location, $scope);//carga el menu de estudiante
    }
    else
        $location.path(RAIZ);
}
function sesionesCtrl($http, $scope, $location, $routeParams){
    if(usuario){
        $scope.user = usuario;
        $scope.colapsable=funcionColapsable();
        $scope.enviar=(productoId)=>{
            let textArea=document.querySelector("#descripcion-"+productoId);
            let fileInput=document.querySelector("#file-"+productoId);
            
            let text=textArea.value;
            let withFile=fileInput.value !== "";

            let entrega = {
                descripcion:text,
                usuarioId:usuario.id,
                productoId:productoId
            }
            crearEntrega(entrega, withFile, $http, $scope);
        };
        $scope.cargarVerEntregas = (productoId) => {
            $location.path('/verEntregas/'+productoId);
        }
        $scope.crearSesion=() => {
            let respuesta = confirm("¿Desea crear una nueva sesion?\n Tome en cuenta que la sesion actualmente abierta en este grupo se cerrara.");
            if(respuesta)
                nuevaSesion($routeParams.id, $http, $scope, usuario.id);
        }
        $scope.crearProducto=mostrarFormProducto;
        $scope.cancelProduct=ocultarFormProducto;
        $scope.enviarProducto=(sesionId) => {
            let formId = "productoForm-"+sesionId;
            let fecha = document.querySelector("#"+formId+" input").value;
            let descripcion = document.querySelector("#"+formId+" textarea").value;

            let producto ={
                sesionId:sesionId,
                fecha:fecha,
                descripcion:descripcion
            }
            enviarNuevoProducto(producto, $http, $scope, usuario.id, $routeParams.id)
        };
        $scope.aReporte = (sesionId) => {
           $location.path("/reporteSesion/"+sesionId);
        };
        $scope.aReporteGeneral = () => {
            $location.path("/reporteGrupo/"+$routeParams.id);
        };
        $scope.setTheFiles = function ($files) {
            angular.forEach($files, function (value, key) {
                formData.append('file', value);
            });
        };
        $scope.$watch("oferta", watchFunction)
        obtenerSesionesDeGrupo($http,$scope,$routeParams.id, usuario.id);
        obtenerOfertaPorId($http,$scope,$routeParams.id);
        cargarMenuPara(usuario.rol, $location, $scope);
    }
    else
        $location.path(RAIZ);
}

function reporteSesionCtrl($http, $scope, $location, $routeParams){
    if(usuario){
        $scope.user = usuario;
        $scope.$watch("inscritos", watchFunction);
        $scope.atras = () => {
            $location.path("/sesiones/"+$scope.sesion.grupo_id)
        };
        cargarMenuPara(usuario.rol, $location, $scope);
        obtenerSesionPorId($http, $scope, $routeParams.sesionId);
        obtenerAsistenciasPorSesion($http, $scope, $routeParams.sesionId)
    }else{
        $location.path(RAIZ);
    }
}

function reporteGeneralCtrl($http, $scope, $location, $routeParams){
    if(usuario){
        $scope.user = usuario;
        $scope.cargarProductos = (sesion)=>{
            $scope.sesionElegida = sesion;
            for(inscrito of $scope.inscritos){
                inscrito.sesion = inscrito.sesiones.find(element => element.id === sesion.id); 
            }
            let buttons = document.querySelectorAll(".sesionButton");
            for(button of buttons){
                button.classList.remove("isSelected");
            }
            let selectedButton = document.querySelector("#sesion"+sesion.numero);
            selectedButton.classList.add("isSelected");
        }
        $scope.$watch("sesiones",  (oldValue, newValue)=>{
            if(oldValue===newValue)
                return;
            hideMainLoad();
            if($scope.sesiones.length > 0)
                $scope.cargarProductos($scope.sesiones[0]);
        });
        cargarMenuPara(usuario.rol, $location, $scope);
        consumirApi($http,
            {
                method: 'GET',
                url: "/api/reporteInscritos/"+$routeParams.grupoId
            },
            (response)=>{
                $scope.inscritos = response.data;
            }, 
            (error)=>{
                console.error(error);
            });
        consumirApi($http,
            {
                method: 'GET',
                url: "/api/sesiones/"+$routeParams.grupoId
            },
            (response)=>{
                $scope.sesiones = response.data;
            }, 
            (error)=>{
                console.error(error);
            });
        $scope.sesionElegida = undefined;
        $scope.atras = () => {
            window.history.back();
        }   
    }else{
        $location.path(RAIZ);
    }
}

app.directive('ngFiles', ['$parse', function ($parse) {

    function file_links(scope, element, attrs) {
        var onChange = $parse(attrs.ngFiles);
        element.on('change', function (event) {
            onChange(scope, {$files: event.target.files});
        });
    }

    return {
        link: file_links
    }
}]);