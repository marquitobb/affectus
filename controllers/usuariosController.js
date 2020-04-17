const Usuarios = require('../models/Usuarios');

exports.formCrearCuenta = (req, res) => {
    res.render('crear-cuenta', {
        nombrePagina: 'Crear Cuenta'
    })
}

exports.crearCuenta = async (req, res, next) => {
    //console.log(req.body)
    const usuario = req.body
   
    //validacion de campos
    req.checkBody('confirmar', 'El password confirmado no puede ir vacio').notEmpty();

    //Leer los errores de express
    const erroresExpress = req.validationErrors();

    if (usuario.password != usuario.confirmar) {
        //errores.push({'msg': 'Las contraseñas no coinciden'});
        req.flash('error', 'las contraseñas no coinciden');
        res.redirect('/crear-cuenta');
        return
    }
    
    try {
        await Usuarios.create(usuario);
        req.flash('exito', 'Se creo la cuenta correctamente');
        res.redirect('iniciar-sesion');
    } catch (error) {
       
       //extraer unicamente el message de los errores
       const erroresSequelize = error.errors.map(err => err.message);
    
       let errExp = [];
       const errorE = Object.keys(erroresExpress);

       if (errorE.length > 0) {
            errExp  = erroresExpress.map(err => err.msg);
            //console.log("errores express", errExp);
            next();
       }      
      
       //UNIR ERRORES DE SEQUELIZE Y EXPRESS
       const listaErrores = [...erroresSequelize, ...errExp];
       
       req.flash('error', listaErrores);
       res.redirect('/crear-cuenta');
    }
    
}


exports.formIniciarSesion = (req, res) => {
    res.render('iniciar-sesion', {
        nombrePagina: 'Iniciar Sesión'
    })
}