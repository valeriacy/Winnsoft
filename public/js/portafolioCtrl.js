class PortafolioCtrl{
    constructor(httpService, scope, grupoId) {
        this.httpService = httpService;
        this.scope = scope;
        this.grupoId = grupoId;
        this.obtenerSesionesPorGrupo=this.obtenerSesionesPorGrupo.bind(this);
        this.filtrarEntregaUsuario=this.filtrarEntregaUsuario.bind(this);
        this.filtrarEntregaUsuarioEnSesion=this.filtrarEntregaUsuarioEnSesion.bind(this);
        this.guardarEntrega=this.guardarEntrega.bind(this);
        this.guardarProducto=this.guardarProducto.bind(this);
        this.crearEntrega=this.crearEntrega.bind(this);
        this.configurarContadorSesiones=this.configurarContadorSesiones.bind(this);
        this.cambioEnSesiones=this.cambioEnSesiones.bind(this);
        this.cerrarSesion=this.cerrarSesion.bind(this);
      }

    cerrarSesion(sesion){
      pararContadores();
      consumirApi(this.httpService,
          {
            method: 'PUT',
            url: "/api/cerrarSesion/"+sesion.id,
          }, 
          (response)=>{
              alert("Se cerro la sesion");
              this.obtenerSesionesPorGrupo(this.grupoId, undefined);
          },
          (error)=>{
              console.error(error);
          }
      )
    }
    
    obtenerSesionesPorGrupo(idOferta, idUsuario){
      let req={
          method: 'GET',
          url: "/api/sesiones/"+idOferta,
      };
  
      this.httpService(req)
      .then((response)=>{
          let data=response.data;
          this.filtrarEntregaUsuario(data, idUsuario);
          this.scope.sesiones = data;
          
      })
      .catch((error)=>{
          console.error(error);
      });
    }

    configurarContadorSesiones(sesiones){
      for(let sesion of sesiones){
        let selector = "contador-" + sesion.id;
        let fecha = sesion.fecha_caducidad;
        setCounter(fecha, selector)
      }
    }

    cambioEnSesiones(oldValue, newValue){
        if(oldValue === newValue)
            return;
        this.configurarContadorSesiones(oldValue);
    }

  filtrarEntregaUsuario(sesiones, id){
    if(sesiones)
        sesiones.reverse();
    for(let sesion of sesiones){
        this.filtrarEntregaUsuarioEnSesion(sesion, id);
    }
  }
  
  filtrarEntregaUsuarioEnSesion(sesion, id){
    let productos = sesion.productos;
    if(productos)
        productos.reverse()
    for(let producto of productos){
        let entregasGlobales=producto.entregas;
        let entregasUsuario = entregasGlobales.filter(entrega => entrega.usuario_id==id);
        producto.entregas=entregasUsuario;
    }
  }

  guardarProducto(producto, usuarioId, grupoId){
    let req = {
        method: 'POST',
        url: "/api/Producto",
        headers: {
            'Content-Type': 'application/json'
        },
        data : JSON.stringify(producto)
    }
    consumirApi(this.httpService,
                    req, 
                    (response)=>{
                        alert("Creado nuevo producto");
                        ocultarFormProducto(producto.sesionId);
                        this.obtenerSesionesPorGrupo(grupoId, usuarioId);
                    },
                    (error)=>{
                        console.error(error);
                    }
                )
  }

  guardarEntrega(productoId){
    
    let boton = document.querySelector("#enviar-"+productoId);
    let gif = document.querySelector("#loading-"+productoId);

    boton.style.display="none";
    gif.style.display="block";

    let textArea=document.querySelector("#descripcion-"+productoId);
    let fileInput=document.querySelector("#file-"+productoId);
    if(validarCamposEntrega(productoId)){
        if(validarArchivoEstudiante(fileInput)){
            let text=textArea.value;
            let withFile=fileInput.value !== "";

            let entrega = {
                descripcion:text,
                usuarioId:usuario.id,
                productoId:productoId
            }
            this.crearEntrega(entrega, withFile, productoId);
        }else{
            let boton = document.querySelector("#enviar-"+productoId);
            let gif = document.querySelector("#loading-"+productoId);

            boton.style.display="block";
            gif.style.display="none";
        }
    }else{
        alert("Al menos uno de los campos debe ser llenado");
        let boton = document.querySelector("#enviar-"+productoId);
        let gif = document.querySelector("#loading-"+productoId);

        boton.style.display="block";
        gif.style.display="none";
    }
  }

  crearEntrega(entrega, withFile, productoId){
    let req = {
        method: 'POST',
        url: "/api/Entrega",
        headers: {
            'Content-Type': 'application/json'
        },
        data : JSON.stringify(entrega)
    }
    consumirApi(this.httpService,
                    req, 
                    (response)=>{
                        let entregaId = response.data;
                        if(withFile)
                            this.uploadFile(entregaId, productoId, false);
                        else
                            this.reemplazarDivEntrega(entregaId, this.httpService, this.scope, productoId);
                    },
                    (error)=>{
                        console.error(error);
                    }
                )
  }

  uploadFile (entregaId, productoId, deDocente){
      let url = deDocente ? '/api/subirArchivoDocente/'+entregaId : '/api/subirArchivo/'+entregaId
      let request = {
          method: 'POST',
          url: url,
          data: formData,
          headers: {
              'Content-Type': undefined
          }
      };
      consumirApi(this.httpService,
                  request,
                  (response)=>{
                      if(!deDocente)
                          this.reemplazarDivEntrega(entregaId, this.httpService, this.scope, productoId);
                      else
                          this.scope.restablecer();
                  },
                  (error)=>{console.error(error)})
  }

  reemplazarDivEntrega(entregaId, productoId){
      consumirApi(this.httpService,
          {
              method: 'GET',
              url: '/api/entrega/'+entregaId,
          }, 
          (response)=>{
              let entrega = response.data;
              this.agregarAProducto(entrega, productoId);
          },
          (error)=>{
              console.error(error);
          })
      alert("Entrega exitosa");
  }

  agregarAProducto(entrega, productoId){
      let productoPadre = entrega.producto_id;
      for(let sesion of this.scope.sesiones){
          for(let producto of sesion.productos){
              if(producto.id === productoPadre)
                  producto.entregas.push(entrega);
                  let boton = document.querySelector("#enviar-"+productoId);
                  let gif = document.querySelector("#loading-"+productoId);
      
                  boton.style.display="block";
                  gif.style.display="none";
          }
      }
  }

  nuevaSesion(grupoId){
    let fileAttached = document.querySelector("#file-sesion").value!="";
    let fecha = document.querySelector("#sesionForm input").value;
    let obj={
        grupoId:grupoId,
        fechaCaducidad:fecha
    }

    let req = {
        method: 'POST',
        url: "/api/Sesion",
        headers: {
            'Content-Type': 'application/json'
        },
        data : JSON.stringify(obj)
    }
    consumirApi(this.httpService,
                    req, 
                    (response)=>{
                        let sesionId = response.data;
                        if(fileAttached)
                            this.uploadFile(sesionId, undefined, true);
                        else
                            this.scope.restablecer();
                    },
                    (error)=>{
                        console.error(error);
                    }
                )
  }

}