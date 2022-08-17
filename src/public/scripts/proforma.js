var app = Vue.createApp({
    data() {
        return {

            dataProforma: {
                idProforma: false,
                numDocumento: "",
                idClienteProf: "",
                clienteProforma: "",
                idVendedorProf: "",
                vendedorProforma: "",
                fechaEmiProforma: "",
                formaPagoProforma: "",
                vigenciaProforma: "",
                tEntregaProforma: "",
                valoProforma: (0.00).toFixed(2),
                observacionProforma: "",
                identificadorProforma: "",
                estadoProforma: "",

                // items-Table
                sub12: 0.00,
                sub0: 0.00,
                subNo: (0.00).toFixed(2),
                subEx: (0.00).toFixed(2),
                subSinImp: 0.00,
                descuento: 0.00,
                iva12: 0.00,
                ice: (0.00).toFixed(2),
                irbpnr: (0.00).toFixed(2),
                propina: (0.00).toFixed(2),
                total: 0.00,

                // items-array
                arrayItemsProforma:[],
                idArray: ""                

            },

            dataProducto:{
                idProducto: false,
                tipoProd: "",
                categoriaProd: "",
                codPrincipal: "",
                codBarras: "",
                nombreProd: "",
                ivaProd: "",
                valorSinImp: "",
                valorConImp: "",
                chkIrbpnProd: "",
                chkIceProd: "",
                idIcePro: "",
                iceProd: "",
                infAdicional: ""
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
                estadoEntrega: true,
                fechaEntrega: true,
                server: false,
                selectIce: false


            },

            datosGenerales: {
                idEmpresa: false,
                idSucursal: false,
                idUsuario: "",
                idSession: "",
                token: "",
                perfiles: false,
                arrayEmpresasAgregadas: [],
                vigencias: "",
                categorias: false,
                listaIva: false,
                listaIsecProServ: false
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
        this.cargarSelect2Producto();      
        this.executeCalculoProforma();  
        // this.dataProforma.comprobanteRemi = this.dataProforma.comprobanteRemi.toUpperCase();                          
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

        // SANTIAGO CAMPUZANO CALCULOS

        async executeCalculoProforma(){
        var sub12 = 0.00;
        var sub0 = 0.00;
        var subSinImp = 0.00;
        var descuento = 0.00;
        var iva12 = 0.00;

        for (var [i, element] of Object.entries(this.dataProforma.arrayItemsProforma)) {
            if ((document.activeElement === this.$refs.dctoProducto[i]) || (document.activeElement === this.$refs.cantProducto[i])) {
                    console.log(element.cantProducto)
                    console.log(element.precioProducto)
                    console.log(element.dctoProducto)
                    console.log((element.cantProducto * element.precioProducto))
                    console.log(((100 - parseFloat(element.dctoProducto)) / 100))
                    console.log((element.cantProducto * element.precioProducto) * ((100 - parseFloat(element.dctoProducto)) / 100))
                    element.dctoTotalProducto = (element.cantProducto * element.precioProducto) * parseFloat(element.dctoProducto || 0.00) / 100;
                    element.totalProducto = (element.cantProducto * element.precioProducto) * ((100 - parseFloat(element.dctoProducto || 0.00)) / 100);
                    console.log(element.totalProducto)
            }
            sub12 += (element.ivaCodProducto == 2) ? parseFloat(element.totalProducto) || 0.00 : 0.00;
            sub0 += (element.ivaCodProducto == 0) ? parseFloat(element.totalProducto) || 0.00 : 0.00;
            subSinImp += parseFloat(element.totalProducto) || 0.00
            descuento += parseFloat(element.dctoTotalProducto) || 0.00
            iva12 += (element.ivaCodProducto == 2) ? (parseFloat(element.totalProducto).toFixed(2) * (parseFloat(element.ivaProducto).toFixed(2) / 100)) : 0;

        }

        this.dataProforma.sub12 = sub12.toFixed(2);
        this.dataProforma.sub0 = sub0.toFixed(2);
        this.dataProforma.subSinImp = subSinImp.toFixed(2);
        this.dataProforma.descuento = descuento.toFixed(2);
        this.dataProforma.iva12 = iva12.toFixed(2);
        this.dataProforma.total = (subSinImp - descuento + iva12).toFixed(2);

        this.dataProforma.valoProforma = this.dataProforma.total;

        },

        // FIN CALCULOS

        // SANTIAGO CAMPUZANO SAVE

        async executeCrearPro() {

            // bloqueo formulario
            var idFormulario = document.querySelector("#viewFormulario");
            var blockUI = new KTBlockUI(idFormulario, {
                message: '<div class="blockui-message"><span class="spinner-border text-primary"></span>Procesando...</div>',
                overlayClass: 'bg-dark bg-opacity-25',
            });
            blockUI.block();

                //bloqueo Fromulario
            const response = await this.crearPro();
            if (response.data.success) {
                this.mensajeSweetAlertExito(response.data.mensaje);
                blockUI.release();
                blockUI.destroy();
                
            } else {


                this.mensajeSweetAlertError(response.data.mensaje);
                blockUI.release();
                blockUI.destroy();
            }
        },

        async crearPro() {
            let body = { dataProducto: this.dataProducto}
            const promise = axios.post(`${this.dom.server}/proforma/crearProServ`, body, this.headers);
            respuesta = promise.then((response) => response);
            return respuesta;
        },

        // FIN SAVE

        // SANTIAGO CAMPUZANO MOSTRAR ICE

        async executeCargarSelectIce(){
            if (this.dataProducto.chkIceProd == false) {
                this.dom.selectIce = false;
                this.dataProducto.iceProd = '';
            }
            if (this.dataProducto.chkIceProd == true) {
                this.dom.selectIce = true;
                this.dataProducto.iceProd = '';
            }
        },

        // FIN MOSTRAR ICE

        // santiago abrir modal 
        async abrirModalProducto() {
            $('#modalProducto').modal({ backdrop: 'static', keyboard: false });
            $("#modalProducto").modal("show");
            this.executeCargarIce();
            this.executeCargarIva();
            this.executeCargarCategoria();
        },
        // fin abrir modal

        // SANTIAGO CAMPUZANO CARGAR ICE
        async executeCargarIce() {
            const response = await this.cargarIce();
            this.datosGenerales.listaIsecProServ = response.data.dataResponse;

             },

        async cargarIce(){
            const promise = axios.get(`${this.dom.server}/proforma/cargarIce`);
            return  promise.then((response) => response);

        },
        // FIN CARGAR ICE

        // SANTIAGO CAMPUZANO CARGAR IVA

        // async cargarIvaCalculo(valorIva){
        //     if (this.dataProducto.ivaProServ == 7) {
        //         this.dataProducto.iva = 0;
        //     }
        //     if (this.dataProducto.ivaProServ == 0) {
        //         this.dataProducto.iva = 0;
        //     }
        //     if (this.dataProducto.ivaProServ == 2) {
        //         this.dataProducto.iva = 12;
        //     }
        //     if (this.dataProducto.ivaProServ == 6) {
        //         this.dataProducto.iva = 0;
        //     }
        // },

        async executeCargarIva() {
            const response = await this.cargarIva();
            this.datosGenerales.listaIva = response.data.dataResponse;
        },
        async cargarIva(){
            const promise = axios.get(`${this.dom.server}/proforma/cargarIva`);
            return  promise.then((response) => response);

        },
        // FIN CARGAR IVA

        // SANTIAGO CAMPUZANO CARGAR CATEGORIAS
        async executeCargarCategoria() {
            const response = await this.cargarCategoria();
            this.datosGenerales.categorias = response.data.dataResponse;

             },
        async cargarCategoria(){
            const promise = axios.get(`${this.dom.server}/proforma/cargarCategoria`);
            return  promise.then((response) => response);

        },
        // FIN CARGAR CATEGORIAS

        // SANTIAGO CAMPUZANO CARGAR LISTA VIGENCIA
        async executeCargarVigencia() {
            const response = await this.cargarVigencia();
            this.datosGenerales.vigencias = response.data.dataResponse;
        },
        async cargarVigencia() {
            const promise = axios.get(`${this.dom.server}/proforma/cargarVigencia`, this.headers);
            respuesta = promise.then((response) => response);
            return respuesta;
        },

        // FIN CARGAR LISTA VIGENCIA


        // santiago campuzano extraer datos del cliente
        
        // cargar buscarDataCliente
        async executeBuscarDataCliente() {
            let numDocumento = this.dataProforma.numDocumento;
            const response = await this.buscarDataCliente(numDocumento, false);
            if (response.data.dataResponse) {
                this.dataProforma.idClienteProf = response.data.dataResponse.ID_CLIENTE;
            this.dataProforma.clienteProforma = response.data.dataResponse.NOMBRE;
            $(this.$refs.cboClienteProfor).html(`<option value="${response.data.dataResponse.ID_CLIENTE}">${response.data.dataResponse.NOMBRE}</option>`)
            } 
        },

        async buscarDataCliente(numDocumento, idCliente) {
            if (numDocumento) {
                const promise = axios.get(`${this.dom.server}/proforma/buscarDataCliente/D/${numDocumento}`);
                return promise.then((response) => response);
            } else {
                const promise = axios.get(`${this.dom.server}/proforma/buscarDataCliente/I/${idCliente}`);
                return promise.then((response) => response);
            }
        },
        // fin cargar Datacliente

        // fin extraer datos cliente

        
        async cargarSelect2Producto(){
            for (let i = 0; i < $(this.$refs.cboProducto).length; i++){
                if(!$(this.$refs.cboProducto[i]).data('select2')){
                  $(this.$refs.cboProducto[i]).select2({
                      
                      placeholder: "Buscar un Producto",
                      //minimumInputLength: 2,
                      ajax: {
                          url: `${this.dom.server}/proforma/buscarProductos/`,
                          headers: this.headers.headers,
                          dataType: "json",
                          delay: 250,
                          processResults: function (data) {
                              return {
                                  results: data.results
                              };
                          },
                          cache: true,
                      }
                  })
                  .on('change', async (ev, args) => {
                      app.dataProforma.arrayItemsProforma[i].idProducto = ev.target.value;
                      app.dataProforma.arrayItemsProforma[i].nombreProducto = ev.target.options[ev.target.selectedIndex].text;
      
                      let res = await app.cargarDatosProducto(ev.target.value);

                        app.dataProforma.arrayItemsProforma[i].codigoProducto = res.data.dataResponse.CODIGO_PRINCIPAL;
                        app.dataProforma.arrayItemsProforma[i].ivaCodProducto = res.data.dataResponse.IVA;
                        app.dataProforma.arrayItemsProforma[i].ivaProducto = (res.data.dataResponse.IVA == 2) ? 12 : 0.00;
                        app.dataProforma.arrayItemsProforma[i].precioProducto = res.data.dataResponse.VALOR;
                        app.dataProforma.arrayItemsProforma[i].dctoProducto = 0;
                        app.dataProforma.arrayItemsProforma[i].dctoTotalProducto = 0;
                  });
                }else{
                    $(this.$refs.cboProducto[i]).html(`<option value="${app.dataProforma.arrayItemsProforma[i].idProducto}">${app.dataProforma.arrayItemsProforma[i].nombreProducto}</option>`)
                }
              }
        },        
            
        // cargar select2Vendedor
        async executeCargarVendedor() {
            if (!$(this.$refs.cboVendedor).data('select2')) {
                $(this.$refs.cboVendedor)
                    .select2({
                        allowClear: true,
                        placeholder: "Buscar un Vendedor",
                        //minimumInputLength: 2,
                        ajax: {
                            url: `${this.dom.server}/proforma/cargarVendedor/`,
                            headers: this.headers.headers,
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
                        app.dataProforma.idVendedorProf = ev.target.value;
                        app.dataProforma.vendedorProforma = ev.target.options[ev.target.selectedIndex].text;
                    });
            }
        },
        // fgin selec2Vendedor

        // cargar select2Cliente
        async cboCliente(){
            for (let i = 0; i < $(this.$refs.cboClienteProfor).length; i++){
                if(!$(this.$refs.cboClienteProfor).data('select2')){
                  $(this.$refs.cboClienteProfor).select2({
                    allowClear: true,
                    placeholder: "Buscar un Cliente",
                    //minimumInputLength: 2,
                    ajax: {
                        url: `${this.dom.server}/proforma/buscarCliente/`,
                        headers: this.headers.headers,
                        dataType: "json",
                        delay: 250,
                        processResults: function (data) {
                            return {
                                results: data.results
                            };
                        },
                        cache: true,
                    }
                })                              
                .on('change', async (ev, args) => {
                    app.dataProforma.idClienteProf = ev.target.value;
                    app.dataProforma.clienteProforma = ev.target.options[ev.target.selectedIndex].text;
                    let res = await app.buscarDataCliente(false, ev.target.value);
                    app.dataProforma.numDocumento = res.data.dataResponse.NUM_DOCUMENTO;
                });
                }
            }  
        },

        // cargar select2Cliente busqueda
        async cboClienteBusqueda(){
            for (let i = 0; i < $(this.$refs.busquedaCliente).length; i++){
                if(!$(this.$refs.busquedaCliente).data('select2')){
                  $(this.$refs.busquedaCliente).select2({
                      
                      placeholder: "Buscar un Cliente",
                      //minimumInputLength: 2,
                      ajax: {
                          url: `${this.dom.server}/guiaRemision/buscarCliente/`,
                          headers: this.headers.headers,
                          dataType: "json",
                          delay: 250,
                          processResults: function (data) {
                              return {
                                  results: data.results
                              };
                          },
                          cache: true,
                      }
                  })                              
                    // $(this.$refs.cboClienteRemi).html(`<option value=""></option>`)
                }
              }  
        },
        // fin cargar select2Cliente busqueda


        async montarToken() {
            const tk = document.getElementById('mydiv').dataset.test
            this.headers.headers.token = tk;
            const server = document.getElementById('mydivServ').dataset.test
            this.dom.server = server;
        },

        // cargar select2 producto
        async cargarDatosProducto(idProducto){
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

            let body = { cedula: this.dataTransportista.numDocumento }
            let headers = { headers: { 'Authorization': '199b968f-48d6-4903-a53a-19e1623be7eb' } }
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
            this.dom.mostrarFomulario = true;
            this.dom.mostarListado = false;
            this.dom.mostarBusqueda = false;
            this.dom.mostrarBtns = false;
            this.cboCliente();
            this.executeCargarVendedor();
            this.executeCargarVigencia();

            $(this.$refs.txtFechaEmi).daterangepicker({
                singleDatePicker: true,
                showDropdowns: true,
                minYear: 1901,
                maxYear: parseInt(moment().format("YYYY"), 10),
                locale: {
                    format: "DD/MM/yyyy"
                }
            }, function (start, end, label) {
                fecha = new Date(start).toLocaleDateString('en-CA');
                app.dataProforma.fechaEmiProforma = fecha;
              }
            );

        },
        async ocultarFormulario() {
            this.dom.mostrarFomulario = false;
            this.dom.mostarListado = true;
            this.dom.mostarBusqueda = false;
            this.dom.mostrarBtns = true;
            this.limpiarFormulario();
        },

        async limpiarFormulario() {
                this.dataProforma.idRemision = false,
                this.dataProforma.fechaRemision = "",
                this.dataProforma.pEmisionSelect = "",
                this.dataProforma.pEmisionInput = "",
                this.dataProforma.clienteRemision = "",
                this.dataProforma.fechaIniTrans = "",
                this.dataProforma.fechaFinTrans = "",
                this.dataProforma.trasportistaRemi = "",
                this.dataProforma.rutaRemision = "",
                this.dataProforma.direccionIniRemi = "",
                this.dataProforma.direccionFinRemi = "",
                this.dataProforma.placaVehiculoRemi = "",
                this.dataProforma.motivoTrasladoRemi = "",
                this.dataProforma.observacionRemi = "",
                this.dataProforma.comprobanteRemi = "",
                this.dataProforma.fechaComprobante = "",
                this.dataProforma.numComprobante = "",
                this.dataProforma.estadoEntrega = "",
                this.dataProforma.fechaEntrega = "",                
                this.dataProforma.arrayItemsProforma = []
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

        async lipiarModalTransportista(){
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
                        validators: { notEmpty: { message: "El Número de docuemento es Requerido." } },
                    },
                    nombreTranspor: {
                        validators: { notEmpty: { message: "El Nombre del Transportista es Requerido." } },
                    },                    
                    direccionTranspor: {
                        validators: { notEmpty: { message: "La Direccion del Transportista es Requerido" } }
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
        // FIN VALIDACION SOLO NUMEROS

        // arrayItems

        async abrirModalDatosAdicionales(idArray) {
            this.dataProforma.idArray = idArray;
            $('#datosAdicionales').modal({ backdrop: 'static', keyboard: false });
            $("#datosAdicionales").modal("show");
            this.cargarModalDatosAdicionales(idArray);
        },

        async cargarModalDatosAdicionales(idArray) {
            this.dataProforma.comentarioItemRemi = this.dataProforma.arrayItemsProforma[idArray].comentarioItemRemi;
            this.dataProforma.descripcionItemRemi = this.dataProforma.arrayItemsProforma[idArray].descripcionItemRemi;
        },

        Guardar(){        
            var item = {
                idProducto: "",
                codigoProducto: "",
                nombreProducto: "",
                cantProducto: "",
                ivaCodProducto: 0,
                ivaProducto: 0,
                precioProducto: 0.00,
                dctoProducto: 0.00,
                dctoTotalProducto: 0.00,
                totalProducto: 0.00
            } 
            this.dataProforma.arrayItemsProforma.push(item);//añadimos el la variable empresa al array            
      },

      agregarDetalles(){
          
        let id = this.dataProforma.idArray;
        this.dataProforma.arrayItemsProforma[id].comentarioItemRemi = this.dataProforma.comentarioItemRemi;
        this.dataProforma.arrayItemsProforma[id].descripcionItemRemi  = this.dataProforma.descripcionItemRemi;
      },

      remove(id){
        id > -1 && this.dataProforma.arrayItemsProforma.splice(parseInt(id), 1);
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
        }                
       
    }

}).mount("#ViewProforma");
