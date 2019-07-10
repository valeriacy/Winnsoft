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
      this.siguienteNumeroPorGrupo=this.siguienteNumeroPorGrupo.bind(this);
      this.obtenerGrupos=this.obtenerGrupos.bind(this);
      this.tratarGrupos=this.tratarGrupos.bind(this);
      this.grupoValido=this.grupoValido.bind(this);
      this.enviarGrupo=this.enviarGrupo.bind(this);
    }

    obtenerGrupos(){
        let req={
            method: 'GET',
            url: "/api/Ofertas",
        };
    
        this.httpService(req)
        .then((response)=>{
            this.tratarGrupos(response.data);
            this.scope.ofertas = response.data;
        })
        .catch((error)=>{
            console.error(error);
        });
    }

    tratarGrupos(grupos){
        for(let grupo of grupos){
            grupo[0].horaFin = this.agregarMinutosAHora(grupo[0].hora, 90);
        }
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
        mostrarGifLoading();
        if(this.grupoValido())
            this.enviarGrupo();
        else{
            alert("Complete el formulario correctamente, por favor");
            ocultarGifLoading();
        }
    }

    enviarGrupo(){
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
                this.obtenerGrupos();
                alert("Nuevo grupo creado");
                this.scope.nueva = this.ofertaVacia;
                ocultarGifLoading();
                this.scope.ocultarForm();
                limpiarForm();
            },
            (error)=>{
                console.error(error);
            })
    }

    siguienteNumeroPorGrupo(){
        modificarBotonesEnDiv("#guardar", true);
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
                        modificarBotonesEnDiv("#guardar", false);
                    },
                    (error)=>{
                        console.error(error);
                    })
    };

    grupoValido(){
        let grupo = this.scope.nueva;
        return grupo.materiaId > 0 &&
               grupo.grupo > 0 &&
               grupo.docenteId > 0 &&
               grupo.auxiliarId > 0 &&
               this.verificarHora(grupo.horaInicio);
    }

    verificarHora(hora){
        let horas = hora.split(":")[0];
        let minutos = hora.split(":")[1];

        let horaMinima = new Date();
        horaMinima.setHours(6);
        horaMinima.setMinutes(45);
        horaMinima.setSeconds(0);

        let horaMaxima = new Date();
        horaMaxima.setHours(20);
        horaMaxima.setMinutes(15);
        horaMaxima.setSeconds(0);

        let horaEnCuestion = new Date();
        horaEnCuestion.setHours(horas);
        horaEnCuestion.setMinutes(minutos);
        horaEnCuestion.setSeconds(0);

        return horaEnCuestion >= horaMinima && horaEnCuestion <= horaMaxima;
    }
}