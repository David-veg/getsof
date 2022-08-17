const express = require('express');
const res = require('express/lib/response');
const { VueElement } = require('vue');
const router = express.Router();
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//login

let datos = {
  title: null,
  tk: VueElement.prototype.$dataSesion,
  razonSocial: VueElement.prototype.$razonSocial,
  nombreComercial: VueElement.prototype.$nombreComercial,
  imgUsuario: VueElement.prototype.$imgUsuario,
  imgSucursal: VueElement.prototype.$imgSucursal,
  server: VueElement.prototype.$server
}

router.get('/', (request, response) => {
    if (VueElement.prototype.$dataSesion) {
        datos.title = 'Getsoft ERP iniciar Session';
        response.status(301).redirect("/usuario")
    } else {
        response.render('login', datos);
    }
});

router.get('/cerrarSesion', (request, response) => {
    VueElement.prototype.$dataSesion = null;
    VueElement.prototype.$razonSocial = null;
    VueElement.prototype.$nombreComercial = null;
    response.status(301).redirect("/")
});

router.get('/validarAcceso/:tk/:empresas/:sucursales/:razonSocial/:nombreCom', (request, response) => {
    actualizarSesiones(request.params, request.query)
    const empresas = request.params.empresas;
    const sucursales = request.params.sucursales;
    if (empresas == 1 && sucursales == 1) {
        response.status(301).redirect("/usuario")
    } else {
        response.status(301).redirect("/acceder")
    }
});

router.get('/Usuario', (request, response) => {
    datos.title = 'Nuevo Usuario';
    if (VueElement.prototype.$dataSesion) {
        response.render('usuario', datos);
    } else {
        response.status(301).redirect("/")
    }
});

router.get('/Cliente', (request, response) => {
    datos.title = 'Nuevo Cliente';
    if (VueElement.prototype.$dataSesion) {
        response.render('cliente', datos);
    } else {
        response.status(301).redirect("/")
    }
});

router.get('/Proveedor', (request, response) => {
    datos.title = 'Nuevo Proveedor';
    if (VueElement.prototype.$dataSesion) {
        response.render('proveedor', datos);
    } else {
        response.status(301).redirect("/")
    }
});

router.get('/Vendedor', (request, response) => {
    datos.title = 'Nuevo Vendedor';
    if (VueElement.prototype.$dataSesion) {
        response.render('vendedor', datos);
    } else {
        response.status(301).redirect("/")
    }
});

router.get('/Empresa', (request, response) => {
    datos.title = 'Nueva Empresa';
    if (VueElement.prototype.$dataSesion) {
        response.render('empresa', datos);
    } else {
        response.status(301).redirect("/")
    }
});

router.get('/Acceder', (request, response) => {
    datos.title = 'Selecionar Empresa';
    if (VueElement.prototype.$dataSesion) {
        response.render('acceder', datos);
    } else {
        response.status(301).redirect("/")
    }
});

router.get('/CategoriasConfigCliProv', (request, response) => {
    datos.title = 'Nueva Categoria';
    if (VueElement.prototype.$dataSesion) {
        response.render('CategoriasConfigCliProv', datos);
    } else {
        response.status(301).redirect("/")
    }
});

router.get('/Factura', (request, response) => {
    datos.title = 'Nueva Factura';
    if (VueElement.prototype.$dataSesion) {
        response.render('factura', datos);
    } else {
        response.status(301).redirect("/")
    }
});

router.get('/Plan', (request, response) => {
    datos.title = 'Nuevo Plan';
    if (VueElement.prototype.$dataSesion) {
        response.render('plan', datos);
    } else {
        response.status(301).redirect("/")
    }
});

router.get('/Producto', (request, response) => {
    datos.title = 'Nuevo Producto';
    if (VueElement.prototype.$dataSesion) {
        response.render('Producto', datos);
    } else {
        response.status(301).redirect("/")
    }
});

router.get('/guiaRemision', (request, response) => {
    datos.title = 'Nueva Guia de Remision';
    if (VueElement.prototype.$dataSesion) {
        response.render('guiaRemision', datos);
    } else {
        response.status(301).redirect("/")
    }
});

router.get('/notaCredito', (request, response) => {
    datos.title = 'Nueva Nota de Credito';
    if (VueElement.prototype.$dataSesion) {
        response.render('notaCredito', datos);
    } else {
        response.status(301).redirect("/")
    }
});

router.get('/Proforma', (request, response) => {
    datos.title = 'Nueva Proforma';
    if (VueElement.prototype.$dataSesion) {
        response.render('Proforma', datos);
    } else {
        response.status(301).redirect("/")
    }
});

router.get('/liquidacion', (request, response) => {
    datos.title = 'Nueva Liquidacion';
    if (VueElement.prototype.$dataSesion) {
        response.render('liquidacion', datos);
    } else {
        response.status(301).redirect("/")
    }
});

router.get('/retenciones', (request, response) => {
    datos.title = 'Nueva Retencion';
    if (VueElement.prototype.$dataSesion) {
        response.render('retenciones', datos);
    } else {
        response.status(301).redirect("/")
    }
});

router.get('/puntoEmision', (request, response) => {
    datos.title = 'Nuevo Punto Emision';
    if (VueElement.prototype.$dataSesion) {
        response.render('puntoEmision', datos);
    } else {
        response.status(301).redirect("/")
    }
});

router.get('/cargarDataEmpresa/:razonSocial/:nombreCom/:tk', (request, response) => {
    actualizarSesiones(request.params, request.query);
    response.status(301).redirect("/Usuario")
});

function actualizarSesiones(obj, objImg){
  VueElement.prototype.$dataSesion = obj.tk;
  VueElement.prototype.$razonSocial = obj.razonSocial;
  VueElement.prototype.$nombreComercial = obj.nombreCom;
  VueElement.prototype.$imgUsuario = objImg.imgUsuario;
  VueElement.prototype.$imgSucursal = objImg.imgSucursal;

  datos.tk = VueElement.prototype.$dataSesion;
  datos.razonSocial = VueElement.prototype.$razonSocial;
  datos.nombreComercial = VueElement.prototype.$nombreComercial;
  datos.server = VueElement.prototype.$server;
  datos.imgUsuario = VueElement.prototype.$imgUsuario;
  datos.imgSucursal = VueElement.prototype.$imgSucursal;
}

module.exports = router;
