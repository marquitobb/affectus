const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Usuarios = require('../models/Usuarios');

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordFile: 'password',
},
    //esta funcion se ejcuta cuando llenas los campos
    async (email, password, next) => {
        //codigo se ejecuta al llenar el fom de iniciar sesion
        const usuario = await Usuarios.findOne({ where: { email } });

        //Revisar si existe o no
        if (!usuario) return next(null, false, {
            message: 'Ese usuario no existe'
        });

        //El usuaruo existe, comparar password
        const verificarPass = usuario.validarPassword(password);

        //si el password es incorrecto
        if (!verificarPass) return next(null, false, {
            message: 'Password Incorrecto'
        });

        //cHECAR SI LA CUENTA HA SIDO VERIFICADA
        if (usuario.activo == 0) return next(null, false, {
            message: 'Usuario no verificado, favor de revisar su correo'
        });

        usuario.estadoActual = '0';
        await usuario.save();

        //todo bien
        return next(null, usuario);
    }
));

passport.serializeUser(function (usuario, cb) {
    cb(null, usuario);
});

passport.deserializeUser(function (usuario, cb) {
    cb(null, usuario);
});

module.exports = passport;