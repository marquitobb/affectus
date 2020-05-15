const express = require('express');
const router = express.Router();

const homeController = require('../controllers/homeController');
const usuariosController = require('../controllers/usuariosController');
const authController = require('../controllers/authController');
const adminController = require('../controllers/adminController');
const estrategiasController = require('../controllers/estrategiasController');
const socketsController = require('../controllers/socketsController');
const sentimientosController = require('../controllers/sentimientosController');
const principalController = require('../controllers/principalController');
const horariosController = require('../controllers/horariosController');
const perfilController = require('../controllers/perfilController');
const estadisticasController = require('../controllers/estadisticasController');
const mapController = require('../controllers/mapController');


module.exports = function() {
    router.get('/', homeController.home);

    //Abre el form de crear cuenta
    router.get('/crear-cuenta', usuariosController.formCrearCuenta);

    //Crear la cuenta del usuario
    router.post('/crear-cuenta', usuariosController.crearCuenta);

    //Ruta para verificar correo
    router.get('/verificar/:token', usuariosController.verificarCorreo);

    //Ruta para recuperar contraseña
    router.get('/recuperar-pass/:token', usuariosController.recuperarContrasena);
    router.post('/recover-pass', usuariosController.recoverPass);
    
    //Olvidar contraseña
    router.get('/forgot-pass', usuariosController.formOlvidarPassword);
    router.post('/forgot-pass', usuariosController.olvidarContrasena);

    //Iniciar sesion
    router.get('/iniciar-sesion', usuariosController.formIniciarSesion);
    router.post('/iniciar-sesion', authController.autenticarUsuario);

    //Cerrar sesión
    router.get('/cerrar-sesion', authController.usuarioAutenticado, authController.CS);

    //Chat
    router.get('/index', authController.usuarioAutenticado, socketsController.index);
    router.get('/chat', authController.usuarioAutenticado, socketsController.chat);

    router.get('/chatIndividual/:emailRecibe', authController.usuarioAutenticado, socketsController.chatIndividual);

    //Admin Panel
    router.get('/administracion', authController.usuarioAutenticado, adminController.panelAdministracion);

    //CV de usuario
    router.get('/cv-perfil', authController.usuarioAutenticado, usuariosController.formCV);
    router.post('/cv-perfil', authController.usuarioAutenticado, usuariosController.subirCurriculum, usuariosController.SubirCV);

    //Perfil de usuario
    router.get('/editar-perfil', authController.usuarioAutenticado, usuariosController.formEditarPerfil);
    router.post('/editar-perfil', authController.usuarioAutenticado, usuariosController.EditarPerfil);

    //Cambiar password de usuario
    router.get('/cambiar-password', authController.usuarioAutenticado, usuariosController.formCambiarPassword);
    router.post('/cambiar-password', authController.usuarioAutenticado, usuariosController.CambiarPassword);

    //Imagen de perfil de usuario
    router.get('/imagen-perfil', authController.usuarioAutenticado, usuariosController.formAgregarImagenPerfil);
    router.post('/imagen-perfil', authController.usuarioAutenticado, usuariosController.subirImagen, usuariosController.AgregarImagenPerfil);

    //Página principal de visualización de usuario
    router.get('/principal', authController.usuarioAutenticado, principalController.panelPrincipal);

    //Nueva Estrategia Estrategias
    router.get('/nueva-estrategia', authController.usuarioAutenticado, estrategiasController.formNuevaEstrategia);
    router.post('/nueva-estrategia', authController.usuarioAutenticado, estrategiasController.subirImagen, estrategiasController.nuevaEstrategia);

    //Editar estrategia
    router.get('/editar-estrategia/:idEstrategia', authController.usuarioAutenticado, estrategiasController.formEditarEstrategia);
    router.post('/editar-estrategia/:idEstrategia', authController.usuarioAutenticado, estrategiasController.EditarEstrategia);

    //editar la imagen de la estrategia
    router.get('/imagen-estrategia/:idEstrategia', authController.usuarioAutenticado, estrategiasController.formEditarImagen);

    router.post('/imagen-estrategia/:idEstrategia', authController.usuarioAutenticado, estrategiasController.subirImagen, estrategiasController.EditarImagen);

    router.delete('/imagen-estrategia/:idEstrategia/:idArchivos', authController.usuarioAutenticado, estrategiasController.eliminarArchivo);

    //Eliminar estrategia
    router.delete('/eliminar-estrategia/:idEstrategia', authController.usuarioAutenticado, estrategiasController.eliminarEstrategia);

    //Agregar sentimiento
    router.get('/agregar-sentimiento', authController.usuarioAutenticado, sentimientosController.formAgregarSentimiento);
    router.post('/sentimiento/:sentimiento', authController.usuarioAutenticado, sentimientosController.guardarSentimientos);

    //Datos Personales
    router.post('/datos-personales', authController.usuarioAutenticado, usuariosController.saveDatos);

    //Cambiar el estado en el que se encuantra el usuario
    router.post('/estadoAffectus/:estado', authController.usuarioAutenticado, usuariosController.updateEstado);


    //Agrega horarios el psicologo
    router.get('/agregar-horario', authController.usuarioAutenticado, horariosController.formAgregarHorario);
    router.post('/agregar-horario', authController.usuarioAutenticado, horariosController.agregarHorarios);
    //Edita horarios el psicologo
    router.get('/editar-horario', authController.usuarioAutenticado, horariosController.formEditarHorario);
    router.post('/editar-horario', authController.usuarioAutenticado, horariosController.EditarHorario);

    //El usuario genera una cita
    router.get('/agendar-cita/:id', authController.usuarioAutenticado, horariosController.formAgregarCita);
    router.post('/agendar-cita/:id', authController.usuarioAutenticado, horariosController.AgregarCita);

    router.get('/ver-citas/:id', authController.usuarioAutenticado, horariosController.formVerCitas);

    //Eliminar citas
    router.delete('/eliminar-cita/:idcita', authController.usuarioAutenticado, horariosController.eliminarCita);

    //Ruta para ir al perfil
    router.get('/perfil/:correo', authController.usuarioAutenticado, perfilController.visualizarPerfil);

    //Ruta para ir a la pantalla de estadísticas
    router.get('/mystatistics/:correo', authController.usuarioAutenticado, estadisticasController.estadisticas);
    router.get('/estadistica/:categoria/:id', authController.usuarioAutenticado, estadisticasController.estadisticaProfesional);
    router.get('/categorias', authController.usuarioAutenticado, estadisticasController.obtencionCategorias);
    router.get('/estadisticaSentimientos/:sentimiento/:id', authController.usuarioAutenticado, estadisticasController.obtencionSentimientos);
    
    //Rutas para pantalla de mapa
    router.get('/mapa/:correo', authController.usuarioAutenticado, mapController.visualizacionMapa);

    return router;
};