class UsuarioCtrl {
    constructor(httpService, scope) {
      this.httpService = httpService;
      this.scope = scope;
      this.obtenerTodos=this.obtenerTodos.bind(this);
      this.actualizar=this.actualizar.bind(this);
    }

    obtenerTodos(){
        consumirApi(this.httpService, {
            method: 'GET',
            url: "/api/todosUsuarios"
        },
        (response)=>{
            this.scope.usuarios = response.data;
        },
        (error)=>{
            console.error(error);
        });
    }   

    actualizar(usuario){
        consumirApi(this.httpService, {
            method: 'PUT',
            url: "/api/usuario/"+usuario.id,
            headers: {
                'Content-Type': 'application/json'
            },
            data : JSON.stringify(usuario)
        },
        (response)=>{
            this.scope.usuarios = response.data;
            alert("Se actualizo el usuario");
        },
        (error)=>{
            console.error(error);
        });
    }
}