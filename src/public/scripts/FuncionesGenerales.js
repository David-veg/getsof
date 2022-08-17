// JavaScript Document

$(document).on("ready", init); // Inciamos el jquery
var html = '';

function init() {

    // modal iframe para Clientes General

    $("#btnCerrarModalFormCliGeneral").click(function() { //boton Cerrar
        window.parent.closeModalCliGeneralHeader();
    });


    window.closeModalCliGeneralHeader = function() {
        $('#ModalClienteGeneralHeader').modal('hide');
        $("#iframeCliGeneralHeader").html('');
    };

    window.closeModalRegCliGeneralHeader = function() { //proceso de cerrar modal
        $('#ModalClienteGeneralHeader').modal('hide');
        $("#iframeCliGeneralHeader").html('');

        $.post("./ajax/PedidoAjax.php?op=CargarUltimoCliente", function(w) {
            swal("Mensaje del Sistema", "Registrado Correctamente", "success");
            CargarDatosCliente(w);

            if ($("#validadorClienteGIFramen").val() == 'RV') {
                VerListaRetencionesElectronicas();
            }

            if ($("#validadorClienteGIFramen").val() == 'POSR') {
                $.post("./ajax/PedidoAjax.php?op=CargarUltimoClientePOS", function(w) {
                    cargarClienteIframePOSRes(w);
                });
            }

        });


    };

    ///////////////////////////// IFRAME PACIENTE //////////////////////////////////////////////

    $("#btnCerrarIframeFormPaciente").click(function() { //boton Cerrar
        window.parent.closeModalPacientesHeader();
    });

    window.closeModalPacientesHeader = function() {
        $('#ModalPacienteGeneralHeader222').modal('hide');
        $("#iframePacienteGeneralHeader1").html('');
    };

    window.closeModalRegPacienteHeader = function() { //proceso de cerrar modal
        $('#ModalPacienteGeneralHeader222').modal('hide');
        $("#iframePacienteGeneralHeader1").html('');

        $.post("./ajax/SolicitudQuirofanoAjax.php?op=CargarUltimoPaciente", function(w) {
            // swal("Mensaje del Sistema", "Registrado Correctamente", "success");
            $.toast({
                heading: 'Mensaje del Sistema',
                text: "Paciente Procesado Correctamente",
                position: 'top-right',
                loaderBg: '#fff',
                icon: 'success',
                hideAfter: 7000
            });

            ///IFRAME FACTURA
            if ($("#validadorPacientesIFramen").val() == 'FAC') {
                console.log("fac")
                cargarUltimoPacienteReg(w);
            }
            ///IFRAME ADMISON PACIENTE
            if ($("#validadorPacientesIFramen").val() == 'ADP') {
                console.log("adp")
                RegistrarAdmPacienteIframe(w);
            }
            ///IFRAME AGENDA CITA CALENDARIO
            if ($("#validadorPacientesIFramen").val() == 'ACC') {
                console.log("acc")
                cargarUltimoPacienteAgendaCitaCalendario(w);
            }
            ///IFRAME NOTAS ENTREGA
            if ($("#validadorPacientesIFramen").val() == 'NTE') {
                cargarUltimoPacienteReg(w);
            }
            //IFRAME ARCHIVO CLINICA
            if ($("#validadorPacientesIFramen").val() == 'ARCLI') {
                cargarSoloSelectPaciente(w);
            }
            //SOLICITUD QUIROFANO
            if ($("#validadorPacientesIFramen").val() == 'SOQ') {
                cargarDataPacienteIFrame(w);
            }
            if ($("#validadorPacientesIFramen").val() == 'EPC') {
                console.log("SE EDITO EL PACIENTE")
            }


        });


    };

    ///////////////////////////// IFRAME SOLICTUD QUIROFANO //////////////////////////////////////////////

    $("#btnCerrarModalFormSolicitudQuirofano").click(function() { //boton Cerrar
        window.parent.closeModalSolicitudQuirofanoHeader();
    });

    window.closeModalSolicitudQuirofanoHeader = function() {
        $('#ModalSolicitudQuirofanoHeader').modal('hide');
        $("#iframeSolicitudQuirofanoHeader").html('');
    };

    window.closeModalRegSolicitudQuirofanoHeader = function() { //proceso de cerrar modal
        $('#ModalSolicitudQuirofanoHeader').modal('hide');
        $("#iframeSolicitudQuirofanoHeader").html('');

        $.post("./ajax/SolicitudQuirofanoAjax.php?op=CargarUltimaSolicituCirugia", function(w) {
            swal("Mensaje del Sistema", "Registrado Correctamente", "success");
            // $.toast({
            //     heading: 'Mensaje del Sistema',
            //     text: "Procesado Correctamente",
            //     position: 'top-right',
            //     loaderBg: '#fff',
            //     icon: 'success',
            //     hideAfter: 7000
            // });

            ///IFRAME SOLICITUD QUIROFANO
            if ($("#validadorSolicitudQuirofaanoIframe").val() == 'SOQ') {
                console.log("SolicitudQuirofano")

            }

            if ($("#validadorSolicitudQuirofaanoIframe").val() == 'ACQ') {
                console.log("AgendaQuirofano")
                validaFechas();
            }

            

     });

    };
        //////////////////////////////////////IFRAME PRODUCTO GENERAL ////////////////////////////
        $("#btnCerrarModalIframeProducto").click(function() { //boton Cerrar
            window.parent.closeModalProductoInframe001();
        });
    
        window.closeModalProductoInframe001 = function() {
            $('#ModalProductoGeneralIframe').modal('hide');
            $("#iframeProductoGeneral").html('');
        };
    
        window.closeModalRegProductoInframe = function() { //proceso de cerrar modal
            $('#ModalProductoGeneralIframe').modal('hide');
            $("#iframeProductoGeneral").html('');
            
            $.post("./ajax/ProductoAjax.php?op=CargarUltimoProducto", function(w) {
                swal("Mensaje del Sistema", "Registrado Correctamente", "success");
               // CargarUltimoProductoReg(w);
                if ($("#validadorProductoIframe").val() == 'FACP') {
                    GuardarProducto(w);  
                }
                if ($("#validadorProductoIframe").val() == 'FACPIC') {
                    GuardarProductoIngresoCompras(w);
                }
                if ($("#validadorProductoIframe").val() == 'FACPAVEH') {
                    GuardarProductoVehiculo(w);
                }

                if ($("#validadorProductoIframe").val() == 'IPRO') {
                    GuardarProductoProformas(w);
                }

    
         });
    
        };
     //////////////////////////////////////IFRAME VEHICULO GENERAL ////////////////////////////
     $("#btnCerrarModalIframeVehiculo").click(function() { //boton Cerrar
        window.parent.closeModalVehiculoInframe001();
    });

    window.closeModalVehiculoInframe001 = function() {
        $('#ModalVehiculoGeneralIframe').modal('hide');
        $("#iframeVehiculoGeneral").html('');
    };

    window.closeModalRegVehiculoInframe = function() { //proceso de cerrar modal
        $('#ModalVehiculoGeneralIframe').modal('hide');
        $("#iframeVehiculoGeneral").html('');
        
        $.post("./ajax/VehiculoAjax.php?op=CargarUltimoVehiculo", function(w) {
            swal("Mensaje del Sistema", "Registrado Correctamente", "success");
            // CargarUltimoProductoReg(w);
             if ($("#validadorVehiculoIframe").val() == 'VVEH') {
                GuardarUltimoVehiculo(w);
             }
        });

    };

     //////////////////////////////////////IFRAME TECNICO GENERAL ////////////////////////////
     $("#btnCerrarModalIframeTecnico").click(function() { //boton Cerrar
        window.parent.closeModalTecnicoInframe001();
    });

    window.closeModalTecnicoInframe001 = function() {
        $('#ModalTecnicoGeneralIframe').modal('hide');
        $("#iframeTecnicoGeneral").html('');
    };

    window.closeModalRegTecnicoInframe = function() { //proceso de cerrar modal
        $('#ModalTecnicoGeneralIframe').modal('hide');
        $("#iframeTecnicoGeneral").html('');
        
        $.post("./ajax/TecnicoAjax.php?op=CargarUltimoTecnico", function(w) {
            swal("Mensaje del Sistema", "Registrado Correctamente", "success");
            // CargarUltimoProductoReg(w);
             if ($("#validadorTecnicoIframe").val() == 'JTOT') {
                GuardarUltimoTecnico(w);
             }
        });

    };
        //////////////////////////////IFRAME SERVICIO GENERAL
        $("#btnCerrarModalIframeServicio").click(function() { //boton Cerrar
            window.parent.closeModalServicioInframe001();
        });

        window.closeModalServicioInframe001 = function() {
            $('#ModalServicioGeneralIframe').modal('hide');
            $("#iframeServicioGeneral").html('');
        };

        window.closeModalRegServicioInframe = function() { //proceso de cerrar modal
            $('#ModalServicioGeneralIframe').modal('hide');
            $("#iframeServicioGeneral").html('');

            $.post("./ajax/ProductoAjax.php?op=CargarUltimoServicio", function(w) {
                swal("Mensaje del Sistema", "Registrado Correctamente", "success");
               // CargarUltimoProductoReg(w);
                if ($("#validadorServicioIframe").val() == 'SERIFRA') {
                    GuardarServicio(w); 
                }

                if ($("#validadorServicioIframe").val() == 'ISVEH') {
                    GuardarServicioVehiculo(w); 
                }

                if ($("#validadorServicioIframe").val() == 'INSPRO') {
                    GuardarServicioProformas(w); 
                }

         });
            // $.post("./ajax/ReferenciaIMAjax.php?op=CargarUltimoMedico", function(w) {
            //     swal("Mensaje del Sistema", "Registrado Correctamente", "success");
            //     CargarUltimoMedicoReg(w);
            // });
        };

    ///////////////////////////// IFRAME CARGOS CUENTA PACIENTE //////////////////////////////////////////////

    $("#btnCerrarModalFormCargosCuentaPaciente").click(function() { //boton Cerrar
        window.parent.closeModalCargosCuentaPacienteHeader();
    });

    window.closeModalCargosCuentaPacienteHeader = function() {
        $('#ModalCargosCuentaPacienteGeneralIframe').modal('hide');
        $("#iframeCargosCuentaPacienteGenereal").html('');
    };

    ////////////////////////////////////
    // validadorCargosCuentaPacienteIframe///
    ///////////////////////////////


    // window.closeModalRegSolicitudQuirofanoHeader = function() { //proceso de cerrar modal
    //     $('#ModalSolicitudQuirofanoHeader').modal('hide');
    //     $("#iframeSolicitudQuirofanoHeader").html('');

    //     $.post("./ajax/SolicitudQuirofanoAjax.php?op=CargarUltimaSolicituCirugia", function(w) {
    //         swal("Mensaje del Sistema", "Registrado Correctamente", "success");
    //         // $.toast({
    //         //     heading: 'Mensaje del Sistema',
    //         //     text: "Procesado Correctamente",
    //         //     position: 'top-right',
    //         //     loaderBg: '#fff',
    //         //     icon: 'success',
    //         //     hideAfter: 7000
    //         // });

    //         ///IFRAME SOLICITUD QUIROFANO
    //         if ($("#validadorSolicitudQuirofaanoIframe").val() == 'SOQ') {
    //             console.log("SolicitudQuirofano")

    //         }

    //     });


    // };

    ///////////////////////////// IFRAME PROVEEDOR //////////////////////////////////////////////
    $("#btnCerrarModalIframeProveedor").click(function() { //boton Cerrar
        window.parent.closeModalProveedorGeneralHeader();
    });

    window.closeModalProveedorGeneralHeader = function() {
        $('#ModalProveedorGeneralHeader').modal('hide');
        $("#iframeProveedorGeneralHeader").html('');
    };


    window.closeModalRegProveedorHeader = function() { //proceso de cerrar modal
        $('#ModalProveedorGeneralHeader').modal('hide');
        $("#iframeProveedorGeneralHeader").html('');

        $.post("./ajax/IngresoCompraAjax.php?op=CargarUltimoProveedor", function(w) {
            swal("Mensaje del Sistema", "Registrado Correctamente", "success");
            CargarDatosProveedor(w);
            if ($("#validadorPorveedorIFramen").val() == 'CE') {
                CargarComprasElectronicasPendientes();
            }
            if ($("#validadorPorveedorIFramen").val() == 'SRI') {
                CargarProveedorClaveAcceso(w);
            }




        });


    };

    ///////////////////////////// IFRAME MEDICO //////////////////////////////////////////////

    $("#btnCerrarIframeMed").click(function() { //boton Cerrar
        window.parent.closeModalMedicoInframe();
    });

    window.closeModalMedicoInframe = function() {
        $('#ModalMedicoInframe').modal('hide');
        $("#inframeMedicoHeader").html('');
    };

    window.closeModalRegMedicoInframe = function() { //proceso de cerrar modal
        $('#ModalMedicoInframe').modal('hide');
        $("#inframeMedicoHeader").html('');

        $.post("./ajax/ReferenciaIMAjax.php?op=CargarUltimoMedico", function(w) {
            swal("Mensaje del Sistema", "Registrado Correctamente", "success");
            CargarUltimoMedicoReg(w);

        });
    };

    // //////////////////////////////////////IFRAME PRODUCTO GENERAL ////////////////////////////
    // $("#btnCerrarIframeProducto").click(function() { //boton Cerrar
    //     window.parent.closeModalMedicoInframe();
    // });

    // window.closeModalMedicoInframe = function() {
    //     $('#ModalProductoGeneralIframe').modal('hide');
    //     $("#iframeProductoGeneral").html('');
    // };

    // window.closeModalRegMedicoInframe = function() { //proceso de cerrar modal
    //     $('#ModalProductoGeneralIframe').modal('hide');
    //     $("#iframeProductoGeneral").html('');

    //     // $.post("./ajax/ReferenciaIMAjax.php?op=CargarUltimoMedico", function(w) {
    //     //     swal("Mensaje del Sistema", "Registrado Correctamente", "success");
    //     //     CargarUltimoMedicoReg(w);

    //     // });
    // };


    ///////////////////////////// IFRAME CATEGORIAS //////////////////////////////////////////////

    $(".btnCerrarModalFormCategorias").click(function() { //boton Cerrar
        window.parent.closeModalCategoriasGeneralIframe();
    });

    window.closeModalCategoriasGeneralIframe = function() {
        $('#ModalCategoriasGeneralIframe').modal('hide');
        $("#iframeCategoriasGenereal").html('');
    };

    window.closeModalRegCategoriasGeneralIframe = function() { //proceso de cerrar modal
        $('#ModalCategoriasGeneralIframe').modal('hide');
        $("#iframeCategoriasGenereal").html('');

        $.post("./ajax/CategoriasConfigAjax.php?op=CargarUltimaCategoria", function(w) {
            swal("Mensaje del Sistema", "Registrado Correctamente", "success");
            CargarUltimaCategoria(w);


        });


    };

    ///////////////////////////// IFRAME CATEGORIAS PROV-CLIE//////////////////////////////////////////////

    $(".btnCerrarModalFormCategoriasProvClie").click(function() { //boton Cerrar
        window.parent.closeModalCategoriasProvClieGeneralIframe();
    });

    window.closeModalCategoriasProvClieGeneralIframe = function() {
        $('#ModalCategoriasProvClieGeneralIframe').modal('hide');
        $("#iframeCategoriasProvClieGenereal").html('');
    };

    window.closeModalRegCategoriasProvClieGeneralIframe = function() { //proceso de cerrar modal
        $('#ModalCategoriasProvClieGeneralIframe').modal('hide');
        $("#iframeCategoriasProvClieGenereal").html('');


        if ($("#validadorCategoriasProvClieIframe").val() == 'CLI') {
            $.post("./ajax/CategoriasConfigProvClieAjax.php?op=CargarUltimaCategoriaClie", function(w) {
                swal("Mensaje del Sistema", "Registrado Correctamente", "success");
                CargarUltimaCategoriaClie(w);
            });
        } else if ($("#validadorCategoriasProvClieIframe").val() == 'PROV') {
            $.post("./ajax/CategoriasConfigProvClieAjax.php?op=CargarUltimaCategoriaProv", function(w) {
                swal("Mensaje del Sistema", "Registrado Correctamente", "success");
                CargarUltimaCategoriaProv(w);
            });
        }

    };

    ///////////////////////////// IFRAME INFORMESCITAS //////////////////////////////////////////////

    $(".CerrarModalcitasRadiologicas").click(function() { //boton Cerrar
        window.parent.closeModalInformeCitasIframe();
    });

    window.closeModalInformeCitasIframe = function() {
        $('#ModalCitasRadiologiaGeneralHeader').modal('hide');
        $("#iframeCitasRadiologiaGeneralHeader").html('');
    };






    if ($("#SessionAutorizacionCHP").val() == 'SI') {
        PucherAuto();
    }

    if ($("#sesionIdEmpresa").val() == '2197' || $("#sesionIdEmpresa").val() == '2571') {
        impresionRestaurantePrecuenta();
        impresionRestauranteComanda();
        //impresionRestauranteFact();
        //envioRestaurantePedido();
    }

    // ValidarFechaFirmaGeneralEmpresa();
    // Pusher.logToConsole = true;
    // var pusher = new Pusher('8d42e231d0b1226a74e7', {
    // 	cluster: 'mt1',
    // 	forceTLS: true
    // });

    // var channel = pusher.subscribe('AutorizacionTransferencia');
    // channel.bind('NuevaTransferencia', function (data) {
    // 	$.toast({
    // 		heading: ('Transferencia de Productos'),
    // 		text: ('Transferencia #' + data.numTransferencia +'<br />' + 'Origen: '+data.bodegaOrigen),
    // 		position: 'top-right',
    // 		loaderBg: '#000000',
    // 		icon: 'warning',
    // 		hideAfter: 7000,
    //         showHideTransition: 'fade'
    // 	});

    // 	Push.create(('Transferencia de Productos'), {
    // 		body: ('Transferencia'+ data.numTransferencia +'\n Origen:' + data.bodegaOrigen ),
    // 		icon: '../Files/Sucursal/logo.png',
    // 		timeout: 7000,
    // 		link: 'itegmotors.getsoft.com.ec/transferencia.php',
    // 		onClick: function () {
    // 			window.focus();
    // 			window.open("https://itegmotors.getsoft.com.ec/transferencia.php", "_blank");

    // 			this.close();
    // 		}
    // 	});

    //     $("#notifTransferencias").prepend(`
    //             <a href="javascript:void(0);" onClick="AbrirModalAceptaTrans(${data.idTransferencia}, ${data.idBoOrigen}, '${data.bodegaOrigen}', ${data.idBoDestino}, '${data.bodegaDestino}', '${data.fecha}', '${data.numTransferencia}')" class="message-item d-flex align-items-center border-bottom px-3 py-2">
    //             <div class="btn btn-danger btn-circle"><i class="fa fa-exchange fa-lg" aria-hidden="true"></i></div>
    //             <div class="w-75 d-inline-block v-middle pl-2">
    //                 <h5 class="message-title mb-0 mt-1">Nueva transferencia - ${data.numTransferencia} </h5> 
    //                 <span class="font-12 text-nowrap d-block text-muted text-truncate">Origen:<b> ${data.bodegaOrigen}</b></span>
    //                 <span class="font-12 text-nowrap d-block text-muted">Fecha:<b> ${data.fecha}</b></span>
    //             </div>
    //         </a>`);
    // });

    $("#btnRechazarTransferencia").click(RechazarTransferencia);
    $("#btnMotivoRechazo").click(AgregarMotivoRechazo);

    var bodyResumen = document.querySelector('body');
    bodyResumen.onkeydown = function(e) {
        var isCtrl = false;
        tecla = (document.all) ? e.keyCode : e.which;
        if (tecla == 112) { // F9 Abrir modal Reg Producto
            e.preventDefault();
            // alert("hola as");

            if ($("#modalInventarioResumen").is(':visible')) {
                console.log("abierto Modal Resumen");
            } else {
                $('#modalInventarioResumen').modal("show");
            }

        }
    }

    $("#btnBuscarCodigoResumen").click(BusquedaInventarioResumen);
    $("#btnBuscarProductoResumen").click(BusquedaInventarioResumen);
    $("#btnBuscarMarcaResumen").click(BusquedaInventarioResumen);
    $("#btnBuscarModeloResumen").click(BusquedaInventarioResumen);
    $("#btnBusquedaGeneralResumen").click(BusquedaInventarioResumen);

    $("#txtBusquedaCodigoResumen").on("keypress", function(e) {
        tecla = (document.all) ? e.keyCode : e.which;
        if (tecla == 13) {
            BusquedaInventarioResumen();
        }
    });

    $("#txtBusquedaProductoResumen").on("keypress", function(e) {
        tecla = (document.all) ? e.keyCode : e.which;
        if (tecla == 13) {
            BusquedaInventarioResumen();
        }
    });

    $("#txtBusquedaMarcaResumen").on("keypress", function(e) {
        tecla = (document.all) ? e.keyCode : e.which;
        if (tecla == 13) {
            BusquedaInventarioResumen();
        }
    });

    $("#txtBusquedaModeloResumen").on("keypress", function(e) {
        tecla = (document.all) ? e.keyCode : e.which;
        if (tecla == 13) {
            BusquedaInventarioResumen();
        }
    });




    $('.slimScrollGeneral').slimScroll({
        color: '#1e88e5',
        size: '10px',
        height: '350px',
        alwaysVisible: true
    });

    VerificarModoSistema();

    // $("#ChkModoSistema").click(CambiarDisenoSistema);


    var teclaGlobal = {};
    onkeydown = onkeyup = function(e) {
        e = e || event;
        teclaGlobal[e.keyCode] = e.type == 'keydown';
        if (teclaGlobal[16] && teclaGlobal[17] && teclaGlobal[32]) {
            $.unblockUI();
            $("#btnCerrarModalBloqueoGeneral").show();
        }
    }

    ValidarTeclaF12();


    setInterval(CompararSesionActiva, 10000);

    //   CargarNotificacionesCRM();
    //$("form#frmEnvioCorreoPersonalizadoCRM").submit(EnvioCorreoPersonalizadoCRM);


    $("#btnActualizarSesion").click(ActualizarPaginaSesion);

    $(".limpiarModStyle").click(limpiarModalStyle);


    $("form#frmCambiarClaveGeneral").submit(SaveorUpdateClaveGeneral);
    $("form#frmMiPerfilUsuarioHeader").submit(SaveorUpdateMiPerfilUsuarioHeader);
    $("#btnConsultaSriRcivHeader").click(ValidarConsultaDatosHeader);

    function ValidarConsultaDatosHeader() {
        num_doc = $("#txtNum_DocumentoHeader").val();
        tipo_documento = $("#cboTipo_DocumentoUsuHeader").val();
        if (tipo_documento === '1' && num_doc.length > 0) {
            ConsultarCedulaHeader(num_doc);
        }
    }


    function SaveorUpdateMiPerfilUsuarioHeader(e) {

        e.preventDefault();

        // bootbox.confirm("¿Esta seguro que desea Actualizar? ", function(resultado) {
        //     if (resultado) {
        bloquearPantallaCargando();
        var formularioData = new FormData($("#frmMiPerfilUsuarioHeader")[0]);
        $.ajax({
            url: "./ajax/EmpleadoAjax.php?op=SaveorUpdateMiPerfilUsuario",
            type: "POST",
            data: formularioData,
            contentType: false,
            processData: false,
            success: function(datosg) {
                $.unblockUI();
                var u = $.parseJSON(datosg);
                $("#modalMiPerfilUsuarioHeader").modal("hide");
                if (u.ind == '1') {
                    $.toast({
                        heading: 'Mensaje del Sistema',
                        text: u.Mensaje,
                        position: 'top-right',
                        loaderBg: '#fff',
                        icon: 'success',
                        hideAfter: 7000
                    });

                } else {
                    $.toast({
                        heading: 'Mensaje del Sistema',
                        text: u.Mensaje,
                        position: 'top-right',
                        loaderBg: '#fff',
                        icon: 'error',
                        hideAfter: 7000
                    });
                }


            }
        });
        //     }
        // });


    }


    function ConsultarCedulaHeader(cedula) {
        bloquearPantallaValidacion();

        $.post('./ajax/ClienteAjax.php?op=consultaCedula', {
            cedula: cedula
        }, function(r) {
            $.unblockUI();
            c = $.parseJSON(r);
            if (c.estadoConsulta) {
                $("#txtNombreHeader").val(c.nom);
                $("#txtApellidosHeader").val(c.ape);
                $("#txtDireccionHeader").val(c.direccion);
                $.toast({
                    heading: 'Mensaje del Sistema',
                    text: "Se Extrajeron los datos del Registro civil",
                    position: 'top-right',
                    loaderBg: '#fff',
                    icon: 'success',
                    hideAfter: 7000
                });
            } else {

                $.toast({
                    heading: 'Mensaje del Sistema',
                    text: "Error " + c.mensaje,
                    position: 'top-right',
                    loaderBg: '#fff',
                    icon: 'error',
                    hideAfter: 7000
                });
            }
        });
    }


    function SaveorUpdateClaveGeneral(e) {
        e.preventDefault();

        var txtActualClaveHeader = $("#txtActualClaveHeader").val();
        var txtNuevaClaveHeader = $("#txtNuevaClaveHeader").val();

        bootbox.confirm("¿Esta seguro que desea Actualizar su Contraseña? ", function(result) {
            if (result) {
                $.post("./ajax/EmpleadoAjax.php?op=SaveorUpdateClaveGeneral", { txtActualClaveHeader: txtActualClaveHeader, txtNuevaClaveHeader: txtNuevaClaveHeader }, function(w) {
                    var k = $.parseJSON(w);
                    if (k.ind == "1") {
                        $.toast({
                            heading: 'Mensaje del Sistema',
                            text: k.Mensaje,
                            position: 'top-right',
                            loaderBg: '#fff',
                            icon: 'success',
                            hideAfter: 7000
                        });
                        $("#modalCambiarClaveGeneral").modal("hide");
                    } else {
                        $.toast({
                            heading: 'Mensaje del Sistema',
                            text: k.Mensaje,
                            position: 'top-right',
                            loaderBg: '#fff',
                            icon: 'error',
                            hideAfter: 7000
                        });
                    }

                });
            }
        });

    }




    // PEDMOVIL
    //bowser.osname != 'iOS' && 

    if (bowser.osname != 'Android' && bowser.osname != 'iOS') {
        $("#hrefNotaPedido").attr("href", "NotaPedido");
        $("#hrefVenta").attr("href", "Venta");
    } else {
        $("#hrefNotaPedido").attr("href", "PedidoMovil");
        $("#hrefVenta").attr("href", "VentaMovil");
    }
    //ActClientesPendientes();
    //  CargarTransferenciasPendientes();
    // PeriodoEstado();
    AlertaCorteEmpresas();
    AlertaModalActualizaciones();

    // ListadoEmpresasMenu();
    //CargarPedidosPendientes();
    //CargarAjustesInventarioPendientes();
    // CombocategClie();
    //validarCedula('0959642463');

    $("#VerForm").hide();
    $("form#frmAprobarCliente").submit(AprobarCliente);
    $("form#frmAcepTransferencia").submit(aceptarTransferencia);
    $("#btnBuscarEmpresaMenu").click(BuscarEmpresasMenu);
    $("#tztBusquedaEmpMenu").keypress(function(e) {
        var tecla = (document.all) ? e.keyCode : e.which;
        if (tecla === 13) {
            BuscarEmpresasMenu();
        }
    });


    function AprobarCliente(e) {
        e.preventDefault();
        $.post("./ajax/ClienteAjax.php?op=AprobarCliente", $("#frmAprobarCliente").serialize(), function(r) {
            $("#modalClientesPendientes").modal("hide");

            swal("Mensaje del Sistema", r, "success");
        });

    }

    function aceptarTransferencia(e) {
        e.preventDefault();
        $("#fechaAceptacionModalTransf").prop('disabled', false);

        bootbox.confirm("¿Está seguro de aceptar la transferencia?", function(result) {
            if (result) {
                $.post("./ajax/TransferenciaAjax.php?op=AceptaTrans", $("#frmAcepTransferencia").serialize(), function(r) {
                    s = $.parseJSON(r);
                    if (s[0] == 1) {
                        $("#fechaAceptacionModalTransf").prop('disabled', true);

                        $.unblockUI();
                        swal("Mensaje del Sistema", s[1], "success");
                        CargarTransferenciasPendientes();
                        ListadoTransferencias();
                        ListadoTransferenciasRecibidasFuncionesGenerales();
                    } else {
                        //alert('Mensaje: ** '+r);
                        swal("Mensaje del Sistema", s[1], "error");
                    }
                    $("#modalAceptaTransferencia").modal("hide");
                });
            } else {
                $.unblockUI();
            }
        });
    }

} //CIERRA LLAVE DEL DOCUMENT READY



