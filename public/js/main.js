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
    .when("/inicioD",
    {
    templateUrl:"/inicioD.html",
    controller:"inicioDCtrl",
    })
    .when("/materiasD",
    {
    templateUrl:"/materiasD.html",
    controller:"materiasDCtrl",
    })
    .when ("/tareasD",
{
    templateUrl:"tareasD.html",
    controller:"tareasDCtrl",
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

function inscripcionCtrl($scope,$location,$http){
    if(usuario){
        $scope.user = usuario;
        cargarMenuPara(usuario.rol, $location, $scope)
        obtener_ofertas($http, $scope);
        obtenerInscripciones($http,$scope,usuario);
        $scope.estaEnLista=estaEnLista;
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
        obtener_ofertas($http, $scope);
        cargarMenuPara(usuario.rol, $location, $scope)

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
    comprobarSesion();
    if(usuario)
        $location.path("/principal")
    $scope.entrar = () => {
        let usuario = document.querySelector("#usuario");
        let contra = document.querySelector("#contra");

        let credenciales = {
            nombre:usuario.value,
            contra:contra.value
        };

        console.log(credenciales);

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
        obtenerInscripciones($http,$scope,usuario);
        cargarMenuPara(usuario.rol, $location, $scope);//carga el menu de estudiante
    }
    else
        $location.path(RAIZ);
}
function InicioDCtrl($http,$scope,$location){
    if(usuario && usuario.rol === "docente"){
        $scope.user = usuario;
        cargarMenuPara(usuario.rol, $location, $scope);
    }
    else
        $location.path(RAIZ);

} 
function materiasDCtrl ($http,$scope,$location){
    if(usuario && usuario.rol === "docente"){
        $scope.user = usuario;
        cargarMenuPara(usuario.rol, $location, $scope);
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
function sesionesCtrl($http,$scope,$location, $routeParams){
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
            console.log(productoId);
            //$location.path('/verEntregas/'+productoId);
        }
        obtenerSesionesDeGrupo($http,$scope,$routeParams.id, usuario.id);
        obtenerOfertaPorId($http,$scope,$routeParams.id);
        cargarMenuPara(usuario.rol, $location, $scope);
    }
    else
        $location.path(RAIZ);
}
