var app = Vue.createApp({

    data(){
        return{

            text: 'This will get copied!',

            files: [],
            fichero: null,

            dataEmpresa:{
                url: null,
                auxIdfirma: false,
                auxNombreFirma:false,

                idEmpresa: "",
                numeroDocumento: "",
                razonSocial: "",
                nombreComercial: "",
                direccionMatriz: "",
                celular: "",
                correo: "",
                esado: "R",
                tipoContribuyente: "",
                agenteRetencion: "false",
                obligadoContabilidad: "true",
                idSucursales: "",
                firmaArchivo: "",
                firmaClave: "",
                tipoPlataforma: "",
                smtpPlataforma: "",
                puertoPlataforma: "",
                tlsSslPlataforma: "",
                emailPlataforma: "",
                emaiClavePlataforma: "",
                microEmpresa: "true",
                numResolucionAR: "",
                contibuyenteEsp: "false",
                numResolucionEsp: ""
            },

            dataSucursales:{
                arraySucursales:[],
                idEmpresa: "",
                indexSucursal: "",
                idSucursal: "",
                numEstablecimento: "",
                nombreComercialSucursal: "",
                direccionEstablecimiento: "",
                facturacionElectronica: "",
                celularSucursal: "",
                correoSucursal: "",
                mensajeSucursal: ""
            },

            dataBusqueda:{
                busquedaRUCRazSocial: "",
                busquedaEmpresa: "",
                busquedaEstado: "",
                busquedaFechaDesde: "2020-01-01" ,
                busquedaFechaHasta: new Date().getFullYear() +'-'+ (new Date().getMonth()+1) +'-'+ (new Date().getDate()+1)
            },

            dom:{
                mostrarTitle: true,
                mostrarModal: true,
                mostrarFormulario: false,
                mostrarListado: true,
                mostrarBusqueda: false,
                mostrarBotonNuevo: true,
                nombreBotonRegistrar: "Registrar",
                nombreBotonEditar: "Actualizar",
                mostrarBtns: true,
                emailPlataforma: false,
                claveEmailPlataforma: false,
                mostrarNumResolReten : false,
                mostrarNumResolContr: false,
                server: false
            },

            datosGenerales:{
                tipoContribuyente:"",
                listadoEmpresas: ""
            },
            data:{
                modalSucursal:false
            },
            headers: {
                headers: {
                    token: ""
                }
            }
        }
    },

    updated(){
        // VARIABLES EMPRESA
        this.dataEmpresa.razonSocial = this.dataEmpresa.razonSocial.toUpperCase();
        this.dataEmpresa.nombreComercial = this.dataEmpresa.nombreComercial.toUpperCase();
        this.dataEmpresa.direccionMatriz = this.dataEmpresa.direccionMatriz.toUpperCase();
        this.dataBusqueda.busquedaRUCRazSocial = this.dataBusqueda.busquedaRUCRazSocial.toUpperCase();
        this.dataBusqueda.busquedaEmpresa = this.dataBusqueda.busquedaEmpresa.toUpperCase();

        // VARIABLES MODAL SUCURSAL
        this.dataSucursales.nombreComercialSucursal = this.dataSucursales.nombreComercialSucursal.toUpperCase();
        this.dataSucursales.direccionEstablecimiento = this.dataSucursales.direccionEstablecimiento.toUpperCase();
        this.dataSucursales.mensajeSucursal = this.dataSucursales.mensajeSucursal.toUpperCase();

    },

    mounted() {
        this.montarToken();
        this.executeCargarListado(); // carga listado al cargar la pagina
        this.printDate();

    },
    methods:{

        copy() {
            this.$refs.myinput.focus();
            document.execCommand('copy');
          },

        async montarToken() {
            const tk = document.getElementById('mydiv').dataset.test
            this.headers.headers.token = tk;
            const server = document.getElementById('mydivServ').dataset.test
            this.dom.server = server;
        },

        onFileChange(e) {
            const file = e.target.files[0];
            this.dataEmpresa.url = URL.createObjectURL(file);
          },

        printDate() {
            let date = new Date();
            var fecha = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
            this.busquedaFechaHasta = this.fecha;
          },

          // SANTIAGO CAMPUZANO MOSTRAR NumResolucionRet

        async executeCargarNumResolucionRet(){
            if (this.dataEmpresa.agenteRetencion == false) {
                this.dom.mostrarNumResolReten = false;
                this.dataEmpresa.numResolucionAR = '';
            }
            if (this.dataEmpresa.agenteRetencion == true) {
                this.dom.mostrarNumResolReten = true;
                this.dataEmpresa.numResolucionAR = '';
            }
        },

        // FIN MOSTRAR NumResolucionRet

        // SANTIAGO CAMPUZANO MOSTRAR NumResolucionContr

        async executeCargarNumResolucionCont(){
            if (this.dataEmpresa.contibuyenteEsp == false) {
                this.dom.mostrarNumResolContr = false;
                this.dataEmpresa.numResolucionEsp = '';
            }
            if (this.dataEmpresa.contibuyenteEsp == true) {
                this.dom.mostrarNumResolContr = true;
                this.dataEmpresa.numResolucionEsp = '';
            }
        },

        // FIN MOSTRAR NumResolucionContr

        Guardar(){

                index = this.dataSucursales.indexSucursal;
            if (index === "") {
                var empresa = {
                    idEmpresa: this.dataSucursales.idEmpresa,
                    idSucursal: this.dataSucursales.idSucursal,
                    numEstablecimento: this.dataSucursales.numEstablecimento,
                    nombreComercialSucursal: this.dataSucursales.nombreComercialSucursal,
                    direccionEstablecimiento: this.dataSucursales.direccionEstablecimiento,
                    facturacionElectronica: this.dataSucursales.facturacionElectronica,
                    celularSucursal: this.dataSucursales.celularSucursal,
                    correoSucursal:this.dataSucursales.correoSucursal,
                    mensajeSucursal: this.dataSucursales.mensajeSucursal} //creamos la variable personas, con la variable nombre y apellidos
                this.dataSucursales.arraySucursales.push(empresa);//añadimos el la variable empresa al array
                //Limpiamos los campos
                this.dataSucursales.idEmpresa = "";
                this.dataSucursales.numEstablecimento = "";
                this.dataSucursales.nombreComercialSucursal = "";
                this.dataSucursales.direccionEstablecimiento = "";
                this.dataSucursales.facturacionElectronica = "";
                this.dataSucursales.celularSucursal = "";
                this.dataSucursales.correoSucursal = "";
                this.dataSucursales.mensajeSucursal = "";


            } else {
                var empresa = {
                    idEmpresa: this.dataSucursales.idEmpresa,
                    idSucursal: this.dataSucursales.idSucursal,
                    numEstablecimento: this.dataSucursales.numEstablecimento,
                    nombreComercialSucursal: this.dataSucursales.nombreComercialSucursal,
                    direccionEstablecimiento: this.dataSucursales.direccionEstablecimiento,
                    facturacionElectronica: this.dataSucursales.facturacionElectronica,
                    celularSucursal: this.dataSucursales.celularSucursal,
                    correoSucursal:this.dataSucursales.correoSucursal,
                    mensajeSucursal: this.dataSucursales.mensajeSucursal} //creamos la variable personas, con la variable nombre y apellidos
                this.dataSucursales.arraySucursales.splice(index, 1, empresa);//añadimos el la variable empresa al array
                //Limpiamos los campos
                this.dataSucursales.idEmpresa = "";
                this.dataSucursales.numEstablecimento = "";
                this.dataSucursales.nombreComercialSucursal = "";
                this.dataSucursales.direccionEstablecimiento = "";
                this.dataSucursales.facturacionElectronica = "";
                this.dataSucursales.celularSucursal = "";
                this.dataSucursales.correoSucursal = "";
                this.dataSucursales.mensajeSucursal = "";
            }

          },

          remove:function(i){
            this.dataSucursales.arraySucursales.splice(i,1)
          },

        // funciones frontend para para manipular dom y datos

        async ocultarModal(){
            this.dom.mostrarModal = false;
        },

        async verFormulario(){
            this.dom.mostrarFormulario= true,
               this.dom.mostrarListado=false,
               this.dom.mostrarBusqueda= false,
               this.dom.mostrarBtns = false,
               this.dom.mostrarTitle = false,
               this.executeCargarTipoContribuyente();               
        },
        async verFiltro(){
            this.dom.mostrarFormulario= false,
               this.dom.mostrarListado=true,
               this.dom.mostrarBusqueda= true,
               this.dom.mostrarTitle = false,
               this.dom.mostrarBtns = false
        },
        async ocultarFormulario() {
            this.dom.mostrarFormulario= false,
               this.dom.mostrarListado=true,
               this.dom.mostrarBusqueda= false,
               this.dom.mostrarTitle = true,
               this.dom.mostrarBtns = true
               this.Limpiar();
        },
        async Limpiar(){
            this.executeCargarListado();
            this.dataBusqueda.busquedaRUCRazSocial= "",
            this.dataBusqueda.busquedaEmpresa= "",
            this.dataBusqueda.busquedaEstado= "",

            this.dataEmpresa.idEmpresa= "",
            this.dataEmpresa.razonSocial= "",
            this.dataEmpresa.nombreComercial= "",
            this.dataEmpresa.direccionMatriz= "",
            this.dataEmpresa.celular= "",
            this.dataEmpresa.correo= "",
            this.dataEmpresa.esado= "R",
            this.dataEmpresa.tipoContribuyente= "",
            this.dataEmpresa.agenteRetencion= "",
            this.dataEmpresa.obligadoContabilidad= "",
            this.dataEmpresa.tipoPlataforma= "",
            this.dataEmpresa.smtpPlataforma= "",
            this.dataEmpresa.puertoPlataforma= "",
            this.dataEmpresa.tlsSslPlataforma= "",
            this.dataEmpresa.emailPlataforma= "",
            this.dataEmpresa.emaiClavePlataforma= "",
            this.dataEmpresa.numeroDocumento= "",
            this.dataEmpresa.firmaClave= ""

        },

        async limpiarArraySucursales(){
            // data sucursales

            this.dataSucursales.indexSucursal = "";
            this.dataSucursales.idSucursal = "",
            this.dataSucursales.numEstablecimento = "",
            this.dataSucursales.nombreComercialSucursal = "",
            this.dataSucursales.direccionEstablecimiento = "",
            this.dataSucursales.facturacionElectronica = "",
            this.dataSucursales.celularSucursal = "",
            this.dataSucursales.correoSucursal = "",
            this.dataSucursales.mensajeSucursal = ""

        },
         async limpiarArray(){
            // this.dataSucursales.arraySucursales = {};
            this.dataSucursales.arraySucursales.length=0;
         },
        async ocultarFiltro(){
            this.Limpiar();
            this.dom.mostrarFormulario= false,
            this.dom.mostrarListado=true,
            this.dom.mostrarBusqueda= false,
            this.dom.mostrarTitle = true,
            this.dom.mostrarBtns = true
        },

        // SANTIAGO CAMPUZANO FUNCION TECLA ENTER
        validarBusquedaEnter: function(e){
            if (e.keyCode === 13) {
                this.executeCargarListadoFiltro();
            }
        },

        // SANTIAGO CAMPUZANO BUSQUEDA POR RUC
        async extraerDataSRI(){

            var idFormulario = document.querySelector("#viewFormulario");
            var blockUI = new KTBlockUI(idFormulario, {
                message: '<div class="blockui-message"><span class="spinner-border text-primary"></span> Extrayendo...</div>',
                overlayClass: 'bg-dark bg-opacity-25',
            });
            blockUI.block();

            try {
                const response = await this.extraerRegistroCivilDirecto();

                if (response.data) {


                    let nombre = response.data.contribuyente.nombreComercial;
                    let direccion = response.data.contribuyente.direccionMatriz;

                    this.dataEmpresa.nombreComercial = nombre;

                    if (direccion == '' || direccion == null) {
                        this.dataEmpresa.direccionMatriz = '---';
                    } else {
                        this.dataEmpresa.direccionMatriz = direccion;
                    }


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

        },

        async extraerRegistroCivilDirecto(){


            const promise = axios.get('https://srienlinea.sri.gob.ec/movil-servicios/api/v1.0/deudas/porIdentificacion/'+this.dataEmpresa.numeroDocumento+'/?tipoPersona=N');

            return promise.then((response) => response);

        },

        // FIN BUSQUEDA RUC

        // SANTIAGO CAMPUZANO CARGAR CONTRIBUYENTE
        async executeCargarTipoContribuyente() {
            const response = await this.cargarTipoContribuyente();
            this.datosGenerales.tipoContribuyente = response.data.dataResponse;

             },

        async cargarTipoContribuyente(){
            const promise = axios.get(`${this.dom.server}/empresa/cargarTipoContribuyente`);
            return  promise.then((response) => response);

        },
        // FIN CARGAR CONTRIBUYENTE

        // SANTIAGO CAMPUZANO CARGAR DATOS PLATAFORMA CORREO

        async executeCargarDatosPlataforma(){

                if (this.dataEmpresa.tipoPlataforma == "") {
                    this.dataEmpresa.smtpPlataforma = '',
                    this.dataEmpresa.puertoPlataforma = '',
                    this.dataEmpresa.tlsSslPlataforma = '',
                    this.dom.emailPlataforma = false,
                    this.dom.claveEmailPlataforma = false
                } else if (this.dataEmpresa.tipoPlataforma =='GENERAL') {
                    this.dataEmpresa.smtpPlataforma = 'email-smtp.us-east-1.amazonaws.com',
                    this.dataEmpresa.puertoPlataforma = '587',
                    this.dataEmpresa.tlsSslPlataforma = 'tls'
                    this.dom.emailPlataforma = false,
                    this.dom.claveEmailPlataforma = false
                } else if (this.dataEmpresa.tipoPlataforma == 'AWSP'){
                    this.dataEmpresa.smtpPlataforma = 'email-smtp.us-east-1.amazonaws.com',
                    this.dataEmpresa.puertoPlataforma = '587',
                    this.dataEmpresa.tlsSslPlataforma = 'tls'
                    this.dom.emailPlataforma = false,
                    this.dom.claveEmailPlataforma = false
                } else if (this.dataEmpresa.tipoPlataforma == 'PERSONALIZADO') {
                    this.dataEmpresa.smtpPlataforma = '',
                    this.dataEmpresa.puertoPlataforma = '',
                    this.dataEmpresa.tlsSslPlataforma = ''
                    this.dom.emailPlataforma = true,
                    this.dom.claveEmailPlataforma = true
                }

        },

        // FIN CARGAR DATOS PLATAFORMA CORREO

        // SANTIAGO CAMPUZANO CARGAR LISTA EMPRESAS
        async executeCargarListado() {

            const response = await this.cargarListado();
            this.datosGenerales.listadoEmpresas = response.data.dataResponse;
        },
        async cargarListado() {
            console.log(this.dom.server);
            const promise = axios.get(`${this.dom.server}/empresa/listar`);
            respuesta = promise.then((response) => response);
            return respuesta;
        },

        // FIN CARGAR LISTA EMPRESAS

        // SANTIAGO CAMPUZANO BUSQUEDA FILTROS

        async executeCargarListadoFiltro() {

            // bloqueo formulario
            var idListado = document.querySelector("#viewListado");
            var blockUI = new KTBlockUI(idListado, {
                message: '<div class="blockui-message"><span class="spinner-border text-primary"></span>Procesando...</div>',
                overlayClass: 'bg-dark bg-opacity-25',
            });
            blockUI.block();

            const response = await this.cargarListadoFiltro();
            this.datosGenerales.listadoEmpresas = response.data.dataResponse;

            if (response.data.success) {
                blockUI.release();
                blockUI.destroy();
            } else {
                blockUI.release();
                blockUI.destroy();
            }



        },

        async cargarListadoFiltro() {
            let body = {busquedaEmpresa: this.dataBusqueda.busquedaEmpresa,
                        fechaDesde: this.dataBusqueda.busquedaFechaDesde,
                        fechaHasta: this.dataBusqueda.busquedaFechaHasta,
                        busquedaEstado: this.dataBusqueda.busquedaEstado,
                        busquedaRUCRazSocial: this.dataBusqueda.busquedaRUCRazSocial};
            const promise = axios.post(`${this.dom.server}/empresa/listarFiltros`, body);
            respuesta = promise.then((response) => response);
            return respuesta;
        },

        // FIN BUSQUEDA FILTROS

        // SANTIAGO CAMPUZANO VALIDACION MODAL

        async validarSucursalModal(){

            if (!this.dataSucursales.numEstablecimento) {
                mensaje="El numero de Establecimiento es obligatorio.";
                this.mensajeToastError(mensaje);
            } else
            if (!this.dataSucursales.nombreComercialSucursal) {
                mensaje="El Nombre Comercial es obligatorio.";
                this.mensajeToastError(mensaje);
            } else
            if (!this.dataSucursales.direccionEstablecimiento) {
                mensaje="La Direccion del Establecimiento es obligatorio.";
                this.mensajeToastError(mensaje);
            }else
            if (!this.dataSucursales.facturacionElectronica) {
                mensaje="El Ambiente de Facturacion Electronica es obligatoria.";
                this.mensajeToastError(mensaje);
            } else {
                this.Guardar();
            }
            e.preventDefault();

        },

        // FIN VALIDACION MODAL

        // SANTIAGO CAMPUZANO VALIDACION EMAIL
        validEmail: function (email) {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        },
        // FIN VALIDACION EMAIL

        // SANTIAGO CAMPUZANO SAVEORUPDATE
        async validarCreacionEdicionEmpresa() {
            const validacion = await this.validarEmpresa();

            if (validacion) {
                if (!this.dataEmpresa.idEmpresa) {
                    this.executeCrearEmpresa().then($(this.$refs.btnActualizar).trigger("click"));
                } else {
                    this.executeActualizarEmpresa().then($(this.$refs.btnActualizar).trigger("click"));
                }
            }

        },

                // ***SAVE***
        async executeCrearEmpresa() {

            // bloqueo formulario
            var idFormulario = document.querySelector("#viewFormulario");
            var blockUI = new KTBlockUI(idFormulario, {
                message: '<div class="blockui-message"><span class="spinner-border text-primary"></span>Procesando...</div>',
                overlayClass: 'bg-dark bg-opacity-25',
            });
            blockUI.block();

                //bloqueo Fromulario
            const response = await this.crearEmpresa();
            if (response.data.success) {
                this.mensajeSweetAlertExito(response.data.mensaje);
                this.executeCargarListado();
                this.ocultarFormulario();
                this.limpiarArray();

                blockUI.release();
                blockUI.destroy();
            } else {


                this.mensajeSweetAlertError(response.data.mensaje);
                blockUI.release();
                blockUI.destroy();
            }
        },

        async crearEmpresa() {

            if (this.dataEmpresa.agenteRetencion == true) {
                auxRetencion = 'SI';
            } else {
                auxRetencion = 'NO';
            }

            if (this.dataEmpresa.obligadoContabilidad == true) {
                auxContabilidad = 'SI';
            } else {
                auxContabilidad = 'NO';
            }

            if (this.dataEmpresa.microEmpresa == true) {
                auxMicroEmpresa = 'SI';
            } else {
                auxMicroEmpresa = 'NO';
            }

            if (this.dataEmpresa.contibuyenteEsp == true) {
                auxContribuyenteEsp = 'SI';
            } else {
                auxContribuyenteEsp = 'NO';
            }

            let body = { dataEmpresa: this.dataEmpresa, auxContabilidad, auxRetencion, auxMicroEmpresa, auxContribuyenteEsp, dataSucursales: this.dataSucursales.arraySucursales}
            const promise = axios.post(`${this.dom.server}/empresa/crearEmpresa`, body, this.headers);

            respuesta = promise.then((response) => response);
            return respuesta;
        },
                // ***FIN SAVE**

                // *** UPDATE ***
        async executeActualizarEmpresa() {

            var idFormulario = document.querySelector("#viewFormulario");
            var blockUI = new KTBlockUI(idFormulario, {
                message: '<div class="blockui-message"><span class="spinner-border text-primary"></span> Procesando...</div>',
                        overlayClass: 'bg-dark bg-opacity-25',
            });
            blockUI.block();

            const response = await this.actualizarEmpresa();
            if (response.data.success) {
                this.executeCargarListado();
                this.ocultarFormulario();
                this.mensajeSweetAlertExito(response.data.mensaje);
                this.limpiarArray();

                blockUI.release();
                blockUI.destroy();

            } else {
                this.mensajeSweetAlertError(response.data.mensaje);

                blockUI.release();
                blockUI.destroy();

            }


        },

        async actualizarEmpresa() {

            if (this.dataEmpresa.agenteRetencion == true) {
                auxRetencion = 'SI';
            } else {
                auxRetencion = 'NO';
            }

            if (this.dataEmpresa.obligadoContabilidad == true) {
                auxContabilidad = 'SI';
            } else {
                auxContabilidad = 'NO';
            }

            if (this.dataEmpresa.microEmpresa == true) {
                auxMicroEmpresa = 'SI';
            } else {
                auxMicroEmpresa = 'NO';
            }

            if (this.dataEmpresa.contibuyenteEsp == true) {
                auxContribuyenteEsp = 'SI';
            } else {
                auxContribuyenteEsp = 'NO';
            }

            let body = { dataEmpresa: this.dataEmpresa, auxRetencion, auxContabilidad, auxMicroEmpresa, auxContribuyenteEsp, dataSucursales: this.dataSucursales.arraySucursales}
            const promise = axios.put(`${this.dom.server}/empresa/actualizarEmpresa`, body, this.headers);
            respuesta = promise.then((response) => response);
            return respuesta;
        },

                // *** FIN UPDATE ***

        // FIN SAVEORUPDATE

        // SANTIAGO CAMPUZANO ELIMINAR
        async confirmacionEliminarEmpresa(idEmpresa, nombreEmpresa) {

            Swal.fire({
                html: ' ¿ Está seguro que desea eliminar a <span class="badge badge-success"> ' + nombreEmpresa + '</span>   de forma permanete ?',
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
                    this.executeEliminarEmpresa(idEmpresa);


                } else {

                }
            })


        },

        async executeEliminarEmpresa(idEmpresa) {

            var idFormulario = document.querySelector("#viewFormulario");
            var blockUI = new KTBlockUI(idFormulario, {
                message: '<div class="blockui-message"><span class="spinner-border text-primary"></span>Procesando...</div>',
                overlayClass: 'bg-dark bg-opacity-25',
            });
            blockUI.block();

            const response = await this.eliminarEmpresa(idEmpresa);

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

        async eliminarEmpresa(idEmpresa) {

            const promise = axios.get(`${this.dom.server}/empresa/eliminarEmpresa/${idEmpresa}`);
            respuesta = promise.then((response) => response);
            return respuesta;
        },

        // FIN ELIMINAR

        // SANTIAGO CAMPUZANO VALIDACION DE FORMULARIO
        async validarEmpresa(){

            const form = document.getElementById("formEmpresa");
            $(".fv-plugins-message-container").remove();

            var validator = FormValidation.formValidation(form, {
                fields: {
                    numDocumento: {
                        validators: { notEmpty: { message: "Número de docuemento requerido" } },
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
                    tipoContribuyente: {
                        validators: { notEmpty: { message: "Tipo de contribuyente requerido" } },
                    },
                    tipoPlataforma: {
                        validators: { notEmpty: { message: "Tipo de plataforma requerida" } },
                    },
                    smtpPlataforma: {
                        validators: { notEmpty: { message: "SMTP de la plataforma requerido" } },
                    },
                    puertoPlataforma: {
                        validators: { notEmpty: { message: "Puerto de la plataforma requerida" } },
                    },
                    tlsSslPlataforma: {
                        validators: { notEmpty: { message: "TLS/SSL de la plataforma requerida" } },
                    },
                    correoEmpresa: {
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
            if (promise == 'Valid') { response = true; } else { response = false;
                mensaje="Faltan Campos por llenar."
                this.mensajeToastError(mensaje);
            }
            return response;

        },
        // FIN VALIDACION FORMULARIO

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

        // SANTIAGO CAMPUZANO CARGAR DATOS EMPRESA Y SUCURSAL

        async executecargarDataEmpresa(idEmpresa) {
            const response = await this.cargarDataEmpresa(idEmpresa);
            const response2 = await this.cargarDataSucursales(idEmpresa);
            datos2 = response2 .data.dataResponse;
            datos = response.data.dataResponse[0];

            if (response.data.success) {
                this.verFormulario();

                if (datos.AGENTE_RETENCION == 'NO') {
                    this.dataEmpresa.agenteRetencion = false;
                } else { this.dataEmpresa.agenteRetencion = true; }

                if (datos.OBLIGADO_CONTABILIDAD == 'NO') {
                    this.dataEmpresa.obligadoContabilidad = false;
                } else { this.dataEmpresa.obligadoContabilidad = true; }

                if (datos.MICRO_EMPRESA == 'NO') {
                    this.dataEmpresa.microEmpresa = false;
                } else { this.dataEmpresa.microEmpresa = true; }

                if (datos.CONTRIBUYENTE_ESP == 'NO') {
                    this.dataEmpresa.contibuyenteEsp = false;
                } else { this.dataEmpresa.contibuyenteEsp = true; }

                this.executeCargarNumResolucionCont();
               this.executeCargarNumResolucionRet();

                this.dataEmpresa.idEmpresa = datos.ID_EMPRESA,
                this.dataEmpresa.numeroDocumento = datos.RUC,
                this.dataEmpresa.razonSocial = datos.RAZON_SOCIAL,
                this.dataEmpresa.nombreComercial = datos.NOMBRE_COMERCIAL,
                this.dataEmpresa.direccionMatriz = datos.DIRECCION_MATRIZ,
                this.dataEmpresa.celular = datos.CELULAR,
                this.dataEmpresa.correo = datos.CORREO,
                this.dataEmpresa.esado = datos.ESTADO,
                this.dataEmpresa.tipoContribuyente = datos.ID_TIPO_CONTRIBUYENTE,
                this.dataEmpresa.tipoPlataforma = datos.TIPO_PLATAFORMA,
                this.dataEmpresa.numResolucionAR= datos.NUM_RESOLUCION_AR,
                this.dataEmpresa.numResolucionEsp= datos.NUM_RESOLUCION_CE,

                this.dataEmpresa.smtpPlataforma = datos.SMTP_PLATAFORMA,
                this.dataEmpresa.puertoPlataforma = datos.PUERTO_PLATAFORMA,
                this.dataEmpresa.tlsSslPlataforma = datos.TLS_SSL_PLATAFORMA,
                this.dataEmpresa.emailPlataforma = datos.EMAIL,
                this.dataEmpresa.emaiClavePlataforma = datos.EMAIL_CLAVE



                for ( i = 0; i < datos2.length; i++) {
                    const element = datos2[i];

                    var auxSucursales = {
                        idEmpresa: element.ID_EMPRESA,
                        idSucursal: element.ID_SUCURSAL,
                        numEstablecimento: element.NUM_ESTABLECIMIENTO,
                        nombreComercialSucursal: element.NOMBRE_COMERCIAL,
                        direccionEstablecimiento: element.DIR_ESTABLECIMIENTO,
                        facturacionElectronica: element.AMBIENTE,
                        celularSucursal: element.CELULAR,
                        correoSucursal: element.CORREO,
                        mensajeSucursal: element.DESCRIPCION}
                        this.dataSucursales.arraySucursales.push(auxSucursales);
                }


            }

        },

        async cargarDataEmpresa(idEmpresa) {

            const promise = axios.get(`${this.dom.server}/empresa/cargarDataEmpresa/${idEmpresa}`);
            respuesta = promise.then((response) => response);
            return respuesta;
        },

        async cargarDataSucursales(idEmpresa) {

            const promise = axios.get(`${this.dom.server}/empresa/cargarDataSucursales/${idEmpresa}`);
            respuesta = promise.then((response) => response);
            return respuesta;
        },

        // FIN CARGAR DATOS EMPRESA Y SUCURSAL

        // SANTIAGO CAMPUZANO CARGAR DATOS SUCURSAL_MODAL

        async executecargarDataSucursalModal(index,dataSucursalModal) {

                this.dataSucursales.indexSucursal = index,
                this.dataSucursales.idEmpresa = dataSucursalModal.idEmpresa,
                this.dataSucursales.idSucursal = dataSucursalModal.idSucursal,
                this.dataSucursales.numEstablecimento = dataSucursalModal.numEstablecimento,
                this.dataSucursales.nombreComercialSucursal = dataSucursalModal.nombreComercialSucursal,
                this.dataSucursales.direccionEstablecimiento = dataSucursalModal.direccionEstablecimiento,
                this.dataSucursales.facturacionElectronica = dataSucursalModal.facturacionElectronica,
                this.dataSucursales.celularSucursal = dataSucursalModal.celularSucursal,
                this.dataSucursales.correoSucursal = dataSucursalModal.correoSucursal,
                this.dataSucursales.mensajeSucursal = dataSucursalModal.mensajeSucursal


        },

        // FIN CARGAR SUCURSAL_MODAL

        // SANTIAGO CAMPUZANO CARGAR DROPZONE FIRMA

        async CargarDropZoneFirma(idEmpresa,numDocumento,nombreFirma) {

            app.dataEmpresa.auxIdfirma = numDocumento;
            var nombre = nombreFirma.split(' ');
            var nombrefin = app.dataEmpresa.auxIdfirma+'_'+nombre[0] +'_'+nombre[1] +'_'+ nombre[2] +'_'+ nombre[3];

            for ( i = 0; i < nombre.length; i++) {

                var auxNombre =+ nombre +'_';

            }

            app.dataEmpresa.auxNombreFirma = nombreFirma

            if (!$("#kt_dropzonejs_example_1").hasClass("dz-clickable")){
                myDropZone = new Dropzone("#kt_dropzonejs_example_1", {
                    url: `${this.dom.server}/empresa/subirFirmaEmpresa`,
                    paramName: 'file',
                    maxFilesize: 25, // MB
                    maxFiles: 1,
                    addRemoveLinks: true,
                    dictDefaultMessage: 'Drag an image here to upload, or click to select one',
                    acceptedFiles: '.p12, .pfx ',
                    headers: {
                        'x-csrf-token': "XYZ123",
                    },
                    init: function() {
                        var wrapperThis = this;
                        var cerrarForm = document.querySelector("#btnCancelar");
                        var editarForm = document.querySelector("#btnActualizar");
                        // var cerrarModalSup = document.querySelector("#btnSupCerrarModalImagen");
                        // var modal = document.querySelector("#btnSupCerrarModalImagen");
                        this.on("addedfile", function(file) {

                            cerrarForm.addEventListener("click", () => {
                                wrapperThis.removeFile(file);
                            });

                            editarForm.addEventListener("click", () => {
                                wrapperThis.removeFile(file);
                            });
                        });
                        this.on('success', function(file, resp) {
                            app.mensajeToastExito(resp.mensaje);
                        });
                        this.on('thumbnail', function(file) {
                            // if (file.accepted !== false) {
                            //     if (file.width < 640 || file.height < 480) {
                            //         file.rejectDimensions();
                            //     } else {
                            //         file.acceptDimensions();
                            //     }
                            // }
                        });
                        this.on("sending", function(file, xhr, data) {
                            data.append("idEmpresa", idEmpresa);
                            data.append("nombrefin", nombrefin);
                        });
                        this.on("load", function (file){
                            wrapperThis.removeFile(file);
                        });
                    },
                    accept: function(file, done) {
                        done();
                        // file.acceptDimensions = done;
                        // file.rejectDimensions = function() {
                        //     done('The image must be at least 640 x 480px');
                        // };
                    }
                });
            }

        },

        // FIN CARGAR DROPZONE FIRMA

        // SANTIAGO CAMPUZANO CABIAR ESTADO

        // anular proveedor estado
        async confirmacionAnularEmpresa(idEmpresa, nombre) {

            Swal.fire({
                html: ' ¿ Está seguro que desea cambiar el estado de la empresa: <span class="badge badge-success"> ' + nombre + '</span>   a Inactivo ?',
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
                    this.executeAnularEmpresa(idEmpresa);
                }
            })


        },


        async executeAnularEmpresa(idEmpresa) {

            var listado = document.querySelector("#viewFormulario");
            var blockUI = new KTBlockUI(listado, {
                message: '<div class="blockui-message"><span class="spinner-border text-primary"></span>Cambiando Estado...</div>',
                overlayClass: 'bg-dark bg-opacity-25',
            });
            blockUI.block();

            const response = await this.anularEmpresa(idEmpresa);

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

        async anularEmpresa(idEmpresa) {
            const promise = axios.get(`${this.dom.server}/empresa/anularEmpresa/${idEmpresa}`);
            respuesta = promise.then((response) => response);
            return respuesta;
        },
        // fin anular proveedor estado

        // activar proveedor estado
        async confirmacionActivarEmpresa(idEmpresa, nombre) {

            Swal.fire({
                html: ' ¿ Está seguro que desea cambiar el estado de la empresa: <span class="badge badge-success"> ' + nombre + '</span>   a Activo ?',
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
                    this.executeActivarEmpresa(idEmpresa);
                }
            })


        },


        async executeActivarEmpresa(idEmpresa) {

            var listado = document.querySelector("#viewFormulario");
            var blockUI = new KTBlockUI(listado, {
                message: '<div class="blockui-message"><span class="spinner-border text-primary"></span>Cambiando Estado...</div>',
                overlayClass: 'bg-dark bg-opacity-25',
            });
            blockUI.block();

            const response = await this.activarEmpresa(idEmpresa);

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

        async activarEmpresa(idEmpresa) {
            const promise = axios.get(`${this.dom.server}/empresa/activarEmpresa/${idEmpresa}`);
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
                    confirmButton: "btn btn-primary"
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

}).mount("#ViewEmpresa");
