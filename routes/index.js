const express = require('express');
const router = express.Router();

const homeController = require('../controllers/homeController');
const usuariosController = require('../controllers/usuariosController');
const authController = require('../controllers/authController');
const adminController = require('../controllers/adminController');
const estrategiasController = require('../controllers/estrategiasController');



module.exports = function() {
    router.get('/', homeController.home);

    //Abre el form de crear cuenta
    router.get('/crear-cuenta', usuariosController.formCrearCuenta);

    //Crear la cuenta del usuari
    router.post('/crear-cuenta', usuariosController.crearCuenta);

    //Iniciar sesion
    router.get('/iniciar-sesion', usuariosController.formIniciarSesion);

    router.post('/iniciar-sesion', authController.autenticarUsuario);

    //Admin Panel
    router.get('/administracion', authController.usuarioAutenticado, adminController.panelAdministracion);

    //Nueva Estrategia Estrategias
    router.get('/nueva-estrategia', authController.usuarioAutenticado, estrategiasController.formNuevaEstrategia);
    router.post('/nueva-estrategia', authController.usuarioAutenticado, estrategiasController.subirImagen, estrategiasController.nuevaEstrategia);

    //Editar estrategia
    router.get('/editar-estrategia/:idEstrategia', authController.usuarioAutenticado, estrategiasController.formEditarEstrategia);
    router.post('/editar-estrategia/:idEstrategia', authController.usuarioAutenticado, estrategiasController.EditarEstrategia);

    return router;
}