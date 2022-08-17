

var app = Vue.createApp({


  data() {
    return {
      dataLogin: {
        login: "",
        clave: "",
      },
      dataSession: false,
      dom: {
        server: false
      }
    };
  },
  mounted() {
    // this.validarUsuario(); // carga listado al cargar la pagina
    this.montarToken();
  },

  updated() {
    //uppercase
      this.dataLogin.login=this.dataLogin.login.toUpperCase();
      this.dataLogin.clave=this.dataLogin.clave.toUpperCase();

},


  methods: {
    async montarToken() {
        const server = document.getElementById('mydivServ').dataset.test
        this.dom.server = server;
    },
     async executeLogin(){
       const validacion= await this.validarUsuario();
       if(validacion){
         const response = await this.iniciarSesion();
            if (response.data.success) {
                this.dataSession = response.data.dataResponse;
                let token = response.data.token;
                let cantidadEmpresa = response.data.dataResponse.cantEmpresa;
                let cantidadSucursal = response.data.dataResponse.cantSucursal;
                let razonSocial = response.data.dataResponse.razonSocial;
                let nombreComercial = response.data.dataResponse.nombreComercial;
                let imgUsuario = response.data.dataResponse.imgUsuario;
                let imgSucursal = response.data.dataResponse.imgSucursal;
                    // this.$router.push({ name: 'acceder' });
                    // const routes = [{ path: '/login', redirect: { name: 'acceder' } }]
                window.location.href = `/validarAcceso/${token}/${cantidadEmpresa}/${cantidadSucursal}/${razonSocial}/${nombreComercial}?imgUsuario=${imgUsuario}&imgSucursal=${imgSucursal}`;
            } else {
                this.mensajeToastError(response.data.mensaje)
            }
          }
     },

    async validarUsuario() {
      const form = document.getElementById("formLogin");
      $(".fv-plugins-message-container").remove();
      var validator = FormValidation.formValidation(form, {
        fields: {
          usuario: {
            validators: { notEmpty: { message: "Usuario es requerido" } },
          },
          clave: {
            validators: { notEmpty: { message: "contraseña es  requerida" } },
          },
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



     const promise= await   validator.validate();
     let response =false;
      if(promise=='Valid'){ response=true; }else{ response=false;}
      return response;



    },

    async iniciarSesion() {

      const promise =  axios.post(`${this.dom.server}/login/validarAcceso`, this.dataLogin);
      return  promise.then((response) => response);
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


  },
});

app.config.globalProperties.datosSession = false


app.mount("#ViewLogin");
