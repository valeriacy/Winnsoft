const API_URL="/";

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
});

app.controller("mainCtrl", mainCtrl);
app.controller("registroCtrl", registerCtrl);

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

function registerCtrl($scope, $http){
    $scope.send=()=>{
        let name=document.querySelector("#nombre");
        let lastname=document.querySelector("#apellido");
        let rol=document.querySelector("#rol");
        let username=document.querySelector("#usuario");
        let pass=document.querySelector("#pass");
    
        let user={
            name:name.value,
            lastname:lastname.value,
            rol:rol.value,
            username:username.value,
            password:pass.value
        }//este es el objeto JSON
        
        let req = {
            method: 'POST',
            url: "/api/user",
            headers: {
                'Content-Type': 'application/json'
            },
            data : user
        }//obeto de configuracion para comunicacion con el servidor
    
        $http(req)
        .then((response)=>{
            console.log(response.status);
        })
        .catch((error)=>{
            console.error(error);
        });
        
        //console.log(user);
        /*console.log(name.value);
        console.log(lastname.value);
        console.log(rol.value);
        console.log(username.value);
        console.log(pass.value);*/
    };
}