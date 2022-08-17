
var app = Vue.createApp({
    data() {
        return {

            dataVendedor: {
                idVendedor: false,
                idTipoDocumento: "",
                numeroDocumento: "",
                nombres: " ",
                direccion: "",
                estado: "R",
                celular: "",
                correo: "",
                idEmpresa: 3,
                idPerfil: 1,
                max:10
            },

            dataBusqueda: {
                busquedaVendedor: "",
                busquedaEstado: ""

            },

            dom: {
                mostrarFormulario: false,
                mostrarListado: true,
                mostrarBusqueda: false,
                mostrarBotonNuevo: true,
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
                tipoDocumento: false,
                perfiles: false,
                listadoVendedores: false


            },

            headers: {
                headers: {
                    token: ""
                }
            }
        }

    },

    updated(){

        this.dataVendedor.nombres = this.dataVendedor.nombres.toUpperCase();
        this.dataVendedor.direccion = this.dataVendedor.direccion.toUpperCase();
        this.dataBusqueda.busquedaVendedor = this.dataBusqueda.busquedaVendedor.toUpperCase();

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
               this.dom.mostrarBtns = false,
               this.executeCargarTipoDocumento();
        },

        async verFiltro(){
            this.dom.mostrarFormulario= false,
               this.dom.mostrarListado=true,
               this.dom.mostrarBusqueda= true,
               this.dom.mostrarBtns = false
        },

        async ocultarFormulario() {
            this.dom.mostrarFormulario= false,
               this.dom.mostrarListado=true,
               this.dom.mostrarBusqueda= false,
               this.dom.mostrarBtns = true
               this.executeCargarTipoDocumento();
               this.Limpiar();
        },
        async ocultarFiltro(){
            this.Limpiar();
            this.executeCargarListado();
            this.limpiarFiltro();
            this.dom.mostrarFormulario= false,
            this.dom.mostrarListado=true,
            this.dom.mostrarBusqueda= false,
            this.dom.mostrarBtns = true
        },
        async limpiarFiltro(){
            this.dataBusqueda.busquedaVendedor= "",
            this.dataBusqueda.busquedaEstado = ""
        },
        async Limpiar(){
            this.dataVendedor.idVendedor = "";
            this.dataVendedor.numeroDocumento= "",
            this.dataVendedor.nombres= "",
            this.dataVendedor.direccion= "",
            this.dataVendedor.celular = "",
            this.dataVendedor.correo = ""
        },

        // SANTIAGO CAMPUZANO CARGAR DATOS VENDEDOR

        async executecargarDataVendedor(idVendedor) {
            const response = await this.cargarDataVendedor(idVendedor);
            datos = response.data.dataResponse[0];

            if (response.data.success) {
                this.verFormulario();
                this.dataVendedor.idVendedor = datos.ID_VENDEDOR,
                    this.dataVendedor.idTipoDocumento = datos.ID_TIPO_DOCUMENTO,
                    this.dataVendedor.numeroDocumento = datos.NUM_DOCUMENTO,
                    this.dataVendedor.nombres = datos.NOMBRE,
                    this.dataVendedor.direccion = datos.DIRECCION,
                    this.dataVendedor.estado = datos.ESTADO,
                    this.dataVendedor.celular = datos.CELULAR,
                    this.dataVendedor.correo = datos.CORREO

            }

        },

        async cargarDataVendedor(idVendedor) {

            const promise = axios.get(`${this.dom.server}/vendedor/cargarDataVendedor/${idVendedor}`);
            respuesta = promise.then((response) => response);
            return respuesta;
        },

        // FIN CARGAR DATOS VENDEDOR

        // SANTIAGO CAMPUZANO BUSQUEDA FILTROS

        async validarBusquedaVendedor() {
            if (this.dataBusqueda.busquedaVendedor != '' && this.dataBusqueda.busquedaEstado == 'R') {
                this.executeCargarListadoFiltro();
            } else if(this.dataBusqueda.busquedaEstado == 'R'){
                this.executeCargarListadoFiltro();
            } else if(this.dataBusqueda.busquedaVendedor != ' ' && this.dataBusqueda.busquedaEstado == 'S'){
                this.executeCargarListadoFiltro();
            } else if(this.dataBusqueda.busquedaEstado == 'S'){
                this.executeCargarListadoFiltro();
            } else if (this.dataBusqueda.busquedaVendedor != '') {
                this.executeCargarListadoFiltro();
            } else if(this.dataBusqueda.busquedaVendedor == ''){
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
            this.datosGenerales.listadoVendedores = response.data.dataResponse;

            if (response.data.success) {
                blockUI.release();
                blockUI.destroy();
            } else {
                blockUI.release();
                blockUI.destroy();
            }



        },

        async cargarListadoFiltro() {
            let body = {idEmpresa : this.datosGenerales.idEmpresa,
                        busquedaVendedor: this.dataBusqueda.busquedaVendedor,
                        busquedaEstado: this.dataBusqueda.busquedaEstado};
            const promise = axios.post(`${this.dom.server}/vendedor/listarFiltros`, body, this.headers);
            respuesta = promise.then((response) => response);
            return respuesta;
        },

        // FIN BUSQUEDA FILTROS

        // SANTIAGO CAMPUZANO CARGAR LISTA VENDEDORES
        async executeCargarListado() {
            const response = await this.cargarListado();
            this.datosGenerales.listadoVendedores = response.data.dataResponse;
        },
        async cargarListado() {
            const promise = axios.get(`${this.dom.server}/vendedor/listar`, this.headers);
            respuesta = promise.then((response) => response);
            return respuesta;
        },

        // FIN CARGAR LISTA VENDEDORES

        // SANTIAGO CAMPUZANO SAVEORUPDATE
        async validarCreacionEdicionVendedor() {

            const validacion = await this.validarVendedor();

            if (validacion) {
                if (!this.dataVendedor.idVendedor) {
                    this.executeCrearVendedor();
                } else {
                    this.executeActualizarVendedor();
                }
            }

        },

                // ***SAVE***
        async executeCrearVendedor() {

            // bloqueo formulario
            var idFormulario = document.querySelector("#viewFormulario");
            var blockUI = new KTBlockUI(idFormulario, {
                message: '<div class="blockui-message"><span class="spinner-border text-primary"></span>Procesando...</div>',
                overlayClass: 'bg-dark bg-opacity-25',
            });
            blockUI.block();

                //bloqueo Fromulario
            const response = await this.crearVendedor();
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

        async crearVendedor() {
            let body = { dataVendedor: this.dataVendedor, idEmpresa: this.datosGenerales.idEmpresa }
            const promise = axios.post(`${this.dom.server}/vendedor/crearVendedor`, body, this.headers);
            respuesta = promise.then((response) => response);
            return respuesta;
        },
                // ***FIN SAVE**

                // *** UPDATE ***
        async executeActualizarVendedor() {

            var idFormulario = document.querySelector("#viewFormulario");
            var blockUI = new KTBlockUI(idFormulario, {
                message: '<div class="blockui-message"><span class="spinner-border text-primary"></span> Procesando...</div>',
                        overlayClass: 'bg-dark bg-opacity-25',
            });
            blockUI.block();

            const response = await this.actualizarVendedor();
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

        async actualizarVendedor() {
            let body = { dataVendedor: this.dataVendedor, idEmpresa: this.datosGenerales.idEmpresa }
            const promise = axios.put(`${this.dom.server}/vendedor/actualizarVendedor`, body, this.headers);
            respuesta = promise.then((response) => response);
            return respuesta;
        },

                // *** FIN UPDATE ***

        // FIN SAVEORUPDATE

        // SANTIAGO CAMPUZANO ELIMINAR
        async confirmacionEliminarVendedor(idVendedor, nombre) {

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
                    this.executeEliminarVendedor(idVendedor);


                } else {

                }
            })


        },

        async executeEliminarVendedor(idVendedor) {

            var idFormulario = document.querySelector("#viewFormulario");
            var blockUI = new KTBlockUI(idFormulario, {
                message: '<div class="blockui-message"><span class="spinner-border text-primary"></span>Procesando...</div>',
                overlayClass: 'bg-dark bg-opacity-25',
            });
            blockUI.block();

            const response = await this.eliminarVendedor(idVendedor);

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

        async eliminarVendedor(idVendedor) {

            const promise = axios.get(`${this.dom.server}/vendedor/eliminarVendedor/${idVendedor}`);
            respuesta = promise.then((response) => response);
            return respuesta;
        },

        // FIN ELIMINAR

        // SANTIAGO CAMPUZANO EXTRAER DATOS REGISTRO CIVIL
        async executeExtraerRegistroCivil() {

            if (this.dataVendedor.idTipoDocumento != '') {

                // bloqueo formulario


            var idFormulario = document.querySelector("#viewFormulario");
            var blockUI = new KTBlockUI(idFormulario, {
                message: '<div class="blockui-message"><span class="spinner-border text-primary"></span> Extrayendo...</div>',
                overlayClass: 'bg-dark bg-opacity-25',
            });
            blockUI.block();
            // Fin bloqueo Fromulario

            if (this.dataVendedor.idTipoDocumento == 1) {
                try {
                    const response = await this.extraerRegistroCivil();

                    if (response.data) {


                        let nombre = response.data.nombres;
                        let apellido = response.data.apellidos;

                        this.dataVendedor.nombres = apellido + ' ' + nombre;

                        this.mensajeToastExito('Extracción exitosa');

                        blockUI.release();
                        blockUI.destroy();

                }
                } catch (error) {
                    this.mensajeToastError('Extraccion Fallida - Cedula Incorrecta');
                    this.Limpiar();
                    blockUI.release();
                    blockUI.destroy();
                }
            } else {
                try {
                    const response = await this.extraerRegistroCivilDirecto();

                    if (response.data) {


                        let nombre = response.data.contribuyente.nombreComercial;

                        this.dataVendedor.nombres = nombre;

                        this.dataVendedor.direccion = '---';

                        this.mensajeToastExito('Extracción exitosa');


                        blockUI.release();
                        blockUI.destroy();

                }
                } catch (error) {
                    this.mensajeToastError('Extraccion Fallida - Cedula Incorrecta');
                    this.Limpiar();
                    blockUI.release();
                    blockUI.destroy();
                }
            }

            } else {

                this.mensajeToastError('Extraccion Fallida, escoja un tipo de documento.');

            }
        },

        async extraerRegistroCivil() {

            let body = { cedula: this.dataVendedor.numeroDocumento }
            let headers = { headers: { 'Authorization': '199b968f-48d6-4903-a53a-19e1623be7eb' } }
            const promise = axios.post('https://123emk9w57.execute-api.us-east-2.amazonaws.com/prod/consultaci', body, headers);
            return promise.then((response) => response);
        },

        async extraerRegistroCivilDirecto(){


            const promise = axios.get('https://srienlinea.sri.gob.ec/movil-servicios/api/v1.0/deudas/porIdentificacion/'+this.dataVendedor.numeroDocumento+'/?tipoPersona=N');

            return promise.then((response) => response);
        },
        // FIN EXTRAER DATOS REGISTRO CIVIL


        async executeCargarTipoDocumento() {
            const response = await this.cargarTipoDocumento();
            this.datosGenerales.tipoDocumento = response.data.dataResponse;

             },
        async cargarTipoDocumento(){
            const promise = axios.get(`${this.dom.server}/vendedor/cargarTipoDocumento`);
            return  promise.then((response) => response);

        },

        // SANTIAGO CAMPUZANO CABIAR ESTADO

        // anular proveedor estado
        async confirmacionAnularVendedor(idVendedor, nombre) {

            Swal.fire({
                html: ' ¿ Está seguro que desea cambiar el estado de <span class="badge badge-success"> ' + nombre + '</span>   a Inactivo ?',
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
                    this.executeAnularVendedor(idVendedor);
                }
            })


        },


        async executeAnularVendedor(idVendedor) {

            var listado = document.querySelector("#viewFormulario");
            var blockUI = new KTBlockUI(listado, {
                message: '<div class="blockui-message"><span class="spinner-border text-primary"></span>Cambiando Estado...</div>',
                overlayClass: 'bg-dark bg-opacity-25',
            });
            blockUI.block();

            const response = await this.anularVendedor(idVendedor);

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

        async anularVendedor(idVendedor) {
            const promise = axios.get(`${this.dom.server}/vendedor/anularVendedor/${idVendedor}`);
            respuesta = promise.then((response) => response);
            return respuesta;
        },
        // fin anular proveedor estado

        // activar proveedor estado
        async confirmacionActivarVendedor(idVendedor, nombre) {

            Swal.fire({
                html: ' ¿ Está seguro que desea cambiar el estado de <span class="badge badge-success"> ' + nombre + '</span>   a Activo ?',
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
                    this.executeActivarVendedor(idVendedor);
                }
            })


        },


        async executeActivarVendedor(idVendedor) {

            var listado = document.querySelector("#viewFormulario");
            var blockUI = new KTBlockUI(listado, {
                message: '<div class="blockui-message"><span class="spinner-border text-primary"></span>Cambiando Estado...</div>',
                overlayClass: 'bg-dark bg-opacity-25',
            });
            blockUI.block();

            const response = await this.activarVendedor(idVendedor);

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

        async activarVendedor(idVendedor) {
            const promise = axios.get(`${this.dom.server}/vendedor/activarVendedor/${idVendedor}`);
            respuesta = promise.then((response) => response);
            return respuesta;
        },
        // fin activar proveedor estado


        // FIN CAMBIAR ESTADO

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
        // SANTIAGO CAMPUZANO FUNCION TECLA ENTER
        validarBusquedaEnter: function(e){
            if (e.keyCode === 13) {
                this.validarBusquedaVendedor();
            }
        },

        // FIN FUNCION TECLA ENTER

        // SANTIAGO CAMPUZANO VALIDACION DE FORMULARIO
        async validarVendedor(){

            const form = document.getElementById("formVendedor");
            $(".fv-plugins-message-container").remove();

            var validator = FormValidation.formValidation(form, {
                fields: {
                    tipoDocumento: {
                        validators: { notEmpty: { message: "Tipo de documento requerido." } },
                    },
                    numDocumento: {
                        validators: { notEmpty: { message: "Número de docuemento requerido." } },
                    },
                    nombresApellidos: {
                        validators: { notEmpty: { message: "Nombres y Apellidos requeridos." } },
                    },
                    direccion: {
                        validators: { notEmpty: { message: "Dirección requerida." } },
                    },
                    correo:{
                        validators: { emailAddress: { message: "Correo del Vendedor Invalido."}}
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
        validEmail: function (email) {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        },

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

        // SANTIAGO CAMPUZANO VALIDACION DOCUMENTO
        async validarDocumento() {
            doc = this.$refs["numDocumento"]
            if (this.dataVendedor.idTipoDocumento == 1) {
                if (doc.value.length > 10) {
                    // this.dom.readOnlyNumDocumento = "isReadOnly";
                    this.dataVendedor.numeroDocumento = doc.value.substring(0, 10);
                    this.mensajeToastError("El número de caracteres no puede ser mayor a 10");
                }
            } else if (this.dataVendedor.idTipoDocumento == 5) {
                if (doc.value.length > 13) {
                    // this.dom.readOnlyNumDocumento = "isReadOnly";
                    this.dataVendedor.numeroDocumento = doc.value.substring(0, 13);
                    this.mensajeToastError("El número de caracteres no puede ser mayor a 13");
                }
            }

        },
        // FIN VALIDACION DOCUMENTO

        // FIN VALIDACION DE FORMULARIO

    }

}).mount("#ViewVendedor");
