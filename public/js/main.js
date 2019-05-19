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
    
});

app.controller("mainCtrl", mainCtrl);
app.controller("registroCtrl", registerCtrl);
app.controller("principalCtrl",principalCtrl);
app.controller("inscripcionCtrl",inscripcionCtrl);
app.controller("misMateriasCtrl",misMateriasCtrl);
app.controller("agregarPortafolioCtrl",agregarPortafolioCtrl);
app.controller("sesionesCtrl",sesionesCtrl);

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
        obtenerSesionesDeGrupo($http,$scope,$routeParams.id, usuario.id);
        obtenerOfertaPorId($http,$scope,$routeParams.id);
        cargarMenuEstudiante($location, $scope);
    }
    else
    $location.path("/");
}
