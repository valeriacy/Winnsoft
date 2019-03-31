const API_URL="/";

let app = angular.module("myApp", ["ngRoute", "ngAnimate"]);
app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "/inicio.html",
        controller : "mainCtrl"
    })
});

app.controller("mainCtrl", mainCtrl);

function mainCtrl($scope, $http){
    obtenerMaterias($scope, $http);
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
            data : credenciales
        }
        logIn($http, req);
    };
}

function logIn(httpService, req){
    httpService(req)
    .then((response)=>{
        console.log(response.data);
    })
    .catch((error)=>{
        console.error(error);
    });
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