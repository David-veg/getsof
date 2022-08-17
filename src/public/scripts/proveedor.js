var proveedor = Vue.createApp({

    data() {
        return {

            dataProveedor: {
                idProveedor: false,
                idCategoria: '',
                idTipoDocumento: 1,
                numDocumento: '',
                razonSocial: '',
                nombreComercial: '',
                direccion: '',
                telefono: '',
                celular: '',
                correos: '',
                estado: 'R'
            },
            datosBusqueda: {
                nombre: '',
                numDocumento: '',
                idCategoria: '',
                estado: ''
            },
            dom: {
                mostrarFormulario: false,
                mostrarListado: true,
                mostrarBusqueda: false,
                mostrarBotonNuevo: true,
                mostrarBotonExtraer: true,
                nombreBotonRegistrar: "Registrar",
                nombreBotonEditar: "Actualizar",
                nombreBotonExtraccion: "Extraer Datos",
                readOnlyNumDocumento: false,
                server: false
            },
            datosGenerales: {
                idEmpresa: 3,
                idUsuario: 245,
                idSucursal: 2,
                tipoDocumento: false,
                listaProveedores: false,
                categorias: false
            },
            headers: {
                headers: {
                    token: ""
                }
            }
        }
    },
    updated() {

        this.dataProveedor.razonSocial = this.dataProveedor.razonSocial.toUpperCase();
        this.dataProveedor.nombreComercial = this.dataProveedor.nombreComercial.toUpperCase();
        this.dataProveedor.direccion = this.dataProveedor.direccion.toUpperCase();

    },
    mounted() {
        this.montarToken();
        this.executeListarProveedores(); // carga listado al cargar la pagina
    },
    methods: {

        async montarToken() {
            const tk = document.getElementById('mydiv').dataset.test
            this.headers.headers.token = tk;
            const server = document.getElementById('mydivServ').dataset.test
            this.dom.server = server;
        },
        async mostrarOpcionesBusqueda() {
            this.executeCargarCategorias();
        },
        async validarTipoDocumento() {
            if (this.dataProveedor.idTipoDocumento == 1 || this.dataProveedor.idTipoDocumento == 5) {
                this.dom.mostrarBotonExtraer = true;
            } else {
                this.dom.mostrarBotonExtraer = false;
            }
        },
        async validarDocumento() {
            doc = this.$refs["numDocumento"]
            if (this.dataProveedor.idTipoDocumento == 1) {
                if (doc.value.length > 10) {
                    // this.dom.readOnlyNumDocumento = "isReadOnly";
                    this.dataProveedor.numDocumento = doc.value.substring(0, 10);
                    this.mensajeToastError("El número de caracteres no puede ser mayor a 10");
                }
            } else if (this.dataProveedor.idTipoDocumento == 5) {
                if (doc.value.length > 13) {
                    // this.dom.readOnlyNumDocumento = "isReadOnly";
                    this.dataProveedor.numDocumento = doc.value.substring(0, 13);
                    this.mensajeToastError("El número de caracteres no puede ser mayor a 13");
                }
            }

        },
        async verFormulario() {
            this.dom.mostrarFormulario = true;
            this.dom.mostrarListado = false;
            this.dom.mostrarBusqueda = false;
            this.dom.mostrarBotonNuevo = false;
            this.executeCargarTipoDocumento();
            this.executeCargarCategorias();
        },
        async ocultarFormulario() {
            this.dom.mostrarFormulario = false;
            this.dom.mostrarListado = true;
            this.dom.mostrarBusqueda = false;
            this.dom.mostrarBotonNuevo = true;
            this.limpiarFormulario();
        },
        async limpiarFormulario() {
            this.dataProveedor.idProveedor = false;
            this.dataProveedor.idCategoria = '';
            this.dataProveedor.idTipoDocumento = 1;
            this.dataProveedor.numDocumento = '';
            this.dataProveedor.razonSocial = '';
            this.dataProveedor.nombreComercial = '';
            this.dataProveedor.direccion = '';
            this.dataProveedor.telefono = '';
            this.dataProveedor.celular = '';
            this.dataProveedor.correos = '';
            this.dataProveedor.estado = 'R';
        },
        async verFiltro() {
            this.dom.mostrarFormulario = false;
            this.dom.mostrarListado = true;
            this.dom.mostrarBusqueda = true;
            this.dom.mostrarBotonNuevo = false;
        },
        async ocultarFiltro() {
            this.dom.mostrarFormulario = false;
            this.dom.mostrarListado = true;
            this.dom.mostrarBusqueda = false;
            this.dom.mostrarBotonNuevo = true;
            this.limpiarFiltro();
            this.executeListarProveedores();
        },
        async limpiarFiltro() {
            this.datosBusqueda.nombre = '';
            this.datosBusqueda.numDocumento = '';
            this.datosBusqueda.idCategoria = '';
            this.datosBusqueda.estado = '';
        },
        async executeExtraerRegistroCivil() {
            var idFormulario = document.querySelector("#viewFormulario");
            var blockUI = new KTBlockUI(idFormulario, {
                message: '<div class="blockui-message"><span class="spinner-border text-primary"></span> Extrayendo...</div>',
                overlayClass: 'bg-dark bg-opacity-25',
            });
            blockUI.block();

            this.dom.nombreBotonExtraccion = "Procesando..."

            if (this.dataProveedor.idTipoDocumento == 1) {
                try {
                    const response = await this.extraerRegistroCivil();
                    if (response.data) {
                        let nombre = response.data.nombres;
                        let apellido = response.data.apellidos;

                        this.dataProveedor.razonSocial = apellido + ' ' + nombre;

                        this.mensajeToastExito('Extracción exitosa');

                        blockUI.release();
                        blockUI.destroy();
                        this.dom.nombreBotonExtraccion = "Extraer datos";
                    }
                } catch (error) {
                    this.mensajeToastError('No se pudo extraer los datos');

                    blockUI.release();
                    blockUI.destroy();
                    this.dom.nombreBotonExtraccion = "Extraer datos";
                }

            } else {

                try {
                    const response = await this.extraerSRI();

                    if (response.data) {

                        let nombre = response.data.contribuyente['nombreComercial'] ?? '---';
                        let direccion = response.data.contribuyente['direccionMatriz'] ?? '---';

                        this.dataProveedor.razonSocial = nombre;
                        this.dataProveedor.direccion = direccion;

                        this.mensajeToastExito('Extracción exitosa');

                        blockUI.release();
                        blockUI.destroy();
                        this.dom.nombreBotonExtraccion = "Extraer datos";

                    }
                } catch (error) {
                    this.mensajeToastError('No se pudo extraer los datos');

                    blockUI.release();
                    blockUI.destroy();
                    this.dom.nombreBotonExtraccion = "Extraer datos";
                }
            }


        },
        async extraerRegistroCivil() {

            let body = { cedula: this.dataProveedor.numDocumento }
            let headers = { headers: { 'Authorization': '199b968f-48d6-4903-a53a-19e1623be7eb' } }
            const promise = axios.post('https://123emk9w57.execute-api.us-east-2.amazonaws.com/prod/consultaci', body, headers);
            return promise.then((response) => response);
        },

        async extraerSRI() {
            const promise = axios.get('https://srienlinea.sri.gob.ec/movil-servicios/api/v1.0/deudas/porIdentificacion/' + this.dataProveedor.numDocumento + '/?tipoPersona=N');
            return promise.then((response) => response);
        },

        async executeListarProveedores() {
            const response = await this.listarProveedores();
            this.datosGenerales.listaProveedores = response.data.dataResponse;
        },

        async listarProveedores() {
            const promise = axios.get(`${this.dom.server}/proveedor/listarProveedores`, this.headers);
            return promise.then((response) => response);
        },

        // SANTIAGO CAMPUZANO FUNCION TECLA ENTER
        validarBusquedaEnter: function(e){
            if (e.keyCode === 13) {
                this.validarBusquedaProveedor();
            }
        },

        // FIN FUNCION TECLA ENTER

        async validarBusquedaProveedor() {
            if (this.datosBusqueda.nombre != '' || this.datosBusqueda.numDocumento != '' || this.datosBusqueda.idCategoria != ''
            || this.datosBusqueda.estado != '') {
                this.executeBuscarProveedores();
            } else if(this.datosBusqueda.nombre == ''){
                mensaje="Debe seleccionar un filtro de busqueda.";
                this.mensajeToastError(mensaje);
                // this.executeBuscarProveedores();
            }
        },

        async executeBuscarProveedores() {
            var listado = document.querySelector("#divMostrarListado");
            var blockUI = new KTBlockUI(listado, {
                message: '<div class="blockui-message"><span class="spinner-border text-primary"></span>Buscando...</div>',
                overlayClass: 'bg-dark bg-opacity-25',
            });
            blockUI.block();

            const response = await this.buscarProveedores();
            this.datosGenerales.listaProveedores = response.data.dataResponse;
            if (response.data.success) {
                blockUI.release();
                blockUI.destroy();
            } else {
                this.mensajeSweetAlertError(response.data.mensaje);
                blockUI.release();
                blockUI.destroy();
            }
        },
        async buscarProveedores() {

            let body = { datosBusqueda: this.datosBusqueda, idEmpresa: this.datosGenerales.idEmpresa }
            const promise = axios.post(`${this.dom.server}/proveedor/buscarProveedores`, body, this.headers);
            return promise.then((response) => response);
        },
        async executeCargarTipoDocumento() {
            const response = await this.cargarTipoDocumento();
            this.datosGenerales.tipoDocumento = response.data.dataResponse;
        },
        async cargarTipoDocumento() {
            const promise = axios.get(`${this.dom.server}/proveedor/cargarTipoDocumento`);
            return promise.then((response) => response);

        },
        async executeCargarCategorias() {
            const response = await this.cargarCategorias();
            this.datosGenerales.categorias = response.data.dataResponse;

        },
        async cargarCategorias() {
            const promise = axios.get(`${this.dom.server}/proveedor/cargarCategoriasProveedor`, this.headers);
            return promise.then((response) => response);

        },

        async executeCargarDataProveedor(idProveedor) {
            const response = await this.cargardataProveedor(idProveedor);
            datos = response.data.dataResponse[0];
            if (response.data.success) {
                this.verFormulario();
                this.dataProveedor.idProveedor = datos.ID_PROVEEDOR;
                this.dataProveedor.idCategoria = datos.ID_CATEGORIA;
                this.dataProveedor.idTipoDocumento = datos.ID_TIPO_DOCUMENTO;
                this.dataProveedor.numDocumento = datos.NUM_DOCUMENTO;
                this.dataProveedor.razonSocial = datos.RAZON_SOCIAL;
                this.dataProveedor.nombreComercial = datos.NOMBRE_COMERCIAL;
                this.dataProveedor.direccion = datos.DIRECCION;
                this.dataProveedor.telefono = datos.TELEFONO;
                this.dataProveedor.celular = datos.NUM_TELEFONO;
                this.dataProveedor.correos = datos.EMAIL;
                this.dataProveedor.estado = datos.ESTADO;
            }

        },
        async cargardataProveedor(idProveedor) {
            const promise = axios.get(`${this.dom.server}/proveedor/cargardataProveedor/${idProveedor}`);
            return promise.then((response) => response);
        },
        async validarCreacionProveedor() {

            const validacion = await this.validarProveedor();

            if (validacion) {
                if (!this.dataProveedor.idProveedor) {
                    this.executeCrearProveedores();
                } else {
                    this.executeActualizarProveedor();
                }
            }

        },
        async executeCrearProveedores() {
            // bloqueo formulario
            var idFormulario = document.querySelector("#viewFormulario");
            var blockUI = new KTBlockUI(idFormulario, {
                message: '<div class="blockui-message"><span class="spinner-border text-primary"></span>Procesando...</div>',
                overlayClass: 'bg-dark bg-opacity-25',
            });
            blockUI.block();
            this.dom.nombreBotonRegistrar = 'Enviando..'
                //bloqueo Fromulario
            const response = await this.crearProveedor();
            if (response.data.success) {
                this.mensajeSweetAlertExito(response.data.mensaje);
                this.executeListarProveedores();
                this.ocultarFormulario();

                blockUI.release();
                blockUI.destroy();
                this.dom.nombreBotonRegistrar = 'Registrar'
            } else {
                this.mensajeSweetAlertError(response.data.mensaje);
                blockUI.release();
                blockUI.destroy();
                this.dom.nombreBotonRegistrar = 'Registrar'
            }
        },
        async crearProveedor() {
            let body = { dataProveedor: this.dataProveedor, datosGenerales: { idEmpresa: this.datosGenerales.idEmpresa, idSucursal: this.datosGenerales.idSucursal, idUsuario: this.datosGenerales.idUsuario } }
            const promise = axios.post(`${this.dom.server}/proveedor/crearProveedor`, body, this.headers);
            respuesta = promise.then((response) => response);
            return respuesta;
        },
        async executeActualizarProveedor() {
            var idFormulario = document.querySelector("#viewFormulario");
            var blockUI = new KTBlockUI(idFormulario, {
                message: '<div class="blockui-message"><span class="spinner-border text-primary"></span>Procesando...</div>',
                overlayClass: 'bg-dark bg-opacity-25',
            });
            blockUI.block();
                //bloqueo Fromulario
            const response = await this.actualizarProveedor();
            if (response.data.success) {
                this.mensajeSweetAlertExito(response.data.mensaje);
                this.executeListarProveedores();
                this.ocultarFormulario();

                blockUI.release();
                blockUI.destroy();
            } else {
                this.mensajeSweetAlertError(response.data.mensaje);
                blockUI.release();
                blockUI.destroy();
            }
        },
        async actualizarProveedor() {
            let body = { dataProveedor: this.dataProveedor, datosGenerales: { idUsuario: this.datosGenerales.idUsuario } }
            const promise = axios.put(`${this.dom.server}/proveedor/actualizarProveedor`, body, this.headers);
            respuesta = promise.then((response) => response);
            return respuesta;
        },
        async confirmacionEliminarProveedor(idProveedor, nombre) {

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
                    this.executeEliminarProveedor(idProveedor);
                }
            })


        },


        async executeEliminarProveedor(idProveedor) {

            var listado = document.querySelector("#divMostrarListado");
            var blockUI = new KTBlockUI(listado, {
                message: '<div class="blockui-message"><span class="spinner-border text-primary"></span>Eliminando...</div>',
                overlayClass: 'bg-dark bg-opacity-25',
            });
            blockUI.block();

            const response = await this.eliminarProveedor(idProveedor);

            if (response.data.success) {
                this.executeListarProveedores();
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

        async eliminarProveedor(idProveedor) {
            const promise = axios.get(`${this.dom.server}/proveedor/eliminarProveedor/${idProveedor}`);
            respuesta = promise.then((response) => response);
            return respuesta;
        },

        // anular proveedor estado
        async confirmacionAnularProveedor(idProveedor, nombre) {

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
                    this.executeAnularProveedor(idProveedor);
                }
            })


        },


        async executeAnularProveedor(idProveedor) {

            var listado = document.querySelector("#divMostrarListado");
            var blockUI = new KTBlockUI(listado, {
                message: '<div class="blockui-message"><span class="spinner-border text-primary"></span>Cambiando Estado...</div>',
                overlayClass: 'bg-dark bg-opacity-25',
            });
            blockUI.block();

            const response = await this.anularProveedor(idProveedor);

            if (response.data.success) {
                this.executeListarProveedores();
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

        async anularProveedor(idProveedor) {
            const promise = axios.get(`${this.dom.server}/proveedor/anularProveedor/${idProveedor}`);
            respuesta = promise.then((response) => response);
            return respuesta;
        },
        // fin anular proveedor estado

        // activar proveedor estado
        async confirmacionActivarProveedor(idProveedor, nombre) {

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
                    this.executeActivarProveedor(idProveedor);
                }
            })


        },


        async executeActivarProveedor(idProveedor) {

            var listado = document.querySelector("#divMostrarListado");
            var blockUI = new KTBlockUI(listado, {
                message: '<div class="blockui-message"><span class="spinner-border text-primary"></span>Cambiando Estado...</div>',
                overlayClass: 'bg-dark bg-opacity-25',
            });
            blockUI.block();

            const response = await this.activarProveedor(idProveedor);

            if (response.data.success) {
                this.executeListarProveedores();
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

        async activarProveedor(idProveedor) {
            const promise = axios.get(`${this.dom.server}/proveedor/activarProveedor/${idProveedor}`);
            respuesta = promise.then((response) => response);
            return respuesta;
        },
        // fin activar proveedor estado


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
        },
        async validarProveedor() {
            const form = document.getElementById("formProveedor");
            $(".fv-plugins-message-container").remove();
            var validator = FormValidation.formValidation(form, {
                fields: {
                    categoriaCliente: {
                        validators: { notEmpty: { message: "Categoría de cliente requerido." } },
                    },
                    tipoDocumento: {
                        validators: { notEmpty: { message: "Tipo de documento requerido." } },
                    },
                    numDocumento: {
                        validators: { notEmpty: { message: "Número de docuemento requerido." } },
                    },
                    razonSocial: {
                        validators: { notEmpty: { message: "Razón Social requerida" } },
                    },
                    nombreComercial: {
                        validators: { notEmpty: { message: "Nombre Comercial requerido" } },
                    },
                    direccionMatriz: {
                        validators: { notEmpty: { message: "Dirección requerida" } },
                    },
                    correoProveedor: {
                        validators: { emailAddress: { message: "Inrgese un correo electronico valido." } },
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
        isNumber: function(evt) {
            evt = (evt) ? evt : window.event;
            var charCode = (evt.which) ? evt.which : evt.keyCode;
            if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
                evt.preventDefault();;
            } else {
                return true;
            }
        }
    }
}).mount('#ViewProveedor');
