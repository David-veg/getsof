var app = Vue.createApp({
    data() {
        return {

            dataNotaCredito: {
                idNotaCredito: false,
                idTipoDocumento: 1005,
                numDocumentoNC: "",
                idCliente: "",
                Cliente: "",
                idVendedor: "",
                vendedor: "",
                idVenta: null,
                numEstablecimientoFactura: "",
                serieFactura: "",
                numCorrelativoFactura: "",
                fechaEmisionFactura: "",
                numAutorizacionFactura: "",
                totalFactura: 0,
                fechaNC: "",
                totalFactNC: "",
                impCreditoNC: "",
                saldoNC: "0,00",
                idPuntoEmision: null,
                correlativo: "",
                numAutorizacoinNC: "",
                observacionNC: "",
                motivoAnulacionNC: "",
                estadoNC: "",
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
                arrayItemsNC:[],
                arrayPagoNC: []

            },

            dataVenta:{
                facturas: []
            },

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
                auxGrid: false,
                estadoEntrega: true,
                fechaEntrega: true,
                server: false


            },

            datosGenerales: {
                listaNotasCredito: []
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
        this.executeListarNotasCredito();

    },

    updated() {
      let sub12 = 0.00;
      let sub0 = 0.00;
      let subSinImp = 0.00;
      let descuento = 0.00;
      let iva12 = parseFloat(0.00);
      if (this.dataNotaCredito.arrayItemsNC.length > 0){
      for (var [i, element] of Object.entries(this.dataNotaCredito.arrayItemsNC)) {
          //console.log(this.$refs.Pdcto.focu)
          //console.log()
          //(element.Pdcto == '') ? element.Pdcto = 0 : element.Pdcto = element.Pdcto;
          if ((document.activeElement === this.$refs.Pdcto[i]) || (document.activeElement === this.$refs.Cant[i])) {
                  element.Tdcto = (element.Cantidad * element.Precio) * parseFloat(element.Pdcto || 0.00) / 100;
                  element.Total = (element.Cantidad * element.Precio) * ((100 - parseFloat(element.Pdcto || 0.00)) / 100);
          }
          //if(document.activeElement === this.$refs.Tdcto[i]) { element.Pdcto = (element.Total == 0) ? 0.00 : (parseFloat(element.Tdcto) * 100 / parseFloat(element.Total)).toFixed(2) || 0.00 }
          //if(document.activeElement === this.$refs.Pdcto[i]) { element.Tdcto = (parseFloat(element.Pdcto) / 100 * parseFloat(element.Total)).toFixed(2) || 0.00 }

          ////element.Pdcto = parseFloat(element.Tdcto) * 100 / parseFloat(element.Total);
          ////element.Tdcto = parseFloat(element.Total) * parseFloat(element.Pdcto) / 100;
          sub12 += (element.codIva == 2) ? parseFloat(element.Total) || 0.00 : 0.00;
          sub0 += (element.codIva == 0) ? parseFloat(element.Total) || 0.00 : 0.00;
          subSinImp += parseFloat(element.Total) || 0.00;
          descuento += parseFloat(element.Tdcto) || 0.00;
          iva12 += (element.codIva == 2) ? parseFloat((element.Total || 0.00) * (element.iva / 100)) : 0;


          if (!$(this.$refs.cboProducto[i]).data('select2')) {
              $(this.$refs.cboProducto[i]).select2({
                  placeholder: "Buscar una Producto",
                  //minimumInputLength: 2,
                  ajax: {
                      url: `${this.dom.server}/factura/buscarProductos/`,
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
                      this.dataNotaCredito.arrayItemsNC[i].idProducto = ev.target.value;
                      this.dataNotaCredito.arrayItemsNC[i].Producto = ev.target.options[ev.target.selectedIndex].text;

                      let res = await app.cargarDatosProducto('id', ev.target.value);
                      this.dataNotaCredito.arrayItemsNC[i].Codigo = res.data.dataResponse.CODIGO_PRINCIPAL;
                      this.dataNotaCredito.arrayItemsNC[i].codIva = res.data.dataResponse.IVA;
                      this.dataNotaCredito.arrayItemsNC[i].iva = (res.data.dataResponse.IVA == 2) ? 12 : 0.00;
                      this.dataNotaCredito.arrayItemsNC[i].Precio = res.data.dataResponse.VALOR;
                      this.dataNotaCredito.arrayItemsNC[i].Pdcto = 0;
                      this.dataNotaCredito.arrayItemsNC[i].Tdcto = 0;
                  });
              $(this.$refs.cboProducto[i]).html(`<option value="${this.dataNotaCredito.arrayItemsNC[i].idProducto}">${this.dataNotaCredito.arrayItemsNC[i].Producto}</option>`)
          } else {
              $(this.$refs.cboProducto[i]).html(`<option value="${this.dataNotaCredito.arrayItemsNC[i].idProducto}">${this.dataNotaCredito.arrayItemsNC[i].Producto}</option>`)
          }

          //element.Total = ((parseFloat(element.Cantidad) || 0.00) * (parseFloat(element.Precio) || 0.00)) || 0.00;
      }
      }
      this.dataNotaCredito.sub12 = sub12.toFixed(2);
      this.dataNotaCredito.sub0 = sub0.toFixed(2);
      this.dataNotaCredito.subSinImp = subSinImp.toFixed(2);
      this.dataNotaCredito.descuento = descuento.toFixed(2);
      this.dataNotaCredito.iva12 = parseFloat(iva12).toFixed(2) || 0.00;
      this.dataNotaCredito.total = (parseFloat(subSinImp) - parseFloat(descuento) + parseFloat(iva12)).toFixed(2)
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

        async executeListarNotasCredito(){
          const response = await this.listarNotasCredito();
          console.log(response)
          this.datosGenerales.listaNotasCredito = response.data.dataResponse;
        },

        async listarNotasCredito(){
          let body = {};
          const promise = axios.post(`${this.dom.server}/notaCredito/buscarNotasCredito`, body, this.headers);
          return promise.then((response) => response);
        },

        // SANTIAGO CAMPUZANO CARGAR CORRELATIVO PUNTOEMISION
        async executeCargarCorrelaticoPE(idPuntoEmision) {
            const response = await this.cargarCorrelaticoPE(idPuntoEmision);
            this.dataNotaCredito.puntoENC = response.data.dataResponse[0].CORRELATIVO_FINAL;
        },

        async cargarCorrelaticoPE(idPuntoEmision){
            const promise = axios.get(`${this.dom.server}/notaCredito/cargarCorrelaticoPE/${idPuntoEmision}`, this.headers);
            return  promise.then((response) => response);
        },
        // FIN CARGAR CORRELATIVO PUNTOEMISION

        // SANTIAGO CAMPUZANO CARGAR PUNTOEMISION
        async executeCargarPuntoEmision() {
            const response = await this.cargarPuntoEmision();
            this.datosGenerales.puntosEmision = response.data.dataResponse.puntosEmision;
            this.dataNotaCredito.idPuntoEmision = response.data.dataResponse.puntoEmisionDefault;
            this.dataNotaCredito.correlativo = response.data.dataResponse.correlativo;
             },

        async cargarPuntoEmision(){
            const promise = axios.get(`${this.dom.server}/notaCredito/cargarPuntoEmision/${this.dataNotaCredito.idTipoDocumento}`, this.headers);
            return  promise.then((response) => response);

        },
        // FIN CARGAR PUNTOEMISION

        async validarCreacionNotaCredito() {
            if (!this.dataNotaCredito.idNotaCredito) {
                this.executeCrearNotaCredito();
            } else {
                this.executeActualizarNotaCredito();
            }
        },

        async executeCrearNotaCredito(){
            var idFormulario = document.querySelector("#viewFormulario");
            var blockUI = new KTBlockUI(idFormulario, {
                message: '<div class="blockui-message"><span class="spinner-border text-primary"></span>Procesando...</div>',
                overlayClass: 'bg-dark bg-opacity-25',
            });
            blockUI.block();
            this.dom.nombreBotonRegistrar = 'Enviando..'
                //bloqueo Fromulario
            const response = await this.crearNotaCredito();
            if (response.data.success) {
                this.mensajeSweetAlertExito(response.data.mensaje);

                //this.ocultarFormulario();

                blockUI.release();
                blockUI.destroy();
                //this.dom.nombreBotonRegistrar = 'Registrar'
            } else {
                this.mensajeSweetAlertError(response.data.mensaje);
                blockUI.release();
                blockUI.destroy();
                //this.dom.nombreBotonRegistrar = 'Registrar'
            }
        },

        async crearNotaCredito(){
            let body = { dataNotaCredito: this.dataNotaCredito }
            const promise = axios.post(`${this.dom.server}/notaCredito/crearNotaCredito`, body, this.headers);
            respuesta = promise.then((response) => response);
            return respuesta;
        },

        // listar facturas
        async executeCargarListadoFactura(){
            const response = await this.cargarListadoFactura();
            this.dataVenta.facturas = response.data.dataResponse;
          },

          async cargarListadoFactura() {
              let body = {datosBusqueda: this.datosBusqueda};
              const promise = axios.post(`${this.dom.server}/notaCredito/buscaFacturas`, body, this.headers);
              return promise.then((response) => response);
          },
        // fin listar facturas

        async executeAgregarFactura(idVenta, indDetalle){
          const response = await this.agregarFactura(idVenta, indDetalle);
          this.dataNotaCredito.arrayItemsNC = [];
          this.dataNotaCredito.arrayPagoNC = [];
          if (response.data.success){
            this.dataNotaCredito.idCliente = response.data.dataResponse.dataVenta.ID_CLIENTE;
            this.dataNotaCredito.Cliente = response.data.dataResponse.dataVenta.CLIENTE;
            this.dataNotaCredito.idVendedor = response.data.dataResponse.dataVenta.ID_VENDEDOR;
            this.dataNotaCredito.vendedor = response.data.dataResponse.dataVenta.VENDEDOR;
            this.dataNotaCredito.idVenta = response.data.dataResponse.dataVenta.ID_VENTA;
            this.dataNotaCredito.numEstablecimientoFactura = response.data.dataResponse.dataVenta.NUM_ESTABLECIMIENTO;
            this.dataNotaCredito.serieFactura = response.data.dataResponse.dataVenta.SERIE;
            this.dataNotaCredito.numCorrelativoFactura = response.data.dataResponse.dataVenta.NUM_CORRELATIVO;
            this.dataNotaCredito.fechaEmisionFactura = response.data.dataResponse.dataVenta.FECHA_EMISION;
            this.dataNotaCredito.numAutorizacionFactura = response.data.dataResponse.dataVenta.CLAVE_ACCESO;
            this.dataNotaCredito.totalFactura = response.data.dataResponse.dataVenta.IMP_TOTAL;
            $(this.$refs.cboVendedor).html(`<option value="${response.data.dataResponse.dataVenta.ID_VENDEDOR}">${response.data.dataResponse.dataVenta.VENDEDOR}</option>`)
            if (indDetalle){
              for (var [i, element]  of Object.entries(response.data.dataResponse.detalleVenta)) {
                let dataProductosNuevo = {
                    Codigo: element.CODIGO_PRINCIPAL,
                    Producto: element.DES_PRODUCTO,
                    idProducto: element.ID_PROD_SERV,
                    Cantidad: element.CANTIDAD,
                    codIva: element.COD_IVA,
                    iva: element.IVA,
                    Precio: element.PRECIO,
                    Pdcto: element.PTJE_DCTO,
                    Tdcto: element.TOTAL_DCTO,
                    Total: element.PRECIO_TOTAL
                }
                this.dataNotaCredito.arrayItemsNC.push(dataProductosNuevo);
              }
            }

            for (var [i, formaPago]  of Object.entries(response.data.dataResponse.detalleFormaPago)) {
              data = {
                  codigo: formaPago.COD_FORMA_PAGO,
                  valor: formaPago.IMP_TOTAL
              }
              this.dataNotaCredito.arrayPagoNC.push(data);
            }
            //this.estadoNC = response.data.dataVenta. ;
            //this.sub12 = response.data.dataVenta. ;
            //this.sub0 = response.data.dataVenta. ;
            //this.subNo = response.data.dataVenta. ;
            //this.subEx = response.data.dataVenta. ;
            //this.subSinImp = response.data.dataVenta. ;
            //this.descuento = response.data.dataVenta. ;
            //this.iva12 = response.data.dataVenta. ;
            //this.ice = response.data.dataVenta. ;
            //this.irbpnr = response.data.dataVenta. ;
            //this.propina = response.data.dataVenta. ;
            //this.total = response.data.dataVenta. ;
          }
        },

        async agregarFactura(idVenta, indDetalle) {
            const promise = axios.get(`${this.dom.server}/notaCredito/agregarFactura/${idVenta}/${indDetalle}`, this.headers);
            return promise.then((response) => response);
        },

        // cargar select2Usuario

        async executeCargarUsuario() {
            if (!$(this.$refs.cboUsuario).data('select2')) {
                $(this.$refs.cboUsuario)
                    .select2({
                        placeholder: "Buscar un Usuario",
                        //minimumInputLength: 2,
                        ajax: {
                            url: `${this.dom.server}/notaCredito/buscarCliente/`,
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
            }
        },
        // fin cargar select2Usuario

        // cargar buscarDataCliente
        async executeBuscarDataCliente() {
            let numDocumento = this.dataNotaCredito.numDocumentoNC;
            const response = await this.buscarDataCliente(numDocumento, false);
            if (response.data.dataResponse) {
                this.dataNotaCredito.idClienteNC = response.data.dataResponse.ID_CLIENTE;
            this.dataNotaCredito.ClienteNC = response.data.dataResponse.NOMBRE;
            $(this.$refs.cboCliente).html(`<option value="${response.data.dataResponse.ID_CLIENTE}">${response.data.dataResponse.NOMBRE}</option>`)
            this.abrirModalFacturas();
            } else if(this.dataNotaCredito.numDocumentoNC == ''){
                this.dataNotaCredito.idClienteNC = '';
            this.dataNotaCredito.ClienteNC = '';
                $(this.$refs.cboCliente).html(`<option value=""> </option>`)
            } else {
                this.abrirModalRegistroCliente();
            }

        },

        async buscarDataCliente(numDocumento, idCliente) {
            if (numDocumento) {
                const promise = axios.get(`${this.dom.server}/notaCredito/buscarDataCliente/D/${numDocumento}`);
                return promise.then((response) => response);
            } else {
                const promise = axios.get(`${this.dom.server}/notaCredito/buscarDataCliente/I/${idCliente}`);
                return promise.then((response) => response);
            }
        },
        // fin cargar Datacliente

        // cargar select2Cliente

        async executeCargarCliente() {
            if (!$(this.$refs.cboCliente).data('select2')) {
                $(this.$refs.cboCliente)
                    .select2({
                        placeholder: "Buscar un Cliente",
                        //minimumInputLength: 2,
                        ajax: {
                            url: `${this.dom.server}/notaCredito/buscarCliente/`,
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
                        app.dataNotaCredito.idClienteNC = ev.target.value;
                        app.dataNotaCredito.ClienteNC = ev.target.options[ev.target.selectedIndex].text;
                        let res = await app.buscarDataCliente(false, ev.target.value);
                        app.dataNotaCredito.numDocumentoNC = res.data.dataResponse.NUM_DOCUMENTO;
                        this.abrirModalFacturas();
                    });
            }
        },
        // fin cargar select2Cliente

        // SANTIAGO CAMPUZANO CARGAR VENDEDORES
        async executeCargarVendedor() {
            if (!$(this.$refs.cboVendedor).data('select2')) {
                $(this.$refs.cboVendedor)
                    .select2({
                        allowClear: true,
                        placeholder: "Buscar un Vendedor",
                        //minimumInputLength: 2,
                        ajax: {
                            url: `${this.dom.server}/factura/cargarVendedor/`,
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
                        app.dataFactura.idVendedor = ev.target.value;
                        app.dataFactura.nomVendedor = ev.target.options[ev.target.selectedIndex].text;
                    });
            }
        },

        // FIN CARGAR VENDEDORES

        // funciones frontend para para manipular dom y datos

        async verFormulario() {

          let fecha = new Date();
          fecha.getDate();
          this.dataNotaCredito.fechaNC = fecha.toLocaleDateString('en-GB');
            this.dom.mostrarFomulario = true;
            this.dom.mostarListado = false;
            this.dom.mostarBusqueda = false;
            this.dom.mostrarBtns = false;
            this.executeCargarCliente();
            this.executeCargarVendedor();
            this.executeCargarPuntoEmision();

            $(this.$refs.txtFechaEmisionFactura).daterangepicker({
                singleDatePicker: true,
                showDropdowns: true,
                minYear: 1901,
                maxYear: parseInt(moment().format("YYYY"), 10),
                locale: {
                    format: "DD/MM/yyyy"
                }
            }, function (start, end, label) {
                fecha = new Date(start).toLocaleDateString('en-GB');
                app.dataNotaCredito.fechaEmisionFactura = fecha;
              }
            );

            $(this.$refs.fechaEmisionNC).daterangepicker({
                singleDatePicker: true,
                showDropdowns: true,
                minYear: 1901,
                maxYear: parseInt(moment().format("YYYY"), 10),
                locale: {
                    format: "DD/MM/yyyy"
                }
            }, function (start, end, label) {
                fecha = new Date(start).toLocaleDateString('en-GB');
                app.dataNotaCredito.fechaNC = fecha;
              }
            );
        },

        async ocultarFormulario() {
            this.dom.mostrarFomulario = false;
            this.dom.mostarListado = true;
            this.dom.mostarBusqueda = false;
            this.dom.mostrarBtns = true;
            // this.limpiarFormulario();
        },

        async limpiarFormulario() {
                this.dataRemision.idRemision = false,
                this.dataRemision.fechaRemision = "",
                this.dataRemision.pEmisionSelect = "",
                this.dataRemision.pEmisionInput = "",
                this.dataRemision.clienteRemision = "",
                this.dataRemision.fechaIniTrans = "",
                this.dataRemision.fechaFinTrans = "",
                this.dataRemision.trasportistaRemi = "",
                this.dataRemision.rutaRemision = "",
                this.dataRemision.direccionIniRemi = "",
                this.dataRemision.direccionFinRemi = "",
                this.dataRemision.placaVehiculoRemi = "",
                this.dataRemision.motivoTrasladoRemi = "",
                this.dataRemision.observacionRemi = "",
                this.dataRemision.comprobanteRemi = "",
                this.dataRemision.fechaComprobante = "",
                this.dataRemision.numComprobante = "",
                this.dataRemision.estadoEntrega = "",
                this.dataRemision.fechaEntrega = "",
                this.dataRemision.arrayItemsRemision = []
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

        isNumber: function(evt) {
            evt = (evt) ? evt : window.event;
            var charCode = (evt.which) ? evt.which : evt.keyCode;
            if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
                evt.preventDefault();;
            } else {
                return true;
            }
        },

        // arrayItems

        // modal Facturas
        async abrirModalFacturas() {
            this.executeCargarUsuario();
            this.executeCargarListadoFactura();
            $('#facturas').modal({ backdrop: 'static', keyboard: false });
            $("#facturas").modal("show");
        },

        // fin modal Facturas

        // modal registroCliente
        async abrirModalRegistroCliente() {
            $('#ingresoCliente').modal({ backdrop: 'static', keyboard: false });
            $("#ingresoCliente").modal("show");
        },

        // fin modal registroCliente

        // arrayProductos
        async abrirModalDatosAdicionales(idArrayItems) {
            this.dataNotaCredito.idArrayItems = idArrayItems;
            $('#datosAdicionales').modal({ backdrop: 'static', keyboard: false });
            $("#datosAdicionales").modal("show");
            this.cargarModalDatosAdicionales(idArrayItems);
        },

        async cargarModalDatosAdicionales(idArrayItems) {
            this.dataNotaCredito.comentarioItemNC = this.dataNotaCredito.arrayItemsNC[idArrayItems].comentarioItemNC;
            this.dataNotaCredito.descripcionItemNC = this.dataNotaCredito.arrayItemsNC[idArrayItems].descripcionItemNC;
        },

        agregarArrayProducto(){
          let dataProductosNuevo = {
              Codigo: "",
              Producto: "",
              idProducto: "",
              Cantidad: "",
              codIva: 0,
              iva: 0,
              Precio: 0.00,
              Pdcto: 0.00,
              Tdcto: 0.00,
              Total: 0.00
          }
          this.dataNotaCredito.arrayItemsNC.push(dataProductosNuevo);//añadimos el la variable empresa al array
        },

        agregarDetalles(){
            let id = this.dataNotaCredito.idArrayItems;
            this.dataNotaCredito.arrayItemsNC[id].comentarioItemNC = this.dataNotaCredito.comentarioItemNC;
            this.dataNotaCredito.arrayItemsNC[id].descripcionItemNC  = this.dataNotaCredito.descripcionItemNC;
        },

        removeArrayProducto(id){
            id > -1 && this.dataNotaCredito.arrayItemsNC.splice(parseInt(id), 1);
        },

    //   arrayPago

    async abrirModalDatosAdicionales(idArrayPago) {
        this.dataNotaCredito.idArrayPago = idArrayPago;
        $('#datosAdicionales').modal({ backdrop: 'static', keyboard: false });
        $("#datosAdicionales").modal("show");
        this.cargarModalDatosAdicionales(idArrayPago);
    },

    async cargarModalDatosAdicionales(idArrayPago) {
        this.dataNotaCredito.comentarioItemNC = this.dataNotaCredito.arrayItemsNC[idArrayPago].comentarioItemNC;
        this.dataNotaCredito.descripcionItemNC = this.dataNotaCredito.arrayItemsNC[idArrayPago].descripcionItemNC;
    },

    agregarArrayPago(){
        var pago = {
            idPago: "",
            formaPago: "",
            cajaBanctarjPago: "",
            numOper: "",
            plazoPago: "",
            fechaPago: "",
            valorPago: ""
        }
        this.dataNotaCredito.arrayPagoNC.push(pago);//añadimos el la variable empresa al array
  },

  removeArrayPago(id){
    id > -1 && this.dataNotaCredito.arrayPagoNC.splice(parseInt(id), 1);
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

}).mount("#ViewNotaCredito");