// CHEQUEPOSFECHADO 
function OcultarModalStockHeader() {
    var tipo = $("#txtTipoBusStockH").val();
    $("#ModalStockGeneral").modal("hide");
    if (tipo == 'Bus') {
        if ($('#ModalBusquedaAvanzadaVentaHeader').is(':visible')) {
            console.log("abierto");
        } else {
            $("#ModalBusquedaAvanzadaVentaHeader").modal({ backdrop: 'static', keyboard: false });
        }
    }
}





function PucherAuto() {
    var can1CP = $("#canal1CP").val();
    var clusCP = $("#clusterCP").val();
    console.log('canal1____:::::', can1CP, clusCP);

    var SessionAutorizacionCHP = $("#SessionAutorizacionCHP").val();
    if (can1CP == null || clusCP == null) {
        console.log("no tiene pusher CP");

    } else {
        if (SessionAutorizacionCHP == 'SI') {
            console.log('canal1:::::', can1CP, clusCP);

            Pusher.logToConsole = true;
            var pusher = new Pusher(can1CP, {
                cluster: clusCP,
                forceTLS: true
            });
            var channel = pusher.subscribe('Autorizacion');
            channel.bind('NuevaAutorizacion', function(data) {
                //ListarNotificaciones();
                $.toast({
                    heading: ('Nueva Autorización '),
                    text: ('Cheque Postechado' +
                        '<br> Cliente:  ' + data.cliente +
                        '<br> N° Oper/Ch:  ' + data.numOper +
                        '<br> Fecha:' + data.fecha),
                    position: 'top-right',
                    loaderBg: '#000000',
                    icon: 'warning',
                    hideAfter: 300000
                });

                Push.create(('Nueva Autorización '), {
                    body: ('Cheque Postechado     ' +
                        ' Cliente:  ' + data.cliente +
                        ' N° Oper/Ch:  ' + data.numOper +
                        ' Fecha:   ' + data.fecha),
                    icon: 'https://i.imgur.com/XMKtGbt.png',
                    timeout: 300000,
                    link: 'getsoft.app',
                    onClick: function() {
                        window.focus();
                        window.open("https://getsoft.app", "_blank");
                        this.close();
                    }
                });
            });
        } else {
            console.log('ASDDDDDDDASDSADSDAS', SessionAutorizacionCHP);
            console.log("no debe llegar pusher");
        }
    }
}

