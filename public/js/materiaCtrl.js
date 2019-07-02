class MateriaCtrl {
    constructor(httpService, scope) {
      this.httpService = httpService;
      this.scope = scope;
      this.guardarMateria=this.guardarMateria.bind(this);
      this.mandarMateria=this.mandarMateria.bind(this);
      this.verificarYGuardar=this.verificarYGuardar.bind(this);
    }

    guardarMateria(){
        mostrarGifLoading();
        let obj={
            nombre:document.querySelector("#nombre").value,
            siglas:document.querySelector("#siglas").value
        }
        this.verificarYGuardar(obj);
    }

    mandarMateria(materia){
        consumirApi(this.httpService,
            {
                method: 'POST',
                url: "/api/Materia",
                headers: {
                    'Content-Type': 'application/json'
                },
                data : JSON.stringify(materia)
            },
            (response)=>{
                cargarMaterias(this.httpService, this.scope);
                alert("Nueva materia creada");
                ocultarGifLoading();
                this.scope.ocultarForm();
                limpiarForm();
            },
            (error)=>{
                console.error(error);
            })
    }

    verificarYGuardar(materia){
        consumirApi(this.httpService,
            {
                method: 'GET',
                url: "/api/verificarMateria/" + materia.nombre + "/" + materia.siglas,
            },
            (response)=>{
                let existe = response.data;
                if(existe){
                    alert("El nombre de la materia o el codigo de materia ya existen");
                    ocultarGifLoading();
                }else{
                    this.mandarMateria(materia);
                }
            },
            (error)=>{
                console.error(error);
            })
    }
}