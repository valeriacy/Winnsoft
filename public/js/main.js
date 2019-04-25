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
            url: "api/usuario",
            headers: {
                'Content-Type': 'application/json'
            },
            data : JSON.stringify(user)
        }//obeto de configuracion para comunicacion con el servidor
    
        $http(req)
        .then((response)=>{
            if (response.status==200){
                alert("Se ha guardado el usuario exitosamente");
                $location.path('/')
            }
        })
        .catch((error)=>{
            console.error(error);
        });
        
        console.log(user);
        //console.log(name.value);
        //console.log(lastname.value);
        //console.log(rol.value);
        //console.log(username.value);
        //console.log(pass.value);
    };
}