function ListarNotificaciones() {
    bloquearPantalla();
    $.post("./ajax/FuncionesGeneralesAjax.php?op=ListarNotificaciones", function(re) {
        var f = $.parseJSON(re);
        $("#listaNotiHeader").html(f.html);
        $.unblockUI();
    });
}





function AutorizarCHPModal(id, texto, fecha, Valor) {
    if ($("#AutorizacionCHPHeader").is(':visible')) {
        console.log("abierto");
    } else {
        $("#AutorizacionCHPHeader").modal({ backdrop: 'static', keyboard: false });
    }

    $("#txtidCHP").val("");
    $(".spanDescripcionH").html("");
    $(".spanFechaH").html("");
    $("#txtidCHP").val(id);
    $(".spanDescripcionH").html(texto);
    $(".spanFechaH").html(fecha);

}


function AutorizaCHP() {
    var id = $("#txtidCHP").val();
    bootbox.confirm("¿Está Seguro de Procesar?", function(result) {
        if (result) {
            bloquearPantalla();
            var data = {
                id: id
            };
            console.log(data);
            $.post("./ajax/VentaAjax.php?op=AutorizaCHP", data, function(r) {
                console.log(r);
                $("#AutorizacionCHPHeader").modal("hide");

                var s = $.parseJSON(r);
                $.unblockUI();
                if (s[0] == 1) {
                    swal("Mensaje del Sistema", "Autorizado Exitosamente", "success");
                    ListarNotificaciones();
                } else {
                    swal("Error ", s[1], "error");
                    ListarNotificaciones();
                }
            });
        }
    });
}

function DenegarCHP() {
    var id = $("#txtidCHP").val();
    bootbox.confirm("¿Está Seguro de Procesar?", function(result) {
        if (result) {
            bloquearPantalla();
            var data = {
                id: id
            };
            console.log(data);
            $.post("./ajax/VentaAjax.php?op=DenegarCHP", data, function(r) {
                console.log(r);
                $("#AutorizacionCHPHeader").modal("hide");

                var s = $.parseJSON(r);
                $.unblockUI();
                if (s[0] == 1) {
                    swal("Mensaje del Sistema", "Denegado Exitosamente", "success");
                    ListarNotificaciones();
                } else {
                    swal("Error ", s[1], "error");
                    ListarNotificaciones();
                }
            });
        }
    });
}

// FIN AUTORIZACION



function preImpresos() {

}

function impresionRestauranteFact() {

    Pusher.logToConsole = true;
    var pusher = new Pusher('09c8bf2dad0309f4c862', {
        cluster: 'mt1',
        forceTLS: true
    });
    var channel = pusher.subscribe('PrintRestauranteFact');
    channel.bind('NuevoPrintRestauranteFact', function(data) {
        if (($("#sessionIdUsuario").val() == 3183 || $("#sessionIdUsuario").val() == 4699 || $("#sessionIdUsuario").val() == 3536 || $("#sessionIdUsuario").val() == 3500) && $("#sesionIdSucursal").val() == data.ID_SUCURSAL && $("#sesionIdEmpresa").val() == data.ID_EMPRESA) {
            console.log("here is teh id_venta bro: " + data.ID_VENTA);
            imprimirFactPusher(data.ID_VENTA);
        }
    });
}

function impresionRestauranteComanda() {
    Pusher.logToConsole = true;
    var pusher = new Pusher('09c8bf2dad0309f4c862', {
        cluster: 'mt1',
        forceTLS: true
    });
    var channel = pusher.subscribe('PrintComandaRestaurante');
    channel.bind('NuevoPrintComandaRestaurante', function(data) {
        if (($("#sessionIdUsuario").val() == 3183 || $("#sessionIdUsuario").val() == 4699 || $("#sessionIdUsuario").val() == 3536 || $("#sessionIdUsuario").val() == 3500 || $("#sesionIdEmpresa").val() == 2571) && $("#sesionIdSucursal").val() == data.ID_SUCURSAL && $("#sesionIdEmpresa").val() == data.ID_EMPRESA) {
            imprimirComandarPusher(data.ID_PEDIDO_REST, data.PROD);
        }
    });
}

function impresionRestaurantePrecuenta() {
    Pusher.logToConsole = true;
    var pusher = new Pusher('09c8bf2dad0309f4c862', {
        cluster: 'mt1',
        forceTLS: true
    });
    var channel = pusher.subscribe('PrintRestaurante');
    channel.bind('NuevoPrintRestaurante', function(data) {
        console.log(data);
        if (($("#sessionIdUsuario").val() == 3183 || $("#sessionIdUsuario").val() == 4699 || $("#sessionIdUsuario").val() == 3536 || $("#sessionIdUsuario").val() == 3500 || $("#sesionIdEmpresa").val() == 2571) && $("#sesionIdSucursal").val() == data.ID_SUCURSAL && $("#sesionIdEmpresa").val() == data.ID_EMPRESA) {
            imprimirPrecuentaPusher(data.ID_PEDIDO_REST);
        }
    });
}

function imprimirFactPusher(idVenta) {
    console.log(idVenta);
    $.post("./ajax/POSRestauranteAjax.php?op=cargarImpresorasFacturas", function(r) {
        console.log(r);
        s = $.parseJSON(r);
        for (i = 0; i < s.length; i++) {
            $.ajax({
                async: false,
                type: 'post',
                url: './ajax/VentaAjax.php?op=dataFacturaTk',
                data: {
                    idVenta: idVenta
                },
                success: function(r) {
                    console.log(s[i]['NOMBRE']);
                    var config = qz.configs.create(s[i]['NOMBRE']);
                    var printData = [{
                        type: 'html',
                        format: 'plain',
                        data: r
                    }];
                    qz.print(config, printData).catch(displayError);
                }
            });

        }
    });
}


