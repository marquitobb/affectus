const Usuarios = require('../models/Usuarios');
const randomstring = require ('randomstring');
require('dotenv').config({path: 'variables.env'});
const mailer = require ('../misc/mailer');

const multer = require('multer');
const shortid = require('shortid');
const fs = require('fs');

//configuracion para los archivos pdf 
const configuracionMulter = {
    limits: { fileSize: 1500000},
    storage: fileStorage = multer.diskStorage({
        destination: (req, file, next) => {
            next(null, __dirname+'/../public/uploads/cv')
        },
        filename: (req, file, next) => {
            const extension = file.mimetype.split('/')[1];
            next(null, `${shortid.generate()}.${extension}`);
        }
    }),
    fileFilter(req, file, next){
        if (file.mimetype === 'application/pdf') {
            //Format Valid
            next(null, true);
        }else{
            //Format not valid
            next(new Error('Formato De Archivo No Valido'), false)
        }
    }
}
//verifica si es uno o varios archivos los que se suben al servidor
const upload = multer(configuracionMulter).single('cv');

//Sube una curriculum PDF en el servidor
exports.subirCurriculum = (req, res, next) => {
    upload(req, res, function(error){
        if (error) {
            console.log(error);
            //TODO MANEJAR ERRORES
            if (error instanceof multer.MulterError) {
                if (error.code === 'LIMIT_FILE_SIZE') {
                    req.flash('error', 'El archivo es muy grande')
                }else{
                    req.flash('error', error.message)
                } 
            }else if(error.hasOwnProperty('message')){
                req.flash('error', error.message);
            }
            res.redirect('back');
            return;
        }else{
            next()
        }     
    })
}

//Subir imagen de la persona, es la configuracion
const configuracionMulterImagen = {
    limits: { fileSize: 1500000},
    storage: fileStorage = multer.diskStorage({
        destination: (req, file, next) => {
            next(null, __dirname+'/../public/uploads/usuarios')
        },
        filename: (req, file, next) => {
            const extension = file.mimetype.split('/')[1];
            next(null, `${shortid.generate()}.${extension}`);
        }
    }),
    fileFilter(req, file, next){
        if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' ) {
            //Format Valid
            next(null, true);
        }else{
            //Format not valid
            next(new Error('Formato De Archivo No Valido'), false)
        }
    }
}

//si es un solo archivo o varios de imagen
const uploadImagen = multer(configuracionMulterImagen).single('imagen');

//Configuracion que sube una imagen en el servidor
exports.subirImagen = (req, res, next) => {
    uploadImagen(req, res, function(error){
        if (error) {
            console.log(error);
            //TODO MANEJAR ERRORES
            if (error instanceof multer.MulterError) {
                if (error.code === 'LIMIT_FILE_SIZE') {
                    req.flash('error', 'El archivo es muy grande')
                }else{
                    req.flash('error', error.message)
                } 
            }else if(error.hasOwnProperty('message')){
                req.flash('error', error.message);
            }
            res.redirect('back');
            return;
        }else{
            next()
        }     
    })
}

//form para crear cuenta
exports.formCrearCuenta = (req, res) => {
    res.render('crear-cuenta', {
        nombrePagina: 'Crear Cuenta'
    })
}

//Método para activar la cuenta del usuario
exports.verificarCorreo = async (req, res, next) => {
    try {
        const secretToken = req.params.token;
        const usuario = await Usuarios.findOne({ where: { secretToken } });
        if (!usuario) {
            req.flash('error', 'Algo salió mal, inténtelo de nuevo');
            res.redirect('/iniciar-sesion');
            return next();
        }
        usuario.secretToken = '';
        usuario.activo = true;

        usuario.save();

        req.flash('exito', 'Se ha verificado tu correo, ya puedes iniciar sesión.');
        res.redirect('/iniciar-sesion');
    } catch (e) {
        req.flash('error', 'Ha ocurrido un error en la verificación del correo');
        res.redirect('/iniciar-sesion');
    }
}

//crea la cuentad el usaurio
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
        //token Generado Aleatoriamente.
        const secretToken = randomstring.generate();
        usuario.secretToken = secretToken;

        //Bandera la cuenta como inactivo
        usuario.activo = false;

        await Usuarios.create(usuario);

        //Se crea el correo electrónico
        const html = `Hi ${usuario.nombre},
        <br/>
        Thank you for registering!
        <br/> <br/>
        Please verify your email on the following page:
        <a href="${process.env.HOST}:${process.env.PORT}/verificar/${secretToken}">${process.env.HOST}:${process.env.PORT}/verificar/${secretToken}</a>
        <br/> <br/>
        Have a pleasant day!`; 

        //Envío de correo
        await mailer.sendEmail('Affectus', usuario.email, 'Affectus: Please verify your Email!', html);

        req.flash('exito', 'Se creo la cuenta correctamente, favor de confirmarla en su correo');
        res.redirect('/iniciar-sesion');
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

