var app = Vue.createApp({
    data() {
        return {

            dataUsuario: {
                idUsuario: 230,
                nombreUsuario: "",
                correoUsuario: "",
                celularUsuario: "",
                direccionUsuario: "",
                estadoUsuario: "",
                fotoUsuario: "",
                tipoUsuario: "",
                usuario: ""
            },

            dataEmpresas: {
                nombreComercial: "",
                rucEmpresa: "",
                direccionEmpresa: "",
                busquedaEmpresa: "",
                listadoEmpresa: false,
                listadoSucursales: false
            },
            dom:{
                perfilUsuario:'',
                server: false
            },

            headers: {
                headers: {
                    token: "",
                    nombreComercial: "",
                    razonSocial: ""
                }
            }
        }

    },
    updated(){
        this.dataEmpresas.busquedaEmpresa = this.dataEmpresas.busquedaEmpresa.toUpperCase();
    },
    mounted() {
        this.montarToken();
        this.executecargarDataUsuario(this.dataUsuario.idUsuario); // carga data usuario
        this.executeCargarListado(); // carga data usuario

        // this.executecargarDataEmpresa(this.dataUsuario.idUsuario); // carga data usuario

    },
    methods: {

        // SANTIAGO CAMPUZANO FUNCION TECLA ENTER
        validarBusquedaEnter: function (e) {
            if (e.keyCode === 13) {
                this.executeCargarListadoFiltro();
            }
        },

        async montarToken() {
            const tk = document.getElementById('mydiv').dataset.test
            this.headers.headers.token = tk;
            const server = document.getElementById('mydivServ').dataset.test
            this.dom.server = server;
        },
        // SANTIAGO CAMPUZANO BUSQUEDA FILTROS


        async executeCargarListadoFiltro() {

            const response = await this.cargarListadoFiltro();
            this.dataEmpresas.listadoEmpresa = response.data.dataResponse;

        },

        async cargarListadoFiltro() {
            let body = {busquedaEmpresa: this.dataEmpresas.busquedaEmpresa};
            const promise = axios.post(`${this.dom.server}/acceder/listarFiltros`, body, this.headers);
            respuesta = promise.then((response) => response);
            return respuesta;
        },

        // FIN BUSQUEDA FILTROS

        // SANTIAGO CAMPUZANO CARGAR LISTA EMRPESAS
        async executeCargarListado() {
            const response = await this.cargarListado();
            this.dataEmpresas.listadoEmpresa = response.data.dataResponse;
        },

        async cargarListado() {
            const promise = axios.get(`${this.dom.server}/acceder/listar`, this.headers);
            respuesta = promise.then((response) => response);
            return respuesta;
        },

        // FIN CARGAR LISTA EMRPESAS

        // SANTIAGO CAMPUZANO CARGAR DATOS USUARIO

        async executecargarDataUsuario(idUsuario) {
            const response = await this.cargarDataUsuario(idUsuario);
            datos = response.data.dataResponse[0];

            if (response.data.success) {
                if (datos.CORREO == "") {
                    this.dataUsuario.correoUsuario = "---";
                } else {
                    this.dataUsuario.correoUsuario = datos.CORREO
                }

                if (datos.CELULAR == "") {
                    this.dataUsuario.celularUsuario = "---";
                } else {
                    this.dataUsuario.celularUsuario = datos.CELULAR
                }

                if (datos.ID_PERFIL == 1) {
                    this.dom.perfilUsuario = 'Super Administrador';
                } else if (datos.ID_PERFIL == 2) {
                    this.dom.perfilUsuario = 'Administrador';
                } else if (datos.ID_PERFIL == 3) {
                    this.dom.perfilUsuario = 'Contador';
                }

                this.dataUsuario.idUsuario = datos.ID_USUARIO,
                    this.dataUsuario.nombreUsuario = datos.NOMBRE,
                    this.dataUsuario.direccionUsuario = datos.DIRECCION,
                    this.dataUsuario.estadoUsuario = datos.ESTADO,
                    this.dataUsuario.fotoUsuario = datos.FOTO,
                    this.dataUsuario.usuario = datos.USUARIO,
                    this.dataUsuario.tipoUsuario = datos.TIPO_USUARIO

            }

        },

        async cargarDataUsuario(idUsuario) {
            const promise = axios.get(`${this.dom.server}/acceder/cargarDataUsuario`, this.headers);
            respuesta = promise.then((response) => response);
            return respuesta;
        },

        // FIN CARGAR DATOS USUARIO

        // SANTIAGO CAMPUZANO CARGAR DATOS EMPRESA

        async executecargarDataEmpresa(idUsuario) {
            const response = await this.cargarDataEmpresa(idUsuario);
            datos = response.data.dataResponse[0];

            if (response.data.success) {
                this.dataEmpresas.nombreComercial = datos.NOMBRE_COMERCIAL,
                this.dataEmpresas.rucEmpresa = datos.RUC,
                this.dataEmpresas.direccionEmpresa = datos.DIRECCION_MATRIZ
            }
        },

        async cargarDataEmpresa(idUsuario) {
            const promise = axios.get(`${this.dom.server}/acceder/cargarDataEmpresa/${idUsuario}`);
            respuesta = promise.then((response) => response);
            return respuesta;
        },



        async ExecuteValidarEmpresa(idEmpresa) {
            const response = await this.validarEmpresa(idEmpresa);
            if (response.data.success) {
                let razonSocial = response.data.dataResponse.RAZON_SOCIAL;
                let nombreComercial = response.data.dataResponse.NOMBRE_COMERCIAL;
                let imgUsuario = response.data.dataResponse.FOTO;
                let imgSucursal = response.data.dataResponse.LOGO;
                window.location.href = `/cargarDataEmpresa/${razonSocial}/${nombreComercial}/${response.data.token}?imgUsuario=${imgUsuario}&imgSucursal=${imgSucursal}`;
            }
        },

        async validarEmpresa(idEmpresa) {
            const promise = axios.get(`${this.dom.server}/acceder/generarTk/E/${idEmpresa}`, this.headers);
            return promise.then((response) => response);
        },

        // FIN CARGAR DATOS EMPRESA
        async executeListarSucursales(idEmpresa, cantSucursal) {
            const response = await this.listarSucursales(idEmpresa,cantSucursal);
            this.dataEmpresas.listadoSucursales = response.data.dataResponse;
        },

        async listarSucursales(idEmpresa, cantSucursal) {
            const promise = axios.get(`${this.dom.server}/acceder/cargarSucursalesEmpresa/${idEmpresa}`);
            // const promise = axios.get(`this.dom.server/acceder/cargarSucursalesEmpresa/${idEmpresa}/${idSucursal}`, this.headers);
            return promise.then((response) => response);
        },

        async executeCargarDataSucursal(idSucursal){
            const response = await this.cargarDataSucursal(idSucursal);
            console.log(response.data)
            if (response.data.success) {
                let razonSocial = response.data.dataResponse.RAZON_SOCIAL;
                let nombreComercial = response.data.dataResponse.NOMBRE_COMERCIAL;
                let imgUsuario = response.data.dataResponse.FOTO;
                let imgSucursal = response.data.dataResponse.LOGO;
                window.location.href = `/cargarDataEmpresa/${razonSocial}/${nombreComercial}/${response.data.token}?imgUsuario=${imgUsuario}&imgSucursal=${imgSucursal}`;
            }
        },

        async cargarDataSucursal(idSucursal){
            const promise = axios.get(`${this.dom.server}/acceder/generarTk/S/${idSucursal}`, this.headers);
            return promise.then((response) => response);
        }
    }
}).mount("#View");
