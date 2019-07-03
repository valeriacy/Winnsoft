class GrupoCtrl {
    constructor(httpService, scope) {
      this.httpService = httpService;
      this.scope = scope;
      this.siguienteNumeroPorGrupo=this.siguienteNumeroPorGrupo.bind(this);
      this.ofertaVacia = {
        materiaId : 0,
        grupo : 0,
        dia : 1,
        horaInicio : "06:45",
        horaFin : "08:15",
        docenteId : 0,
        auxiliarId : 0
    }
      this.guardarNuevoGrupo=this.guardarNuevoGrupo.bind(this);
      this.configurarHoras=this.configurarHoras.bind(this);
      this.agregarMinutosAHora=this.agregarMinutosAHora.bind(this);
    }

    configurarHoras(inicio){
        if(inicio){
            let hora = document.querySelector("#horaInicio").value;
            this.scope.nueva.horaInicio = hora;

            let horaFin = this.agregarMinutos(hora.split(":")[0], hora.split(":")[1], 90);
            this.scope.nueva.horaFin = horaFin;
            document.querySelector("#horaFin").value = horaFin;
        }else{
            this.scope.nueva.horaFin = document.querySelector("#horaFin").value;
        }
    }

    agregarMinutosAHora(hora, minutosAAgregar){
        let horaInicio = hora.split(":")[0];
        let minutosInicio = hora.split(":")[1];
        return this.agregarMinutos(horaInicio, minutosInicio, minutosAAgregar)
    }

    agregarMinutos(hora, minutos, minutosAAgregar){
        let date = new Date();
        date.setHours(hora);
        date.setMinutes(minutos);

        let newDateObj = new Date(date.getTime() + minutosAAgregar*60000);
        let horaFin = newDateObj.getHours()>=10 ? newDateObj.getHours() : "0"+newDateObj.getHours();
        let minutosFin = newDateObj.getMinutes()>=10 ? newDateObj.getMinutes() : "0"+newDateObj.getMinutes();
        return horaFin + ":" + minutosFin;
    }

    guardarNuevoGrupo(){
        {
            mostrarGifLoading();
            consumirApi(this.httpService,
                {
                    method: 'POST',
                    url: "/api/Oferta",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data : JSON.stringify(this.scope.nueva)
                },
                (response)=>{
                    obtener_ofertas(this.httpService, this.scope);
                    alert("Nuevo grupo creado");
                    this.scope.nueva = this.ofertaVacia;
                    ocultarGifLoading();
                    this.scope.ocultarForm();
                    limpiarForm();
                },
                (error)=>{
                    console.error(error);
                })
        };
    }

    siguienteNumeroPorGrupo(){
        consumirApi(this.httpService,
                    {
                        method: 'GET',
                        url: "/api/maxGrupo/"+this.scope.nueva.materiaId
                    },
                    (response)=>{
                        let grupo;
                        if(response.data){
                            grupo = parseInt(response.data) + 1;
                        }
                        else{
                            grupo = 1;
                        }
                        this.scope.nueva.grupo = grupo;
                        document.querySelector("#grupo").value = grupo;
                    },
                    (error)=>{
                        console.error(error);
                    })
    };
}