//form para iniciar sesion
exports.formIniciarSesion = (req, res) => {
    res.render('iniciar-sesion', {
        nombrePagina: 'Iniciar Sesión'
    })
}

//formulario para añadir el CV
exports.formCV = async(req, res) => {
    const usuario = await Usuarios.findByPk(req.user.id)
    res.render('cv-perfil', {
        nombrePagina: 'Añadir CV',
        usuario
    })
}

//sube el CV del usuario al dar click en el boton subir CV
exports.SubirCV = async (req, res, next) => {
    const usuario = await Usuarios.findByPk(req.user.id)

    //si hay cv anterior, eliminar
    if (req.file && usuario.cv) {
        const cvAnteriorPath = __dirname+`/../public/uploads/cv/${usuario.cv}`;
        //Eliminar archivo con filesystem
        fs.unlink(cvAnteriorPath, (error) => {
            if (error) {
                console.log(error)
            }
            return;
        });
    }
    //almacenar nueva cv
    if (req.file) {
        usuario.cv = req.file.filename;
    }

    //almacenar en db y redireccionar
    await usuario.save();
    req.flash('exito', 'Cambios almacenados correctamente');
    res.redirect('/administracion');
}

//form para editar el perfil
exports.formEditarPerfil = async(req, res, next) => {
    const usuario = await Usuarios.findByPk(req.user.id);
    res.render('editar-perfil', {
        nombrePagina: 'Editar Perfil',
        usuario
    })
}

//almacena en la bd los cambios al perfil
exports.EditarPerfil = async(req, res, next) => {
    req.sanitizeBody('nombre');
    req.sanitizeBody('descripcion')
    req.sanitizeBody('email')

    const usuario = await Usuarios.findByPk(req.user.id);

    //leer valores
    const {nombre, descripcion, email} = req.body;

    //Asignar valores
    usuario.nombre = nombre;
    usuario.descripcion = descripcion,
    usuario.email = email;

    //guardar en db
    await usuario.save();
    req.flash('exito', 'Cambios guardados correctamente');
    res.redirect('/administracion');
}

exports.formCambiarPassword = (req, res) => {
    res.render('cambiar-password', {
        nombrePagina: 'Cambiar password'
    })
}

//Revisa si el password anterior es correcto y modifica por uno nuevo
exports.CambiarPassword = async(req, res, next) => {
    const usuario = await Usuarios.findByPk(req.user.id);

    if (!usuario) {
        req.flash('error', 'Operacion no válida');
        res.redirect('/iniciar-sesion');
        return next();
    }

    //verificar que el pasworrd actual sea correcto
    if (!usuario.validarPassword(req.body.anterior)) {
        req.flash('error', 'El password actual es incorrecto')
        res.redirect('/cambiar-password');
        return next();
    }
    //si el password es correcto el nuevo lo hasheamos
    const hash = usuario.hashPassword(req.body.nuevo_password)

    //asignamos password al usuario
    usuario.password = hash;

    //guardar en la bd
    await usuario.save();

    //redireciionar
    req.flash('exito', 'Se cambio correctamente la contraseña');
    res.redirect('/administracion');
}

//form para agregar imagen
exports.formAgregarImagenPerfil = async(req, res) => {
    const usuario = await Usuarios.findByPk(req.user.id);

    res.render('imagen-perfil', {
        nombrePagina: 'Añade imagen de perfil',
        usuario
    })
}

//Subir imagen de perfil del usuario
exports.AgregarImagenPerfil = async (req, res, next) => {
    const usuario = await Usuarios.findByPk(req.user.id)

    //si hay cv anterior, eliminar
    if (req.file && usuario.imagen) {
        const imagenAnteriorPath = __dirname+`/../public/uploads/usuarios/${usuario.imagen}`;
        //Eliminar archivo con filesystem
        fs.unlink(imagenAnteriorPath, (error) => {
            if (error) {
                console.log(error)
            }
            return;
        });
    }
    //almacenar nueva cv
    if (req.file) {
        usuario.imagen = req.file.filename;
    }

    //almacenar en db y redireccionar
    await usuario.save();
    req.flash('exito', 'Cambios almacenados correctamente');
    res.redirect('/administracion');
}


