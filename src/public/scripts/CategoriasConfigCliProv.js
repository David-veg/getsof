var app = Vue.createApp({
    name: 'pdf',
    data() {
        return {

            datosGenerales: {
                idEmpresa: 3,
                idUsuario: "",
                idSession: "",
                token: "",
                tipoCuenta: false,
                listadoCategoriasCli: false,
                listadoCategoriasProv: false
            },

            dataCategoriaCli: {
                idCategoriaCli: "",
                categoriaCli: "",
                movimientoCli: true,
                idTipoCuentaCli: ""
            },

            dataCategoriaProv: {
                idCategoriaProv: "",
                categoriaProv: "",
                movimientoProv: true,
                idTipoCuentaProv: "",

            },

            dataBusquedaCli: {
                busquedaCategoriaCli: "",
                busquedaEstadoCategoriaCli: ""
            },

            dataBusquedaProv: {
                busquedaCategoriaProv: "",
                busquedaEstadoCategoriaProv: ""
            },

            dom:{
                // varios
                nombreBotonRegistrar: "Registrar",
                nombreBotonEditar: "Actualizar",

                // cliente
                mostrarBtnsCli: true,
                mostrarBusquedaCli: false,
                mostrarFormularioCli: false,
                mostrarListadoCli: true,

                // proveedor
                mostrarBtnsProv: true,
                mostrarBusquedaProv: false,
                mostrarFormularioProv: false,
                mostrarListadoProv: true,

                server: false
            },
            headers: {
                headers: {
                    token: ""
                }
            }

        }

    },

    updated(){

        this.dataCategoriaCli.categoriaCli = this.dataCategoriaCli.categoriaCli.toUpperCase();
        this.dataCategoriaProv.categoriaProv = this.dataCategoriaProv.categoriaProv.toUpperCase();
        this.dataBusquedaCli.busquedaCategoriaCli = this.dataBusquedaCli.busquedaCategoriaCli.toUpperCase();
        this.dataBusquedaProv.busquedaCategoriaProv = this.dataBusquedaProv.busquedaCategoriaProv.toUpperCase();

    },

    mounted() {
        this.montarToken();
        this.executeCargarListadoCategoriasCli(); // carga listado al cargar la pagina
        this.executeCargarListadoCategoriasProv(); // carga listado al cargar la pagina
    },

    methods: {
        async montarToken() {
            const tk = document.getElementById('mydiv').dataset.test
            this.headers.headers.token = tk;
            const server = document.getElementById('mydivServ').dataset.test
            this.dom.server = server;
        },
        async verFormularioGeneral(){
            this.executeCargarListadoCuentas();
            this.limpiarFormularioCli();
            this.limpiarFormularioProv();

            // cliente
            this.dom.mostrarBtnsCli= true,
            this.dom.mostrarBusquedaCli= false,
            this.dom.mostrarFormularioCli= false,
            this.dom.mostrarListadoCli= true,

            // proveedor
            this.dom.mostrarBtnsProv= true,
            this.dom.mostrarBusquedaProv= false,
            this.dom.mostrarFormularioProv= false,
            this.dom.mostrarListadoProv= true
        },

        async verFormularioCli(){
            this.executeCargarListadoCuentas();

            this.dom.mostrarBtnsCli= false,
            this.dom.mostrarBusquedaCli=false,
            this.dom.mostrarFormularioCli= true,
            this.dom.mostrarListadoCli = false
        },

        async verFormularioProv(){
            this.executeCargarListadoCuentas();

            this.dom.mostrarBtnsProv= false,
            this.dom.mostrarBusquedaProv=false,
            this.dom.mostrarFormularioProv= true,
            this.dom.mostrarListadoProv = false
        },

        async ocultarFormularioCli() {
            this.limpiarFormularioCli();
            this.dom.mostrarBtnsCli= true,
            this.dom.mostrarBusquedaCli=false,
            this.dom.mostrarFormularioCli= false,
            this.dom.mostrarListadoCli = true
        },

        async ocultarFormularioProv() {
            this.limpiarFormularioProv();
            this.dom.mostrarBtnsProv= true,
            this.dom.mostrarBusquedaProv=false,
            this.dom.mostrarFormularioProv= false,
            this.dom.mostrarListadoProv = true
        },

        async limpiarFormularioCli() {
            this.dataCategoriaCli.idCategoriaCli= "",
            this.dataCategoriaCli.categoriaCli= "",
            this.dataCategoriaCli.movimientoCli= true,
            this.dataCategoriaCli.idTipoCuentaCli = ""
        },

        async limpiarFormularioProv() {
            this.dataCategoriaProv.idCategoriaProv= "",
            this.dataCategoriaProv.categoriaProv= "",
            this.dataCategoriaProv.movimientoProv= true,
            this.dataCategoriaProv.idTipoCuentaProv = ""
        },

        async verFiltroCli(){
            this.dom.mostrarBtnsCli= false,
            this.dom.mostrarBusquedaCli=true,
            this.dom.mostrarFormularioCli= false,
            this.dom.mostrarListadoCli = true
        },

        async verFiltroProv(){
            this.dom.mostrarBtnsProv= false,
            this.dom.mostrarBusquedaProv=true,
            this.dom.mostrarFormularioProv= false,
            this.dom.mostrarListadoProv = true
        },

        async ocultarFiltroCli(){
            this.limpiarFiltroCli();
            this.executeCargarListadoCategoriasCli();
            this.dom.mostrarBtnsCli= true,
            this.dom.mostrarBusquedaCli=false,
            this.dom.mostrarFormularioCli= false,
            this.dom.mostrarListadoCli = true
        },

        async ocultarFiltroProv(){
            this.limpiarFiltroProv();
            this.executeCargarListadoCategoriasProv();
            this.dom.mostrarBtnsProv= true,
            this.dom.mostrarBusquedaProv=false,
            this.dom.mostrarFormularioProv= false,
            this.dom.mostrarListadoProv = true
        },

        async limpiarFiltroCli(){
            this.dataBusquedaCli.busquedaCategoriaCli= "",
            this.dataBusquedaCli.busquedaEstadoCategoriaCli= ""
        },

        async limpiarFiltroProv(){
            this.dataBusquedaProv.busquedaCategoriaProv= "",
            this.dataBusquedaProv.busquedaEstadoCategoriaProv= ""
        },

        async limpiarFiltroEstadoCli(){
            this.dataBusquedaCli.busquedaEstadoCategoriaCli= ""
        },

        async limpiarFiltroEstadoProv(){
            this.dataBusquedaProv.busquedaEstadoCategoriaProv= ""
        },

        // SANTIAGO CAMPUZANO CARGAR LISTA CUENTAS
        async executeCargarListadoCuentas(){
            const response = await this.cargarTipoCuenta();
            this.datosGenerales.tipoCuenta = response.data.dataResponse;
        },

        async cargarTipoCuenta(){
            const promise = axios.get(`${this.dom.server}/CategoriasConfigCliProv/cargarTipoCuenta`);
            return promise.then((response) => response);
        },
        // FIN CARGAR LISTA CUENTAS

        // SANTIAGO CAMPUZANO CARGAR LISTA CATEGORIASCLI
        async executeCargarListadoCategoriasCli() {
            const response = await this.cargarListadoCategoriasCli();
            this.datosGenerales.listadoCategoriasCli = response.data.dataResponse;
        },

        async cargarListadoCategoriasCli() {
            const promise = axios.get(`${this.dom.server}/CategoriasConfigCliProv/listarCategoriaCli`, this.headers);
            respuesta = promise.then((response) => response);
            return respuesta;
        },

        // FIN CARGAR LISTA CATEGORIASCLI

        // SANTIAGO CAMPUZANO CARGAR LISTA CATEGORIASPROV
        async executeCargarListadoCategoriasProv() {
            const response = await this.cargarListadoCategoriasProv();
            this.datosGenerales.listadoCategoriasProv = response.data.dataResponse;
        },

        async cargarListadoCategoriasProv() {
            const promise = axios.get(`${this.dom.server}/CategoriasConfigCliProv/listarCategoriaProv`, this.headers);
            respuesta = promise.then((response) => response);
            return respuesta;
        },

        // FIN CARGAR LISTA CATEGORIASPROV

        // SANTIAGO CAMPUZANO CARGAR DATOS CATEGORIACLI

        async executecargarDataCategoriaCli(idCategoriaCli) {
            const response = await this.cargarDataCategoriaCli(idCategoriaCli);
            datos = response.data.dataResponse[0];


            if (response.data.success) {
                if (datos.MOVIMIENTO == 'SI') {
                    this.dataCategoriaCli.movimientoCli = true
                } else {
                    this.dataCategoriaCli.movimientoCli = false
                }
                this.verFormularioCli();
                this.dataCategoriaCli.idCategoriaCli = datos.ID_CATEGORIA,
                    this.dataCategoriaCli.categoriaCli = datos.CATEGORIA,
                    this.dataCategoriaCli.idTipoCuentaCli = datos.ID_CTA_CONTABLE

            }

        },

        async cargarDataCategoriaCli(idCategoriaCli) {

            const promise = axios.get(`${this.dom.server}/CategoriasConfigCliProv/cargarDataCategoriaCli/${idCategoriaCli}`);
            respuesta = promise.then((response) => response);
            return respuesta;
        },

        // FIN CARGAR DATOS CATEGORIACLI

        // SANTIAGO CAMPUZANO CARGAR DATOS CATEGORIAPROV

        async executecargarDataCategoriaProv(idCategoriaProv) {
            const response = await this.cargarDataCategoriaProv(idCategoriaProv);
            datos = response.data.dataResponse[0];

            if (response.data.success) {
                if (datos.MOVIMIENTO == 'SI') {
                    this.dataCategoriaProv.movimientoProv = true
                } else {
                    this.dataCategoriaProv.movimientoProv = false
                }
                this.verFormularioProv();
                this.dataCategoriaProv.idCategoriaProv = datos.ID_CATEGORIA,
                    this.dataCategoriaProv.categoriaProv = datos.CATEGORIA,
                    this.dataCategoriaProv.idTipoCuentaProv = datos.ID_CTA_CONTABLE
            }

        },

        async cargarDataCategoriaProv(idCategoriaProv) {

            const promise = axios.get(`${this.dom.server}/CategoriasConfigCliProv/cargarDataCategoriaProv/${idCategoriaProv}`);
            respuesta = promise.then((response) => response);
            return respuesta;
        },

        // FIN CARGAR DATOS CATEGORIAPROV

        // SANTIAGO CAMPUZANO SAVEORUPDATE

        // SANTIAGO CAMPUZANO CATEGORIACLI
        async validarCreacionEdicionCategoriaCli() {

            const validacion = await this.validarCategoriaCli();

            if (validacion) {
                if (!this.dataCategoriaCli.idCategoriaCli) {
                    this.executeCrearCategoriaCli();
                } else {
                    this.executeActualizarCategoriaCli();
                }
            }

        },

                // ***SAVE***
        async executeCrearCategoriaCli() {

            // bloqueo formulario
            var idFormulario = document.querySelector("#viewFormularioCli");
            var blockUI = new KTBlockUI(idFormulario, {
                message: '<div class="blockui-message"><span class="spinner-border text-primary"></span>Procesando...</div>',
                overlayClass: 'bg-dark bg-opacity-25',
            });
            blockUI.block();

                //bloqueo Fromulario
            const response = await this.crearCategoriaCli();
            if (response.data.success) {
                this.mensajeSweetAlertExito(response.data.mensaje);
                this.executeCargarListadoCategoriasCli();
                this.executeCargarListadoCategoriasProv();
                this.ocultarFormularioCli();
                this.ocultarFormularioProv();

                blockUI.release();
                blockUI.destroy();
            } else {


                this.mensajeSweetAlertError(response.data.mensaje);
                blockUI.release();
                blockUI.destroy();
            }
        },

        async crearCategoriaCli() {

            if (this.dataCategoriaCli.movimientoCli == true) {
                auxMovimientoCli = 'SI';
            } else {
                auxMovimientoCli = 'NO';
            }

            let body = { dataCategoriaCli: this.dataCategoriaCli, auxMovimientoCli }
            const promise = axios.post(`${this.dom.server}/CategoriasConfigCliProv/crearCategoriaCli`, body, this.headers);
            respuesta = promise.then((response) => response);
            return respuesta;
        },
                // ***FIN SAVE**

                // *** UPDATE ***
        async executeActualizarCategoriaCli() {

            var idFormulario = document.querySelector("#viewFormularioCli");
            var blockUI = new KTBlockUI(idFormulario, {
                message: '<div class="blockui-message"><span class="spinner-border text-primary"></span> Procesando...</div>',
                        overlayClass: 'bg-dark bg-opacity-25',
            });
            blockUI.block();

            const response = await this.actualizarCategoriaCli();
            if (response.data.success) {
                this.executeCargarListadoCategoriasCli();
                this.executeCargarListadoCategoriasProv();
                this.ocultarFormularioCli();
                this.ocultarFormularioProv();
                this.mensajeSweetAlertExito(response.data.mensaje);

                blockUI.release();
                blockUI.destroy();

            } else {
                this.mensajeSweetAlertError(response.data.mensaje);

                blockUI.release();
                blockUI.destroy();

            }


        },

        async actualizarCategoriaCli() {

            if (this.dataCategoriaCli.movimientoCli == true) {
                auxMovimientoCli = 'SI';
            } else {
                auxMovimientoCli = 'NO';
            }

            let body = { dataCategoriaCli: this.dataCategoriaCli, auxMovimientoCli }
            const promise = axios.put(`${this.dom.server}/CategoriasConfigCliProv/actualizarCategoriaCli`, body, this.headers);
            respuesta = promise.then((response) => response);
            return respuesta;
        },

                // *** FIN UPDATE ***
        // FIN CATEGORIACLI

        // SANTIAGO CAMPUZANO CATEGORIAPROV
        async validarCreacionEdicionCategoriaProv() {

            const validacion = await this.validarCategoriaProv();

            if (validacion) {
                if (!this.dataCategoriaProv.idCategoriaProv) {
                    this.executeCrearCategoriaProv();
                } else {
                    this.executeActualizarCategoriaProv();
                }
            }

        },

                // ***SAVE***
        async executeCrearCategoriaProv() {

            // bloqueo formulario
            var idFormulario = document.querySelector("#viewFormularioProv");
            var blockUI = new KTBlockUI(idFormulario, {
                message: '<div class="blockui-message"><span class="spinner-border text-primary"></span>Procesando...</div>',
                overlayClass: 'bg-dark bg-opacity-25',
            });
            blockUI.block();

                //bloqueo Fromulario
            const response = await this.crearCategoriaProv();
            if (response.data.success) {
                this.mensajeSweetAlertExito(response.data.mensaje);
                this.executeCargarListadoCategoriasCli();
                this.executeCargarListadoCategoriasProv();
                this.ocultarFormularioCli();
                this.ocultarFormularioProv();

                blockUI.release();
                blockUI.destroy();
            } else {


                this.mensajeSweetAlertError(response.data.mensaje);
                blockUI.release();
                blockUI.destroy();
            }
        },

        async crearCategoriaProv() {

            if (this.dataCategoriaProv.movimientoProv == true) {
                auxMovimientoProv = 'SI';
            } else {
                auxMovimientoProv = 'NO';
            }

            let body = { dataCategoriaProv: this.dataCategoriaProv, auxMovimientoProv}
            const promise = axios.post(`${this.dom.server}/CategoriasConfigCliProv/crearCategoriaProv`, body, this.headers);
            respuesta = promise.then((response) => response);
            return respuesta;
        },
                // ***FIN SAVE**

                // *** UPDATE ***
        async executeActualizarCategoriaProv() {

            var idFormulario = document.querySelector("#viewFormularioProv");
            var blockUI = new KTBlockUI(idFormulario, {
                message: '<div class="blockui-message"><span class="spinner-border text-primary"></span> Procesando...</div>',
                        overlayClass: 'bg-dark bg-opacity-25',
            });
            blockUI.block();

            const response = await this.actualizarCategoriaProv();
            if (response.data.success) {
                this.executeCargarListadoCategoriasCli();
                this.executeCargarListadoCategoriasProv();
                this.ocultarFormularioCli();
                this.ocultarFormularioProv();
                this.mensajeSweetAlertExito(response.data.mensaje);

                blockUI.release();
                blockUI.destroy();

            } else {
                this.mensajeSweetAlertError(response.data.mensaje);

                blockUI.release();
                blockUI.destroy();

            }


        },

        async actualizarCategoriaProv() {

            if (this.dataCategoriaProv.movimientoProv == true) {
                auxMovimientoProv = 'SI';
            } else {
                auxMovimientoProv = 'NO';
            }

            let body = { dataCategoriaProv: this.dataCategoriaProv, auxMovimientoProv }
            const promise = axios.put(`${this.dom.server}/CategoriasConfigCliProv/actualizarCategoriaProv`, body, this.headers);
            respuesta = promise.then((response) => response);
            return respuesta;
        },

                // *** FIN UPDATE ***
        // FIN CATEGORIAPROV

        // FIN SAVEORUPDATE

        // SANTIAGO CAMPUZANO ELIMINAR CATEGORIACLI
        async confirmacionEliminarCategoriaCli(idCategoriaCli, nombre) {

            Swal.fire({
                html: ' ¿ Está seguro que desea eliminar la Categoría <span class="badge badge-success"> ' + nombre + '</span>   de forma permanete ?',
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
                    this.executeEliminarCategoriaCli(idCategoriaCli);


                } else {

                }
            })


        },

        async executeEliminarCategoriaCli(idCategoriaCli) {

            var idFormulario = document.querySelector("#viewFormularioCli");
            var blockUI = new KTBlockUI(idFormulario, {
                message: '<div class="blockui-message"><span class="spinner-border text-primary"></span>Procesando...</div>',
                overlayClass: 'bg-dark bg-opacity-25',
            });
            blockUI.block();

            const response = await this.eliminarCategoriaCli(idCategoriaCli);

            if (response.data.success) {
                this.executeCargarListadoCategoriasCli();
                this.executeCargarListadoCategoriasProv();
                this.ocultarFormularioCli();
                this.ocultarFormularioProv();
                this.mensajeSweetAlertExito(response.data.mensaje);
                blockUI.release();
                blockUI.destroy();
            } else {

                this.mensajeSweetAlertError(response.data.mensaje);
                blockUI.release();
                blockUI.destroy();


            }

        },

        async eliminarCategoriaCli(idCategoriaCli) {

            const promise = axios.get(`${this.dom.server}/CategoriasConfigCliProv/eliminarCategoriaCli/${idCategoriaCli}`);
            respuesta = promise.then((response) => response);
            return respuesta;
        },

        // FIN ELIMINAR CATEGORIACLI

        // SANTIAGO CAMPUZANO ELIMINAR CATEGORIAPROV
        async confirmacionEliminarCategoriaProv(idCategoriaProv, nombre) {

            Swal.fire({
                html: ' ¿ Está seguro que desea eliminar la categoría <span class="badge badge-success"> ' + nombre + '</span>   de forma permanete ?',
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
                    this.executeEliminarCategoriaProv(idCategoriaProv);


                } else {

                }
            })


        },

        async executeEliminarCategoriaProv(idCategoriaProv) {

            var idFormulario = document.querySelector("#viewFormularioProv");
            var blockUI = new KTBlockUI(idFormulario, {
                message: '<div class="blockui-message"><span class="spinner-border text-primary"></span>Procesando...</div>',
                overlayClass: 'bg-dark bg-opacity-25',
            });
            blockUI.block();

            const response = await this.eliminarCategoriaProv(idCategoriaProv);

            if (response.data.success) {
                this.executeCargarListadoCategoriasCli();
                this.executeCargarListadoCategoriasProv();
                this.ocultarFormularioCli();
                this.ocultarFormularioProv();
                this.mensajeSweetAlertExito(response.data.mensaje);
                blockUI.release();
                blockUI.destroy();
            } else {

                this.mensajeSweetAlertError(response.data.mensaje);
                blockUI.release();
                blockUI.destroy();


            }

        },

        async eliminarCategoriaProv(idCategoriaProv) {

            const promise = axios.get(`${this.dom.server}/CategoriasConfigCliProv/eliminarCategoriaProv/${idCategoriaProv}`);
            respuesta = promise.then((response) => response);
            return respuesta;
        },

        // FIN ELIMINAR CATEGORIAPROV

        // SANTIAGO CAMPUZANO FUNCION TECLA ENTER
        validarBusquedaEnterCli: function(e){
            if (e.keyCode === 13) {
                this.validarBusquedaCategoriaCli();
            }
        },

        validarBusquedaEnterProv: function(e){
            if (e.keyCode === 13) {
                this.validarBusquedaCategoriaProv();
            }
        },

        // FIN FUNCION TECLA ENTER

        // SANTIAGO CAMPUZANO BUSQUEDA FILTROS CATEGORIACLI

        async validarBusquedaCategoriaCli() {
            if (this.dataBusquedaCli.busquedaCategoriaCli != '' && this.dataBusquedaCli.busquedaEstadoCategoriaCli != '') {
                this.executeCargarListadoFiltroCategoriaCli();
            }else
            if(this.dataBusquedaCli.busquedaEstadoCategoriaCli != '' && this.dataBusquedaCli.busquedaCategoriaCli == ''){
                this.executeCargarListadoFiltroCategoriaCli();
            }else
            if (this.dataBusquedaCli.busquedaCategoriaCli != '') {
                this.executeCargarListadoFiltroCategoriaCli();
            } else
            if(this.dataBusquedaCli.busquedaCategoriaCli == ''){
                mensaje="Debe llenar el campo de busqueda.";
                this.mensajeToastError(mensaje);
                this.executeCargarListadoFiltroCategoriaCli();
            }
        },

        async executeCargarListadoFiltroCategoriaCli() {

            // bloqueo formulario
            var idListado = document.querySelector("#viewListadoCli");
            var blockUI = new KTBlockUI(idListado, {
                message: '<div class="blockui-message"><span class="spinner-border text-primary"></span>Procesando...</div>',
                overlayClass: 'bg-dark bg-opacity-25',
            });
            blockUI.block();

            const response = await this.cargarListadoFiltroCategoriaCli();
            this.datosGenerales.listadoCategoriasCli = response.data.dataResponse;

            if (response.data.success) {
                blockUI.release();
                blockUI.destroy();
            } else {
                blockUI.release();
                blockUI.destroy();
            }



        },

        async cargarListadoFiltroCategoriaCli() {
            let body = {idEmpresa : this.datosGenerales.idEmpresa,
                        busquedaCategoriaCli: this.dataBusquedaCli.busquedaCategoriaCli,
                        busquedaEstadoCategoriaCli: this.dataBusquedaCli.busquedaEstadoCategoriaCli};
            const promise = axios.post(`${this.dom.server}/CategoriasConfigCliProv/listarFiltrosCategoriaCli`, body, this.headers);
            respuesta = promise.then((response) => response);
            return respuesta;
        },

        // FIN BUSQUEDA FILTROS CATEGORIACLI

        // SANTIAGO CAMPUZANO BUSQUEDA FILTROS CATEGORIAPROV

        async validarBusquedaCategoriaProv() {
            if (this.dataBusquedaProv.busquedaCategoriaProv != '' && this.dataBusquedaProv.busquedaEstadoCategoriaProv != '') {
                this.executeCargarListadoFiltroCategoriaProv();
            }else
            if(this.dataBusquedaProv.busquedaEstadoCategoriaProv != '' && this.dataBusquedaProv.busquedaCategoriaProv == ''){
                this.executeCargarListadoFiltroCategoriaProv();
            }else
            if (this.dataBusquedaProv.busquedaCategoriaProv != '') {
                this.executeCargarListadoFiltroCategoriaProv();
            } else
            if(this.dataBusquedaProv.busquedaCategoriaProv == ''){
                mensaje="Debe llenar el campo de busqueda.";
                this.mensajeToastError(mensaje);
                this.executeCargarListadoFiltroCategoriaProv();
            }
        },

        async executeCargarListadoFiltroCategoriaProv() {

            // bloqueo formulario
            var idListado = document.querySelector("#viewListadoProv");
            var blockUI = new KTBlockUI(idListado, {
                message: '<div class="blockui-message"><span class="spinner-border text-primary"></span>Procesando...</div>',
                overlayClass: 'bg-dark bg-opacity-25',
            });
            blockUI.block();

            const response = await this.cargarListadoFiltroCategoriaProv();
            this.datosGenerales.listadoCategoriasProv = response.data.dataResponse;

            if (response.data.success) {
                blockUI.release();
                blockUI.destroy();
            } else {
                blockUI.release();
                blockUI.destroy();
            }



        },

        async cargarListadoFiltroCategoriaProv() {
            let body = {idEmpresa : this.datosGenerales.idEmpresa,
                        busquedaCategoriaProv: this.dataBusquedaProv.busquedaCategoriaProv,
                        busquedaEstadoCategoriaProv: this.dataBusquedaProv.busquedaEstadoCategoriaProv};
            const promise = axios.post(`${this.dom.server}/CategoriasConfigCliProv/listarFiltrosCategoriaProv`, body, this.headers);
            respuesta = promise.then((response) => response);
            return respuesta;
        },

        // FIN BUSQUEDA FILTROS CATEGORIAPROV

        // SANTIAGO CAMPUZANO VALIDACION DE FORMULARIO
        // VALIDAR CATEGORIACLI
        async validarCategoriaCli(){

            const form = document.getElementById("formCategoriaCli");
            $(".fv-plugins-message-container").remove();

            var validator = FormValidation.formValidation(form, {
                fields: {
                    categoriaCli: {
                        validators: { notEmpty: { message: "Nombre de la Categoría requerida." } },
                    },
                    cuentaCli:{
                        validators: { notEmpty: { message: "Cuenta de la Categoría requerida."}}
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
        // FIN CATEGORIACLI

        // VALIDAR CATEGORIAPROV
        async validarCategoriaProv(){

            const form = document.getElementById("formCategoriaProv");
            $(".fv-plugins-message-container").remove();

            var validator = FormValidation.formValidation(form, {
                fields: {
                    categoriaProv: {
                        validators: { notEmpty: { message: "Nombre de la Categoría requerida." } },
                    },
                    cuentaProv:{
                        validators: { notEmpty: { message: "Cuenta de la Categoría requerida."}}
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
        // FIN CATEGORIAPROV

        // FIN VALIDACION DE FORMULARIO

        // SANTIAGO CAMPUZANO CABIAR ESTADO

        // anular categoriacli estado
        async confirmacionAnularCategoriaCli(idCategoriaCli, nombre) {

            Swal.fire({
                html: ' ¿ Está seguro que desea cambiar el estado de la categoria <span class="badge badge-success"> ' + nombre + '</span>   a Inactivo ?',
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
                    this.executeAnularCategoriaCli(idCategoriaCli);
                }
            })


        },


        async executeAnularCategoriaCli(idCategoriaCli) {

            var listado = document.querySelector("#viewListadoCli");
            var blockUI = new KTBlockUI(listado, {
                message: '<div class="blockui-message"><span class="spinner-border text-primary"></span>Cambiando Estado...</div>',
                overlayClass: 'bg-dark bg-opacity-25',
            });
            blockUI.block();

            const response = await this.anularCategoriaCli(idCategoriaCli);

            if (response.data.success) {
                this.executeCargarListadoCategoriasCli();
                this.executeCargarListadoCategoriasProv();
                this.ocultarFormularioCli();
                this.ocultarFormularioProv();
                this.mensajeSweetAlertExito(response.data.mensaje);
                blockUI.release();
                blockUI.destroy();
            } else {

                this.mensajeSweetAlertError(response.data.mensaje);
                blockUI.release();
                blockUI.destroy();


            }

        },

        async anularCategoriaCli(idCategoriaCli) {
            const promise = axios.get(`${this.dom.server}/CategoriasConfigCliProv/anularCategoriaCli/${idCategoriaCli}`);
            respuesta = promise.then((response) => response);
            return respuesta;
        },
        // fin anular categoriacli estado

        // activar categoriacli estado
        async confirmacionActivarCategoriaCLi(idCategoriaCli, nombre) {

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
                    this.executeActivarCategoriaCli(idCategoriaCli);
                }
            })


        },


        async executeActivarCategoriaCli(idCategoriaCli) {

            var listado = document.querySelector("#viewListadoCli");
            var blockUI = new KTBlockUI(listado, {
                message: '<div class="blockui-message"><span class="spinner-border text-primary"></span>Cambiando Estado...</div>',
                overlayClass: 'bg-dark bg-opacity-25',
            });
            blockUI.block();

            const response = await this.activarCategoriaCli(idCategoriaCli);

            if (response.data.success) {
                this.executeCargarListadoCategoriasCli();
                this.executeCargarListadoCategoriasProv();
                this.ocultarFormularioCli();
                this.ocultarFormularioProv();
                this.mensajeSweetAlertExito(response.data.mensaje);
                blockUI.release();
                blockUI.destroy();
            } else {

                this.mensajeSweetAlertError(response.data.mensaje);
                blockUI.release();
                blockUI.destroy();


            }

        },

        async activarCategoriaCli(idCategoriaCli) {
            const promise = axios.get(`${this.dom.server}/CategoriasConfigCliProv/activarCategoriaCli/${idCategoriaCli}`);
            respuesta = promise.then((response) => response);
            return respuesta;
        },
        // fin activar categoriacli estado

        // anular categoriaprov estado
        async confirmacionAnularCategoriaProv(idCategoriaProv, nombre) {

            Swal.fire({
                html: ' ¿ Está seguro que desea cambiar el estado de la categoria <span class="badge badge-success"> ' + nombre + '</span>   a Inactivo ?',
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
                    this.executeAnularCategoriaProv(idCategoriaProv);
                }
            })


        },


        async executeAnularCategoriaProv(idCategoriaProv) {

            var listado = document.querySelector("#viewListadoCli");
            var blockUI = new KTBlockUI(listado, {
                message: '<div class="blockui-message"><span class="spinner-border text-primary"></span>Cambiando Estado...</div>',
                overlayClass: 'bg-dark bg-opacity-25',
            });
            blockUI.block();

            const response = await this.anularCategoriaProv(idCategoriaProv);

            if (response.data.success) {
                this.executeCargarListadoCategoriasCli();
                this.executeCargarListadoCategoriasProv();
                this.ocultarFormularioCli();
                this.ocultarFormularioProv();
                this.mensajeSweetAlertExito(response.data.mensaje);
                blockUI.release();
                blockUI.destroy();
            } else {

                this.mensajeSweetAlertError(response.data.mensaje);
                blockUI.release();
                blockUI.destroy();


            }

        },

        async anularCategoriaProv(idCategoriaProv) {
            const promise = axios.get(`${this.dom.server}/CategoriasConfigCliProv/anularCategoriaProv/${idCategoriaProv}`);
            respuesta = promise.then((response) => response);
            return respuesta;
        },
        // fin anular categoriaprov estado

        // activar categoriaprov estado
        async confirmacionActivarCategoriaProv(idCategoriaProv, nombre) {

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
                    this.executeActivarCategoriaProv(idCategoriaProv);
                }
            })


        },


        async executeActivarCategoriaProv(idCategoriaProv) {

            var listado = document.querySelector("#viewListadoCli");
            var blockUI = new KTBlockUI(listado, {
                message: '<div class="blockui-message"><span class="spinner-border text-primary"></span>Cambiando Estado...</div>',
                overlayClass: 'bg-dark bg-opacity-25',
            });
            blockUI.block();

            const response = await this.activarCategoriaProv(idCategoriaProv);

            if (response.data.success) {
                this.executeCargarListadoCategoriasCli();
                this.executeCargarListadoCategoriasProv();
                this.ocultarFormularioCli();
                this.ocultarFormularioProv();
                this.mensajeSweetAlertExito(response.data.mensaje);
                blockUI.release();
                blockUI.destroy();
            } else {

                this.mensajeSweetAlertError(response.data.mensaje);
                blockUI.release();
                blockUI.destroy();


            }

        },

        async activarCategoriaProv(idCategoriaProv) {
            const promise = axios.get(`${this.dom.server}/CategoriasConfigCliProv/activarCategoriaProv/${idCategoriaProv}`);
            respuesta = promise.then((response) => response);
            return respuesta;
        },
        // fin activar categoriaprov estado


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



        }

    }

}).mount("#ViewCategoriaConfigCliProv");
