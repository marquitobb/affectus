const express = require('express');
const router = express.Router();

const homeController = require('../controllers/homeController');
const usuariosController = require('../controllers/usuariosController');
const authController = require('../controllers/authController');
const adminController = require('../controllers/adminController');



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


    return router;
}