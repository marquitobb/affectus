const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const Usuarios = require('../models/Usuarios');

passport.use(new LocalStrategy({
        usernameField : 'email',
        passwordFile : 'password',
    },
    //esta funcion se ejcuta cuando llenas los campos
    async (email, password, next) => {
        //codigo se ejecuta al llenar el fom de iniciar sesion
        const usuario = await Usuarios.findOne({where: {email, activo : 0}});

        //Revisar si existe o no
        if(!usuario) return next(null, false, {
            message: 'Ese usuario no existe'
        });

        //El usuaruo existe, comparar password
        const verificarPass = usuario.validarPassword(password);

        //si el password es incorrecto
        if(!verificarPass) return next(null, false, {
            message: 'Password Incorrecto'
        });

        //todo bien
        return next(null, usuario);
    }
))

passport.serializeUser(function(usuario, cb){
    cb(null, usuario);
});

passport.deserializeUser(function(usuario, cb){
    cb(null, usuario);
});

module.exports = passport;