function imprimirPrecuentaPusher(idPedidoRest) {
    $.post("./ajax/PedidoRestauranteAjax.php?op=preCuentaTicket", { idPedidoRest: idPedidoRest }, function(r) {
        var s = $.parseJSON(r);
        var impresoras = s.impresoras;
        for (i = 0; i < impresoras.length; i++) {
            console.log(s.html);
            var config = qz.configs.create(impresoras[i]);
            var printData = [{
                type: 'html',
                format: 'plain',
                data: s.html
            }];
            qz.print(config, printData).catch(displayError);
        }
    });
}

function imprimirComandarXUsuarioPusher(idPedidoRest, productos) {
    $.ajax({
        async: false,
        type: 'post',
        url: './ajax/PedidoRestauranteAjax.php?op=pedidosPendientesPusher',
        data: {
            idPedidoRest: idPedidoRest,
            productos: productos.toString()
        },
        success: function(texto) {

        }
    });
}

function imprimirComandarPusher(idPedidoRest, productos) {
    console.log(productos);
    $.post("./ajax/PedidoRestauranteAjax.php?op=cargarCategoriasComanda", { idPedidoRest: idPedidoRest, productos: productos.toString() }, function(r) {
        s = $.parseJSON(r);
        console.log(s);
        for (i = 0; i < s.length; i++) {
            $.ajax({
                async: false,
                type: 'get',
                url: './ajax/PedidoRestauranteAjax.php?op=pedidoXCateogoria',
                data: {
                    idPedidoRest: idPedidoRest,
                    idImpresora: s[i][2],
                    productos: productos.toString()
                },
                success: function(texto) {
                    console.log(texto);
                    var config = qz.configs.create(s[i][0]);
                    var printData = [{
                        type: 'html',
                        format: 'plain',
                        data: texto
                    }];

                    qz.print(config, printData).catch(displayError);
                }
            });



        }
    });
}


function ValidarFechaFirmaGeneralEmpresa() {
    $.post("./ajax/EmpresaAjax.php?op=VencimientoFirmaGeneral", function(r) {
        $("#SriFechaFirmaElectronica").val(r);
    });
}


function BusquedaInventarioResumen() {

    var dataResumen = {
        CodigoResumen: $("#txtBusquedaCodigoResumen").val(),
        ProductoResumen: $("#txtBusquedaProductoResumen").val(),
        MarcaResumen: $("#txtBusquedaMarcaResumen").val(),
        ModeloResumen: $("#txtBusquedaModeloResumen").val()
    };
    bloquearPantallaCargando();
    $.post("./ajax/ProductoAjax.php?op=BusquedaInventarioResumen", dataResumen, function(k) {
        $.unblockUI();
        $("#bodyBusqInventarioResumen").html(k);
    });


}



function VerificarModoSistema() {
    $.post("./ajax/EmpleadoAjax.php?op=VerificarModoSistema", function(r) {

        if (r == 1) {
            if ($("#SessionBarraLateralHeader").val() == 'SI') {
                $("#main-wrapper").AdminSettings({
                    Theme: true, // this can be true or false ( true means dark and false means light ),
                    Layout: "vertical", //
                    LogoBg: "skin5", // You can change the Value to be skin1/skin2/skin3/skin4/skin5/skin6
                    NavbarBg: "skin5", // You can change the Value to be skin1/skin2/skin3/skin4/skin5/skin6
                    SidebarType: "full", // You can change it full / mini-sidebar
                    SidebarColor: "skin5", // You can change the Value to be skin1/skin2/skin3/skin4/skin5/skin6
                    SidebarPosition: false, // it can be true / false
                    HeaderPosition: false, // it can be true / false
                    BoxedLayout: false, // it can be true / false
                });
            } else {
                $("#main-wrapper").AdminSettings({
                    Theme: true, // this can be true or false ( true means dark and false means light ),
                    Layout: "vertical", //
                    LogoBg: "skin5", // You can change the Value to be skin1/skin2/skin3/skin4/skin5/skin6
                    NavbarBg: "skin5", // You can change the Value to be skin1/skin2/skin3/skin4/skin5/skin6
                    SidebarType: "mini-sidebar", // You can change it full / mini-sidebar
                    SidebarColor: "skin5", // You can change the Value to be skin1/skin2/skin3/skin4/skin5/skin6
                    SidebarPosition: false, // it can be true / false
                    HeaderPosition: false, // it can be true / false
                    BoxedLayout: false, // it can be true / false
                });
            }


            $('body').attr("data-theme", 'dark');
            $("#txtBodyHeader").show();
            $("#txtBodyHeader").removeAttr('style', 'padding-right');
        } else {
            if ($("#SessionBarraLateralHeader").val() == 'SI') {
                $("#main-wrapper").AdminSettings({
                    Theme: false, // this can be true or false ( true means dark and false means light ),
                    Layout: 'vertical',
                    LogoBg: 'skin1', // You can change the Value to be skin1/skin2/skin3/skin4/skin5/skin6 
                    NavbarBg: 'skin1', // You can change the Value to be skin1/skin2/skin3/skin4/skin5/skin6
                    SidebarType: 'full', // You can change it full / mini-sidebar / iconbar / overlay
                    SidebarColor: 'skin6', // You can change the Value to be skin1/skin2/skin3/skin4/skin5/skin6
                    SidebarPosition: true, // it can be true / false ( true means Fixed and false means absolute )
                    HeaderPosition: true, // it can be true / false ( true means Fixed and false means absolute )
                    BoxedLayout: false, // it can be true / false ( true means Boxed and false means Fluid ) 
                });
            } else {
                $("#main-wrapper").AdminSettings({
                    Theme: false, // this can be true or false ( true means dark and false means light ),
                    Layout: 'vertical',
                    LogoBg: 'skin1', // You can change the Value to be skin1/skin2/skin3/skin4/skin5/skin6 
                    NavbarBg: 'skin1', // You can change the Value to be skin1/skin2/skin3/skin4/skin5/skin6
                    SidebarType: 'mini-sidebar', // You can change it full / mini-sidebar / iconbar / overlay
                    SidebarColor: 'skin6', // You can change the Value to be skin1/skin2/skin3/skin4/skin5/skin6
                    SidebarPosition: true, // it can be true / false ( true means Fixed and false means absolute )
                    HeaderPosition: true, // it can be true / false ( true means Fixed and false means absolute )
                    BoxedLayout: false, // it can be true / false ( true means Boxed and false means Fluid ) 
                });
            }


            $('body').attr("data-theme", 'light');
            $("#txtBodyHeader").show();
            $("#txtBodyHeader").removeAttr('style', 'padding-right');
        }
    });
}

// function CambiarDisenoSistema() {

//     if ($("#ChkModoSistema").prop("checked")) {
//         $("#main-wrapper").AdminSettings({
//             Theme: true, // this can be true or false ( true means dark and false means light ),
//             Layout: "vertical", //
//             LogoBg: "skin5", // You can change the Value to be skin1/skin2/skin3/skin4/skin5/skin6
//             NavbarBg: "skin5", // You can change the Value to be skin1/skin2/skin3/skin4/skin5/skin6
//             SidebarType: "mini-sidebar", // You can change it full / mini-sidebar
//             SidebarColor: "skin5", // You can change the Value to be skin1/skin2/skin3/skin4/skin5/skin6
//             SidebarPosition: false, // it can be true / false
//             HeaderPosition: false, // it can be true / false
//             BoxedLayout: false, // it can be true / false
//         });
//         $('body').attr("data-theme", 'dark');
//     } else {
//         $("#main-wrapper").AdminSettings({
//             Theme: false, // this can be true or false ( true means dark and false means light ),
//             Layout: 'vertical',
//             LogoBg: 'skin1', // You can change the Value to be skin1/skin2/skin3/skin4/skin5/skin6 
//             NavbarBg: 'skin1', // You can change the Value to be skin1/skin2/skin3/skin4/skin5/skin6
//             SidebarType: 'mini-sidebar', // You can change it full / mini-sidebar / iconbar / overlay
//             SidebarColor: 'skin6', // You can change the Value to be skin1/skin2/skin3/skin4/skin5/skin6
//             SidebarPosition: true, // it can be true / false ( true means Fixed and false means absolute )
//             HeaderPosition: true, // it can be true / false ( true means Fixed and false means absolute )
//             BoxedLayout: false, // it can be true / false ( true means Boxed and false means Fluid ) 
//         });
//         $('body').attr("data-theme", 'light');
//     }

// }

function CambiarModoOscuro() {

    if ($("#ChkModoSistema").prop('checked')) {
        ChkModoSistema = 'SI';
    } else {
        ChkModoSistema = 'NO';
    }
    bloquearPantallaCargando();
    $.post("./ajax/EmpleadoAjax.php?op=CambiarModoOscuro", { ChkModoSistema: ChkModoSistema }, function(p) {
        $.unblockUI();

        var u = $.parseJSON(p);

        if (u.ind == 1) {
            // if (u.indOscuro == 'SI') {
            //     $.toast({
            //         heading: 'Mensaje del Sistema',
            //         text: 'Modo Oscuro Activado',
            //         position: 'top-right',
            //         loaderBg: '#fff',
            //         icon: 'success',
            //         hideAfter: 7000
            //     });
            // } else {
            //     $.toast({
            //         heading: 'Mensaje del Sistema',
            //         text: 'Modo Oscuro Desactivado',
            //         position: 'top-right',
            //         loaderBg: '#fff',
            //         icon: 'success',
            //         hideAfter: 7000
            //     });
            // }
            location.reload();
        } else {
            $.toast({
                heading: 'Mensaje del Sistema',
                text: u.Mensaje,
                position: 'top-right',
                loaderBg: '#fff',
                icon: 'error',
                hideAfter: 7000
            });
        }



    });





}


/*
function EnvioCorreoPersonalizadoCRM(e) {
    e.preventDefault();
    bloquearPantalla();
    $("#modalcorreoVenta").modal("hide");
    // $("#frmEnvioCorreoPersonalizadoVenta").serialize()
    $.post("./ajax/ProcesosAutomaticosAjax.php?op=enviarCorreoSeguimientoNOT", $(this).serialize(), function(r) {
        $.unblockUI();
        console.log(r);
        var s = $.parseJSON(r);
        if (s[0] == 1) {
            swal("Mensaje del Sistema", s[1], "success");
            $.unblockUI();
        } else {
            swal("Mensaje del Sistema", s[1], "error");
            $.unblockUI();
        }
        CargarNotificacionesCRM();
    });
}
*/

function mostrarContrasenaActualClaveEnvioHeader() {
    var tipo = document.getElementById("txtActualClaveHeader");
    if (tipo.type == "password") {
        tipo.type = "text";
    } else {
        tipo.type = "password";
    }
}


function mostrarContrasenaClaveEnvioHeader() {
    var tipo = document.getElementById("txtNuevaClaveHeader");
    if (tipo.type == "password") {
        tipo.type = "text";
    } else {
        tipo.type = "password";
    }
}

function MiPerfilUsuario() {


    $.get("./ajax/EmpleadoAjax.php?op=listTipo_DocumentoPersona", function(r) {
        $("#cboTipo_DocumentoUsuHeader").html(r);
    });

    $.post("./ajax/EmpleadoAjax.php?op=cargarDataEmpleadoHeader", function(e) {
        var g = $.parseJSON(e);
        $("#txtApellidosHeader").val(g.APELLIDOS);
        $("#txtNombreHeader").val(g.NOMBRE);
        $("#cboTipo_DocumentoUsuHeader").val(g.ID_TIPO_DOCUMENTO);
        $("#txtNum_DocumentoHeader").val(g.NUM_DOCUMENTO);
        $("#txtDireccionHeader").val(g.DIRECCION);
        $("#txtTelefonoHeader").val(g.TELEFONO);
        $("#txtEmailHeader").val(g.EMAIL);
        $("#txtRutaImgEmpHeader").val(g.FOTO);

        if (g.IND_BARRA_LATERAL == 'SI') {
            $("#chkIndBarraLateral").prop('checked', true);
        } else {
            $("#chkIndBarraLateral").prop('checked', false);
        }

        if (g.ID_PERFIL == 1) {
            $("#txtPerfilNameHeader").html("<b>Administrador General</b>");
        } else {
            $("#txtPerfilNameHeader").html("<b>" + g.PERFIL + " (" + g.EMPRESA_CREACION_PERFIL + " )</b>");
        }


    });

    if ($('#modalMiPerfilUsuarioHeader').is(':visible')) {
        console.log("abierto");
    } else {
        $('#modalMiPerfilUsuarioHeader').modal({ backdrop: 'static', keyboard: false });
    }



}

