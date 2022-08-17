var app = Vue.createApp({
  data() {
    return {

      dataRemision: {
        idRemision: false,
        fechaRemision: "",
        idPuntoEmision: null,
        idTipoDocumento: 1006,
        correlativo: "",
        idCliente: null,
        Cliente: "",
        fechaIniTrans: "",
        fechaFinTrans: "",
        rutaRemision: "",
        direccionIniRemi: "",
        direccionFinRemi: "",
        motivoTrasladoRemi: "",
        idVenta: null,
        comprobanteVenta: "",
        numComprobanteVenta: "",
        fechaComprobanteVenta: "",
        observacionRemi: "",
        idTransportista: "",
        transportista: "",
        placaVehiculoRemi: "",
        estadoEntrega: "",
        fechaEntrega: "",

        // items-array
        arrayItemsRemision: [],
        idArray: "",

        // variablesAuxiliares
        idAux: 0,

        facturas: []

      },

      dataTransportista: {
        idTransportista: false,
        tipoDocumento: "1",
        numDocumento: "",
        nombreTransportista: "",
        direccionTransportista: ""
      },

      dataBusqueda: {
        busquedaNumRemi: "",
        fechaDesde: "",
        fechaHasta: "",
        busquedaCliente: "",
        busquedaComprobante: "",
        busquedaEstEntrega: "",
        busquedaEstado: "",
        busquedaTrasnportista: ""
      },

      dom: {
        mostrarFomulario: false,
        mostarListado: true,
        mostarBusqueda: false,
        mostrarBtns: true,
        nombreBotonRegistrar: "Registrar",
        nombreBotonEditar: "Actualizar",
        auxGrid: false,
        estadoEntrega: true,
        fechaEntrega: true,
        server: false


      },

      datosGenerales: {
        puntosEmision: []
      },
      headers: {
        headers: {
          token: ""
        }
      }
    }

  },

  mounted() {
    this.montarToken();


  },

  updated() {

    // this.cboBusquedaCliente();
    this.validacionEstadontrega();
    // fin aux
    this.dataTransportista.nombreTransportista = this.dataTransportista.nombreTransportista.toUpperCase();
    this.dataTransportista.direccionTransportista = this.dataTransportista.direccionTransportista.toUpperCase();
    this.dataRemision.rutaRemision = this.dataRemision.rutaRemision.toUpperCase();
    this.dataRemision.direccionIniRemi = this.dataRemision.direccionIniRemi.toUpperCase();
    this.dataRemision.direccionFinRemi = this.dataRemision.direccionFinRemi.toUpperCase();
    this.dataRemision.placaVehiculoRemi = this.dataRemision.placaVehiculoRemi.toUpperCase();
    this.dataRemision.motivoTrasladoRemi = this.dataRemision.motivoTrasladoRemi.toUpperCase();
    this.dataRemision.observacionRemi = this.dataRemision.observacionRemi.toUpperCase();
    this.dataRemision.comprobanteVenta = this.dataRemision.comprobanteVenta.toUpperCase();

    for (let i = 0; i < $(this.$refs.cboProducto).length; i++) {
      if (!$(this.$refs.cboProducto[i]).data('select2')) {
        $(this.$refs.cboProducto[i]).select2({

            placeholder: "Buscar un Producto",
            //minimumInputLength: 2,
            ajax: {
              url: `${this.dom.server}/guiaRemision/buscarProductos/`,
              headers: this.headers.headers,
              dataType: "json",
              delay: 250,
              processResults: function(data) {
                return {
                  results: data.results
                };
              },
              cache: true,
            }
          })
          .on('change', async (ev, args) => {
            app.dataRemision.arrayItemsRemision[i].idProducto = ev.target.value;
            app.dataRemision.arrayItemsRemision[i].nombreProducto = ev.target.options[ev.target.selectedIndex].text;
            let res = await app.cargarDatosProducto(ev.target.value);
            app.dataRemision.arrayItemsRemision[i].codigoProducto = res.data.dataResponse.CODIGO_PRINCIPAL;
            app.dataRemision.arrayItemsRemision[i].cantPendProducto = res.data.dataResponse.IVA;
            app.dataRemision.arrayItemsRemision[i].cantidadProducto = res.data.dataResponse.VALOR;
          });
        $(this.$refs.cboProducto[i]).html(`<option value="${app.dataRemision.arrayItemsRemision[i].idProducto}">${app.dataRemision.arrayItemsRemision[i].nombreProducto}</option>`)
      } else {
        $(this.$refs.cboProducto[i]).html(`<option value="${app.dataRemision.arrayItemsRemision[i].idProducto}">${app.dataRemision.arrayItemsRemision[i].nombreProducto}</option>`)
      }
    }

  },

  watch: {
    utilitarios: function() {

      var target = document.querySelector("##viewFormulario");
      var blockUI = new KTBlockUI(target, {
        message: '<div class="blockui-message"><span class="spinner-border text-primary"></span> Procesando...</div>',
      });

      if (this.utilitarios.bloquearPantalla) {
        blockUI.block();
        button.innerText = "Release";
      } else {
        blockUI.release();
        button.innerText = "Block";
      }
    }
  },
  methods: {


    async validarCreacionGuiaRemision(){
      if (!this.dataRemision.idRemision) {
          this.executeCrearGuiaRemision();
      } else {
          this.executeActualizarGuiaRemision();
      }
    },

    async executeCrearGuiaRemision(){
      var idFormulario = document.querySelector("#viewFormulario");
      var blockUI = new KTBlockUI(idFormulario, {
          message: '<div class="blockui-message"><span class="spinner-border text-primary"></span>Procesando...</div>',
          overlayClass: 'bg-dark bg-opacity-25',
      });
      blockUI.block();
      this.dom.nombreBotonRegistrar = 'Enviando..'
          //bloqueo Fromulario
      const response = await this.crearGuiaRemision();
      if (response.data.success) {
          this.mensajeSweetAlertExito(response.data.mensaje);

          //this.ocultarFormulario();

          blockUI.release();
          blockUI.destroy();
          //this.dom.nombreBotonRegistrar = 'Registrar'
      } else {
          this.mensajeSweetAlertError(response.data.mensaje);
          blockUI.release();
          blockUI.destroy();
          //this.dom.nombreBotonRegistrar = 'Registrar'
      }
    },

    async crearGuiaRemision(){
        let body = { dataRemision: this.dataRemision }
        const promise = axios.post(`${this.dom.server}/guiaRemision/crearGuiaRemision`, body, this.headers);
        respuesta = promise.then((response) => response);
        return respuesta;
    },
    //CARGAR PUNTO EMISION
    async executeCargarPuntoEmision() {
      const response = await this.cargarPuntoEmision();
      this.datosGenerales.puntosEmision = response.data.dataResponse.puntosEmision;
      this.dataRemision.idPuntoEmision = response.data.dataResponse.puntoEmisionDefault;
      this.dataRemision.correlativo = response.data.dataResponse.correlativo;
    },

    async cargarPuntoEmision() {
      const promise = axios.get(`${this.dom.server}/notaCredito/cargarPuntoEmision/${this.dataRemision.idTipoDocumento}`, this.headers);
      return promise.then((response) => response);

    },
    // FIN CARGAR PUNTOEMISION

    // aux
    async validacionEstadontrega() {
      if (this.dataRemision.idAux == 1) {
        this.dom.estadoEntrega = true;
        this.dom.fechaEntrega = true;
        this.dom.auxGrid = false;
      } else {
        this.dom.estadoEntrega = false;
        this.dom.fechaEntrega = false;
        this.dom.auxGrid = true;
      }
    },
    // fin aux

    // cargar cbobusquedaCliente
    async cboBusquedaCliente() {

      for (let i = 0; i < $(this.$refs.busquedaCliente).length; i++) {
        if (!$(this.$refs.busquedaCliente).data('select2')) {
          $(this.$refs.busquedaCliente).select2({

            placeholder: "Buscar un Cliente",
            //minimumInputLength: 2,
            ajax: {
              url: `${this.dom.server}/guiaRemision/buscarCliente/`,
              headers: this.headers.headers,
              dataType: "json",
              delay: 250,
              processResults: function(data) {
                return {
                  results: data.results
                };
              },
              cache: true,
            }
          })
          $(this.$refs.busquedaCliente).html(`<option value=""></option>`)
        }
      }
    },
    // fin cargar cboBusquedaCliente

    // cargar select2Cliente

    async executeCargarCliente() {
      if (!$(this.$refs.cboCliente).data('select2')) {
        $(this.$refs.cboCliente)
          .select2({
            placeholder: "Buscar un Cliente",
            //minimumInputLength: 2,
            ajax: {
              url: `${this.dom.server}/notaCredito/buscarCliente/`,
              headers: this.headers.headers,
              dataType: "json",
              delay: 250,
              processResults: function(data) {
                //console.log(data);
                return {
                  results: data.results
                };
              },
              cache: true,
            }
          })
          .on('change', async (ev, args) => {
            app.dataRemision.idCliente = ev.target.value;
            app.dataRemision.Cliente = ev.target.options[ev.target.selectedIndex].text;
            this.abrirModalFacturas();
          });
      }
    },

    async executeCargarTransportista() {
      if (!$(this.$refs.busquedaTrasnportista).data('select2')) {
        $(this.$refs.busquedaTrasnportista)
          .select2({
            placeholder: "Buscar un transportista",
            //minimumInputLength: 2,
            ajax: {
              url: `${this.dom.server}/guiaRemision/buscarTransportista/`,
              headers: this.headers.headers,
              dataType: "json",
              delay: 250,
              processResults: function(data) {
                //console.log(data);
                return {
                  results: data.results
                };
              },
              cache: true,
            }
          })
          .on('change', async (ev, args) => {
            app.dataRemision.idTransportista = ev.target.value;
            app.dataRemision.transportista = ev.target.options[ev.target.selectedIndex].text;
          });
      }
    },

    // fin cargar select2Cliente
    async abrirModalFacturas() {
      this.executeCargarUsuario();
      this.executeCargarListadoFactura();
      $('#facturas').modal({
        backdrop: 'static',
        keyboard: false
      });
      $("#facturas").modal("show");
    },

    // cargar select2Usuario

    async executeCargarUsuario() {
      if (!$(this.$refs.cboUsuario).data('select2')) {
        $(this.$refs.cboUsuario)
          .select2({
            placeholder: "Buscar un Usuario",
            //minimumInputLength: 2,
            ajax: {
              url: `${this.dom.server}/notaCredito/buscarCliente/`,
              headers: this.headers.headers,
              dataType: "json",
              delay: 250,
              processResults: function(data) {
                //console.log(data);
                return {
                  results: data.results
                };
              },
              cache: true,
            }
          })
      }
    },
    // fin cargar select2Usuario

    // listar facturas
    async executeCargarListadoFactura() {
      const response = await this.cargarListadoFactura();
      this.dataRemision.facturas = response.data.dataResponse;
    },

    async cargarListadoFactura() {
      let body = {};
      const promise = axios.post(`${this.dom.server}/notaCredito/buscaFacturas`, body, this.headers);
      return promise.then((response) => response);
    },
    // fin listar facturas

    async montarToken() {
      const tk = document.getElementById('mydiv').dataset.test
      this.headers.headers.token = tk;
      const server = document.getElementById('mydivServ').dataset.test
      this.dom.server = server;
    },

    // cargar select2 producto
    async cargarDatosProducto(idProducto) {
      const promise = axios.get(`${this.dom.server}/guiaRemision/cargarDatosProducto/${idProducto}`);
      return promise.then((response) => response);
    },
    // fin cargar select 2 producto

    // funciones transportista
    async validarTipoDocumento() {
      if (this.dataTransportista.tipoDocumento == 1 || this.dataTransportista.tipoDocumento == 5) {
        this.dom.mostrarBotonExtraer = true;
      } else {
        this.dom.mostrarBotonExtraer = false;
      }
    },
    async validarDocumento() {
      doc = this.$refs["numDocumento"]
      if (this.dataTransportista.tipoDocumento == 1) {
        if (doc.value.length > 10) {
          this.dataTransportista.numDocumento = doc.value.substring(0, 10);
          this.mensajeToastError("El número de caracteres no puede ser mayor a 10");
        }
      } else if (this.dataTransportista.tipoDocumento == 5) {
        if (doc.value.length > 13) {
          this.dataTransportista.numDocumento = doc.value.substring(0, 13);
          this.mensajeToastError("El número de caracteres no puede ser mayor a 13");
        }
      }

    },
    // fin funciones transportista

    // extraer registro civil
    async executeExtraerRegistroCivil() {

      var idFormulario = document.querySelector("#viewFormTranspor");
      var blockUI = new KTBlockUI(idFormulario, {
        message: '<div class="blockui-message"><span class="spinner-border text-primary"></span> Extrayendo...</div>',
        overlayClass: 'bg-dark bg-opacity-25',
      });
      blockUI.block();

      if (this.dataTransportista.tipoDocumento == 1) {
        try {
          const response = await this.extraerRegistroCivil();
          if (response.data) {
            let nombre = response.data.nombres;
            let apellido = response.data.apellidos;

            this.dataTransportista.nombreTransportista = apellido + ' ' + nombre;

            this.mensajeToastExito('Extracción exitosa');

            blockUI.release();
            blockUI.destroy();
          }
        } catch (error) {
          this.mensajeToastError('No se pudo extraer los datos');

          blockUI.release();
          blockUI.destroy();
        }


      } else {

        try {
          const response = await this.extraerSRI();
          if (response.data) {

            let nombre = response.data.contribuyente['nombreComercial'] ?? '---';
            let direccion = response.data.contribuyente['direccionMatriz'] ?? '---';

            this.dataTransportista.nombreTransportista = nombre;
            this.dataTransportista.direccionTransportista = direccion;

            this.mensajeToastExito('Extracción exitosa');

            blockUI.release();
            blockUI.destroy();

          }
        } catch (error) {
          this.mensajeToastError('No se pudo extraer los datos');

          blockUI.release();
          blockUI.destroy();
        }
      }


    },
    async extraerRegistroCivil() {

      let body = {
        cedula: this.dataTransportista.numDocumento
      }
      let headers = {
        headers: {
          'Authorization': '199b968f-48d6-4903-a53a-19e1623be7eb'
        }
      }
      const promise = axios.post('https://123emk9w57.execute-api.us-east-2.amazonaws.com/prod/consultaci', body, headers);
      return promise.then((response) => response);
    },

    async extraerSRI() {
      const promise = axios.get('https://srienlinea.sri.gob.ec/movil-servicios/api/v1.0/deudas/porIdentificacion/' + this.dataTransportista.numDocumento + '/?tipoPersona=N');
      return promise.then((response) => response);
    },
    // fin extraer registro civil

    // save or update
    async validarCreacionEdicionTransportista() {
      const validacion = await this.validarTransportista();

      if (validacion) {
        if (!this.dataTransportista.idTransportista) {
          // this.executeCrearUsuaio();
          console.log('registrar')
        } else {
          // this.executeActualizarUsuario();
          console.log('actualizar')
        }
      }

    },
    // fin save or update

    // funciones frontend para para manipular dom y datos

    async verFormulario() {
      let fecha = new Date();
      fecha.getDate();
      this.dataRemision.fechaRemision = fecha.toLocaleDateString('en-GB');

      this.dom.mostrarFomulario = true;
      this.dom.mostarListado = false;
      this.dom.mostarBusqueda = false;
      this.dom.mostrarBtns = false;
      this.executeCargarCliente();
      this.executeCargarPuntoEmision();
      this.executeCargarTransportista();
      this.cargarFechaEmision();
      this.cargarFechaInicio();
      this.cargarFechaFin();
      this.cargarFechaFactura();
    },

    cargarFechaEmision() {
      $(this.$refs.fechaEmision).daterangepicker({
        singleDatePicker: true,
        showDropdowns: true,
        minYear: 1901,
        maxYear: parseInt(moment().format("YYYY"), 10),
        locale: {
          format: "DD/MM/yyyy"
        }
      }, function(start, end, label) {
        fecha = new Date(start).toLocaleDateString('en-GB');
        app.dataRemision.fechaEmision = fecha;
      });
    },

    cargarFechaInicio() {
      $(this.$refs.fechaInicio).daterangepicker({
        singleDatePicker: true,
        showDropdowns: true,
        minYear: 1901,
        maxYear: parseInt(moment().format("YYYY"), 10),
        locale: {
          format: "DD/MM/yyyy"
        }
      }, function(start, end, label) {
        fecha = new Date(start).toLocaleDateString('en-GB');
        app.dataRemision.fechaIniTrans = fecha;
      });
    },

    cargarFechaFin() {
      $(this.$refs.fechaFin).daterangepicker({
        singleDatePicker: true,
        showDropdowns: true,
        minYear: 1901,
        maxYear: parseInt(moment().format("YYYY"), 10),
        locale: {
          format: "DD/MM/yyyy"
        }
      }, function(start, end, label) {
        fecha = new Date(start).toLocaleDateString('en-GB');
        app.dataRemision.fechaFinTrans = fecha;
      });
    },

    cargarFechaFactura() {
      $(this.$refs.fechaFactura).daterangepicker({
        singleDatePicker: true,
        showDropdowns: true,
        minYear: 1901,
        maxYear: parseInt(moment().format("YYYY"), 10),
        locale: {
          format: "DD/MM/yyyy"
        }
      }, function(start, end, label) {
        fecha = new Date(start).toLocaleDateString('en-GB');
        app.dataRemision.fechaComprobanteVenta = fecha;
      });
    },

    async executeAgregarFactura(idVenta) {
      const response = await this.agregarFactura(idVenta);
      this.dataRemision.arrayItemsRemision = [];
      if (response.data.success) {
        this.dataRemision.idCliente = response.data.dataResponse.dataVenta.ID_CLIENTE;
        this.dataRemision.Cliente = response.data.dataResponse.dataVenta.CLIENTE;
        this.dataRemision.idVenta = response.data.dataResponse.dataVenta.ID_VENTA;
        this.dataRemision.comprobanteVenta = response.data.dataResponse.dataVenta.TIPO_DOCUMENTO;
        this.dataRemision.numComprobanteVenta = response.data.dataResponse.dataVenta.NUM_COMPROBANTE;
        this.dataRemision.fechaComprobanteVenta = response.data.dataResponse.dataVenta.FECHA_EMISION;

        for (var [i, element] of Object.entries(response.data.dataResponse.detalleVenta)) {
          let item = {
            idProducto: element.ID_PROD_SERV,
            codigoProducto: element.CODIGO_PRINCIPAL,
            nombreProducto: element.DES_PRODUCTO,
            cantPendProducto: element.CANTIDAD,
            cantidadProducto: element.CANTIDAD,
            descripcionItemRemi: "",
            comentarioItemRemi: ""
          }
          this.dataRemision.arrayItemsRemision.push(item);
        }
      }
    },

    async agregarFactura(idVenta) {
      const promise = axios.get(`${this.dom.server}/guiaRemision/agregarFactura/${idVenta}`, this.headers);
      return promise.then((response) => response);
    },

    async ocultarFormulario() {
      this.dom.mostrarFomulario = false;
      this.dom.mostarListado = true;
      this.dom.mostarBusqueda = false;
      this.dom.mostrarBtns = true;
      this.limpiarFormulario();
    },

    async limpiarFormulario() {
      this.dataRemision.idRemision = false,
        this.dataRemision.fechaRemision = "",
        this.dataRemision.pEmisionSelect = "",
        this.dataRemision.pEmisionInput = "",
        this.dataRemision.clienteRemision = "",
        this.dataRemision.fechaIniTrans = "",
        this.dataRemision.fechaFinTrans = "",
        this.dataRemision.trasportistaRemi = "",
        this.dataRemision.rutaRemision = "",
        this.dataRemision.direccionIniRemi = "",
        this.dataRemision.direccionFinRemi = "",
        this.dataRemision.placaVehiculoRemi = "",
        this.dataRemision.motivoTrasladoRemi = "",
        this.dataRemision.observacionRemi = "",
        this.dataRemision.comprobanteRemi = "",
        this.dataRemision.fechaComprobante = "",
        this.dataRemision.numComprobante = "",
        this.dataRemision.estadoEntrega = "",
        this.dataRemision.fechaEntrega = "",
        this.dataRemision.arrayItemsRemision = []
    },

    async verFiltro() {
      this.dom.mostrarFomulario = false;
      this.dom.mostrarBtns = false;
      this.dom.mostarListado = true;
      this.dom.mostarBusqueda = true;
      this.cboClienteBusqueda();
    },
    async ocultarFiltro() {
      this.dom.mostrarFomulario = false;
      this.dom.mostrarBtns = true;
      this.dom.mostarListado = true;
      this.dom.mostarBusqueda = false;
      this.limpiarFiltro();
    },

    async limpiarFiltro() {
      this.dataBusqueda.busquedaNumRemi = "",
        this.dataBusqueda.fechaDesde = "",
        this.dataBusqueda.fechaHasta = "",
        this.dataBusqueda.busquedaCliente = "",
        this.dataBusqueda.busquedaComprobante = "",
        this.dataBusqueda.busquedaEstEntrega = "",
        this.dataBusqueda.busquedaEstado = "",
        this.dataBusqueda.busquedaTrasnportista = ""
    },

    async lipiarModalTransportista() {
      this.dataTransportista.tipoDocumento = 1,
        this.dataTransportista.numDocumento = "",
        this.dataTransportista.nombreTransportista = "",
        this.dataTransportista.direccionTransportista = ""
    },

    isNumber: function(evt) {
      evt = (evt) ? evt : window.event;
      var charCode = (evt.which) ? evt.which : evt.keyCode;
      if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
        evt.preventDefault();;
      } else {
        return true;
      }
    },

    // SANTIAGO CAMPUZANO VALIDACION DE FORMULARIO
    async validarTransportista() {

      const form = document.getElementById("viewFormTranspor");
      $(".fv-plugins-message-container").remove();

      var validator = FormValidation.formValidation(form, {
        fields: {
          numDocumentoTranspor: {
            validators: {
              notEmpty: {
                message: "El Número de docuemento es Requerido."
              }
            },
          },
          nombreTranspor: {
            validators: {
              notEmpty: {
                message: "El Nombre del Transportista es Requerido."
              }
            },
          },
          direccionTranspor: {
            validators: {
              notEmpty: {
                message: "La Direccion del Transportista es Requerido"
              }
            }
          }
        },

        plugins: {
          trigger: new FormValidation.plugins.Trigger(),
          bootstrap: new FormValidation.plugins.Bootstrap5({
            rowSelector: ".fv-row",
            eleInvalidClass: "",
            eleValidClass: "",
          }),
        },
      });
      const promise = await validator.validate();
      let response = false;
      if (promise == 'Valid') {
        response = true;
      } else {
        response = false;
      }
      return response;

    },
    // FIN VALIDACION SOLO NUMEROS

    // arrayItems

    async abrirModalDatosAdicionales(idArray) {
      this.dataRemision.idArray = idArray;
      $('#datosAdicionales').modal({
        backdrop: 'static',
        keyboard: false
      });
      $("#datosAdicionales").modal("show");
      this.cargarModalDatosAdicionales(idArray);
    },

    async cargarModalDatosAdicionales(idArray) {
      this.dataRemision.comentarioItemRemi = this.dataRemision.arrayItemsRemision[idArray].comentarioItemRemi;
      this.dataRemision.descripcionItemRemi = this.dataRemision.arrayItemsRemision[idArray].descripcionItemRemi;
    },

    Guardar() {
      var item = {
        idProducto: "",
        codigoProducto: "",
        nombreProducto: "",
        cantPendProducto: "",
        cantidadProducto: "",
        descripcionItemRemi: "",
        comentarioItemRemi: ""
      }
      this.dataRemision.arrayItemsRemision.push(item); //añadimos el la variable empresa al array
    },

    agregarDetalles() {

      let id = this.dataRemision.idArray;
      this.dataRemision.arrayItemsRemision[id].comentarioItemRemi = this.dataRemision.comentarioItemRemi;
      this.dataRemision.arrayItemsRemision[id].descripcionItemRemi = this.dataRemision.descripcionItemRemi;
    },

    remove(id) {
      id > -1 && this.dataRemision.arrayItemsRemision.splice(parseInt(id), 1);
    },

    // funciones de estados  y utilizatrios

    // SANTIAGO CAMPUZANO FUNCION TECLA ENTER
    validarBusquedaEnter: function(e) {
      if (e.keyCode === 13) {
        this.validarBusquedaUsuario();
      }
    },

    // FIN FUNCION TECLA ENTER

    async mensajeSweetAlertExito(mensaje) {

      Swal.fire({
        text: mensaje,
        icon: "success",
        buttonsStyling: false,
        confirmButtonText: "Listo!",
        customClass: {
          confirmButton: "btn btn-success"
        }
      });


    },

    async mensajeSweetAlertError(mensaje) {

      Swal.fire({
        text: mensaje,
        icon: "error",
        buttonsStyling: false,
        confirmButtonText: "Error!",
        customClass: {
          confirmButton: "btn btn-danger"
        }
      });

    },

    async mensajeToastExito(mensaje) {

      toastr.options = {
        "closeButton": true,
        "debug": true,
        "newestOnTop": false,
        "progressBar": true,
        "positionClass": "toastr-top-right",
        "preventDuplicates": true,
        "onclick": null,
        "showDuration": "400",
        "hideDuration": "1000",
        "timeOut": "7000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
      };

      toastr.success(mensaje, "Proceso exitoso");
    },


    async mensajeToastError(mensaje) {

      toastr.options = {
        "closeButton": true,
        "debug": true,
        "newestOnTop": false,
        "progressBar": true,
        "positionClass": "toastr-top-right",
        "preventDuplicates": true,
        "onclick": null,
        "showDuration": "400",
        "hideDuration": "1000",
        "timeOut": "7000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
      };

      toastr.error(mensaje, "Error en  proceso");
    }

  }

}).mount("#ViewGuiaRemision");
