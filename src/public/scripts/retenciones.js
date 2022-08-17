var app = Vue.createApp({
    data() {
        return {

            dataRetencion: {
                idRetencion: false,
                tipoRetencion: "",
                codigoSRIRetencion: "",
                porcentajeRetencion: "",
                descripcionRetencion: ""                      

            },
            

            dataBusqueda: {
                busquedaRetencion: "",
                codigoSRIRetencion: "",
                tipoRetencion: ""
            },

            dom: {
                mostrarFomulario: false,
                mostarListado: true,
                mostarBusqueda: false,
                mostrarBtns: true,
                nombreBotonRegistrar: "Registrar",
                nombreBotonEditar: "Actualizar",
                estadoEntrega: true,
                fechaEntrega: true,
                server: false


            },

            datosGenerales: {
                idEmpresa: false,
                idSucursal: false,
                idUsuario: "",
                idSession: "",
                token: "",
                tipoDocumento: false,
                perfiles: false,
                listadoRetenciones: false
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
        this.executeCargarListado();
    },

    updated() {    
        // this.dataRetencion.comprobanteRemi = this.dataRetencion.comprobanteRemi.toUpperCase();
        this.dataRetencion.descripcionRetencion = this.dataRetencion.descripcionRetencion.toUpperCase();
        this.dataRetencion.codigoSRIRetencion = this.dataRetencion.codigoSRIRetencion.toUpperCase();
        this.dataBusqueda.busquedaRetencion = this.dataBusqueda.busquedaRetencion.toUpperCase();
        this.dataBusqueda.codigoSRIRetencion = this.dataBusqueda.codigoSRIRetencion.toUpperCase();
    },

    watch: {
        utilitarios: function () {

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

        async montarToken() {
            const tk = document.getElementById('mydiv').dataset.test
            this.headers.headers.token = tk;
            const server = document.getElementById('mydivServ').dataset.test
            this.dom.server = server;
        },  

        // SANTIAGO CAMPUZANO BUSQUEDA FILTROS

        validarBusquedaEnter: function(e){
            if (e.keyCode === 13) {
                this.validarBusquedaRetencion();
            }
        },

        async validarBusquedaRetencion() {
            if (this.dataBusqueda.busquedaRetencion != '' || this.dataBusqueda.codigoSRIRetencion != ''
            || this.dataBusqueda.tipoRetencion != '') {
                this.executeCargarListadoFiltro();
            } else if(this.dataBusqueda.busquedaRetencion == ''){                
                mensaje="Debe seleccionar un filtro de busqueda.";
                this.mensajeToastError(mensaje);
                this.executeCargarListadoFiltro();
            }
        },

        async executeCargarListadoFiltro() {

            // bloqueo formulario
            var idListado = document.querySelector("#viewListado");
            var blockUI = new KTBlockUI(idListado, {
                message: '<div class="blockui-message"><span class="spinner-border text-primary"></span>Procesando...</div>',
                overlayClass: 'bg-dark bg-opacity-25',
            });
            blockUI.block();

            const response = await this.cargarListadoFiltro();
            this.datosGenerales.listadoRetenciones = response.data.dataResponse;

            if (response.data.success) {
                blockUI.release();
                blockUI.destroy();
            } else {
                blockUI.release();
                blockUI.destroy();
            }



        },

        async cargarListadoFiltro() {
            let body = {busquedaRetencion : this.dataBusqueda.busquedaRetencion,
                        codigoSRIRetencion: this.dataBusqueda.codigoSRIRetencion,
                        tipoRetencion: this.dataBusqueda.tipoRetencion};
            const promise = axios.post(`${this.dom.server}/retenciones/listarFiltros`, body, this.headers);
            respuesta = promise.then((response) => response);
            return respuesta;
        },

        // FIN BUSQUEDA FILTROS

        // SANTIAGO CAMPUZANO ELIMINAR
        async confirmacionEliminarRetencion(idRetencion, nombre) {

            Swal.fire({
                html: ' ¿ Está seguro que desea eliminar la Retención N° <span class="badge badge-success"> ' + nombre + '</span>   de forma permanete ?',
                icon: "warning",
                buttonsStyling: false,
                showCancelButton: true,
                confirmButtonText: "Si, Extoy seguro!",
                cancelButtonText: 'No, cancelar',
                customClass: {
                    confirmButton: "btn btn-success",
                    cancelButton: 'btn btn-secondary'
                }
            }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    this.executeEliminarRetencion(idRetencion);


                } else {

                }
            })


        },

        async executeEliminarRetencion(idRetencion) {

            var idFormulario = document.querySelector("#viewFormulario");
            var blockUI = new KTBlockUI(idFormulario, {
                message: '<div class="blockui-message"><span class="spinner-border text-primary"></span>Procesando...</div>',
                overlayClass: 'bg-dark bg-opacity-25',
            });
            blockUI.block();

            const response = await this.eliminarRetencion(idRetencion);

            if (response.data.success) {
                this.executeCargarListado();
                this.ocultarFormulario();
                this.mensajeSweetAlertExito(response.data.mensaje);
                blockUI.release();
                blockUI.destroy();
            } else {

                this.mensajeSweetAlertError(response.data.mensaje);
                blockUI.release();
                blockUI.destroy();


            }

        },

        async eliminarRetencion(idRetencion) {

            const promise = axios.get(`${this.dom.server}/retenciones/eliminarRetencion/${idRetencion}`);
            respuesta = promise.then((response) => response);
            return respuesta;
        },

        // FIN ELIMINAR

        // SANTIAGO CAMPUZANO CARGAR DATOS RETENCION

        async executecargarDataRetencion(idRetencion) {
            const response = await this.cargarDataRetencion(idRetencion);
            datos = response.data.dataResponse[0];

            if (response.data.success) {
                this.verFormulario();
                this.dataRetencion.idRetencion = datos.ID_RETENCION,
                    this.dataRetencion.codigoSRIRetencion = datos.COD_SRI,
                    this.dataRetencion.porcentajeRetencion = datos.PORCENTAJE,
                    this.dataRetencion.descripcionRetencion = datos.DESCRIPCION,
                    this.dataRetencion.tipoRetencion = datos.TIPO_RETENCION
            }

        },

        async cargarDataRetencion(idRetencion) {

            const promise = axios.get(`${this.dom.server}/retenciones/cargarDataRetencion/${idRetencion}`);
            respuesta = promise.then((response) => response);
            return respuesta;
        },

        // FIN CARGAR DATOS RETENCION
        
        // SANTIAGO CAMPUZANO SAVEORUPDATE
        async validarCreacionEdicionRetencion() {

            const validacion = await this.validarRentecion();

            if (validacion) {
                if (!this.dataRetencion.idRetencion) {
                    this.executeCrearRetencion();
                } else {
                    this.executeActualizarRetencion();
                }
            }

        },

        // SANTIAGO CAMPUZANO VALIDACION DE FORMULARIO
        async validarRentecion(){

            const form = document.getElementById("formRetencion");
            $(".fv-plugins-message-container").remove();

            var validator = FormValidation.formValidation(form, {
                fields: {
                    tipoRetencion: {
                        validators: { notEmpty: { message: "Tipo de Retención Requerido." } },
                    },
                    codigoSRI: {
                        validators: { notEmpty: { message: "Código SRI Requerido." } },
                    },
                    porcentajeRetencion: {
                        validators: { notEmpty: { message: "Porcentaje de Retencion Requerido." } },
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
            if (promise == 'Valid') { response = true; } else { response = false; }
            return response;

        },          

                // ***SAVE***
        async executeCrearRetencion() {

            // bloqueo formulario
            var idFormulario = document.querySelector("#viewFormulario");
            var blockUI = new KTBlockUI(idFormulario, {
                message: '<div class="blockui-message"><span class="spinner-border text-primary"></span>Procesando...</div>',
                overlayClass: 'bg-dark bg-opacity-25',
            });
            blockUI.block();

                //bloqueo Fromulario
            const response = await this.crearRetencion();
            if (response.data.success) {
                this.mensajeSweetAlertExito(response.data.mensaje);
                this.executeCargarListado();
                this.ocultarFormulario();

                blockUI.release();
                blockUI.destroy();
            } else {


                this.mensajeSweetAlertError(response.data.mensaje);
                blockUI.release();
                blockUI.destroy();
            }
        },

        async crearRetencion() {
            let body = { dataRetencion: this.dataRetencion}
            const promise = axios.post(`${this.dom.server}/retenciones/crearRetencion`, body, this.headers);
            respuesta = promise.then((response) => response);
            return respuesta;
        },
                // ***FIN SAVE**

                // *** UPDATE ***
        async executeActualizarRetencion() {

            var idFormulario = document.querySelector("#viewFormulario");
            var blockUI = new KTBlockUI(idFormulario, {
                message: '<div class="blockui-message"><span class="spinner-border text-primary"></span> Procesando...</div>',
                        overlayClass: 'bg-dark bg-opacity-25',
            });
            blockUI.block();

            const response = await this.actualizarRetencion();
            if (response.data.success) {
                this.executeCargarListado();
                this.ocultarFormulario();
                this.mensajeSweetAlertExito(response.data.mensaje);

                blockUI.release();
                blockUI.destroy();

            } else {
                this.mensajeSweetAlertError(response.data.mensaje);

                blockUI.release();
                blockUI.destroy();

            }
        },

        async actualizarRetencion() {
            let body = { dataRetencion: this.dataRetencion}
            const promise = axios.put(`${this.dom.server}/retenciones/actualizarRetencion`, body, this.headers);
            respuesta = promise.then((response) => response);
            return respuesta;
        },

                // *** FIN UPDATE ***

        // FIN SAVEORUPDATE
        
        // SANTIAGO CAMPUZANO CARGAR LISTA RETENCIONES
        async executeCargarListado() {
            const response = await this.cargarListado();
            this.datosGenerales.listadoRetenciones = response.data.dataResponse;
        },
        async cargarListado() {
            const promise = axios.get(`${this.dom.server}/retenciones/listar`, this.headers);
            respuesta = promise.then((response) => response);
            return respuesta;
        },
        // FIN CARGAR LISTA RETENCIONES
                                       
        // funciones frontend para para manipular dom y datos

        async verFormulario() {
            this.dom.mostrarFomulario = true;
            this.dom.mostarListado = false;
            this.dom.mostarBusqueda = false;
            this.dom.mostrarBtns = false;

        },
        async ocultarFormulario() {
            this.dom.mostrarFomulario = false;
            this.dom.mostarListado = true;
            this.dom.mostarBusqueda = false;
            this.dom.mostrarBtns = true;
            this.limpiarFormulario();
        },

        async limpiarFormulario() {
                this.dataRetencion.idRetencion = false,
                this.dataRetencion.tipoRetencion = "",
                this.dataRetencion.codigoSRIRetencion = "",
                this.dataRetencion.porcentajeRetencion = "",
                this.dataRetencion.descripcionRetencion = ""
        },

        async verFiltro() {
            this.dom.mostrarFomulario = false;
            this.dom.mostrarBtns = false;
            this.dom.mostarListado = true;
            this.dom.mostarBusqueda = true;
        },
        async ocultarFiltro() {
            this.dom.mostrarFomulario = false;
            this.dom.mostrarBtns = true;
            this.dom.mostarListado = true;
            this.dom.mostarBusqueda = false;
            this.limpiarFiltro();
            this.executeCargarListado();
        },

        async limpiarFiltro() {
            this.dataBusqueda.busquedaRetencion = "",
            this.dataBusqueda.codigoSRIRetencion = "",
            this.dataBusqueda.tipoRetencion = ""
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
        // funciones de estados  y utilizatrios        

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

}).mount("#ViewRetencion");