function CambiarClaveGeneral() {

    $("#txtActualClaveHeader").val("");
    $("#txtNuevaClaveHeader").val("");

    $('#modalCambiarClaveGeneral').modal({
        backdrop: 'static',
        keyboard: false
    });

}


function CargarNotificacionesCRM() {
    $.post("./ajax/SeguimientoCarteraAjax.php?op=alerta", function(r) {
        //alert(r);
        $("#alertaCRM").html(r);
    });
}


function ValidarTeclaF12() {
    $.post("./ajax/EmpleadoAjax.php?op=ValidarTeclaF12", function(r) {

        if (r == 1) {
            $(document).keydown(function(event) {
                if (event.keyCode == 123) { // Prevent F12
                    return false;
                } else if (event.ctrlKey && event.shiftKey && event.keyCode == 73) { // Prevent Ctrl+Shift+I        
                    return false;
                } else if (event.ctrlKey && event.shiftKey && event.keyCode == 74) { // Prevent Ctrl+Shift+I        
                    return false;
                }
            });

            $(document).bind("contextmenu", function(e) {
                e.preventDefault();
            });

            $("#ConfigHeaderOptions").hide();
        } else {
            $("#ConfigHeaderOptions").show();
        }
    });

    $.post("./ajax/EmpleadoAjax.php?op=ValidarLiReportes", function(r) {

        if (r > 0) {
            $(".liReportesHeader").show();
        } else {
            $(".liReportesHeader").hide();
        }
    });


}

function CompararSesionActiva() {

    var cantidadEmpresa = parseInt($("#cantidadEmpresa").val() || 0);
    if (cantidadEmpresa >= 2) {
        var dataSesiones = {
            idEmpresa: $("#sesionIdEmpresa").val(),
            idSucursal: $("#sesionIdSucursal").val(),
            idUsuario: $("#sessionIdUsuario").val(),
            sessionAntigua: $("#sessionAntigua").val(),
            sessionActual: $("#sessionActual").val()
        };
        // console.log(
        //     "indEmpresa" + $("#sesionIdEmpresa").val() +
        //     "| indSucursal" + $("#sesionIdSucursal").val() +
        //     "| indUsuario" + $("#sessionIdUsuario").val() +
        //     "| indAntigua" + $("#sessionAntigua").val() +
        //     "| indEActual" + $("#sessionActual").val()
        // );
        $.post("./ajax/UsuarioAjax.php?op=CompararSesionActiva", dataSesiones, function(x) {
            var s = $.parseJSON(x);

            if (s[0] == 1) {
                //console.log("el sistema cambio de empresa actualizar página");
                $("#spanUsuarioSesion").html($("#usuarioAnterior").val());
                $("#spanSucursalSesion").html(s[1]);

                if ($('#ModalSesion').is(':visible')) {
                    console.log("abierto");
                } else {
                    $('#ModalSesion').modal({
                        backdrop: 'static',
                        keyboard: false
                    });
                }
                $("#btnCerrarModalBloqueoGeneral").hide();
            } else {
                //console.log("es la misma empresa");
            }
        });
    }
}

function ActualizarPaginaSesion() {
    location.reload();

}

// function PeriodoEstado() {
//     // e.preventDefault();
//     $.post("./ajax/PeriodoAjax.php?op=PeriodoEstado", function(r) {
//         //console.log(r);
//     });
// }

function ListadoEmpresasMenu() {
    bloquearPantallaCargando();
    $.post("ajax/EmpresaAjax.php?op=ListarEmpresasMenu", function(r) {
        $.unblockUI();
        $("#bodyEmpresasMenu").html(r);
    });
}

function SalirdelSistemaUsuario() {
    bootbox.confirm("<b>¿Esta seguro que desea Salir del Sistema?</b> ", function(result) {
        if (result) {
            $.post("ajax/UsuarioAjax.php?op=Salir", function(r) {
                console.log("Salir del Sistema" + r);
                //window.location = "https://getsoft.app";
                location.reload();
            });
        }
    });
}

function BuscarEmpresasMenu() {
    var descripcion = $.trim($("#tztBusquedaEmpMenu").val());
    $.post("ajax/EmpresaAjax.php?op=BuscarEmpresasMenu", { descripcion: descripcion }, function(r) {
        $("#bodyEmpresasMenu").html(r);
    });
}


function CargarSucursalesMenu(idEmpresa) {
    bloquearPantalla();
    $.post("ajax/SucursalAjax.php?op=ListarSucursalesxEmp", { idEmpresa: idEmpresa }, function(r) {
        $.unblockUI();
        var s = $.parseJSON(r);
        if (s.numSuc > 1) {
            $('#modalSucursal').modal({
                backdrop: 'static',
                keyboard: false
            });
            $("#bodySucursalesMenu").html(s.html);
        } else {
            var idUsuarioAcc = $("#sessionIdUsuario").val();
            AccederSistemaMod(s.idSucursal, idUsuarioAcc);
        }
    });
}

function AccederSistemaMod(idSucursal, idUsuarioAcc) {
    $.post("ajax/SucursalAjax.php?op=cargarDatosSucursalAcceso", { idSucursal: idSucursal }, function(r) {
        var s = $.parseJSON(r);
        var data = {
            ID_EMPRESA: s.ID_EMPRESA,
            RAZON_SOCIAL_SUCURSAL: s.RAZON_SOCIAL_SUCURSAL,
            CHK_CORPORACION: s.CHK_CORPORACION,
            IND_LISTA_PRECIOS: s.IND_LISTA_PRECIOS,
            IND_CONTROL_LOTES: s.IND_CONTROL_LOTES,
            ATAJO_PRODUCTO: s.ATAJO_PRODUCTO,
            IND_CANAL: s.IND_CANAL,
            TOT_CANAL_DEFECTO: s.TOT_CANAL_DEFECTO,
            IND_LINEA_NEGOCIO: s.IND_LINEA_NEGOCIO,
            TOT_LINEA_DEFECTO: s.TOT_LINEA_DEFECTO,
            IND_DEFECTO: s.IND_DEFECTO,
            TOT_LISTA_DEFECTO: s.TOT_LISTA_DEFECTO,
            CC_X_PRODUCTO: s.CC_X_PRODUCTO,

            ID_SUCURSAL: s.ID_SUCURSAL,
            TIPO_SUCURSAL: s.TIPO_SUCURSAL,
            NUM_ESTABLECIMIENTO: s.NUM_ESTABLECIMIENTO,
            LOGO: s.LOGO,
            NOMBRE_COMERCIAL_SUCURSAL: s.NOMBRE_COMERCIAL_SUCURSAL,
            DIRECCION_SUCURSAL: s.DIRECCION_SUCURSAL,
            RUC_SUCURSAL: s.RUC_SUCURSAL,
            TELEFONO_SUCURSAL: s.TELEFONO_SUCURSAL,
            CONTABILIDAD_SUCURSAL: s.CONTABILIDAD_SUCURSAL,
            CELULAR_SUCURSAL: s.CELULAR_SUCURSAL,
            AMBIENTE_SUCURSAL: s.AMBIENTE_SUCURSAL,
            WEB_SUCURSAL: s.WEB_SUCURSAL,
            INCLUYE_IVA: s.INCLUYE_IVA,
            TIENDA: s.TIENDA,
            STOCK_REQUERIDOO: s.STOCK_REQUERIDOO,

            DES_AGENDAMIENTO_CITAS: s.DES_AGENDAMIENTO_CITAS,
            DES_QUIEROSERVICIO: s.DES_QUIEROSERVICIO,
            DES_YO_LLEVO_CARRO: s.DES_YO_LLEVO_CARRO,
            DES_LLEVEN_CARRO_TALLER: s.DES_LLEVEN_CARRO_TALLER,
            CALCULO_PVPS: s.CALCULO_PVPS,
            IND_COSTO_PRODUCTO: s.IND_COSTO_PRODUCTO,
            IND_CC_ROLES: s.IND_CC_ROLES,
            IND_VALIDAR_FECHA_CONTABLE: s.IND_VALIDAR_FECHA_CONTABLE,
            IND_WSP_TOKEN: s.IND_WSP_TOKEN,
            IND_WSP_INSTANCE: s.IND_WSP_INSTANCE,
            IND_CONTROL_SERIES: s.IND_CONTROL_SERIES,
            IND_LINEA_CREDITO: s.IND_LINEA_CREDITO,
            DOC_TRIBUTARIOSS: s.DOC_TRIBUTARIOSS,

            IND_LIMITAR_FACTURAS: s.IND_LIMITAR_FACTURAS,
            NUM_LIMITAR_FACTURAS: s.NUM_LIMITAR_FACTURAS,

            IND_TIPOS_VEHICULOSS: s.IND_TIPOS_VEHICULOSS,
            IND_PRODUCIR_MATERIA_PRIMA: s.IND_PRODUCIR_MATERIA_PRIMA,

            IND_CAT_TREEE: s.IND_CAT_TREEE,

            IND_PUSHER_CH_POS: s.IND_PUSHER_CH_POS,
            IND_PUSHER_SOL_DIAS_V: s.IND_PUSHER_SOL_DIAS_V,
            IND_PUSHER_SOL_SOBRE_COSTO: s.IND_PUSHER_SOL_SOBRE_COSTO,
            IND_PUSHER_SOL_DCTO: s.IND_PUSHER_SOL_DCTO,
            IND_PUSHER_SOL_CRE: s.IND_PUSHER_SOL_CRE,
            IND_PUSHER_TRANSFERENCIAS: s.IND_PUSHER_TRANSFERENCIAS,

            IND_KARDEX_NUEVO: s.IND_KARDEX_NUEVO,

            IND_CONTROL_REST_VENDEDOR: s.IND_CONTROL_REST_VENDEDOR,
            IND_CONTROL_REST_ADMIN: s.IND_CONTROL_REST_ADMIN,

            IND_CONTROL_CATEGORIA: s.IND_CONTROL_CATEGORIA,

            IND_COSTO_IVAGASTO: s.IND_COSTO_IVAGASTO,
            IND_CIERRE_CONSUMIDOR_FINAL: s.IND_CIERRE_CONSUMIDOR_FINAL,
            IND_CONTROL_COSTO_VENTAS: s.IND_CONTROL_COSTO_VENTAS,
            IND_CONTROL_COSTO_COMPRAS: s.IND_CONTROL_COSTO_COMPRAS,
            IND_PUNTO_EMISION_USUARIO: s.IND_PUNTO_EMISION_USUARIO,
            IND_TIPO_ASEGURADORAA: s.IND_TIPO_ASEGURADORAA,
            IND_GUIA_AUTOMATICAA: s.IND_GUIA_AUTOMATICAA,
            //ERICK TOAPANTA
            IND_IMPRESION_SILENCIOSA: s.IND_IMPRESION_SILENCIOSA,
            IND_DIVIDIR_COMP_CUOTAS: s.IND_DIVIDIR_COMP_CUOTAS,
            IND_INVENTARIO_RECEPCION: s.IND_INVENTARIO_RECEPCION,

            IND_RISE: s.IND_RISE,

            CANTIDAD_SUCURSALES: s.CANTIDAD_SUCURSALES,
            IND_RECARGO_GASTOS_COMPRAS: s.IND_RECARGO_GASTOS_COMPRAS,

            //GEORGE ORDOÑEZ 
            CANT_DECIMALES_VENTA: s.CANT_DECIMALES_VENTA,
            CANT_DECIMALES_COSTO: s.CANT_DECIMALES_COSTO,

            // LENIN
            IND_ADMISION_CONSULTA_EXTERNA: s.IND_ADMISION_CONSULTA_EXTERNA,
            IND_PROMOCION: s.IND_PROMOCION,

            // LARRY JOSUE MIJARES SILVA
            IND_STOCK_REQUERIDO_TALLER: s.IND_STOCK_REQUERIDO_TALLER,

            // JHONNY CHAMBA
            IND_CAJA: s.IND_CAJA,
            IND_BLOQUEO_FACTURA_NOTIFICACION: s.IND_BLOQUEO_FACTURA_NOTIFICACION,
            IND_NEW_LIQUIDACION: s.IND_NEW_LIQUIDACION

        };

        var postSesionesFG = $.post("ajax/UsuarioAjax.php?op=CrearSesionesSucursal", data, function(q) {
            console.log("crea las sesiones");
        });
        postSesionesFG.always(function() {
            $.post("ajax/UsuarioAjax.php?op=IngresarPaginaPrincipal", function(r) {
                var s = $.parseJSON(r);
                $("#ModalSesion").modal("hide");
                if (s.PAGINA_INICIO == 'Venta') {
                    if (bowser.osname != 'Android' && bowser.osname != 'iOS') {
                        $(location).attr("href", s.PAGINA_INICIO);
                    } else {
                        $(location).attr("href", "Ventamovil");
                    }
                } else {
                    $(location).attr("href", s.PAGINA_INICIO);
                }
            });
        });
    });
}

