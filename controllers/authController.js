const passport = require('passport');
const Usuarios = require('../models/Usuarios');

exports.autenticarUsuario = passport.authenticate('local', {
    successRedirect: '/principal',
    failureRedirect: '/iniciar-sesion',
    failureFlash: true,
    badRequestMessage: 'Ambos campos son obligatorios'
});

//revisa si el usuario esta autenticado o no
exports.usuarioAutenticado = (req, res, next) => {
    //si el usuario esta autenticado, adelante
    if (req.isAuthenticated()) {
        return next();
    }

    //si no esta autenticado
    return next();//res.redirect('/iniciar-sesion');
};

exports.CS = (req, res, next) => {
    req.logout();
    req.flash('exito', 'Cierre de sesión correcto');
    res.redirect('/iniciar-sesion');
    next();
};

//AUN NO SIRVE
exports.estadoCerrarSesion  = async(req, res, next) => {
    const usuario = Usuarios.findByPk(req.user.id);
    usuario.estadoActual = '2';   
    
    try {
        await usuario.save();
        res.status(200).send('Todo correcto');

    } catch (error) {
        res.status(403).send('Hubo un error');
    } 
};