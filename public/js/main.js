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
});

app.controller("mainCtrl", mainCtrl);
app.controller("registroCtrl", registerCtrl);
app.controller("principalCtrl",principalCtrl);

function principalCtrl($scope, $location){
    if(usuario)
        $scope.user = usuario;
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

