function logIn(httpService, req, contra, location){
    httpService(req)
    .then((response)=>{
        usuario = response.data[0];
        let mensaje;
        let coinciden = usuario.contra === contra;
        mensaje = coinciden ? "Datos ingresados correctamente":"Usuario o Contraseña incorrecto";
        alert(mensaje);
        if(coinciden) location.path("/principal")
    })
    .catch((error)=>{
        console.error(error);
    });
}

function eventosRegistro(){
    let username = document.querySelector("#usuario");
    username.addEventListener("keypress", mostrarContenido)
    
}
function mostrarContenido (event){
    console.log (event.target.value)
}
$(document).ready(function(){
$('.nav li:has(ul)').click(function(){
    e.preventDefault();
    if ($(this).hasClass('submenu')){
    } else{
        $('.nav li ul').slideUp();
        $('.nav li').removeClass('submenu');
        $(this).addClass('submenu');
        $(this).children('ul').slideDown();

    }
});
});
