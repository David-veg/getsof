
var app = Vue.createApp({
    data() {
        return {

            dataFactura: {
                idVenta: false,
                numDocumentoCliente: '',
                idCliente: '',
                nomCliente: '',
                idVendedor: '',
                nomVendedor: '',
                idTipoDocumento: 4,
                idPuntoEmision: false,
                correlativo: '',
                fechaEmision: '',
                numAutorizacion: '',
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

                nomCliBlured: false,
                nomVenBlured: false,
                numDocBlured: false,
                valid: false
            },

            dataPago:{
                diferenciaPago: (0.00).toFixed(2),
                totalFormaPago: (0.00).toFixed(2)
            },

            dataBusqueda: {
                numFactura: "",
                fechaDesde: "",
                fechaHasta: "",
                idClienteBusqueda: "",
                clienteBusqueda: "",
                idUsuarioBusqueda: "",
                usuarioBusqueda: "",
                tipoDocumento: "",
                estadoRetBusqueda: "",
                estadoBusqueda: ""
            },

            dom: {
                mostrarFomulario: false,
                mostarListado: true,
                mostarBusqueda: false,
                mostrarBtns: true,
                server: false,
                disabled: true
            },

            datosGenerales: {
                tipoDocumento: false,
                listaFacturas: false,
                puntosEmision: false,
                disabled: true
            },

            detalleProductos: [],
            detalleFormasPago: [],

            headers: {
                headers: {
                    token: ""
                }
            }
        }

    },

    //computed: {
    //    productosDetalle: function () {
    //        return JSON.stringify(this.detalleProductos)
    //    }
    //},

    watch: {

        //productosDetalle: {
        //    handler: function (newV, oldV) {
        //        let newValue = JSON.parse(newV);
        //        let oldValue = JSON.parse(oldV);
        //        if (oldValue.length == newValue.length) {
        //            for (var [i, element] of Object.entries(newValue)) {
        //                //if(document.activeElement === this.$refs.Tdcto[i]){
        //                //  (element.Tdcto !== oldValue[i].Tdcto ?? element.Tdcto) ? element.Pdcto = element.Total * 100 / element.Tdcto : console.log('s');
        //                //}
        //                if ((document.activeElement === this.$refs.Pdcto[i]) || (document.activeElement === this.$refs.Cant[i])) {
        //                    if ((element.Pdcto != oldValue[i].Pdcto) || (element.Cantidad != oldValue[i].Cantidad)) {
        //                        console.log(element.Cantidad)
        //                        console.log(element.Precio)
        //                        console.log(element.Pdcto)
        //                        console.log((element.Cantidad * element.Precio))
        //                        console.log(((100 - parseFloat(element.Pdcto)) / 100))
        //                        console.log((element.Cantidad * element.Precio) * ((100 - parseFloat(element.Pdcto)) / 100))
        //                        //this.detalleProductos[i].Total = (element.Cantidad * element.Precio) * ((100 - parseFloat(element.Pdcto)) / 100);
        //                        this.detalleProductos[i].Total = 45610441
        //                        console.log(this.detalleProductos[i].Total)
        //                        this.detalleProductos[i].Tdcto = (element.Cantidad * element.Precio) * parseFloat(element.Pdcto) / 100;
        //                    }
        //                    console.log(this.detalleProductos)
        //                }
        //            }
        //        }
        //    },
        //    deep: true
        //},

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

    mounted() {
        document.onkeypress = this.stopRKey;
        this.montarToken();
        this.executeCargarListadoFactura();
        //this.executeCargarListado(); // carga listado al cargar la pagina
    },

    updated() {
        //console.log(document.activeElement);
        var sub12 = 0.00;
        var sub0 = 0.00;
        var subSinImp = 0.00;
        var descuento = 0.00;
        var iva12 = 0.00;
        for (var [i, element] of Object.entries(this.detalleProductos)) {
            //console.log(this.$refs.Pdcto.focu)
            //console.log()
            //(element.Pdcto == '') ? element.Pdcto = 0 : element.Pdcto = element.Pdcto;
            if ((document.activeElement === this.$refs.Pdcto[i]) || (document.activeElement === this.$refs.Cant[i])) {
                    console.log(element.Cantidad)
                    console.log(element.Precio)
                    console.log(element.Pdcto)
                    console.log((element.Cantidad * element.Precio))
                    console.log(((100 - parseFloat(element.Pdcto)) / 100))
                    console.log((element.Cantidad * element.Precio) * ((100 - parseFloat(element.Pdcto)) / 100))
                    //this.detalleProductos[i].Total = 45610441
                    element.Tdcto = (element.Cantidad * element.Precio) * parseFloat(element.Pdcto || 0.00) / 100;
                    element.Total = (element.Cantidad * element.Precio) * ((100 - parseFloat(element.Pdcto || 0.00)) / 100);
                    console.log(element.Total)
            }
            //if(document.activeElement === this.$refs.Tdcto[i]) { element.Pdcto = (element.Total == 0) ? 0.00 : (parseFloat(element.Tdcto) * 100 / parseFloat(element.Total)).toFixed(2) || 0.00 }
            //if(document.activeElement === this.$refs.Pdcto[i]) { element.Tdcto = (parseFloat(element.Pdcto) / 100 * parseFloat(element.Total)).toFixed(2) || 0.00 }

            ////element.Pdcto = parseFloat(element.Tdcto) * 100 / parseFloat(element.Total);
            ////element.Tdcto = parseFloat(element.Total) * parseFloat(element.Pdcto) / 100;
            sub12 += (element.codIva == 2) ? parseFloat(element.Total) || 0.00 : 0.00;
            sub0 += (element.codIva == 0) ? parseFloat(element.Total) || 0.00 : 0.00;
            subSinImp += parseFloat(element.Total) || 0.00
            descuento += parseFloat(element.Tdcto) || 0.00
            iva12 += (element.codIva == 2) ? (parseFloat(element.Total).toFixed(2) * (parseFloat(element.iva).toFixed(2) / 100)) : 0;

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
                        app.detalleProductos[i].idProducto = ev.target.value;
                        app.detalleProductos[i].Producto = ev.target.options[ev.target.selectedIndex].text;

                        let res = await app.cargarDatosProducto('id', ev.target.value);
                        app.detalleProductos[i].Codigo = res.data.dataResponse.CODIGO_PRINCIPAL;
                        app.detalleProductos[i].codIva = res.data.dataResponse.IVA;
                        app.detalleProductos[i].iva = (res.data.dataResponse.IVA == 2) ? 12 : 0.00;
                        app.detalleProductos[i].Precio = res.data.dataResponse.VALOR;
                        app.detalleProductos[i].Pdcto = 0;
                        app.detalleProductos[i].Tdcto = 0;
                    });

            } else {
                $(this.$refs.cboProducto[i]).html(`<option value="${app.detalleProductos[i].idProducto}">${app.detalleProductos[i].Producto}</option>`)
            }

            //element.Total = ((parseFloat(element.Cantidad) || 0.00) * (parseFloat(element.Precio) || 0.00)) || 0.00;
        }
        this.dataFactura.sub12 = sub12.toFixed(2);
        this.dataFactura.sub0 = sub0.toFixed(2);
        this.dataFactura.subSinImp = subSinImp.toFixed(2);
        this.dataFactura.descuento = descuento.toFixed(2);
        this.dataFactura.iva12 = iva12.toFixed(2);
        this.dataFactura.total = (subSinImp - descuento + iva12).toFixed(2);

        if (this.detalleFormasPago.length == 1) { this.detalleFormasPago[0].valor = this.dataFactura.total; }

        var totalDiferencia = 0.00;
        for (let k = 0; k < this.detalleFormasPago.length; k++) {
            var valorFormaPago = this.detalleFormasPago[k].valor;
            totalDiferencia= parseFloat(totalDiferencia)  + parseFloat(valorFormaPago) ;

        }
        this.dataPago.totalFormaPago = totalDiferencia || 0.00;
        var diferencia = parseFloat(totalDiferencia) - parseFloat(this.dataFactura.total);

        this.dataPago.diferenciaPago = diferencia || 0.00;
    },

    methods: {

        generarPDF(id){
            axios.post(`${this.dom.server}/factura/generar/pdf/${id}`).then(({data:{dataResponse:{url}}})=>{
                if(!url){
                    console.log("Error")
                }
                window.open(`https://docs.google.com/viewerng/viewer?url=${url}`, '_blank');
            })
        },
        generarXML(id){
            axios.post(`${this.dom.server}/factura/generar/xml/${id}`).then(({data:{dataResponse:{url}}})=>{
                if(!url){
                    console.log("Error")
                }
                window.open(`${url}`, '_blank');
            })
        },


      stopRKey(evt) {
        var evt = evt ? evt : event ? event : null;
        var node = evt.target ? evt.target : evt.srcElement ? evt.srcElement : null;
        if (evt.keyCode == 13 && node.type == "text") {
            return false;
        }
        },

        async subirPosicion(i){
            if (i > 0) {

                let posDesp = "";
            posDesp= i-1;

            temp1 = [];
            temp2 = [];

            temp1 = this.detalleProductos[i]
            temp2 = this.detalleProductos[posDesp]

            this.detalleProductos[i] = temp2;
            this.detalleProductos[posDesp] = temp1;
                
            }
        },
        async bajarPosicion(i){
            let posAnt = "";
            posAnt = i+1;
            if (i<this.detalleProductos.length -1) {
                
                temp3 = [];
            temp4 = [];

            temp3 = this.detalleProductos[i];
            temp4 = this.detalleProductos[posAnt]

            this.detalleProductos[i] = temp4;
            this.detalleProductos[posAnt]= temp3;
                
            }
        },

    async executeCargarListadoFactura(){
        const response = await this.cargarListadoFactura();
        this.datosGenerales.listaFacturas = response.data.dataResponse;
    },

    async cargarListadoFactura() {
          let body = {};
          console.log('body')
          console.log(body)
          const promise = axios.post(`${this.dom.server}/factura/buscaFacturas`,body, this.headers);
          console.log(promise.then((response) => response))
          return promise.then((response) => response);
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

        validNumDoc : function(numDoc) {
            if(numDoc != ''){
                return true;
            }
        },

        validNomCli : function(nomCli) {
            if(nomCli != ''){
              return true;
              }
        },

        validNomVen : function(nomVen) {
            if(nomVen != ''){
                return true;
            }
        },

    async validarCreacionFactura() {

            this.dataFactura.numDocBlured = true;
            this.dataFactura.nomCliBlured = true;
            this.dataFactura.nomVenBlured = true;
            if( this.validNumDoc(this.dataFactura.numDocumentoCliente) && this.validNomCli(this.dataFactura.nomCliente) && this.validNomVen(this.dataFactura.nomVendedor)){
                this.dataFactura.valid = true;
            }

            let mensaje = '';
            let auxOP= 0;
            let auxPago = 0;

            for (let p = 0; p < this.detalleProductos.length; p++) {
                
                if (this.detalleProductos[p].Producto == '' || this.detalleProductos[p].Cantidad == '' || this.detalleProductos[p].Precio == '') {
                    auxOP= p+1;
                }
                
            }

            for (let r = 0; r < this.detalleFormasPago.length; r++) {
                if (this.detalleFormasPago[r].valor == '0.00' || this.detalleFormasPago[r].valor == '') {
                    auxPago=r+1;
                }
                
            }

            if (this.dataFactura.numDocumentoCliente == '' || this.dataFactura.nomCliente == '' || this.dataFactura.nomVendedor == '' ||
            this.dataFactura.idTipoDocumento == '' || this.dataFactura.fechaEmision == '') {  

                mensaje = 'Existen campos Vacios en los Datos Generales.'
                this.mensajeToastError(mensaje);
            } else if(auxOP > 0){

                mensaje = 'Existen campos Vacios en los Datos del Producto';
                this.mensajeToastError(mensaje);
                   
            } else if(this.detalleProductos==''){
                mensaje = 'Debe Ingresar Almenos un Producto';
                this.mensajeToastError(mensaje);

            } else if(this.dataPago.diferenciaPago < 0 || this.dataPago.diferenciaPago > 0){

                mensaje = 'Existen una diferencia entre el Total de la Factura y la Forma de Pago.';
                this.mensajeToastError(mensaje);

            } else if(auxPago > 0){

                mensaje = 'Existen Formas de Pago con Valor en Cero.';
                this.mensajeToastError(mensaje);

            } else {
                if (!this.dataFactura.idVenta) {
                    this.executeCrearFactura();
                } else {
                    this.executeActualizarFactura();
                } 
            }
            
    },

        async executeCrearFactura(){
            var idFormulario = document.querySelector("#viewFormulario");
            var blockUI = new KTBlockUI(idFormulario, {
                message: '<div class="blockui-message"><span class="spinner-border text-primary"></span>Procesando...</div>',
                overlayClass: 'bg-dark bg-opacity-25',
            });
            blockUI.block();
            this.dom.nombreBotonRegistrar = 'Enviando..'
                //bloqueo Fromulario
            const response = await this.crearFactura();
            if (response.data.success) {
                this.mensajeSweetAlertExito(response.data.mensaje);
                this.ocultarFormulario();
                blockUI.release();
                blockUI.destroy();
            } else {
                this.mensajeSweetAlertError(response.data.mensaje);
                blockUI.release();
                blockUI.destroy();
            }
        },

        async crearFactura(){
            let body = { dataFactura: this.dataFactura, dataProductos: this.detalleProductos, dataFormasPago: this.detalleFormasPago }
            const promise = axios.post(`${this.dom.server}/factura/crearFactura`, body, this.headers);
            respuesta = promise.then((response) => response);
            return respuesta;
        },

        async executeBuscarDataCliente() {
            let numDocumento = this.dataFactura.numDocumentoCliente;
            const response = await this.buscarDataCliente(numDocumento, false);
            console.log('response')
                console.log(response.data.dataResponse)
            if (response.data.dataResponse) {
                this.dataFactura.idCliente = response.data.dataResponse.ID_CLIENTE;
                this.dataFactura.nomCliente = response.data.dataResponse.NOMBRE;
                $(this.$refs.cboCliente).html(`<option value="${response.data.dataResponse.ID_CLIENTE}">${response.data.dataResponse.NOMBRE}</option>`)
            } else{
                let mensaje = 'El usuario no se encuentra registrado en la empresa.'+' '+'Registrelo!';
                this.mensajeToastError(mensaje);
            }
            
        },

        async buscarDataCliente(numDocumento, idCliente) {
            if (numDocumento) {
                const promise = axios.get(`${this.dom.server}/factura/buscarDataCliente/D/${numDocumento}`, this.headers);
                return promise.then((response) => response);
            } else {
                const promise = axios.get(`${this.dom.server}/factura/buscarDataCliente/I/${idCliente}`, this.headers);
                return promise.then((response) => response);
            }
        },

        agregarProducto() {
            dataProductosNuevo = {
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
            this.detalleProductos.push(dataProductosNuevo);
        },

        quitarProducto(ele) {
            ele > -1 && this.detalleProductos.splice(parseInt(ele), 1);
        },

        async cargarDatosProducto(tipo, info) {
            const promise = axios.get(`${this.dom.server}/factura/cargarDatosProducto/${tipo}/${info}`, this.headers);
            return promise.then((response) => response);
        },

        agregarFormaPago() {
            data = {
                codigo: "01",
                valor: 0.00
            }
            this.detalleFormasPago.push(data);
        },

        quitarformaPago(ele) {
            ele > -1 && this.detalleFormasPago.splice(parseInt(ele), 1);
        },

        async montarToken() {
            const tk = document.getElementById('mydiv').dataset.test
            this.headers.headers.token = tk;
            const server = document.getElementById('mydivServ').dataset.test
            this.dom.server = server;
        },

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
            this.datosGenerales.listaFacturas = response.data.dataResponse;

            if (response.data.success) {
                blockUI.release();
                blockUI.destroy();
            } else {
                blockUI.release();
                blockUI.destroy();
            }



        },

        async cargarListadoFiltro() {
            let body = {numFactura: this.dataBusqueda.numFactura,
                fechaDesde: this.dataBusqueda.fechaDesde,
                fechaHasta: this.dataBusqueda.fechaHasta,
                idClienteBusqueda: this.dataBusqueda.idClienteBusqueda,
                idUsuarioBusqueda: this.dataBusqueda.idUsuarioBusqueda,
                tipoDocumento: this.dataBusqueda.tipoDocumento,
                estadoBusqueda: this.dataBusqueda.estadoBusqueda,
                estadoRetBusqueda: this.dataBusqueda.estadoRetBusqueda};
            const promise = axios.post(`${this.dom.server}/factura/listarFiltros`, body, this.headers);
            respuesta = promise.then((response) => response);
            console.log('filtros')
            console.log(promise.then((response) => response))
            return respuesta;
        },

        // FIN BUSQUEDA FILTROS

        // cargar select2Cliente

        async executeCargarClienteBusqueda() {
            if (!$(this.$refs.cboClienteBusqueda).data('select2')) {
                $(this.$refs.cboClienteBusqueda)
                    .select2({
                        allowClear: true,
                        placeholder: "Buscar un Cliente",
                        //minimumInputLength: 2,
                        ajax: {
                            url: `${this.dom.server}/factura/cargarCliente/`,
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
                        app.dataBusqueda.idClienteBusqueda = ev.target.value;
                        app.dataBusqueda.clienteBusqueda = ev.target.options[ev.target.selectedIndex].text;
                    });
            }
        },
        // fin cargar select2Cliente

        // cargar select2Usuario

        async executeCargarUsuarioBusqueda() {
            if (!$(this.$refs.cboUsuarioBusqueda).data('select2')) {
                $(this.$refs.cboUsuarioBusqueda)
                    .select2({
                        allowClear: true,
                        placeholder: "Buscar un Usuario",
                        //minimumInputLength: 2,
                        ajax: {
                            url: `${this.dom.server}/factura/cargarUsuario/`,
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
                        app.dataBusqueda.idUsuarioBusqueda = ev.target.value;
                        app.dataBusqueda.usuarioBusqueda = ev.target.options[ev.target.selectedIndex].text;
                    });
            }
        },
        // fin cargar select2Usuario

        async verFormulario() {

          let fecha = new Date();
          fecha.getDate();
          this.dataFactura.fechaEmision = fecha.toLocaleDateString('en-CA');

          this.executeCargarTipoDocumento();
          this.executeCargarCliente();
          this.executeCargarVendedor();
          this.agregarProducto();
          this.agregarFormaPago();
          this.executeCargarPuntoEmision();

          this.dom.mostrarFomulario = true;
          this.dom.mostarListado = false;
          this.dom.mostarBusqueda = false;
          this.dom.mostrarBtns = false;
          $(this.$refs.txtFechaEmision).daterangepicker({
              singleDatePicker: true,
              showDropdowns: true,
              minYear: 1901,
              maxYear: parseInt(moment().format("YYYY"), 10),
              locale: {
                  format: "yyyy/MM/DD"
              }
          }, function (start, end, label) {
              fecha = new Date(start).toLocaleDateString('en-CA');
              app.dataFactura.fechaEmision = fecha;
            }
          );
        },

        async executeCargarPuntoEmision(){
          const response = await this.cargarPuntoEmision();
          this.datosGenerales.puntosEmision = response.data.dataResponse.puntosEmision;
          this.dataFactura.idPuntoEmision = response.data.dataResponse.puntoEmisionDefault;
          this.dataFactura.correlativo = response.data.dataResponse.correlativo;
        },

        async cargarPuntoEmision() {
          const promise = axios.get(`${this.dom.server}/factura/cargarPuntoEmision/${this.dataFactura.idTipoDocumento}`, this.headers);
          return promise.then((response) => response);
        },

        async executeCargarTipoDocumento() {
            const response = await this.cargarTipoDocumento();
            this.datosGenerales.tipoDocumento = response.data.dataResponse;
        },
        async cargarTipoDocumento() {
            const promise = axios.get(`${this.dom.server}/factura/cargarTipoDocumento`);
            return promise.then((response) => response);
        },

        async executeCargarCliente() {
            if (!$(this.$refs.cboCliente).data('select2')) {
                $(this.$refs.cboCliente)
                    .select2({
                        allowClear: true,
                        placeholder: "Buscar un Cliente",
                        //minimumInputLength: 2,
                        ajax: {
                            url: `${this.dom.server}/factura/cargarCliente/`,
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
                        app.dataFactura.idCliente = ev.target.value;
                        app.dataFactura.nomCliente = ev.target.options[ev.target.selectedIndex].text;
                        let res = await app.buscarDataCliente(false, ev.target.value);
                        console.log(res);
                        app.dataFactura.numDocumentoCliente = res.data.dataResponse.NUM_DOCUMENTO;
                    });
            }
        },

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

        async ocultarFormulario() {
            this.dom.mostrarFomulario = false;
            this.dom.mostarListado = true;
            this.dom.mostarBusqueda = false;
            this.dom.mostrarBtns = true;
            this.limpiarFormulario();
        },

        async limpiarFormulario() {
                this.dataFactura.idVenta = false;
                this.dataFactura.numDocumentoCliente = '';
                this.dataFactura.idCliente = '';
                this.dataFactura.nomCliente = '';
                this.dataFactura.idVendedor = '';
                this.dataFactura.nomVendedor = '';
                this.dataFactura.idTipoDocumento = 4;
                this.dataFactura.idPuntoEmision = '';
                this.dataFactura.fechaEmision = '';
                this.dataFactura.numAutorizacion = '';
                this.dataFactura.sub12 = 0.00;
                this.dataFactura.sub0 = 0.00;
                this.dataFactura.subNo = (0.00).toFixed(2);
                this.dataFactura.subEx = (0.00).toFixed(2);
                this.dataFactura.subSinImp = 0.00;
                this.dataFactura.descuento = 0.00;
                this.dataFactura.iva12 = 0.00;
                this.dataFactura.ice = (0.00).toFixed(2);
                this.dataFactura.irbpnr = (0.00).toFixed(2);
                this.dataFactura.propina = (0.00).toFixed(2);
                this.dataFactura.total = 0.00;
                this.detalleProductos = [];
                this.detalleFormasPago = [];

                $(this.$refs.cboCliente).empty("change");
                $(this.$refs.cboVendedor).empty("change");
        },

        async verFiltro() {
            this.dom.mostrarFomulario = false;
            this.dom.mostrarBtns = false;
            this.dom.mostarListado = true;
            this.dom.mostarBusqueda = true;

            this.executeCargarClienteBusqueda();
            this.executeCargarUsuarioBusqueda();
            this.executeCargarTipoDocumento();

            $(this.$refs.txtFechaIni).daterangepicker({
                singleDatePicker: true,
                showDropdowns: true,
                minYear: 1901,
                maxYear: parseInt(moment().format("YYYY"), 10),
                locale: {
                    format: "DD/MM/yyyy"
                }
            }, function (start, end, label) {
                fecha = new Date(start).toLocaleDateString('en-CA');
                app.dataBusqueda.fechaDesde = fecha;
              }
            );

            $(this.$refs.txtFechaFin).daterangepicker({
                singleDatePicker: true,
                showDropdowns: true,
                minYear: 1901,
                maxYear: parseInt(moment().format("YYYY"), 10),
                locale: {
                    format: "DD/MM/yyyy"
                }
            }, function (start, end, label) {
                fecha = new Date(start).toLocaleDateString('en-CA');
                app.dataBusqueda.fechaHasta = fecha;
              }
            );
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

        async executeBuscarProductoCodigo(pos){
            let codigo = this.detalleProductos[pos].Codigo;

            let res = await this.cargarDatosProducto('cod',codigo);
            if (res.data.success){
              this.detalleProductos[pos].idProducto = res.data.dataResponse.ID_PROD_SERV;
              this.detalleProductos[pos].Producto = res.data.dataResponse.NOMBRE_PROD_SERV;
              this.detalleProductos[pos].Codigo = res.data.dataResponse.CODIGO_PRINCIPAL;
              this.detalleProductos[pos].codIva = res.data.dataResponse.IVA;
              this.detalleProductos[pos].iva = (res.data.dataResponse.IVA == 2) ? 12 : 0.00;
              this.detalleProductos[pos].Precio = res.data.dataResponse.VALOR;
              this.detalleProductos[pos].Pdcto = 0;
              this.detalleProductos[pos].Tdcto = 0;
            }else{
              this.mensajeToastError(res.data.mensaje)
            }
        },

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

}).mount("#ViewFactura");
