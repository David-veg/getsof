
var app = Vue.createApp({
    data() {
        return {

            dataPEmision: {
                idPuntoEmision: false,
                descripcionPEmi: "",
                seriePEmi: "",
                tipoPEmi: "E",
                indDefault: "",

                // array comprobante
                arrayComprobantes:[]
            },            

            dom: {
                mostrarFormulario: false,
                mostrarListado: true,
                mostrarBusqueda: false,
                mostrarBotonNuevo: true,
                mostrarComprobantes: false,
                nombreBotonRegistrar: "Registrar",
                nombreBotonEditar: "Actualizar",
                mostrarBtns: true,
                server: false
            },

            datosGenerales: {
                idEmpresa: 3,
                idUsuario: "",
                idSession: "",
                token: "",
                listaPEmi: ""
            },

            headers: {
                headers: {
                    token: ""
                }
            }
        }

    },

    updated(){

        this.dataPEmision.descripcionPEmi = this.dataPEmision.descripcionPEmi.toUpperCase();

    },

    mounted() {
        this.montarToken();
        this.executeCargarListado(); // carga listado al cargar la pagina
    },

    methods: {

        // funciones frontend para para manipular dom y datos
        async montarToken() {
            const tk = document.getElementById('mydiv').dataset.test
            this.headers.headers.token = tk;
            const server = document.getElementById('mydivServ').dataset.test
            this.dom.server = server;
        },

        async verFormulario(){
            this.dom.mostrarFormulario= true,
               this.dom.mostrarListado=false,
               this.dom.mostrarBusqueda= false,
               this.dom.mostrarBtns = false
               this.validarVistaComprobantes();
        },     

        async ocultarFormulario() {
            this.dom.mostrarFormulario= false,
               this.dom.mostrarListado=true,
               this.dom.mostrarBusqueda= false,
               this.dom.mostrarBtns = true
               this.Limpiar();
        },
        
        async Limpiar(){
            this.dataPEmision.idPuntoEmision = "";
            this.dataPEmision.descripcionPEmi= "",
            this.dataPEmision.seriePEmi= "",
            this.dataPEmision.arrayComprobantes= []
        },

        // SANTIAGO CAMPUZANO INDDEFAULT

        async confirmacionIndDefault(idPuntoEmision) {

            Swal.fire({
                html: ' ¿ Está seguro de procesar la petición?',
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
                    if (this.dataPEmision.indDefault == true) {
                        auxChkIndDefault = 'SI'
                    } else {
                        auxChkIndDefault = 'NO'
                    }
                    this.executeCambiarIndDefault(idPuntoEmision, auxChkIndDefault);


                } else {

                }
            })


        },

        async executeCambiarIndDefault(idPuntoEmision, auxChkIndDefault){
            const response = await this.cambiarIndDefault(idPuntoEmision, auxChkIndDefault);

            if (response.data.success) {
                this.executeCargarListado();
                this.mensajeSweetAlertExito(response.data.mensaje);
            } else{
                this.mensajeSweetAlertError(response.data.mensaje);
            }
        },

        async cambiarIndDefault(idPuntoEmision, auxChkIndDefault){
            const promise = axios.get(`${this.dom.server}/puntoEmision/cambiarIndDefault/${idPuntoEmision}/${auxChkIndDefault}`, this.headers);
            respuesta = promise.then((response) => response);
            return respuesta;
        },
        // FIN INDDEFAULT

        // SANTIAGO CAMPUZANO CARGAR DATALISTA PEmision
        async executeCargarDetallePEmision(idPuntoEmision) {
            const response = await this.cargarDetallePEmision(idPuntoEmision);
            this.dataPEmision.arrayComprobantes = response.data.dataResponse;
        },
        async cargarDetallePEmision(idPuntoEmision) {
            const promise = axios.get(`${this.dom.server}/puntoEmision/cargarDetallePEmision/${idPuntoEmision}`, this.headers);
            respuesta = promise.then((response) => response);
            return respuesta;
        },

        // FIN CARGAR LISTA PEmision

        // SANTIAGO CAMPUZANO VALIDAR COMPROBANTES
        async validarVistaComprobantes(){
            if (this.dataPEmision.idPuntoEmision != '') {
                this.dom.mostrarComprobantes = true
            } else {
                this.dom.mostrarComprobantes = false
            }
        },
        // FIN VALIDAR COMPROBANTES

        // SANTIAGO CAMPUZANO CARGAR DATALISTA PEmision

        async executecargarDataPEmision(idPuntoEmision) {
            const response = await this.cargarDataPEmision(idPuntoEmision);
            datos = response.data.dataResponse[0];

            if (response.data.success) {
                this.verFormulario();
                this.dataPEmision.idPuntoEmision = datos.ID_PUNTO_EMISION,
                this.dataPEmision.descripcionPEmi = datos.DESCRIPCION,
                this.dataPEmision.seriePEmi = datos.SERIE,
                this.dataPEmision.tipoPEmi = datos.TIPO
                this.executeCargarDetallePEmision(idPuntoEmision);
                this.validarVistaComprobantes();
            }

        },

        async cargarDataPEmision(idPuntoEmision) {

            const promise = axios.get(`${this.dom.server}/puntoEmision/cargarDataPEmision/${idPuntoEmision}`);
            respuesta = promise.then((response) => response);
            return respuesta;
        },

        // FIN CARGAR DATOS PEmision        

        // SANTIAGO CAMPUZANO CARGAR LISTA PEmision
        async executeCargarListado() {
            const response = await this.cargarListado();
            this.datosGenerales.listaPEmi = response.data.dataResponse;

            for ( i = 0; i < this.datosGenerales.listaPEmi.length; i++) {
            
                if (this.datosGenerales.listaPEmi[i].IND_DEFAULT == 'SI') {
                    this.dataPEmision.indDefault  = true
                }else{
                    this.dataPEmision.indDefault = false
                }
            }
            
        },
        async cargarListado() {

            const promise = axios.get(`${this.dom.server}/puntoEmision/listar`, this.headers);
            respuesta = promise.then((response) => response);
            return respuesta;
        },

        // FIN CARGAR LISTA PEmision

        // SANTIAGO CAMPUZANO SAVEORUPDATE
        async validarCreacionEdicionPEmision() {

                if (!this.dataPEmision.idPuntoEmision) {
                    this.executeCrearPEmision();
                } else {
                    this.executeActualizarPEmision();
                }

        },

                // ***SAVE***
        async executeCrearPEmision() {

            // bloqueo formulario
            var idFormulario = document.querySelector("#viewFormulario");
            var blockUI = new KTBlockUI(idFormulario, {
                message: '<div class="blockui-message"><span class="spinner-border text-primary"></span>Procesando...</div>',
                overlayClass: 'bg-dark bg-opacity-25',
            });
            blockUI.block();

                //bloqueo Fromulario
            const response = await this.crearPEmision();
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

        async crearPEmision() {
            let body = { dataPEmision: this.dataPEmision}
            const promise = axios.post(`${this.dom.server}/puntoEmision/crearPEmision`, body, this.headers);
            respuesta = promise.then((response) => response);
            return respuesta;
        },
                // ***FIN SAVE**

                // *** UPDATE ***
        async executeActualizarPEmision() {

            var idFormulario = document.querySelector("#viewFormulario");
            var blockUI = new KTBlockUI(idFormulario, {
                message: '<div class="blockui-message"><span class="spinner-border text-primary"></span> Procesando...</div>',
                        overlayClass: 'bg-dark bg-opacity-25',
            });
            blockUI.block();

            this.ActualizarDetallePE();
            const response = await this.actualizarPEmision();
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

        async actualizarPEmision() {
            let body = { dataPEmision: this.dataPEmision}
            const promise = axios.put(`${this.dom.server}/puntoEmision/actualizarPEmision`, body, this.headers);
            respuesta = promise.then((response) => response);
            return respuesta;
        },

        async ActualizarDetallePE(){
            let detalleComprobantes = this.dataPEmision.arrayComprobantes;
            let body = { detalleComprobantesPE: detalleComprobantes}
            const promise = axios.put(`${this.dom.server}/puntoEmision/actualizarDetallePE`, body, this.headers);
            respuesta = promise.then((response) => response);
            return respuesta;

        },

                // *** FIN UPDATE ***

        // FIN SAVEORUPDATE

        // SANTIAGO CAMPUZANO ELIMINAR
        async confirmacionEliminarPEmision(idPuntoEmision, nombre) {

            Swal.fire({
                html: ' ¿ Está seguro que desea eliminar a <span class="badge badge-success"> ' + nombre + '</span>   de forma permanete ?',
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
                    this.executeEliminarPEmision(idPuntoEmision);


                } else {

                }
            })


        },

        async executeEliminarPEmision(idPuntoEmision) {

            var idFormulario = document.querySelector("#viewFormulario");
            var blockUI = new KTBlockUI(idFormulario, {
                message: '<div class="blockui-message"><span class="spinner-border text-primary"></span>Procesando...</div>',
                overlayClass: 'bg-dark bg-opacity-25',
            });
            blockUI.block();

            const response = await this.eliminarPEmision(idPuntoEmision);

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

        async eliminarPEmision(idPuntoEmision) {

            const promise = axios.get(`${this.dom.server}/puntoEmision/eliminarPEmision/${idPuntoEmision}`);
            respuesta = promise.then((response) => response);
            return respuesta;
        },

        // FIN ELIMINAR                   

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
                "timeOut": "3000",
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
                "timeOut": "3000",
                "extendedTimeOut": "1000",
                "showEasing": "swing",
                "hideEasing": "linear",
                "showMethod": "fadeIn",
                "hideMethod": "fadeOut"
            };

            toastr.error(mensaje, "Error en  proceso");



        },        

        // SANTIAGO CAMPUZANO VALIDACION DE FORMULARIO                

        // VALIDACION SOLO NUMEROS

        isNumber: function(evt) {
            evt = (evt) ? evt : window.event;
            var charCode = (evt.which) ? evt.which : evt.keyCode;
            if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
                evt.preventDefault();;
            } else {
                return true;
            }
        },
        // FIN VALIDACION SOLO NUMEROS        

        // FIN VALIDACION DE FORMULARIO

    }

}).mount("#ViewPuntoEmision");
