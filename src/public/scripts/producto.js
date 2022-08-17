var producto = Vue.createApp({

    data() {
        return {

            dataProducto: {
                idProducto: false,
                tipoProServ: '',
                codigoPrincipal: '',
                nombreProServ: '',
                valorProServ: '0',
                ivaProServ: '',
                iceProServ: '',
                idIceProServ: '',
                estado: 'R',
                informacionAdicional: '',
                idCategoria: '',
                codigoBarras: '',
                idMarca: '',
                idModelo: '',
                valorIvaProServ: '0',
                irbpn: '',
                iva:''
            },
            dataCategoria: {
                nombreCategoria:'',
                prefijoCategoria: ''
            },
            dataMarca:{
                idMarca: false,
                nombreMarca: ''
            },
            dataModelo:{
                idModelo: false,
                nombreModelo: '',
                idMarca: ''
            },
            datosBusqueda: {
                nombreProServ: '',
                codigoPrincipal: '',
                tipoProServ: '',
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
                selectIce: false,
                readOnlyNumDocumento: false,
                server: false
            },
            datosGenerales: {
                idEmpresa: 3,
                idUsuario: 245,
                idSucursal: 2,
                tipoDocumento: false,
                listaProServ: false,
                listaIsecProServ: false,
                listaIva: false,
                categorias: false,
                marcas: false,
                listaMarcas: false,
                modelos: false,
                listaModelos: false
            },
            headers: {
                headers: {
                    token: ""
                }
            }
        }
    },
    updated() {

        this.dataProducto.nombreProServ = this.dataProducto.nombreProServ.toUpperCase();
        this.dataProducto.informacionAdicional = this.dataProducto.informacionAdicional.toUpperCase();
        this.datosBusqueda.nombreProServ = this.datosBusqueda.nombreProServ.toUpperCase();
        this.dataCategoria.nombreCategoria = this.dataCategoria.nombreCategoria.toUpperCase();
        this.dataCategoria.prefijoCategoria = this.dataCategoria.prefijoCategoria.toUpperCase();
        this.dataMarca.nombreMarca = this.dataMarca.nombreMarca.toUpperCase();
        this.dataModelo.nombreModelo = this.dataModelo.nombreModelo.toUpperCase();

    },
    mounted() {
        this.montarToken();
        this.executeListarProServ(); // carga listado al cargar la pagina
    },
    methods: {
        async montarToken() {
            const tk = document.getElementById('mydiv').dataset.test
            this.headers.headers.token = tk;
            const server = document.getElementById('mydivServ').dataset.test
            this.dom.server = server;
        },
        async verFormulario() {
            this.dom.mostrarFormulario = true;
            this.dom.mostrarListado = false;
            this.dom.mostrarBusqueda = false;
            this.dom.mostrarBotonNuevo = false;
            this.executeCargarIce();
            this.executeCargarIva();
            this.executeCargarCategoria();
            this.executeCargarMarca();
        },
        async ocultarFormulario() {
            this.dom.mostrarFormulario = false;
            this.dom.mostrarListado = true;
            this.dom.mostrarBusqueda = false;
            this.dom.mostrarBotonNuevo = true;
            this.limpiarFormulario();
            this.executeListarProServ();
            this.dom.selectIce = false;
        },
        async limpiarFormulario() {
            this.dataProducto.idProducto = false;
            this.dataProducto.tipoProServ = '';
            this.dataProducto.codigoPrincipal = '';
            this.dataProducto.nombreProServ = '';
            this.dataProducto.valorProServ = '';
            this.dataProducto.ivaProServ = '';
            this.dataProducto.iceProServ = '';
            this.dataProducto.idIceProServ = '';
            this.dataProducto.estado = 'R';
            this.dataProducto.informacionAdicional = '';

            this.dataProducto.idCategoria = '';
            this.dataProducto.codigoBarras = '';
            this.dataProducto.idMarca = '';
            this.dataProducto.idModelo = '';
            this.dataProducto.valorIvaProServ = '0';
            this.dataProducto.irbpn = false;
        },
        async limpiarFormCategoria(){
            this.dataCategoria.nombreCategoria = '';
            this.dataCategoria.prefijoCategoria = '';
        },
        async limpiarFomMarca(){
            this.dataMarca.idMarca = '' ;
            this.dataMarca.nombreMarca = '' ;
        },
        async limpiarFormModelo() {
            this.dataModelo.idModelo = '' ;
            this.dataModelo.nombreModelo = '' ;
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
            this.executeListarProServ();
        },
        async limpiarFiltro() {
            this.datosBusqueda.nombreProServ = '';
            this.datosBusqueda.codigoPrincipal = '';
            this.datosBusqueda.tipoProServ = '';
            this.datosBusqueda.estado = '';
        },

        // SANTIAGO CAMPUZANO CARGAR ICE
        async executeCargarIce() {
            const response = await this.cargarIce();
            this.datosGenerales.listaIsecProServ = response.data.dataResponse;

             },

        async cargarIce(){
            const promise = axios.get(`${this.dom.server}/producto/cargarIce`);
            return  promise.then((response) => response);

        },
        // FIN CARGAR ICE

        // SANTIAGO CAMPUZANO CARGAR IVA

        async cargarIvaCalculo(valorIva){
            if (this.dataProducto.ivaProServ == 7) {
                this.dataProducto.iva = 0;
            }
            if (this.dataProducto.ivaProServ == 0) {
                this.dataProducto.iva = 0;
            }
            if (this.dataProducto.ivaProServ == 2) {
                this.dataProducto.iva = 12;
            }
            if (this.dataProducto.ivaProServ == 6) {
                this.dataProducto.iva = 0;
            }
        },

        async executeCargarIva() {
            const response = await this.cargarIva();
            this.datosGenerales.listaIva = response.data.dataResponse;
        },
        async cargarIva(){
            const promise = axios.get(`${this.dom.server}/producto/cargarIva`);
            return  promise.then((response) => response);

        },
        // FIN CARGAR IVA

        // SANTIAGO CAMPUZANO MOSTRAR ICE

        async executeCargarSelectIce(){
            if (this.dataProducto.iceProServ == false) {
                this.dom.selectIce = false;
                this.dataProducto.idIceProServ = '';
            }
            if (this.dataProducto.iceProServ == true) {
                this.dom.selectIce = true;
                this.dataProducto.idIceProServ = '';
            }
    },

    // FIN MOSTRAR ICE

        // SANTIAGO CAMPUZANO CARGAR DATOS PROSERV

        async executecargarDataProServ(idProducto) {
            const response = await this.cargarDataProServ(idProducto);
            datos = response.data.dataResponse[0];

            if (response.data.success) {

                if (datos.ICE == 'SI') {
                    this.dataProducto.iceProServ = true;
                } else {
                    this.dataProducto.iceProServ = false;
                }
                if (datos.IRBPN == 'SI') {
                    this.dataProducto.irbpn = true;
                } else {
                    this.dataProducto.irbpn = false;
                }

                this.executeCargarSelectIce();
                this.verFormulario();
                    this.dataProducto.idProducto = datos.ID_PROD_SERV,
                    this.dataProducto.tipoProServ = datos.TIPO_PROD_SERV,
                    this.dataProducto.codigoPrincipal = datos.CODIGO_PRINCIPAL,
                    this.dataProducto.nombreProServ = datos.NOMBRE_PROD_SERV,
                    this.dataProducto.valorProServ = datos.VALOR,
                    this.dataProducto.ivaProServ = datos.IVA,
                    this.dataProducto.idIceProServ = datos.ID_ICE,
                    this.dataProducto.estado = datos.ESTADO,
                    this.dataProducto.informacionAdicional = datos.INFO_ADICIONAL,

                    this.dataProducto.idCategoria = datos.ID_CATEGORIA,
                    this.dataProducto.codigoBarras = datos.CODIGO_BARRAS,
                    this.dataProducto.idMarca = datos.ID_MARCA,
                    this.dataProducto.idModelo = datos.ID_MODELO,
                    this.dataProducto.valorIvaProServ = datos.VALOR_IVA,
                    this.dataProducto.informacionAdicional = datos.INFO_ADICIONAL
            }

        },

        async cargarDataProServ(idProducto) {

            const promise = axios.get(`${this.dom.server}/producto/cargarDataProServ/${idProducto}`);
            respuesta = promise.then((response) => response);
            return respuesta;
        },

        // FIN CARGAR DATOS PROSERV

        // SANTIAGO CAMPUZANO CARGAR LISTA PRODUCTOSERVICIO
        async executeListarProServ() {
            const response = await this.cargarListado();
            this.datosGenerales.listaProServ = response.data.dataResponse;
        },
        async cargarListado() {
            const promise = axios.get(`${this.dom.server}/producto/listar`, this.headers);
            respuesta = promise.then((response) => response);
            return respuesta;
        },
        // FIN CARGAR LISTA PRODUCTOSERVICIO

        // SANTIAGO CAMPUZANO SAVEORUPDATE
        async validarCreacionEdicionProducto() {

            const validacion = await this.validarProServ();

            if (validacion) {
                if (!this.dataProducto.idProducto) {
                    this.executeCrearProServ();
                } else {
                    this.executeActualizarProServ();
                }
            }

        },

                // ***SAVE***
        async executeCrearProServ() {

            // bloqueo formulario
            var idFormulario = document.querySelector("#viewFormulario");
            var blockUI = new KTBlockUI(idFormulario, {
                message: '<div class="blockui-message"><span class="spinner-border text-primary"></span>Procesando...</div>',
                overlayClass: 'bg-dark bg-opacity-25',
            });
            blockUI.block();

                //bloqueo Fromulario
            const response = await this.crearProServ();
            if (response.data.success) {
                this.mensajeSweetAlertExito(response.data.mensaje);
                this.executeListarProServ();
                this.ocultarFormulario();

                blockUI.release();
                blockUI.destroy();
            } else {


                this.mensajeSweetAlertError(response.data.mensaje);
                blockUI.release();
                blockUI.destroy();
            }
        },

        async crearProServ() {
            let body = { dataProducto: this.dataProducto, idEmpresa: this.datosGenerales.idEmpresa }
            const promise = axios.post(`${this.dom.server}/producto/crearProServ`, body, this.headers);
            respuesta = promise.then((response) => response);
            return respuesta;
        },
                // ***FIN SAVE**

                // *** UPDATE ***
        async executeActualizarProServ() {

            var idFormulario = document.querySelector("#viewFormulario");
            var blockUI = new KTBlockUI(idFormulario, {
                message: '<div class="blockui-message"><span class="spinner-border text-primary"></span> Procesando...</div>',
                        overlayClass: 'bg-dark bg-opacity-25',
            });
            blockUI.block();

            const response = await this.actualizarProServ();
            if (response.data.success) {
                this.executeListarProServ();
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

        async actualizarProServ() {
            let body = { dataProducto: this.dataProducto, idEmpresa: this.datosGenerales.idEmpresa }
            const promise = axios.put(`${this.dom.server}/producto/actualizarProServ`, body, this.headers);
            respuesta = promise.then((response) => response);
            return respuesta;
        },

                // *** FIN UPDATE ***

        // FIN SAVEORUPDATE

        // SANTIAGO CAMPUZANO ELIMINAR
        async confirmacionEliminarProServ(idProducto, nombre) {

            Swal.fire({
                html: ' ¿ Está seguro que desea eliminar el Plan <span class="badge badge-success"> ' + nombre + '</span>   de forma permanete ?',
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
                    this.executeEliminarProServ(idProducto);


                } else {

                }
            })


        },

        async executeEliminarProServ(idProducto) {

            var idFormulario = document.querySelector("#viewFormulario");
            var blockUI = new KTBlockUI(idFormulario, {
                message: '<div class="blockui-message"><span class="spinner-border text-primary"></span>Procesando...</div>',
                overlayClass: 'bg-dark bg-opacity-25',
            });
            blockUI.block();

            const response = await this.eliminarProServ(idProducto);

            if (response.data.success) {
                this.executeListarProServ();
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

        async eliminarProServ(idProducto) {

            const promise = axios.get(`${this.dom.server}/producto/eliminarProServ/${idProducto}`);
            respuesta = promise.then((response) => response);
            return respuesta;
        },

        // FIN ELIMINAR

        // SANTIAGO CAMPUZANO FUNCION TECLA ENTER
        validarBusquedaEnter: function(e){
            if (e.keyCode === 13) {
                this.validarBusquedaProServ();
            }
        },

        // FIN FUNCION TECLA ENTER

        // SANTIAGO CAMPUZANO BUSQUEDA FILTROS

        async validarBusquedaProServ() {
            if (this.datosBusqueda.nombreProServ != '' || this.datosBusqueda.codigoPrincipal != ''
            || this.datosBusqueda.tipoProServ != '' || this.datosBusqueda.estado != '') {
                this.executeCargarListadoFiltro();
            } else if(this.datosBusqueda.nombreProServ == ''){
                mensaje="Debe seleccionar un friltro de busqueda.";
                this.mensajeToastError(mensaje);
                this.executeCargarListadoFiltro();
            }
        },

        async executeCargarListadoFiltro() {

            // bloqueo formulario
            var idListado = document.querySelector("#divMostrarListado");
            var blockUI = new KTBlockUI(idListado, {
                message: '<div class="blockui-message"><span class="spinner-border text-primary"></span>Procesando...</div>',
                overlayClass: 'bg-dark bg-opacity-25',
            });
            blockUI.block();

            const response = await this.cargarListadoFiltro();
            this.datosGenerales.listaProServ = response.data.dataResponse;

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
                nombreProServ: this.datosBusqueda.nombreProServ,
                codigoPrincipal: this.datosBusqueda.codigoPrincipal,
                estado: this.datosBusqueda.estado,
                tipoProServ: this.datosBusqueda.tipoProServ};
            const promise = axios.post(`${this.dom.server}/producto/listarFiltros`, body, this.headers);
            respuesta = promise.then((response) => response);
            return respuesta;
        },

        // FIN BUSQUEDA FILTROS

        // anular productoservicio estado
        async confirmacionAnularProServ(idProducto, nombre) {

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
                    this.executeAnularProServ(idProducto);
                }
            })


        },


        async executeAnularProServ(idProducto) {

            var listado = document.querySelector("#divMostrarListado");
            var blockUI = new KTBlockUI(listado, {
                message: '<div class="blockui-message"><span class="spinner-border text-primary"></span>Cambiando Estado...</div>',
                overlayClass: 'bg-dark bg-opacity-25',
            });
            blockUI.block();

            const response = await this.anularProServ(idProducto);

            if (response.data.success) {
                this.executeListarProServ();
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

        async anularProServ(idProducto) {
            const promise = axios.get(`${this.dom.server}/producto/anularProServ/${idProducto}`);
            respuesta = promise.then((response) => response);
            return respuesta;
        },
        // fin anular productoservicio estado

        // activar productoservicio estado
        async confirmacionActivarProServ(idProducto, nombre) {

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
                    this.executeActivarProServ(idProducto);
                }
            })

        },


        async executeActivarProServ(idProducto) {

            var listado = document.querySelector("#divMostrarListado");
            var blockUI = new KTBlockUI(listado, {
                message: '<div class="blockui-message"><span class="spinner-border text-primary"></span>Cambiando Estado...</div>',
                overlayClass: 'bg-dark bg-opacity-25',
            });
            blockUI.block();

            const response = await this.activarProServ(idProducto);

            if (response.data.success) {
                this.executeListarProServ();
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

        async activarProServ(idProducto) {
            const promise = axios.get(`${this.dom.server}/producto/activarProServ/${idProducto}`);
            respuesta = promise.then((response) => response);
            return respuesta;
        },
        // fin activar productoservicio estado


// SANTIAGO CAMPUZANO VALIDACION DE FORMULARIO
async validarProServ(){
                const form = document.getElementById("formProServ");
                $(".fv-plugins-message-container").remove();

                var validator = FormValidation.formValidation(form, {
                    fields: {
                        tipoProServ: {
                            validators: { notEmpty: { message: "Tipo de Producto o Servicio Requerido." } },
                        },
                        categoriaProServ: {
                            validators: { notEmpty: { message: "La Categoria es Requerida." } },
                        },
                        codigoPrincipal: {
                            validators: { notEmpty: { message: "Código Principal Requerido." } },
                        },
                        codigoBarras: {
                            validators: { notEmpty: { message: "Código de Barras Requerido." } },
                        },
                        nombreProServ: {
                            validators: { notEmpty: { message: "Nombre del producto o Servicio Requerido." } },
                        },
                        valorProServ: {
                            validators: { notEmpty: { message: "Valor del Producto o Servicio Requerido." } },
                        },
                        iva: {
                            validators: { notEmpty: { message: "IVA del Producto o Servicio Requerido." } },
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

            // PRUEBAS
            restrictDecimal () {
                this.dataProducto.valorProServ=this.dataProducto.valorProServ.match(/^\d+\.?\d{0,2}/);
            },
            restrictDecimalIva () {

                this.dataProducto.valorIvaProServ=this.dataProducto.valorIvaProServ.match(/^\d+\.?\d{0,2}/);
            },

        // FIN PRUEBAS

        // FIN VALIDACION DE FORMULARIO

        // SANTIAGO CAMPUZANO CACULO DEL VALOR CON IVA
        async calcularIVA() {
            let auxIva = (this.dataProducto.valorProServ * this.dataProducto.iva) /100;
            let auxTotalIva = parseFloat(this.dataProducto.valorProServ) + parseFloat(auxIva)
            if (isNaN(auxTotalIva)) {
                this.dataProducto.valorIvaProServ= 0;
            } else{
                this.dataProducto.valorIvaProServ= parseFloat(auxTotalIva);
            }

        },
        // FIN CACULO DEL VALOR CON IVA

        // SANTIAGO CAMPUZANO CARGAR CATEGORIAS
        async executeCargarCategoria() {
            const response = await this.cargarCategoria();
            this.datosGenerales.categorias = response.data.dataResponse;

             },
        async cargarCategoria(){
            const promise = axios.get(`${this.dom.server}/producto/cargarCategoria`);
            return  promise.then((response) => response);

        },
        // FIN CARGAR CATEGORIAS

        // SANTIAGO CAMPUZANO SAVE CATEGORIAS
        async validarCreacionCategorias() {

            const validacion = await this.validarCategoria();

            if (validacion) {

                    this.executeCrearCategoria();
            }

        },

        async validarCategoria(){

            const form = document.getElementById("formCategoria");
            $(".fv-plugins-message-container").remove();

            var validator = FormValidation.formValidation(form, {
                fields: {
                    nombreCategoria: {
                        validators: { notEmpty: { message: "El Nombre de la Categoria es requerido." } },
                    },
                    prefijoCategoria: {
                        validators: { notEmpty: { message: "El Prefijo de la Categoria es requerido." } },
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
        async executeCrearCategoria() {

            // bloqueo formulario
            var idFormulario = document.querySelector("#viewFormularioCategoria");
            var blockUI = new KTBlockUI(idFormulario, {
                message: '<div class="blockui-message"><span class="spinner-border text-primary"></span>Procesando...</div>',
                overlayClass: 'bg-dark bg-opacity-25',
            });
            blockUI.block();

                //bloqueo Fromulario
            const response = await this.crearCategoria();
            if (response.data.success) {
                this.mensajeSweetAlertExito(response.data.mensaje);
                this.executeCargarCategoria();

                blockUI.release();
                blockUI.destroy();
            } else {


                this.mensajeSweetAlertError(response.data.mensaje);
                blockUI.release();
                blockUI.destroy();
            }
        },

        async crearCategoria() {
            let body = { dataCategoria: this.dataCategoria, idEmpresa: this.datosGenerales.idEmpresa }
            const promise = axios.post(`${this.dom.server}/producto/crearCategoria`, body, this.headers);
            respuesta = promise.then((response) => response);
            return respuesta;
        },
                // ***FIN SAVE**

        // FIN SAVE CATEGORIAS

         // SANTIAGO CAMPUZANO CARGAR MARCAS
         async executeCargarMarca() {
            const response = await this.cargarMarca();
            this.datosGenerales.marcas = response.data.dataResponse;
             },

        async cargarMarca(){
            const promise = axios.get(`${this.dom.server}/producto/cargarMarca`, this.headers);
            return  promise.then((response) => response);

        },
        // FIN CARGAR CATEGORIAS

        // SANTIAGO CAMPUZANO CARGAR LISTA MARCA
        async executeListarMarca() {
            const response = await this.listarMarca();
            this.datosGenerales.listaMarcas = response.data.dataResponse;
        },
        async listarMarca() {
            const promise = axios.get(`${this.dom.server}/producto/listarMarca`, this.headers);
            respuesta = promise.then((response) => response);
            return respuesta;
        },
        // FIN CARGAR LISTA MARCA

        // SANTIAGO CAMPUZANO SAVEORUPDATE MARCA
        async validarCreacionEdicionMarca() {

            const validacion = await this.validarMarca();

            if (validacion) {
                if (!this.dataMarca.idMarca) {
                    this.executeCrearMarca();
                } else {
                    this.executeActualizarMarca();
                }
            }

        },

        async validarMarca(){

            const form = document.getElementById("formMarca");
            $(".fv-plugins-message-container").remove();

            var validator = FormValidation.formValidation(form, {
                fields: {
                    nombreMarca: {
                        validators: { notEmpty: { message: "El Nombre de la Marca es requerido." } },
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
        async executeCrearMarca() {

            // bloqueo formulario
            var idFormulario = document.querySelector("#viewFormularioMarca");
            var blockUI = new KTBlockUI(idFormulario, {
                message: '<div class="blockui-message"><span class="spinner-border text-primary"></span>Procesando...</div>',
                overlayClass: 'bg-dark bg-opacity-25',
            });
            blockUI.block();

                //bloqueo Fromulario
            const response = await this.crearMarca();
            if (response.data.success) {
                this.mensajeSweetAlertExito(response.data.mensaje);
                this.executeListarMarca();
                this.executeCargarMarca();

                blockUI.release();
                blockUI.destroy();
            } else {


                this.mensajeSweetAlertError(response.data.mensaje);
                blockUI.release();
                blockUI.destroy();
            }
        },

        async crearMarca() {
            let body = { dataMarca: this.dataMarca, idEmpresa: this.datosGenerales.idEmpresa }
            const promise = axios.post(`${this.dom.server}/producto/crearMarca`, body, this.headers);
            respuesta = promise.then((response) => response);
            return respuesta;
        },
                // ***FIN SAVE**

                // *** UPDATE ***

        // SANTIAGO CAMPUZANO CARGAR DATOS MARCA

        async executecargarDataMarca(idMarca) {
            const response = await this.cargarDataMarca(idMarca);
            datos = response.data.dataResponse[0];

            if (response.data.success) {

                this.executeCargarSelectIce();
                this.verFormulario();
                    this.dataMarca.idMarca = datos.ID_MARCA,
                    this.dataMarca.nombreMarca = datos.MARCA
            }

        },

        async cargarDataMarca(idMarca) {

            const promise = axios.get(`${this.dom.server}/producto/cargarDataMarca/${idMarca}`);
            respuesta = promise.then((response) => response);
            return respuesta;
        },

        // FIN CARGAR DATOS MARCA

        async executeActualizarMarca() {

            var idFormulario = document.querySelector("#viewFormularioMarca");
            var blockUI = new KTBlockUI(idFormulario, {
                message: '<div class="blockui-message"><span class="spinner-border text-primary"></span> Procesando...</div>',
                        overlayClass: 'bg-dark bg-opacity-25',
            });
            blockUI.block();

            const response = await this.actualizarMarca();
            if (response.data.success) {
                this.executeListarMarca();
                this.executeCargarMarca();
                this.mensajeSweetAlertExito(response.data.mensaje);

                blockUI.release();
                blockUI.destroy();

            } else {
                this.mensajeSweetAlertError(response.data.mensaje);

                blockUI.release();
                blockUI.destroy();

            }
        },

        async actualizarMarca() {
            let body = { dataMarca: this.dataMarca, idEmpresa: this.datosGenerales.idEmpresa }
            const promise = axios.put(`${this.dom.server}/producto/actualizarMarca`, body);
            respuesta = promise.then((response) => response);
            return respuesta;
        },

                // *** FIN UPDATE ***

        // FIN SAVEORUPDATE MARCA

        // SANTIAGO CAMPUZANO ELIMINAR MARCA
        async confirmacionEliminarMarca(idMarca, nombre) {

            Swal.fire({
                html: ' ¿ Está seguro que desea eliminar la Marca <span class="badge badge-success"> ' + nombre + '</span>   de forma permanete ?',
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
                    this.executeEliminarMarca(idMarca);


                } else {

                }
            })


        },

        async executeEliminarMarca(idMarca) {

            var idFormulario = document.querySelector("#viewFormularioM");
            var blockUI = new KTBlockUI(idFormulario, {
                message: '<div class="blockui-message"><span class="spinner-border text-primary"></span>Procesando...</div>',
                overlayClass: 'bg-dark bg-opacity-25',
            });
            blockUI.block();

            const response = await this.eliminarMarca(idMarca);

            if (response.data.success) {
                this.executeListarMarca();
                this.executeCargarMarca();
                this.mensajeSweetAlertExito(response.data.mensaje);
                blockUI.release();
                blockUI.destroy();
            } else {

                this.mensajeSweetAlertError(response.data.mensaje);
                blockUI.release();
                blockUI.destroy();


            }

        },

        async eliminarMarca(idMarca) {

            const promise = axios.get(`${this.dom.server}/producto/eliminarMarca/${idMarca}`);
            respuesta = promise.then((response) => response);
            return respuesta;
        },

        // FIN ELIMINAR MARCA

        // SANTIAGO CAMPUZANO CARGAR MODELOS
        async executeCargarModelo() {
            const response = await this.cargarModelo();
            this.datosGenerales.modelos = response.data.dataResponse;

             },
        async cargarModelo(){
            const promise = axios.get(`${this.dom.server}/producto/cargarModelo/${this.dataProducto.idMarca}`);
            return  promise.then((response) => response);

        },
        // FIN CARGAR MODELOS

        // SANTIAGO CAMPUZANO CARGAR LISTA MODELOS
        async executeListarModelo() {
            const response = await this.listarModelo();
            this.datosGenerales.listaModelos = response.data.dataResponse;
        },
        async listarModelo() {
            const promise = axios.get(`${this.dom.server}/producto/listarModelo/${this.dataProducto.idMarca}`);
            respuesta = promise.then((response) => response);
            return respuesta;
        },
        // FIN CARGAR LISTA MODELOS

        // SANTIAGO CAMPUZANO SAVEORUPDATE MODELO
        async validarCreacionEdicionModelo() {

            const validacion = await this.validarModelo();

            if (validacion) {
                if (!this.dataModelo.idModelo) {
                    this.executeCrearModelo();
                } else {
                    this.executeActualizarModelo();
                }
            }

        },

        async validarModelo(){

            const form = document.getElementById("formModelo");
            $(".fv-plugins-message-container").remove();

            if (this.dataProducto.idMarca == '') {
                mensaje = 'Seleccione una marca o registre una nueva';
                this.mensajeToastError(mensaje);
            }

            var validator = FormValidation.formValidation(form, {
                fields: {
                    nombreModelo: {
                        validators: { notEmpty: { message: "El Nombre del Modelo es requerido." } },
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
        async executeCrearModelo() {

            // bloqueo formulario
            var idFormulario = document.querySelector("#viewFormularioModelo");
            var blockUI = new KTBlockUI(idFormulario, {
                message: '<div class="blockui-message"><span class="spinner-border text-primary"></span>Procesando...</div>',
                overlayClass: 'bg-dark bg-opacity-25',
            });
            blockUI.block();

                //bloqueo Fromulario
            const response = await this.crearModelo();
            if (response.data.success) {
                this.mensajeSweetAlertExito(response.data.mensaje);
                this.executeListarModelo();
                this.executeCargarModelo();

                blockUI.release();
                blockUI.destroy();
            } else {


                this.mensajeSweetAlertError(response.data.mensaje);
                blockUI.release();
                blockUI.destroy();
            }
        },

        async crearModelo() {
            let body = { dataModelo: this.dataModelo}
            const promise = axios.post(`${this.dom.server}/producto/crearModelo`, body);
            respuesta = promise.then((response) => response);
            return respuesta;
        },
                // ***FIN SAVE**

                // *** UPDATE ***

        // SANTIAGO CAMPUZANO CARGAR DATOS MODELO

        async executecargarDataModelo(idModelo) {
            const response = await this.cargarDataModelo(idModelo);
            datos = response.data.dataResponse[0];

            if (response.data.success) {

                    this.dataModelo.idModelo = datos.ID_MODELO,
                    this.dataModelo.nombreModelo = datos.MODELO
            }

        },

        async cargarDataModelo(idModelo) {

            const promise = axios.get(`${this.dom.server}/producto/cargarDataModelo/${idModelo}`);
            respuesta = promise.then((response) => response);
            return respuesta;
        },

        // FIN CARGAR DATOS MODELO

        async executeActualizarModelo() {

            var idFormulario = document.querySelector("#viewFormularioModelo");
            var blockUI = new KTBlockUI(idFormulario, {
                message: '<div class="blockui-message"><span class="spinner-border text-primary"></span> Procesando...</div>',
                        overlayClass: 'bg-dark bg-opacity-25',
            });
            blockUI.block();

            const response = await this.actualizarModelo();
            if (response.data.success) {
                this.executeListarModelo();
                this.executeCargarModelo();
                this.mensajeSweetAlertExito(response.data.mensaje);

                blockUI.release();
                blockUI.destroy();

            } else {
                this.mensajeSweetAlertError(response.data.mensaje);

                blockUI.release();
                blockUI.destroy();

            }
        },

        async actualizarModelo() {
            let body = { dataModelo: this.dataModelo}
            const promise = axios.put(`${this.dom.server}/producto/actualizarModelo`, body);
            respuesta = promise.then((response) => response);
            return respuesta;
        },

                // *** FIN UPDATE ***

        // FIN SAVEORUPDATE MODELO

        // SANTIAGO CAMPUZANO ELIMINAR MODELO
        async confirmacionEliminarModelo(idModelo, nombre) {

            Swal.fire({
                html: ' ¿ Está seguro que desea eliminar el model <span class="badge badge-success"> ' + nombre + '</span>   de forma permanete ?',
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
                    this.executeEliminarModelo(idModelo);


                } else {

                }
            })


        },

        async executeEliminarModelo(idModelo) {

            var idFormulario = document.querySelector("#viewFormularioModelo");
            var blockUI = new KTBlockUI(idFormulario, {
                message: '<div class="blockui-message"><span class="spinner-border text-primary"></span>Procesando...</div>',
                overlayClass: 'bg-dark bg-opacity-25',
            });
            blockUI.block();

            const response = await this.eliminarModelo(idModelo);

            if (response.data.success) {
                this.executeListarModelo();
                this.executeCargarModelo();
                this.mensajeSweetAlertExito(response.data.mensaje);
                blockUI.release();
                blockUI.destroy();
            } else {

                this.mensajeSweetAlertError(response.data.mensaje);
                blockUI.release();
                blockUI.destroy();


            }

        },

        async eliminarModelo(idModelo) {

            const promise = axios.get(`${this.dom.server}/producto/eliminarModelo/${idModelo}`);
            respuesta = promise.then((response) => response);
            return respuesta;
        },

        // FIN ELIMINAR MODELO

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
}).mount('#ViewProductos');
