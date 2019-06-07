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
        cargarEntregaPorId($http, $scope, $routeParams.entregaId)
    }
    else
        $location.path(RAIZ);

}
function sesionesAuxCtrl ($http,$scope,$location, $routeParams){
    if(usuario && usuario.rol === "auxiliar"){
        $scope.user = usuario;
        $scope.$watch('inscritos', watchFunction);
        cargarMenuAuxiliar( $location, $scope);
        obtenerInscritosPorGrupo($http, $scope, $routeParams.grupoId);
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
            let file=fileInput.value;
            let size=0;
            let tipo="nan";

            let entrega = {
                descripcion:text,
                nombreArchivo:file,
                tamanho:size,
                tipo:tipo,
                usuarioId:usuario.id,
                productoId:productoId
            }
            crearEntrega(entrega, $http);
        };
        $scope.cargarVerEntregas = (productoId) => {
            $location.path('/verEntregas/'+productoId);
        }
        $scope.crearSesion=() => {
            let respuesta = confirm("¿Desea crear una nueva sesion?");
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
        $scope.$watch("oferta", watchFunction)
        obtenerSesionesDeGrupo($http,$scope,$routeParams.id, usuario.id);
        obtenerOfertaPorId($http,$scope,$routeParams.id);
        cargarMenuPara(usuario.rol, $location, $scope);
    }
    else
        $location.path(RAIZ);
}