function ValidarCierrePeriodo(fechaContable) {
    return $.ajax({
        url: "./ajax/CierrePeriodoContableAjax.php?op=ValidarCierrePeriodo&fechaContable=" + fechaContable
    });
    /*var  ind_cierre=0;
    $.post("./ajax/CierrePeriodoContableAjax.php?op=ValidarCierrePeriodo", {
         fechaContable: fechaContable
    }, function (r) {
         //alert(r);
         console.log(r);
         var s = $.parseJSON(r);
               ind_cierre= s.INDICADOR;	
    });	
    //console.log('cirere'+ind_cierre);
    return ind_cierre;*/
}

function ValidarConciliacionGeneral(idAsiento) {
    return $.ajax({
        url: "./ajax/IngresoCompraAjax.php?op=ValidarConciliacionGeneral&idAsiento=" + idAsiento
    });
}

function ValidarNumOpIngresosGeneral(idBanco, numOperacion) {

    // SINCRONO
    return $.ajax({
        type: 'post',
        url: "./ajax/FuncionesGeneralesAjax.php?op=ValidarNumOpIngresosGeneral&idBanco=" + idBanco + "&numOperacion=" + numOperacion,
        async: false
    });

    // ASINCRONO
    // return $.ajax({
    //     url: "./ajax/FuncionesGeneralesAjax.php?op=ValidarNumOpIngresosGeneral&idBanco=" + idBanco + "&numOperacion=" + numOperacion
    // });
}

function ValidarNumOpEgresosGeneral(idBanco, numOperacion) {

    // SINCRONO
    return $.ajax({
        type: 'post',
        url: "./ajax/FuncionesGeneralesAjax.php?op=ValidarNumOpEgresosGeneral&idBanco=" + idBanco + "&numOperacion=" + numOperacion,
        async: false
    });

    // ASINCRONO
    // return $.ajax({
    //     url: "./ajax/FuncionesGeneralesAjax.php?op=ValidarNumOpEgresosGeneral&idBanco=" + idBanco + "&numOperacion=" + numOperacion
    // });
}

function AlertaCorteEmpresas() {
    $.post("ajax/GestionCortesAjax.php?op=ModalCorte", function(r) {

        if (r == 'SI') {
            $.post("ajax/GestionCortesAjax.php?op=ModalCorteDiv", function(r) {
                $("#desModConta").html(r);
            });
            $("#ModConta").modal({ backdrop: 'static', keyboard: false });

        } else {
            $("#ModConta").modal('hide');
        }
    });
}

function AlertaModalActualizaciones() {
    $.post("ajax/BandejaEntradaAjax.php?op=ModalActualizaciones", function(e) {

        if (e == 2) {

            if ($('#ModGenActualizaciones').is(':visible')) {
                console.log("abierto");
            } else {

                $('#ModGenActualizaciones').modal({ backdrop: 'static', keyboard: false });
            }


            $.post("ajax/BandejaEntradaAjax.php?op=ModalActualizacionesDiv", function(q) {

                var w = $.parseJSON(q);

                if (w.tipoModal == 1) {
                    $("#desModActualiz").attr("style", "-webkit-transform:translate(0,0%);max-width: 100%; width:70%;");
                } else if (w.tipoModal == 2) {
                    $("#desModActualiz").attr("style", "-webkit-transform:translate(0,0%);max-width: 100%; width:65%;");
                } else if (w.tipoModal == 3) {
                    $("#desModActualiz").attr("style", "-webkit-transform:translate(0,0%);max-width: 100%; width:50%;");
                } else if (w.tipoModal == 4) {
                    $("#desModActualiz").attr("style", "-webkit-transform:translate(0,0%);max-width: 100%; width:40%;");
                } else if (w.tipoModal == 5) {
                    $("#desModActualiz").attr("style", "-webkit-transform:translate(0,0%);max-width: 100%; width:30%;");
                }


                $("#desModActualiz").html(w.html);

                if (w.numImagenes > 0) {
                    $.post("./ajax/NotificacionesGetsoftERPAjax.php?op=cargarCarruselIngreso", { IdNotificacionGeneral: w.idNotificacion }, function(e) {
                        var w = $.parseJSON(e);

                        $("#divIndicadoresIngresoPreviues").html(w.indicadoresIngreso);
                        $("#divImagenesIngresoPreviues").html(w.imagenesIngreso);

                        $('.carousel').carousel({
                            interval: 1000
                        });
                    });
                }

                if (w.chkOpcionesVideo == 'SI') {
                    $("#iframeNotificacionPrev").html('<iframe width="560" height="315" src="' + w.linkVideo + '" frameborder="0" allowfullscreen></iframe>');
                }

            });







        } else {
            $("#ModGenActualizaciones").modal('hide');
        }
    });
}



function ListadoTransferencias() {
    $.post("./ajax/TransferenciaAjax.php?op=listRecibidas", function(r) {
        $("#bodyListaTransEnviadas").html(r);
        $("[data-toggle=popover]").popover();
    });
}

function ListadoTransferenciasRecibidasFuncionesGenerales() {
    $.post("./ajax/TransferenciaAjax.php?op=listRecibidas2", function(r) {
        $("#bodyListaTransRecibidas").html(r);
        $("[data-toggle=popover]").popover();
    });
}

function CargarPedidosPendientes() {
    $.post("./ajax/PedidoAjax.php?op=alerta", function(r) {
        //alert(r);
        $("#alertaPed").html(r);
    });
}

function CargarClientePendiente(id, idcategoria, nombre, tipo_documento, num_documento, direccion, idprovincia, idcanton, idparroquia, telefono, email, email_alt, imp_linea_credito, formapago, numero_cuenta, nombre_cuenta, idvendedor, idretrenta, idretiva, subcuenta, nombre_subcuenta, estado, descuento) {
    //ComboCatClie();
    //ComboVendedor();
    //ComboRetRenta();
    //ComboRetIva();
    //if(ComboCatClie() && ComboVendedor() && ComboRetRenta() && ComboRetIva()){
    $("#modalClientesPendientes").modal("show");
    $("#titulomodal").html('Aprobar cliente :' + nombre);
    $("#txtIdPersona1").val(id);
    $("#cboCatcliente1").val(idcategoria);
    //$("#cboCatcliente1 option:not(:selected)").remove();
    $("#txtNombre1").val(nombre);
    $("#txtLineaCredito1").val(imp_linea_credito);
    $("#CboFormaPago1").val(formapago);
    $("#CboFormaPago1 option:not(:selected)").remove();
    $("#txtcodcuenta1").val(numero_cuenta);
    $("#txtCtaContable1").val(numero_cuenta + '-' + nombre_cuenta);
    $("#cboRetRenta1").val(idretrenta);
    $("#cboRetIVA1").val(idretiva);
    $("#cbopvendedor1").val(idvendedor);
    $("#txtcodSubCuenta1").val(subcuenta);
    $("#txtSubCuenta1").val(subcuenta + '-' + nombre_subcuenta);
    $("#txtdescuento1").val(descuento);
    $("#btnBuscarCuenta1").prop('disabled', false);
    $("#btnBuscarSubCuenta1").prop('disabled', false);
    //}
}

function CombocategClie() {
    $.post("./ajax/ClienteAjax.php?op=listCatergoria", function(r) {
        $("#cboCatcliente").html(r);
        // console.log(r);
        $("#cboCatcliente1").html(r);
    });
}

function CargarTransferenciasPendientes() {
    $.post("./ajax/TransferenciaAjax.php?op=alerta", function(r) {
        //alert(r);
        $("#notifTransferencias").html(r);
        //console.log(r);
    });
}

function CargarAjustesInventarioPendientes() {
    $.post("./ajax/AjusteInventarioAjax.php?op=alertaAjustes", function(r) {
        //alert(r);
        $("#alertaAjustes").html(r);
    });
}

function CargarInventarioPendiente(idAjuste) {
    $("#btnAprobarAjuste").attr('onClick', 'AprobarAjusteInv(' + idAjuste + ')');
    $("#btnAnularAjuste").attr('onClick', 'AnularAjusteInv(' + idAjuste + ')');
    $("#modalInventario").modal("show");
    var url = "./Reportes/ExAjusteInventario.php?id=" + idAjuste + "&print=false";
    //console.log(url);
    $('#iframe').attr('src', url);
    bloquearPantalla();
    document.getElementById("iframe").addEventListener('load', function() {
        $.unblockUI();
    });
}

function AprobarAjusteInv(idAjuste) {
    $("#modalInventario").modal("hide");
    bloquearPantalla();
    $.post("./ajax/AjusteInventarioAjax.php?op=AprobarAjusteInv", { idAjuste: idAjuste }, function(r) {
        swal("Mensaje del Sistema", r, "success");
        $.unblockUI();
        CargarAjustesInventarioPendientes();
    });
}

function AnularAjusteInv(idAjuste) {
    $("#modalInventario").modal("hide");
    bloquearPantalla();
    $.post("./ajax/AjusteInventarioAjax.php?op=AnularAjusteInv", { idAjuste: idAjuste }, function(r) {
        swal("Mensaje del Sistema", r, "success");
        $.unblockUI();
        CargarAjustesInventarioPendientes();
    });
}
/*
function AbrirModalAceptaTrans(idTranseferencia, idBodegaOrigen, bodegaOrigen, idBodegaDestino, bodegaDestino, fecha, numTransfer) {
    //alert(n);
    //$(".modal-lg").css('width','1200px');
    $("#modalAceptaTransferencia").modal("show");
    $("#divMotivoAnulacion").hide();
    $("#txtMotivoAnulacion").val("");
    $("#numTransferModal").html("");
    $("#numTransferModal").html(`<b>${numTransfer}</b>`);
    $("#cboSucursalPart").html("<option value=" + idBodegaOrigen + ">" + bodegaOrigen + "</option>");
    $("#cboSucursalDest").html("<option value=" + idBodegaDestino + ">" + bodegaDestino + "</option>");
    $("#txtFecha").val(fecha);
    $("#IdTransferencia").val(idTranseferencia);
    $.post("./ajax/TransferenciaAjax.php?op=listTransferenciaModal", { idTranseferencia: idTranseferencia }, function(r) {
        $("#AcepPed").html(r);
    });
}*/


function AbrirModalAceptaTrans(idTranseferencia) {
    //alert(n);
    //$(".modal-lg").css('width','1200px');
    $("#modalAceptaTransferencia").modal("show");
    $("#divMotivoAnulacion").hide();
    $("#txtMotivoAnulacion").val("");
    $("#numTransferModal").html("");
    $("#txtObservacionGeneralModalTransf").val("");


    $("#idTransferenciaModalAcep").val(idTranseferencia);

    $('#fechaAceptacionModalTransf').datepicker({
        autoclose: true,
        format: 'dd/mm/yyyy',
        orientation: "right"
    });

    let datepicker = $('#fechaAceptacionModalTransf');
    datepicker.datepicker();
    datepicker.datepicker('setDate', new Date());

    $("#fechaAceptacionModalTransf").prop('disabled', true);

    $.post("./ajax/FuncionesGeneralesAjax.php?op=listTransNot", { idTranseferencia: idTranseferencia }, function(k) {
        s = $.parseJSON(k);
        $("#numTransferModal").html(s.NUM_TRANS);
        $("#txtUsuarioSolictante").val(s.NOM_USU);
        $("#cboSucursalPart").html("<option value=" + s.ID_BODEGA_ORIGEN + ">" + s.BODEGA_ORIGEN + "</option>");
        $("#cboSucursalDest").html("<option value=" + s.ID_BODEGA_DESTINO + ">" + s.BODEGA_DESTINO + "</option>");
        $("#txtFecha").val(s.FECHA);
    });

    $.post("./ajax/TransferenciaAjax.php?op=listTransferenciaModal", { idTranseferencia: idTranseferencia }, function(r) {
        $("#AcepPed").html(r);
    });
}



