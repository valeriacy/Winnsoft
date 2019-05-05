const API_URL="/";
let usuario;

let app = angular.module("myApp", ["ngRoute", "ngAnimate"]);
app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "/inicio.html",
        controller : "mainCtrl"
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
    .when("/agregarPortafolio",
    {
        templateUrl:"/agregarPortafolio.html",
        controller: "agregarPortafolioCtrl",
    })
});

app.controller("mainCtrl", mainCtrl);
app.controller("registroCtrl", registerCtrl);
app.controller("principalCtrl",principalCtrl);
app.controller("inscripcionCtrl",inscripcionCtrl);
app.controller("misMateriasCtrl",misMateriasCtrl);
app.controller("agregarPortafolioCtrl",agregarPortafolioCtrl);

function inscripcionCtrl($scope,$location,$http){
    if(usuario){
        $scope.user = usuario;
        cargarMenuEstudiante($location, $scope)
        obtener_ofertas($http, $scope);
        obtenerInscripciones($http,$scope,usuario.id);
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
        $location.path("/");
}

function principalCtrl($scope, $location, $http){
    if(usuario){
        $scope.user = usuario;
        obtener_ofertas($http, $scope);
        cargarMenuEstudiante($location, $scope)

    }
    else
        $location.path("/");
}

function mainCtrl($scope, $http, $location){
    obtenerMaterias($scope, $http);
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
        obtenerInscripciones($http,$scope,usuario.id);
        cargarMenuEstudiante($location, $scope);//carga el menu de estudiante
    }
    else
    $location.path("/");
}
function agregarPortafolioCtrl($http,$scope,$location){
    if(usuario){
        $scope.user = usuario;
        obtenerInscripciones($http,$scope,usuario.id);
        cargarMenuEstudiante($location, $scope);//carga el menu de estudiante
    }
    else
    $location.path("/");
}

function cargarMenuEstudiante(location, scope){
    menu=inicial_menu();
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
}
