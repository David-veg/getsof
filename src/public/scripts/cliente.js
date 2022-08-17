var cliente = Vue.createApp({

    data() {
        return {

            dataCliente: {
                idCliente: false,
                idCategoriaCliente: '',
                idTipoDocumento: 1,
                numDocumento: '',
                razonSocial: '',
                nombreComercial: '',
                direccion: '',
                telefono: '',
                celular: '',
                correos: '',
                idVendedor: '',
                estado: 'R'
            },
            datosBusqueda: {
                nombre: '',
                numDocumento: '',
                idVendedor: '',
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
                mostrarEstado: false,
                readOnlyNumDocumento: false
            },
            datosGenerales: {
                idEmpresa: 3,
                idUsuario: 245,
                idSucursal: 2,
                tipoDocumento: false,
                vendedores: false,
                listaClientes: false,
                categoriasCliente: false
            },
            headers: {
                headers: {
                    token: ""
                }
            }


        }
    },
    updated() {

        this.dataCliente.razonSocial = this.dataCliente.razonSocial.toUpperCase();
        this.dataCliente.nombreComercial = this.dataCliente.nombreComercial.toUpperCase();
        this.dataCliente.direccion = this.dataCliente.direccion.toUpperCase();
        this.datosBusqueda.nombre = this.datosBusqueda.nombre.toUpperCase();
        this.datosBusqueda.numDocumento = this.datosBusqueda.numDocumento.toUpperCase();
    },
    mounted() {
        this.montarToken();
        this.executeListarClientes(); // carga listado al cargar la pagina
    },
    methods: {

        async montarToken() {
            const tk = document.getElementById('mydiv').dataset.test
            this.headers.headers.token = tk;
            const server = document.getElementById('mydivServ').dataset.test
            this.dom.server = server;
        },

        // santiago campuzano validarCampoEstado
        async validarEstado(){
            console.log('this.dataCliente.idCliente')
            console.log(this.dataCliente.idCliente)
            if (this.dataCliente.idCliente !='') {
                this.dom.mostrarEstado = true
            } else {
                this.dom.mostrarEstado = false
            }
        },
        // fin validarCampoEstado

        async mostrarOpcionesBusqueda() {
            this.executeCargarVendedor();
            this.executeCargarCategoriasCliente();
        },
        async validarTipoDocumento() {
            if (this.dataCliente.idTipoDocumento == 1 || this.dataCliente.idTipoDocumento == 5) {
                this.dom.mostrarBotonExtraer = true;
            } else {
                this.dom.mostrarBotonExtraer = false;
            }
        },
        async validarDocumento() {
            doc = this.$refs["numDocumento"]
            if (this.dataCliente.idTipoDocumento == 1) {
                if (doc.value.length > 10) {
                    // this.dom.readOnlyNumDocumento = "isReadOnly";
                    this.dataCliente.numDocumento = doc.value.substring(0, 10);
                    this.mensajeToastError("El número de caracteres no puede ser mayor a 10");
                }
            } else if (this.dataCliente.idTipoDocumento == 5) {
                if (doc.value.length > 13) {
                    // this.dom.readOnlyNumDocumento = "isReadOnly";
                    this.dataCliente.numDocumento = doc.value.substring(0, 13);
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
            this.executeCargarVendedor();
            this.executeCargarCategoriasCliente();
            this.validarEstado();
        },
        async ocultarFormulario() {
            this.dom.mostrarFormulario = false;
            this.dom.mostrarListado = true;
            this.dom.mostrarBusqueda = false;
            this.dom.mostrarBotonNuevo = true;
            this.limpiarFormulario();
        },
        async limpiarFormulario() {
            this.dataCliente.idCliente = false;
            this.dataCliente.idCategoriaCliente = '';
            this.dataCliente.idTipoDocumento = 1;
            this.dataCliente.numDocumento = '';
            this.dataCliente.razonSocial = '';
            this.dataCliente.nombreComercial = '';
            this.dataCliente.direccion = '';
            this.dataCliente.telefono = '';
            this.dataCliente.celular = '';
            this.dataCliente.correos = '';
            this.dataCliente.idVendedor = '';
            this.dataCliente.estado = 'R';
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
            this.executeListarClientes();
        },

        async limpiarFiltro() {
            this.datosBusqueda.nombre = "";
            this.datosBusqueda.numDocumento = "";
            this.datosBusqueda.idVendedor = "";
            this.datosBusqueda.idCategoria = "";
            this.datosBusqueda.estado = "";
        },

        async executeExtraerRegistroCivil() {

            var idFormulario = document.querySelector("#viewFormulario");
            var blockUI = new KTBlockUI(idFormulario, {
                message: '<div class="blockui-message"><span class="spinner-border text-primary"></span> Extrayendo...</div>',
                overlayClass: 'bg-dark bg-opacity-25',
            });
            blockUI.block();

            this.dom.nombreBotonExtraccion = "Procesando..."

            if (this.dataCliente.idTipoDocumento == 1) {
                try {
                    const response = await this.extraerRegistroCivil();
                    if (response.data) {
                        let nombre = response.data.nombres;
                        let apellido = response.data.apellidos;

                        this.dataCliente.razonSocial = apellido + ' ' + nombre;

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

                        this.dataCliente.razonSocial = nombre;
                        this.dataCliente.direccion = direccion;

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

            let body = { cedula: this.dataCliente.numDocumento }
            let headers = { headers: { 'Authorization': '199b968f-48d6-4903-a53a-19e1623be7eb' } }
            const promise = axios.post('https://123emk9w57.execute-api.us-east-2.amazonaws.com/prod/consultaci', body, headers);
            return promise.then((response) => response);
        },

        async extraerSRI() {
            const promise = axios.get('https://srienlinea.sri.gob.ec/movil-servicios/api/v1.0/deudas/porIdentificacion/' + this.dataCliente.numDocumento + '/?tipoPersona=N');
            return promise.then((response) => response);
        },

        async executeListarClientes() {
            const response = await this.listarClientes();
            this.datosGenerales.listaClientes = response.data.dataResponse;
        },
        async listarClientes() {
            const promise = axios.get(`${this.dom.server}/cliente/listarClientes`, this.headers);
            return promise.then((response) => response);
        },
        async executeBuscarProveedores() {
            var listado = document.querySelector("#divMostrarListado");
            var blockUI = new KTBlockUI(listado, {
                message: '<div class="blockui-message"><span class="spinner-border text-primary"></span>Buscando...</div>',
                overlayClass: 'bg-dark bg-opacity-25',
            });
            blockUI.block();

            const response = await this.buscarProveedores();
            this.datosGenerales.listaClientes = response.data.dataResponse;
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
            const promise = axios.post(`${this.dom.server}/proveedor/buscarProveedores`, body);
            return promise.then((response) => response);
        },
        
        async executeCargarTipoDocumento() {
            const response = await this.cargarTipoDocumento();
            this.datosGenerales.tipoDocumento = response.data.dataResponse;
        },
        async cargarTipoDocumento() {
            const promise = axios.get(`${this.dom.server}/cliente/cargarTipoDocumento`);
            return promise.then((response) => response);
        },

        async executeCargarCategoriasCliente() {
            const response = await this.cargarCategoriasCliente();
            this.datosGenerales.categoriasCliente = response.data.dataResponse;
        },

        async cargarCategoriasCliente() {
            const promise = axios.get(`${this.dom.server}/cliente/cargarCategoriasCliente`, this.headers);
            return promise.then((response) => response);

        },
        async executeCargarVendedor() {
            const response = await this.cargarVendedor();
            this.datosGenerales.vendedores = response.data.dataResponse;
        },
        async cargarVendedor() {
            const promise = axios.get(`${this.dom.server}/cliente/cargarVendedor`, this.headers);
            return promise.then((response) => response);
        },
        async executeCargarDataCliente(idCliente) {
            const response = await this.cargarDataCliente(idCliente);
            datos = response.data.dataResponse[0];
            if (response.data.success) {
                this.verFormulario();
                this.dataCliente.idCliente = datos.ID_CLIENTE;
                this.dataCliente.idCategoriaCliente = datos.ID_CATEGORIA;
                this.dataCliente.idTipoDocumento = datos.ID_TIPO_DOCUMENTO;
                this.dataCliente.numDocumento = datos.NUM_DOCUMENTO;
                this.dataCliente.razonSocial = datos.NOMBRE;
                this.dataCliente.nombreComercial = datos.NOMBRE_COMERCIAL;
                this.dataCliente.direccion = datos.DIRECCION;
                this.dataCliente.telefono = datos.TELEFONO;
                this.dataCliente.celular = datos.NUM_TELEFONO;
                this.dataCliente.correos = datos.EMAIL;
                this.dataCliente.idVendedor = datos.ID_VENDEDOR;
                this.dataCliente.estado = datos.ESTADO;
            }
            this.validarEstado();
        },
        async cargarDataCliente(idCliente) {
            const promise = axios.get(`${this.dom.server}/cliente/cargarDataCliente/${idCliente}`);
            return promise.then((response) => response);
        },
        async validarCreacionCliente() {

            const validacion = await this.validarCliente();

            if (validacion) {
                if (!this.dataCliente.idCliente) {
                    this.executeCrearCliente();
                } else {
                    this.executeActualizarCliente();
                }
            }
        },
        async executeCrearCliente() {
            // bloqueo formulario

            var idFormulario = document.querySelector("#viewFormulario");
            var blockUI = new KTBlockUI(idFormulario, {
                message: '<div class="blockui-message"><span class="spinner-border text-primary"></span>Procesando...</div>',
                overlayClass: 'bg-dark bg-opacity-25',
            });
            blockUI.block();
            this.dom.nombreBotonRegistrar = 'Enviando..'
                //bloqueo Fromulario
            const response = await this.crearCliente();
            if (response.data.success) {
                this.mensajeSweetAlertExito(response.data.mensaje);
                this.executeListarClientes();
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
        async crearCliente() {
            let body = { dataCliente: this.dataCliente, datosGenerales: { idEmpresa: this.datosGenerales.idEmpresa, idSucursal: this.datosGenerales.idSucursal, idUsuario: this.datosGenerales.idUsuario } }
            const promise = axios.post(`${this.dom.server}/cliente/crearCliente`, body, this.headers);
            respuesta = promise.then((response) => response);
            return respuesta;
        },
        async executeActualizarCliente() {
            var idFormulario = document.querySelector("#viewFormulario");
            var blockUI = new KTBlockUI(idFormulario, {
                message: '<div class="blockui-message"><span class="spinner-border text-primary"></span>Procesando...</div>',
                overlayClass: 'bg-dark bg-opacity-25',
            });
            blockUI.block();
                //bloqueo Fromulario
            const response = await this.actualizarCliente();
            if (response.data.success) {
                this.mensajeSweetAlertExito(response.data.mensaje);
                this.executeListarClientes();
                this.ocultarFormulario();

                blockUI.release();
                blockUI.destroy();
            } else {
                this.mensajeSweetAlertError(response.data.mensaje);
                blockUI.release();
                blockUI.destroy();
            }
        },
        async actualizarCliente() {
            let body = { dataCliente: this.dataCliente }
            const promise = axios.put(`${this.dom.server}/cliente/actualizarCliente`, body, this.headers);
            respuesta = promise.then((response) => response);
            return respuesta;
        },
        async confirmacionEliminarCliente(idCliente, nombre) {

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
                    this.executeEliminarCliente(idCliente);
                }
            })


        },


        async executeEliminarCliente(idCliente) {

            var listado = document.querySelector("#divMostrarListado");
            var blockUI = new KTBlockUI(listado, {
                message: '<div class="blockui-message"><span class="spinner-border text-primary"></span>Eliminando...</div>',
                overlayClass: 'bg-dark bg-opacity-25',
            });
            blockUI.block();

            const response = await this.eliminarCliente(idCliente);

            if (response.data.success) {
                this.executeListarClientes();
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

        async eliminarCliente(idCliente) {
            const promise = axios.get(`${this.dom.server}/cliente/eliminarCliente/${idCliente}`);
            respuesta = promise.then((response) => response);
            return respuesta;
        },

        // anular cliente estado
        async confirmacionAnularCliente(idCliente, nombre) {

            Swal.fire({
                html: ' ¿ Está seguro que desea cambiar el estado de <span class="badge badge-success"> ' + nombre + '</span> a inactivo ?',
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
                    this.executeAnularCliente(idCliente);
                }
            })


        },


        async executeAnularCliente(idCliente) {

            var listado = document.querySelector("#divMostrarListado");
            var blockUI = new KTBlockUI(listado, {
                message: '<div class="blockui-message"><span class="spinner-border text-primary"></span>Cambiando Estado...</div>',
                overlayClass: 'bg-dark bg-opacity-25',
            });
            blockUI.block();

            const response = await this.anularCliente(idCliente);

            if (response.data.success) {
                this.executeListarClientes();
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

        async anularCliente(idCliente) {
            const promise = axios.get(`${this.dom.server}/cliente/anularCliente/${idCliente}`);
            respuesta = promise.then((response) => response);
            return respuesta;
        },
        // fin anular cliente estado

        // activar cliente estado
        async confirmacionActivarCliente(idCliente, nombre) {

            Swal.fire({
                html: ' ¿ Está seguro que desea cambiar el estado de <span class="badge badge-success"> ' + nombre + '</span> a activo ?',
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
                    this.executeActivarCliente(idCliente);
                }
            })


        },


        async executeActivarCliente(idCliente) {

            var listado = document.querySelector("#divMostrarListado");
            var blockUI = new KTBlockUI(listado, {
                message: '<div class="blockui-message"><span class="spinner-border text-primary"></span>Cambiando Estado...</div>',
                overlayClass: 'bg-dark bg-opacity-25',
            });
            blockUI.block();

            const response = await this.activarCliente(idCliente);

            if (response.data.success) {
                this.executeListarClientes();
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

        async activarCliente(idCliente) {
            const promise = axios.get(`${this.dom.server}/cliente/activarCliente/${idCliente}`);
            respuesta = promise.then((response) => response);
            return respuesta;
        },
        // fin activar cliente estado

        // busqueda filtros cliente

        async validarBusquedaCliente() {
            if (this.datosBusqueda.nombre != '' || this.datosBusqueda.numDocumento != '' || this.datosBusqueda.idVendedor != ''
            || this.datosBusqueda.idCategoria != '' || this.datosBusqueda.estado) {
                this.executeBuscarClientes();
            } else if(this.datosBusqueda.nombre == ''){
                mensaje="Debe seleccionar un filtro de busqueda.";
                this.mensajeToastError(mensaje);
                this.executeBuscarClientes();
            }
        },

        async executeBuscarClientes() {

            // bloqueo formulario
            var idListado = document.querySelector("#divMostrarListado");
            var blockUI = new KTBlockUI(idListado, {
                message: '<div class="blockui-message"><span class="spinner-border text-primary"></span>Procesando...</div>',
                overlayClass: 'bg-dark bg-opacity-25',
            });
            blockUI.block();

            const response = await this.cargarListadoCliente();
            this.datosGenerales.listaClientes = response.data.dataResponse;

            if (response.data.success) {
                blockUI.release();
                blockUI.destroy();
            } else {
                blockUI.release();
                blockUI.destroy();
            }
        },

        async cargarListadoCliente() {
            let body = {datosBusqueda: this.datosBusqueda};
            const promise = axios.post(`${this.dom.server}/cliente/buscarClientes`, body, this.headers);
            respuesta = promise.then((response) => response);
            return respuesta;

        },
        // fin busqueda filtros cliente

        // SANTIAGO CAMPUZANO FUNCION TECLA ENTER
        validarBusquedaEnter: function(e){
            if (e.keyCode === 13) {
                this.validarBusquedaCliente();
            }
        },

        // FIN FUNCION TECLA ENTER

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
        async validarCliente() {
            const form = document.getElementById("formCliente");
            $(".fv-plugins-message-container").remove();
            var validator = FormValidation.formValidation(form, {
                fields: {
                    categoriaCliente: {
                        validators: { notEmpty: { message: "Categoría de cliente requerido" } },
                    },
                    tipoDocumento: {
                        validators: { notEmpty: { message: "Tipo de documento requerido" } },
                    },
                    numDocumento: {
                        validators: { notEmpty: { message: "Número de docuemento requerido" } },
                    },
                    razonSocial: {
                        validators: { notEmpty: { message: "Razón social requerida" } },
                    },
                    nombreComercial: {
                        validators: { notEmpty: { message: "Nombre comercial requerido" } },
                    },
                    direccion: {
                        validators: { notEmpty: { message: "Dirección requerida" } },
                    },
                    correoCliente: {
                        validators: { emailAddress: { message: "Correo de la Empresa Invalido." } },
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
}).mount('#View');
