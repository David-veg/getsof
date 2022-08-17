var app = Vue.createApp({
    data() {
        return {

            dataUsuario: {
                idUsuario: false,
                idTipoDocumento: "1",
                numeroDocumento: "",
                apellidos: "",
                nombres: "",
                direccion: "",
                estado: "R",
                celular: "",
                correo: "",
                idPerfil: 1,
                indMultiEmpresa: false,
                login: "",
                clave: "",
                tipoUsuario: "N",
                img: null,
                file: null,
                archivo: []
            },

            dataBusqueda: {
                usuario: "",
                cedulaNombre: "",
                estado: ""
            },

            dom: {
                mostrarFomulario: false,
                mostarListado: true,
                mostarBusqueda: false,
                mostrarBotonExtracion: true,
                mostrarBtns: true,
                nombreBotonExtraccion: "Extraer datos",
                nombreBotonRegistrar: "Registrar",
                nombreBotonEditar: "Actualizar",
                nombreBotonCambioClave: "Cambiar clave",
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
                listadoUsuarios: false,
                arrayEmpresasAgregadas: []
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
        this.executeCargarListado(); // carga listado al cargar la pagina

    },

    updated() {
        this.dataUsuario.nombres = this.dataUsuario.nombres.toUpperCase();
        this.dataUsuario.apellidos = this.dataUsuario.apellidos.toUpperCase();
        this.dataUsuario.direccion = this.dataUsuario.direccion.toUpperCase();
        this.dataUsuario.login = this.dataUsuario.login.toUpperCase();
        this.dataBusqueda.usuario = this.dataBusqueda.usuario.toUpperCase();
        this.dataBusqueda.cedulaNombre = this.dataBusqueda.cedulaNombre.toUpperCase();
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

        async validarBusquedaUsuario() {
            if (this.dataBusqueda.usuario != '' || this.dataBusqueda.cedulaNombre != '' || this.dataBusqueda.estado != '') {
                this.executeCargarListadoFiltro();
            } else if (this.dataBusqueda.usuario == '') {
                mensaje = "Debe seleccionar un filtro de busqueda.";
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
            this.datosGenerales.listadoUsuarios = response.data.dataResponse;

            if (response.data.success) {
                blockUI.release();
                blockUI.destroy();
            } else {
                blockUI.release();
                blockUI.destroy();
            }

        },

        async cargarListadoFiltro() {
            let body = {
                usuario: this.dataBusqueda.usuario,
                cedulaNombre: this.dataBusqueda.cedulaNombre,
                estado: this.dataBusqueda.estado
            };
            const promise = axios.post(`${this.dom.server}/usuario/listarFiltros`, body, this.headers);
            respuesta = promise.then((response) => response);
            return respuesta;
        },

        // FIN BUSQUEDA FILTROS

        // SANTIAGO CAMPUZANO VALIDACION DE FORMULARIO
        async validarUsuario() {

            const form = document.getElementById("viewFormulario");
            $(".fv-plugins-message-container").remove();

            var validator = FormValidation.formValidation(form, {
                fields: {
                    tipoDocumento: {
                        validators: { notEmpty: { message: "El Tipo de docuemento es Requerido." } },
                    },
                    numDocumento: {
                        validators: { notEmpty: { message: "El Número de docuemento es Requerido." } },
                    },
                    nombres: {
                        validators: { notEmpty: { message: "El Nombre del Usuario es Requerido." } },
                    },
                    apellidos: {
                        validators: { notEmpty: { message: "El Apellido del Usuario es Requerido." } },
                    },
                    direccion: {
                        validators: { notEmpty: { message: "La Direccion del Usuario es Requerido" } }
                    },
                    correo: {
                        validators: { emailAddress: { message: "Ingrese una Dirección de Correo Válido." } },
                    },
                    usuario: {
                        validators: { notEmpty: { message: "El Nombre de Usuario es requerido." } },
                    },
                    new_password: {
                        validators: { notEmpty: { message: "La Contraseña del Usuario es Requerido." } },
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

        // VALIDACION SOLO NUMEROS

        isNumber: function (evt) {
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
            if (this.dataUsuario.idTipoDocumento == 1) {
                if (doc.value.length > 10) {

                    this.dataUsuario.numeroDocumento = doc.value.substring(0, 10);
                    this.mensajeToastError("El número de caracteres no puede ser mayor a 10");
                }
            } else if (this.dataUsuario.idTipoDocumento == 5) {
                if (doc.value.length > 13) {

                    this.dataUsuario.numeroDocumento = doc.value.substring(0, 13);
                    this.mensajeToastError("El número de caracteres no puede ser mayor a 13");
                }
            }

        },
        // FIN VALIDACION DOCUMENTO

        // FIN VALIDACION DE FORMULARIO

        async validarCreacionEdicionUsuario() {
            const validacion = await this.validarUsuario();

            if (validacion) {
                if (!this.dataUsuario.idUsuario) {
                    this.executeCrearUsuaio();
                } else {
                    this.executeActualizarUsuario();
                }
            }

        },

        async confirmacionEliminarUsuario(idUsuario, epellidos, nombre) {

            Swal.fire({
                html: ' ¿ Está seguro que desea eliminar a <span class="badge badge-success"> ' + epellidos + ' ' + nombre + '</span>   de forma permanete ?',
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
                    this.executeEliminarUsuario(idUsuario);


                } else {

                }
            })


        },


        async executeEliminarUsuario(idUsuario) {

            var idFormulario = document.querySelector("#viewFormulario");
            var blockUI = new KTBlockUI(idFormulario, {
                message: '<div class="blockui-message"><span class="spinner-border text-primary"></span>Procesando...</div>',
                overlayClass: 'bg-dark bg-opacity-25',
            });
            blockUI.block();

            const response = await this.eliminarUsuario(idUsuario);

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

        // funciones para ejecutar otras funciones para esperar promesas y obtener datos


        async executeExtraerRegistroCivil() {


            // bloqueo formulario


            var idFormulario = document.querySelector("#viewFormulario");
            var blockUI = new KTBlockUI(idFormulario, {
                message: '<div class="blockui-message"><span class="spinner-border text-primary"></span> Extrayendo...</div>',
                overlayClass: 'bg-dark bg-opacity-25',
            });
            blockUI.block();
            //bloqueo Fromulario

            this.dom.nombreBotonExtraccion = "Procesando..."

            const response = await this.extraerRegistroCivilDirecto();

            if (response.data) {


                let data = response.data.contribuyente.nombreComercial;
                let dataExplotada = data.split(" ");
                let apellidos = dataExplotada[0] + " " + dataExplotada[1];
                dataExplotada.splice(0, 2);
                let nombres = dataExplotada.join(" ");



                this.dataUsuario.apellidos = apellidos;
                this.dataUsuario.nombres = nombres;
                this.dataUsuario.direccion = '---';

                this.mensajeToastExito('Extracción exitosa');


                blockUI.release();
                blockUI.destroy();
                this.dom.nombreBotonExtraccion = "Extraer datos"
                // this.desbloquearPantallaFormulario(idboton,'Extraer datos');
            }

        },

        async executeCargarListado() {
            const response = await this.cargarListado();
            this.datosGenerales.listadoUsuarios = response.data.dataResponse;

        },

        async executeCargarTipoDocumento() {
            const response = await this.cargarTipoDocumento();
            this.datosGenerales.tipoDocumento = response.data.dataResponse;


        },

        async executeCargarPerfiles() {
            const response = await this.cargarPerfiles();
            this.datosGenerales.perfiles = response.data.dataResponse;

        },

        async executeCrearUsuaio() {
            // bloqueo formulario
            if (this.dataUsuario.indMultiEmpresa && this.datosGenerales.arrayEmpresasAgregadas.length == 0) {
                this.mensajeSweetAlertError("Debe tener al menos una empresa");
            } else {
                var idFormulario = document.querySelector("#viewFormulario");
                var blockUI = new KTBlockUI(idFormulario, {
                    message: '<div class="blockui-message"><span class="spinner-border text-primary"></span>Procesando...</div>',
                    overlayClass: 'bg-dark bg-opacity-25',
                });
                blockUI.block();
                this.dom.nombreBotonRegistrar = 'Enviando..'
                //bloqueo Fromulario
                const response = await this.crearUsuario();
                if (response.data.success) {
                    this.mensajeSweetAlertExito(response.data.mensaje);
                    this.executeCargarListado();
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
            }
        },


        async executeCambiarClave() {

            var idFormulario = document.querySelector("#View");
            var blockUI = new KTBlockUI(idFormulario, {
                message: '<div class="blockui-message"><span class="spinner-border text-primary"></span> Procesando...</div>',
                overlayClass: 'bg-dark bg-opacity-25',
            });
            blockUI.block();
            this.dom.nombreBotonCambioClave = 'Enviando..'
            const response = await this.cambiarClave();
            if (response.data.success) {

                $("#modalCambioClave").modal("hide");
                this.mensajeSweetAlertExito(response.data.mensaje);
                blockUI.release();
                blockUI.destroy();
                this.dom.nombreBotonCambioClave = 'Cambiar clave'
                this.dataUsuario.login = '';
                this.dataUsuario.clave = '';

                //this.mensajeToastExito(response.data.mensaje)

            } else {
                this.mensajeSweetAlertError(response.data.mensaje);

                blockUI.release();
                blockUI.destroy();
                this.dom.nombreBotonCambioClave = 'Cambiar clave'
                $("#modalCambioClave").modal("hide");
                this.dataUsuario.login = '';
                this.dataUsuario.clave = '';


            }


        },

        async executeActualizarUsuario() {
            if (this.dataUsuario.indMultiEmpresa && this.datosGenerales.arrayEmpresasAgregadas.length == 0) {
                this.mensajeSweetAlertError("Debe tener al menos una empresa");
            } else {
                var idFormulario = document.querySelector("#View");
                var blockUI = new KTBlockUI(idFormulario, {
                    message: '<div class="blockui-message"><span class="spinner-border text-primary"></span> Procesando...</div>',
                    overlayClass: 'bg-dark bg-opacity-25',
                });
                blockUI.block();
                this.dom.nombreBotonEditar = 'Enviando..'
                const response = await this.actualizarUsuario();
                if (response.data.success) {
                    this.executeCargarListado();
                    this.ocultarFormulario();
                    this.mensajeSweetAlertExito(response.data.mensaje);

                    blockUI.release();
                    blockUI.destroy();
                    this.dom.nombreBotonEditar = 'Actualizar'

                    //this.mensajeToastExito(response.data.mensaje)

                } else {
                    this.mensajeSweetAlertError(response.data.mensaje);
                    //this.mensajeToastError(response.data.mensaje);

                    blockUI.release();
                    blockUI.destroy();
                    this.dom.nombreBotonEditar = 'Actualizar'
                }
            }

        },


        async executecargarDataUsuario(idUsuario) {

            const response = await this.cargarDataUsuario(idUsuario);
            datos = response.data.dataResponse[0];

            if (response.data.success) {
                this.verFormulario();
                this.dataUsuario.idUsuario = datos.ID_USUARIO,
                    this.dataUsuario.idTipoDocumento = datos.ID_TIPO_DOCUMENTO,
                    this.dataUsuario.numeroDocumento = datos.NUM_DOCUMENTO,
                    this.dataUsuario.apellidos = datos.APELLIDOS,
                    this.dataUsuario.nombres = datos.NOMBRE,
                    this.dataUsuario.direccion = datos.DIRECCION,
                    this.dataUsuario.estado = datos.ESTADO,
                    this.dataUsuario.celular = datos.CELULAR,
                    this.dataUsuario.correo = datos.EMAIL,
                    this.dataUsuario.idPerfil = datos.ID_PERFIL,

                    this.dataUsuario.indMultiEmpresa = false,
                    this.dataUsuario.login = datos.LOGIN,
                    this.dataUsuario.clave = datos.CLAVE,
                    this.dataUsuario.tipoUsuario = datos.TIPO_USUARIO

                if (datos.IND_MULTIEMPRESA == "SI") { this.dataUsuario.indMultiEmpresa = true; } else { this.dataUsuario.indMultiEmpresa = false; }

                    this.datosGenerales.arrayEmpresasAgregadas = response.data.dataResponse[1] ?? [];
            }

        },

        // funciones de logica de negocio ... peticiones servidor de aplicaciones

        async extraerRegistroCivil() {

            let body = { cedula: this.dataUsuario.numeroDocumento }
            let headers = { headers: { 'Authorization': '199b968f-48d6-4903-a53a-19e1623be7eb' } }
            const promise = axios.post('https://123emk9w57.execute-api.us-east-2.amazonaws.com/prod/consultaci', body, headers);
            return promise.then((response) => response);
        },


        async extraerRegistroCivilDirecto() {

            const promise = axios.get('https://srienlinea.sri.gob.ec/movil-servicios/api/v1.0/deudas/porIdentificacion/' + this.dataUsuario.numeroDocumento + '/?tipoPersona=N');
            return promise.then((response) => response);
        },

        async cargarTipoDocumento() {
            const promise = axios.get(`${this.dom.server}/usuario/cargarTipoDocumento`);
            return promise.then((response) => response);
        },

        async cargarPerfiles() {
            const promise = axios.get(`${this.dom.server}/usuario/cargarPerfiles`);
            return promise.then((response) => response);
        },

        async cargarListado() {
            const promise = axios.get(`${this.dom.server}/usuario/listar`, this.headers);
            respuesta = promise.then((response) => response);
            return respuesta;
        },

        async cargarDataUsuario(idUsuario) {

            const promise = axios.get(`${this.dom.server}/usuario/cargarDataUsuario/${idUsuario}`);
            respuesta = promise.then((response) => response);
            return respuesta;
        },

        async eliminarUsuario(idUsuario) {

            const promise = axios.get(`${this.dom.server}/usuario/eliminarUsuario/${idUsuario}`);
            respuesta = promise.then((response) => response);
            return respuesta;
        },

        async crearUsuario() {
            let body = { dataUsuario: this.dataUsuario, detalleEmpresas: this.datosGenerales.arrayEmpresasAgregadas }
            const promise = axios.post(`${this.dom.server}/usuario/crearUsuario`, body, this.headers);
            respuesta = promise.then((response) => response);
            return respuesta;
        },

        async actualizarUsuario() {
            let body = { dataUsuario: this.dataUsuario, detalleEmpresas: this.datosGenerales.arrayEmpresasAgregadas }
            const promise = axios.put(`${this.dom.server}/usuario/actualizarUsuario`, body, this.headers);
            respuesta = promise.then((response) => response);
            return respuesta;
        },

        async cambiarClave() {
            let body = { dataUsuario: this.dataUsuario }
            const promise = axios.put(`${this.dom.server}/usuario/cambiarClave`, body);
            respuesta = promise.then((response) => response);
            return respuesta;
        },

        // funciones frontend para para manipular dom y datos

        async verFormulario() {
            this.executeCargarTipoDocumento();
            this.executeCargarPerfiles();
            this.executeCargarEmpresas();
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

        async validarTipoDocumento() {
            if (this.dataUsuario.idTipoDocumento == 1) {
                this.dom.mostrarBotonExtracion = true;
            } else {
                this.dom.mostrarBotonExtracion = false;
            }
        },


        async limpiarFormulario() {
            this.dataUsuario.idUsuario = false,
                this.dataUsuario.idTipoDocumento = "1",
                this.dataUsuario.numeroDocumento = "",
                this.dataUsuario.apellidos = "",
                this.dataUsuario.nombres = "",
                this.dataUsuario.direccion = "",
                this.dataUsuario.estado = "R",
                this.dataUsuario.celular = "",
                this.dataUsuario.correo = "",
                this.dataUsuario.idPerfil = 1,
                this.dataUsuario.indMultiEmpresa = false,
                this.dataUsuario.login = "",
                this.dataUsuario.clave = "",
                this.dataUsuario.tipoUsuario = "N",
                this.datosGenerales.arrayEmpresasAgregadas = [],
                $(this.$refs.cboEmpresa).empty("change");
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
            this.executeCargarListado();
            this.limpiarFiltro();
        },

        async limpiarFiltro() {
            this.dataBusqueda.usuario = "",
                this.dataBusqueda.cedulaNombre = "",
                this.dataBusqueda.estado = ""
        },

        // funciones de estados  y utilizatrios

        // SANTIAGO CAMPUZANO FUNCION TECLA ENTER
        validarBusquedaEnter: function (e) {
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
        },

        // abrir modals

        async abrirModalCambioClave(idUsuario) {
            this.dataUsuario.clave = "";
            this.dataUsuario.idUsuario = idUsuario;
            $('#modalCambioClave').modal({ backdrop: 'static', keyboard: false });
            $("#modalCambioClave").modal("show");
        },

        async abrirModalFotoUsuario(idUsuario) {
            app.dataUsuario.idUsuario = idUsuario;
            var myDropzone = new Dropzone("#kt_dropzonejs_example_1", {
                url: `${this.dom.server}/usuario/subirFotoUsuario`,
                paramName: 'file',
                maxFilesize: 25, // MB
                maxFiles: 5,
                dictDefaultMessage: 'Drag an image here to upload, or click to select one',
                headers: {
                    'x-csrf-token': "XYZ123",
                },
                init: function () {
                    var wrapperThis = this;
                    var cerrarModal = document.querySelector("#btnCerrarModalImagen");
                    var cerrarModalSup = document.querySelector("#btnSupCerrarModalImagen");
                    // var modal = document.querySelector("#btnSupCerrarModalImagen");
                    this.on("addedfile", function (file) {
                        // console.log("cierra el modal");
                        cerrarModal.addEventListener("click", function () {
                            // console.log(file);
                            wrapperThis.removeFile(file);
                        });

                        cerrarModalSup.addEventListener("click", function () {
                            // console.log(file);
                            wrapperThis.removeFile(file);
                        });

                        // if (modal.hasClass('show')) {
                        //     wrapperThis.removeFile(file);
                        // }

                    });
                    this.on('success', function (file, resp) {
                        app.mensajeToastExito(resp.mensaje);
                    });
                    // this.on('thumbnail', function(file) {
                    //     // if (file.accepted !== false) {
                    //     //     if (file.width < 640 || file.height < 480) {
                    //     //         file.rejectDimensions();
                    //     //     } else {
                    //     //         file.acceptDimensions();
                    //     //     }
                    //     // }
                    // });
                    this.on("sending", function (file, xhr, data) {
                        data.append("idUsuario", app.dataUsuario.idUsuario);
                    });

                },
                accept: function (file, done) {
                    done();
                    // file.acceptDimensions = done;
                    // file.rejectDimensions = function() {
                    //     done('The image must be at least 640 x 480px');
                    // };
                }
            });
        },

        executeCargarEmpresas() {
          let Empresas = false;
          let co = 1;
            var vm = this;
            this.datosGenerales.indEmpresa = true;
            if(!$(this.$refs.cboEmpresa).data('select2')){
              $(this.$refs.cboEmpresa)
                  .select2({
                      placeholder: "Buscar una Empresa",
                      //minimumInputLength: 2,
                      ajax: {
                          url: `${this.dom.server}/usuario/listarEmpresas/`,
                          dataType: "json",
                          delay: 250,
                          processResults: function (data) {
                              //console.log(data);
                              return {
                                  results: data.results
                              };
                          },
                          cache: true,
                      }
                  })
                  .on('change', async (ev, args) => {
                      let idEmpresa = app.$refs.cboEmpresa.value || 0;
                      const resultado = app.datosGenerales.arrayEmpresasAgregadas.find(empresa => empresa.idEmpresa == idEmpresa);
                      if (resultado) {
                          app.mensajeToastError(`La Empresa ${resultado.empresa} ya a sido agregada`);
                      } else {
                          let res = await app.cargarDatosEmpresa(idEmpresa);
                              Empresas = {
                                  idEmpresa: res.data.dataResponse.ID_EMPRESA,
                                  empresa: res.data.dataResponse.RAZON_SOCIAL,
                                  ruc: res.data.dataResponse.RUC
                              }
                              app.datosGenerales.arrayEmpresasAgregadas.push(Empresas)

                              co++;

                      }
                  });
            }

        },

        async cargarDatosEmpresa(idEmpresa) {
            //let Empresas = {idEmpresa: '', empresa: '', ruc: ''}
            const promise = axios.get(`${this.dom.server}/usuario/cargarDatosEmpresa/${idEmpresa}`);
            return promise.then((response) => response);
            //Empresas.idEmpresa = respuesta.ID_EMPRESA;

        },

        async quitarEmpresa(ele) {
            ele > -1 && this.datosGenerales.arrayEmpresasAgregadas.splice(parseInt(ele), 1);
        }
    }

}).mount("#View");