/*
function abrirModalCorreoVenta(idDetalle) {
    $("#modalcorreoVenta").modal("show");
    $("#txtCorreoEnvio").val("");

    $.post("./ajax/SeguimientoCarteraAjax.php?op=cargarDatosSeguimientoDet", {
        idDetalle: idDetalle
    }, function(r) {
        s = $.parseJSON(r);

        $("#tituloModalOpciones").html("Opciones  del comprobante " + s.NUM_CUOTA);
        $(".tituloModalCorreo").html("Envío de Correo Electrónico " + s.NUM_CUOTA);
        $("#idVentaModal").val(s.ID_SEGUIMIENTO);
        $("#idVentaModalAnulacion").val(s.ID_SEGUIMIENTO);
        $(".ClienteModal").html(s.CLIENTE);
        $(".NumComprobanteModal").html(s.NUM_CUOTA);
        $(".FechaModal").html(s.FECHA_CUOTA);
        $(".totalModal").html(s.VALOR);
        $("#txtCorreoEnvio").val(s.EMAIL);
        CargarNotificacionesCRM();

    });

}*/

function validarstock_acepta(i) {
    var cantidad_enviada = parseInt($("#txtcantidadped" + i).val());
    var cantidad_aceptada = parseInt($("#txtcantidadAcep" + i).val());
    if (cantidad_aceptada > cantidad_enviada) {
        $("#txtcantidadAcep" + i).val("");
        $("#txtcantidadAcep" + i).focus();
        swal("Mensaje del Sistema", "La cantidad aceptada no puede ser mayor a la cantidad enviada", "error");
    }
}

function bloquearPantalla() {
    //var message = '<div class="spinner-grow" style="width: 3rem; height: 3rem;" role="status"> <span class="sr-only"></span></div><div class="spinner-grow text-primary" style="width: 3rem; height: 3rem;" role="status"> <span class="sr-only"></span></div><div class="spinner-grow text-secondary" style="width: 3rem; height: 3rem;" role="status"><span class="sr-only"></span></div>';
    var message = '<div class="spinner-border  text-info" style="width: 3rem; height: 3rem;" role="status"><span class="sr-only">Loading...</span></div>';
    $.blockUI({
        baseZ: 16000,
        fadeIn: 0,
        timeout: 0,
        message: message,
        css: {
            border: 'none',
            padding: '15px',
            backgroundColor: 'none',
            '-webkit-border-radius': '10px',
            '-moz-border-radius': '10px',
            color: '#000'
        }
    });
}

function bloquearPantallaValidacion() {
    //var message = '<div class="spinner-grow" style="width: 3rem; height: 3rem;" role="status"> <span class="sr-only"></span></div><div class="spinner-grow text-primary" style="width: 3rem; height: 3rem;" role="status"> <span class="sr-only"></span></div><div class="spinner-grow text-secondary" style="width: 3rem; height: 3rem;" role="status"><span class="sr-only"></span></div>';
    var message = '<div class="spinner-border  text-info" style="width: 3rem; height: 3rem;" role="status"><span class="sr-only">validate process...</span></div><br><label>Validando......</label>';
    $.blockUI({
        baseZ: 16000,
        fadeIn: 0,
        timeout: 0,
        message: message,
        css: {
            border: 'none',
            padding: '15px',
            backgroundColor: 'none',
            '-webkit-border-radius': '10px',
            '-moz-border-radius': '10px',
            color: '#000'
        }
    });
}

function bloquearPantallaCargando() {
    //var message = '<div class="spinner-grow" style="width: 3rem; height: 3rem;" role="status"> <span class="sr-only"></span></div><div class="spinner-grow text-primary" style="width: 3rem; height: 3rem;" role="status"> <span class="sr-only"></span></div><div class="spinner-grow text-secondary" style="width: 3rem; height: 3rem;" role="status"><span class="sr-only"></span></div>';
    var message = '<div class="spinner-border  text-info" style="width: 3rem; height: 3rem;" role="status"><span class="sr-only">validate process...</span></div><br><label>Cargando...</label>';
    $.blockUI({
        baseZ: 16000,
        fadeIn: 0,
        timeout: 0,
        message: message,
        css: {
            border: 'none',
            padding: '15px',
            backgroundColor: 'none',
            '-webkit-border-radius': '10px',
            '-moz-border-radius': '10px',
            color: '#000'
        }
    });
}

function returnDateMonth(mes, anio) {
    return new Date(anio, mes, 0).getDate();
}


function Mayusculas(e, elemento) {
    tecla = (document.all) ? e.keyCode : e.which;
    elemento.value = elemento.value.toUpperCase();
}

function justNumbers(e) {
    var keynum = window.event ? window.event.keyCode : e.which;
    if ((keynum == 8 || keynum == 48))
        return true;
    if (keynum <= 47 || keynum >= 58) return false;
    return /\d/.test(String.fromCharCode(keynum));
}

function onKeyDecimal(e, field) {

    key = e.keyCode ? e.keyCode : e.which
    if (key == 8) return true
    if (key > 47 && key < 58) {
        if (field.value == "") return true
        regexp = /.[0-9]{8}$/
        return !(regexp.test(field.value))
    }
    if (key == 46) {
        if (field.value == "") return false
        regexp = /^[0-9]+$/
        return regexp.test(field.value)
    }
    return false
}

function onKeyDecimal2(evt, el) {
    var charCode = (evt.which) ? evt.which : event.keyCode;
    var number = el.value.split('.');
    if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    //just one dot (thanks ddlab)
    if (number.length > 1 && charCode == 46) {
        return false;
    }
    //get the carat position
    var caratPos = getSelectionStart(el);
    var dotPos = el.value.indexOf(".");
    if (caratPos > dotPos && dotPos > -1 && (number[1].length > 1)) {
        return false;
    }
    return true;
}


function getSelectionStart(o) {
    if (o.createTextRange) {
        var r = document.selection.createRange().duplicate()
        r.moveEnd('character', o.value.length)
        if (r.text == '') return o.value.length
        return o.value.lastIndexOf(r.text)
    } else return o.selectionStart
}

function validarNumGuion(e) {
    tecla = (document.all) ? e.keyCode : e.which;
    tecla = String.fromCharCode(tecla)
    return /^[0-9\-]+$/.test(tecla);
}

function GeneraHora() {
    $('#reloj').html(moment().format('H:mm:ss'));
}

setInterval(GeneraHora, 1000);



function validarRucCedula(numero) {


    /* alert(numero); */

    var suma = 0;
    var residuo = 0;
    var pri = false;
    var pub = false;
    var nat = false;
    var numeroProvincias = 22;
    var modulo = 11;

    /* Verifico que el campo no contenga letras */
    var ok = 1;
    for (i = 0; i < numero.length && ok == 1; i++) {
        var n = parseInt(numero.charAt(i));
        if (isNaN(n)) ok = 0;
    }
    if (ok == 0) {
        // alert("No puede ingresar caracteres en el número");         
        return false;
    }

    if (numero.length < 10) {
        //alert('El número ingresado no es válido');                  
        return false;
    }

    /* Los primeros dos digitos corresponden al codigo de la provincia */
    provincia = numero.substr(0, 2);
    if (provincia < 1 || provincia > numeroProvincias) {
        // alert('El código de la provincia (dos primeros dígitos) es inválido');
        return false;
    }

    /* Aqui almacenamos los digitos de la cedula en variables. */
    d1 = numero.substr(0, 1);
    d2 = numero.substr(1, 1);
    d3 = numero.substr(2, 1);
    d4 = numero.substr(3, 1);
    d5 = numero.substr(4, 1);
    d6 = numero.substr(5, 1);
    d7 = numero.substr(6, 1);
    d8 = numero.substr(7, 1);
    d9 = numero.substr(8, 1);
    d10 = numero.substr(9, 1);

    /* El tercer digito es: */
    /* 9 para sociedades privadas y extranjeros   */
    /* 6 para sociedades publicas */
    /* menor que 6 (0,1,2,3,4,5) para personas naturales */

    if (d3 == 7 || d3 == 8) {
        //alert('El tercer dígito ingresado es inválido');                     
        return false;
    }

    /* Solo para personas naturales (modulo 10) */
    if (d3 < 6) {
        nat = true;
        p1 = d1 * 2;
        if (p1 >= 10) p1 -= 9;
        p2 = d2 * 1;
        if (p2 >= 10) p2 -= 9;
        p3 = d3 * 2;
        if (p3 >= 10) p3 -= 9;
        p4 = d4 * 1;
        if (p4 >= 10) p4 -= 9;
        p5 = d5 * 2;
        if (p5 >= 10) p5 -= 9;
        p6 = d6 * 1;
        if (p6 >= 10) p6 -= 9;
        p7 = d7 * 2;
        if (p7 >= 10) p7 -= 9;
        p8 = d8 * 1;
        if (p8 >= 10) p8 -= 9;
        p9 = d9 * 2;
        if (p9 >= 10) p9 -= 9;
        modulo = 10;
    }

    /* Solo para sociedades publicas (modulo 11) */
    /* Aqui el digito verficador esta en la posicion 9, en las otras 2 en la pos. 10 */
    else if (d3 == 6) {
        pub = true;
        p1 = d1 * 3;
        p2 = d2 * 2;
        p3 = d3 * 7;
        p4 = d4 * 6;
        p5 = d5 * 5;
        p6 = d6 * 4;
        p7 = d7 * 3;
        p8 = d8 * 2;
        p9 = 0;
    }

    /* Solo para entidades privadas (modulo 11) */
    else if (d3 == 9) {
        pri = true;
        p1 = d1 * 4;
        p2 = d2 * 3;
        p3 = d3 * 2;
        p4 = d4 * 7;
        p5 = d5 * 6;
        p6 = d6 * 5;
        p7 = d7 * 4;
        p8 = d8 * 3;
        p9 = d9 * 2;
    }

    suma = p1 + p2 + p3 + p4 + p5 + p6 + p7 + p8 + p9;
    residuo = suma % modulo;

    /* Si residuo=0, dig.ver.=0, caso contrario 10 - residuo*/
    digitoVerificador = residuo == 0 ? 0 : modulo - residuo;

    /* ahora comparamos el elemento de la posicion 10 con el dig. ver.*/
    if (pub == true) {
        if (digitoVerificador != d9) {
            //alert('El ruc de la empresa del sector público es incorrecto.');            
            return false;
        }
        /* El ruc de las empresas del sector publico terminan con 0001*/
        if (numero.substr(9, 4) != '0001') {
            // alert('El ruc de la empresa del sector público debe terminar con 0001');
            return false;
        }
    } else if (pri == true) {
        if (digitoVerificador != d10) {
            //alert('El ruc de la empresa del sector privado es incorrecto.');
            return false;
        }
        if (numero.substr(10, 3) != '001') {
            //alert('El ruc de la empresa del sector privado debe terminar con 001');
            return false;
        }
    } else if (nat == true) {
        if (digitoVerificador != d10) {
            //  alert('El número de cédula de la persona natural es incorrecto.');
            return false;
        }
        if (numero.length > 10 && numero.substr(10, 3) != '001') {
            //alert('El ruc de la persona natural debe terminar con 001');
            return false;
        }
    }
    return true;
}



function validarRuc2(number) {

    var dto = number.length;
    var valor;
    var acu = 0;

    for (var i = 0; i < dto; i++) {
        valor = number.substring(i, i + 1);
        if (valor == 0 || valor == 1 || valor == 2 || valor == 3 || valor == 4 || valor == 5 || valor == 6 || valor == 7 || valor == 8 || valor == 9) {
            acu = acu + 1;
        }
    }
    if (acu == dto) {
        while (number.substring(10, 13) != 001) {

            return false;
        }
        while (number.substring(0, 2) > 24) {
            return false;
        }

        var porcion1 = number.substring(2, 3);
        if (porcion1 < 6) {
            return true;
        } else {
            if (porcion1 == 6) {
                return true;
            } else {
                if (porcion1 == 9) {
                    return true;
                }
            }
        }
    } else {
        return false;
    }

}

function validarcedula2(cedula) {
    //Preguntamos si la cedula consta de 10 digitos
    if (cedula.length == 10) {

        //Obtenemos el digito de la region que sonlos dos primeros digitos
        var digito_region = cedula.substring(0, 2);

        //Pregunto si la region existe ecuador se divide en 24 regiones
        if (digito_region >= 1 && digito_region <= 24) {

            // Extraigo el ultimo digito
            var ultimo_digito = cedula.substring(9, 10);

            //Agrupo todos los pares y los sumo
            var pares = parseInt(cedula.substring(1, 2)) + parseInt(cedula.substring(3, 4)) + parseInt(cedula.substring(5, 6)) + parseInt(cedula.substring(7, 8));

            //Agrupo los impares, los multiplico por un factor de 2, si la resultante es > que 9 le restamos el 9 a la resultante
            var numero1 = cedula.substring(0, 1);
            var numero1 = (numero1 * 2);
            if (numero1 > 9) {
                var numero1 = (numero1 - 9);
            }

            var numero3 = cedula.substring(2, 3);
            var numero3 = (numero3 * 2);
            if (numero3 > 9) {
                var numero3 = (numero3 - 9);
            }

            var numero5 = cedula.substring(4, 5);
            var numero5 = (numero5 * 2);
            if (numero5 > 9) {
                var numero5 = (numero5 - 9);
            }

            var numero7 = cedula.substring(6, 7);
            var numero7 = (numero7 * 2);
            if (numero7 > 9) {
                var numero7 = (numero7 - 9);
            }

            var numero9 = cedula.substring(8, 9);
            var numero9 = (numero9 * 2);
            if (numero9 > 9) {
                var numero9 = (numero9 - 9);
            }

            var impares = numero1 + numero3 + numero5 + numero7 + numero9;

            //Suma total
            var suma_total = (pares + impares);

            //extraemos el primero digito
            var primer_digito_suma = String(suma_total).substring(0, 1);

            //Obtenemos la decena inmediata
            var decena = (parseInt(primer_digito_suma) + 1) * 10;

            //Obtenemos la resta de la decena inmediata - la suma_total esto nos da el digito validador
            var digito_validador = decena - suma_total;

            //Si el digito validador es = a 10 toma el valor de 0
            if (digito_validador == 10)
                var digito_validador = 0;

            //Validamos que el digito validador sea igual al de la cedula
            if (digito_validador == ultimo_digito) {
                return true;
            } else {
                //console.log('la cedula:' + cedula + ' es incorrecta');
                return false;
            }

        } else {
            // imprimimos en consola si la region no pertenece
            return false;

        }
    } else {
        //imprimimos en consola si la cedula tiene mas o menos de 10 digitos
        return false;
    }
}

function validarCedExtr(cad) {
    //var cad = $("#txtNum_Documento").val();
    var total = 0;
    var longitud = cad.length;
    var longcheck = longitud - 1;

    if (cad !== "" && longitud === 10) {
        for (i = 0; i < longcheck; i++) {
            if (i % 2 === 0) {
                var aux = cad.charAt(i) * 2;
                if (aux > 9) aux -= 9;
                total += aux;
            } else {
                total += parseInt(cad.charAt(i)); // parseInt o concatenará en lugar de sumar
            }
        }

        total = total % 10 ? 10 - total % 10 : 0;

        if (cad.charAt(longitud - 1) == total) {
            return true;
        } else {
            return false;
        }
    }
}


function validarCedula(ced) {



    let [suma, mul, chars] = [0, 1, ced.length];
    for (let index = 0; index < chars; index += 1) {
        let num = ced[index] * mul;
        suma += num - (num > 9) * 9;
        mul = 1 << index % 2;
    }

    if ((suma % 10 === 0) && (suma > 0)) {
        return true;
    } else {
        return false;
    }


}


function redondear(num, scale) {
    if (Math.round(num) != num) {
        if (Math.pow(0.1, scale) > num) {
            return 0;
        }
        var sign = Math.sign(num);
        var arr = ("" + Math.abs(num)).split(".");
        if (arr.length > 1) {
            if (arr[1].length > scale) {
                var integ = +arr[0] * Math.pow(10, scale);
                var dec = integ + (+arr[1].slice(0, scale) + Math.pow(10, scale));
                var proc = +arr[1].slice(scale, scale + 1)
                if (proc >= 5) {
                    dec = dec + 1;
                }
                dec = sign * (dec - Math.pow(10, scale)) / Math.pow(10, scale);
                return dec;
            }
        }
    }
    return num;
}


function descargarExcelASientoFN(idAsiento) {
    //	e.preventDefault();

    console.log(idAsiento);
    url = "./ajax/AsientoContableAjax.php?op=descargarExcelA" + '&idAsiento=' + idAsiento;
    console.log(url);
    //$("[data-toggle=popover]").popover();
    window.open(url, '_blank');

    return false;
}

function RegenerarAsientoGeneral(idAsiento) {

    if (idAsiento == undefined || idAsiento == 'undefined') {
        swal("Mensaje del Sistema", "Error al procesar verificar que todas las cuentas estén configuradas", "error");
        $("#ModalAsiento").modal("hide");
    } else {
        bootbox.confirm("¿Está seguro de regenerar este documento?", function(result) {
            if (result) {
                bloquearPantalla();

                $.post("./ajax/AsientoContableAjax.php?op=ValidarCierreContableGeneral", { idAsiento: idAsiento }, function(a) {
                    $.unblockUI();
                    var b = $.parseJSON(a);

                    if (b.IND_VALIDADOR_CIERRE_CONTABLE == 0) {
                        $.post("./ajax/AsientoContableAjax.php?op=RegenerarAsientoGeneral", { idAsiento: idAsiento }, function(r) {
                            $.unblockUI();
                            var s = $.parseJSON(r);
                            if (s[0] == 1) {
                                swal("Mensaje del Sistema", s[2], "success");
                            } else {
                                swal("Mensaje del Sistema", s[2] + " " + s[1], "error");
                            }
                            $("#ModalAsiento").modal("hide");

                        });

                    } else {
                        swal("Mensaje del Sistema", "EL CIERRE DEL PERIODO SE ENCUENTRA CERRADO", "error");
                    }

                });
            }
        });
    }


}

function VerAsiento_General(idAsiento) {
    console.log(idAsiento);
    bloquearPantalla();
    $.post("./ajax/AsientoContableAjax.php?op=verAsiento", {
        idAsiento: idAsiento
    }, function(r) {
        console.log(r);
        $.unblockUI();
        $("#htmlAsiento").html(r);
    });
}

function ListadoAsientos() {
    $.post("./ajax/AsientoContableAjax.php?op=list", function(r) {
        $("#bodyAsiento").html(r);
        $("[data-toggle=popover]").popover();
        console.log(r);
    });
}


function ImprimirAsientoFNConsolidado(idAsiento, idAsientocontable) {


    // iOS  BlackBerry OS  Android
    if (bowser.osname != 'iOS' && bowser.osname != 'Android') {
        if (bowser.name == 'Chrome' || bowser.name == 'Vivaldi') {
            printJS({ printable: './Reportes/ExAsientoContableConsolidadoA4.php?' + '&idAsiento=' + idAsiento + '&idAsientocontable=' + idAsientocontable + "&print=false", type: 'pdf', showModal: true });
        } else {
            $("#modalVisualizacion").modal("show");

            var url = './Reportes/ExAsientoContableConsolidadoA4.php?' + '&idAsiento=' + idAsiento + '&idAsientocontable=' + idAsientocontable + "&print=true";

            $('#iframe2').attr('src', url);
            bloquearPantalla();
            document.getElementById("iframe2").addEventListener('load', function() {
                $.unblockUI();
                //$('#iframe').reload();
            });
        }

    } else {

        window.open('./Reportes/ExAsientoContableConsolidadoA4.php?' + '&idAsiento=' + idAsiento + '&idAsientocontable=' + idAsientocontable + '&print=false', '_blank');

    }
}

function ImprimirAsientoFN(idAsiento) {


    // iOS  BlackBerry OS  Android
    if (bowser.osname != 'iOS' && bowser.osname != 'Android') {
        if (bowser.name == 'Chrome' || bowser.name == 'Vivaldi') {
            printJS({ printable: './Reportes/ExAsientoContableA4.php?' + '&idAsiento=' + idAsiento + "&print=false", type: 'pdf', showModal: true });
        } else {
            $("#modalVisualizacion").modal("show");

            var url = './Reportes/ExAsientoContableA4.php?' + '&idAsiento=' + idAsiento + "&print=true";

            $('#iframe2').attr('src', url);
            bloquearPantalla();
            document.getElementById("iframe2").addEventListener('load', function() {
                $.unblockUI();
                //$('#iframe').reload();
            });
        }

    } else {

        window.open('./Reportes/ExAsientoContableA4.php?' + '&idAsiento=' + idAsiento + '&print=false', '_blank');

    }
}

function roundToTwo(num) {
    return +(Math.round(num + "e+2") + "e-2");
}

function asyncSqrtGeneral(value, callback) {
    setTimeout(function() {
        callback(value, value * value);
    }, 0 | Math.random() * 100);
}

function RechazarTransferencia(e) {
    e.preventDefault();
    idTransferencia = $("#IdTransferencia").val();
    motivoAnulacion = $("#txtMotivoAnulacion").val();

    bootbox.confirm("¿Está seguro de rechazar la transferencia?", function(result) {
        bloquearPantalla();
        if (result) {
            $.post("./ajax/TransferenciaAjax.php?op=RechazarTrans", {
                idTransferencia: idTransferencia,
                txtMotivoAnulacion: motivoAnulacion
            }, function(r) {
                $.unblockUI();
                s = $.parseJSON(r);
                if (s[0] == 1) {
                    swal("Mensaje del Sistema", s[1], "success");
                } else {
                    swal("Mensaje del Sistema", s[1], "error");
                }

                $("#modalAceptaTransferencia").modal("hide");
                CargarTransferenciasPendientes();
                ListadoTransferencias();
            });
        } else {
            $.unblockUI();
        }
    });

}

function AgregarMotivoRechazo() {
    $("#divMotivoAnulacion").show();
    $("#txtMotivoAnulacion").val("");
}

function limpiarModalStyle() {
    $("#txtBodyHeader").removeAttr('style', 'padding-right');
}

function CargarBandejaEntradaNum() {

    $.post("./ajax/BandejaEntradaAjax.php?op=CargarBandejaEntradaNum", function(e) {

        if (e > 0) {
            $("#NumNotificacionesBandeja").html('<i class="fas fa-inbox mr-2"></i>Nuevos Mensajes <b>(' + e + ')</b>');
        } else {
            $("#NumNotificacionesBandeja").html('<i class="fas fa-inbox mr-2"></i>Bandeja de Entrada');
        }


    });
}


function RegistrarVisualModInformativo(idModal) {

    $.post("./ajax/BandejaEntradaAjax.php?op=RegistrarVisualModInformativo", { idModalDetalle: idModal }, function(q) {

        var p = $.parseJSON(q);

        if (p.ind == "1") {

            $("#ModGenActualizaciones").modal("hide");
        } else {
            $.toast({
                heading: 'Mensaje del Sistema',
                text: p.Mensaje,
                position: 'top-right',
                loaderBg: '#fff',
                icon: 'error',
                hideAfter: 7000
            });
        }

    });
}


function envioRestaurantePedido() {
    Pusher.logToConsole = true;
    var pusher = new Pusher('09c8bf2dad0309f4c862', {
        cluster: 'mt1',
        forceTLS: true
    });
    var channel = pusher.subscribe('SendPedido');
    channel.bind('NuevoSendPedido', function(data) {
        console.log(data);
        if (($("#sessionIdUsuario").val() == 3183 || $("#sessionIdUsuario").val() == 4699 || $("#sessionIdUsuario").val() == 3536 || $("#sessionIdUsuario").val() == 3590) && $("#sesionIdSucursal").val() == data.ID_SUCURSAL && $("#sesionIdEmpresa").val() == data.ID_EMPRESA) {
            $.post("./ajax/ComandaRestauranteAjax.php?op=pedidosPendientesDia", function(r) {
                var s = $.parseJSON(r);
                html = '';
                for (i = 0; i < s.length; i++) {
                    envioPedidoPusher(s[i][0], s[i][1]);
                }
            });
        }
    });
}

function envioPedidoPusher(idPedidoRest, numPedido) {
    $("#contenidoPedidosPendientesRestaurante").html("");
    $.post("./ajax/PedidoRestauranteAjax.php?op=generaPedidosPendientes", { idPedidoRest: idPedidoRest, numPedido: numPedido }, function(r) {
        html += r;
        $("#contenidoPedidosPendientesRestaurante").html(html);
    });
}



/*Funcion para control decimal, el primer parámetro es el numero a redondear y el segundo la cantidad de 
decimales deseada, se rescata el valor de inputs escondidos (txtSesionDecimalVenta, txtSesionDecimalCosto)
Variables de Sesión: [cantdecimalventa], [cantdecimalcosto]
Valores provenientes de Base de Datos: tabla->(MAE_EMPRESA) campos: CANT_DECIMALES_VENTA , CANT_DECIMALES_COSTO
*/
const controlDecimal = (num, decimales) => { return Number.parseFloat(num).toFixed(decimales) }