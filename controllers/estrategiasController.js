const Categorias = require('../models/Categorias');
const Estrategias = require('../models/Estrategias');
const Usuarios = require('../models/Usuarios');
const multer = require('multer');
const shortid = require('shortid');
const fs = require('fs');


const configuracionMulter = {
    limits: { fileSize: 1000000},
    storage: fileStorage = multer.diskStorage({
        destination: (req, file, next) => {
            next(null, __dirname+'/../public/uploads/estrategias');
        },
        filename: (req, file, next) => {
            const extension = file.mimetype.split('/')[1];
            next(null, `${shortid.generate()}.${extension}`);
        }
    }),
    fileFilter(req, file, next){
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'application/pdf') {
            //Format Valid
            next(null, true);
        }else{
            //Format not valid
            next(new Error('Formato De Imagen No Valido'), false);
        }
    }
};

const upload = multer(configuracionMulter).array('archivos', 10);

//Sube una imagen en el servidor
exports.subirImagen = (req, res, next) => {
    upload(req, res, function(error){
        if (error) {
            //TODO MANEJAR ERRORES
            if (error instanceof multer.MulterError) {
                if (error.code === 'LIMIT_FILE_SIZE') {
                    req.flash('error', 'El archivo es muy grande');
                }else{
                    console.log(error);

                    req.flash('error', error.message);
                } 
            }else if(error.hasOwnProperty('message')){
                console.log(error);

                req.flash('error', error.message);
            }
            res.redirect('back');
            return;
        }else{
            next();
        }
    });
};

//Form nueva estrategia
exports.formNuevaEstrategia = async (req, res) => {
    const consultas = [];
    consultas.push(Usuarios.findByPk(req.user.id));
    consultas.push(Estrategias.findAll({
        include: [
            {
                model: Usuarios,
                attributes: ['email', 'imagen', 'nombre'],
                required: true
            },
            {
                model: Categorias,
                attributes: ['nombre'],
                required: true
            }
        ]
    }));
    consultas.push(Categorias.findAll());
    const [usuario, estrategias, categorias] = await Promise.all(consultas);
    res.render('nueva-estrategia', {
        nombrePagina: 'Nueva Estrategia',
        categorias,
        estrategias,
        nombre: usuario.nombre,
        usuario
    });
};

//Creando nueva estrategia
exports.nuevaEstrategia = async (req, res, next) => {
    req.sanitizeBody('nombre');
    req.sanitizeBody('descripcion');
    req.sanitizeBody('pais');

    const estrategia = req.body;

    estrategia.usuarioId = req.user.id;
    //leer imagen

    const files = req.files;
    const nombres = files.map(file => file.filename);

    let setArchivos = [];
    nombres.forEach(nombre => {
        if (nombre.includes('.png') || nombre.includes('.jpg') || nombre.includes('.jpeg')) {
            setArchivos.push(nombre);
        }
    });
    
    estrategia.archivos = nombres;
    estrategia.imagen = setArchivos[0];

    try {
        await Estrategias.create(estrategia);
        req.flash('exito', 'Se creo el grupo correctamente');
        res.redirect('/administracion');
    } catch (error) {
        console.log(error);
        const erroresSequelize = error.errors.map(err=>err.message);
        req.flash('error', erroresSequelize);
        res.redirect('/nueva-estrategia');
    }
};

//form para editar estrategia
exports.formEditarEstrategia = async (req, res) => {
    //const estrategia = await Estrategias.findByPk(req.params.idEstrategia);
    const estrategia = await Estrategias.findOne({where: {id: req.params.idEstrategia, usuarioId: req.user.id}});

    res.json(estrategia);
};

//form para editar estrategia
exports.EditarEstrategia = async (req, res) => {
    console.log("este es el id: ", req.params.idEstrategia);

    const estrategia = await Estrategias.findOne({where: {id: req.params.idEstrategia, usuarioId: req.user.id}});

    const {nombre, fecha_creacion, pais, descripcion, categoriaId} = req.body.params;
    
    //valida si el grupo existe o no o no es el dueño
    if (!estrategia) {
        res.status(403).send('Hubo un error');
        return next();
    }

    //leer los valores si todo esta bien
    estrategia.nombre = nombre;
    estrategia.fecha_creacion = fecha_creacion;
    estrategia.pais = pais;
    estrategia.descripcion = descripcion;
    estrategia.categoriaId = categoriaId;

    try {
        await estrategia.save();
        res.status(200).send('Estrategia Actualizada Correctamente');

    } catch (error) {
        res.status(403).send('Hubo un error');
    }     
};

exports.formEditarImagen = async(req, res, next) => {
    const estrategia = await Estrategias.findOne({where: {id: req.params.idEstrategia, usuarioId: req.user.id}});
    
    res.render('imagen-estrategia', {
        nombrePagina: `Editar Archivos de estrategia`,
        estrategia
    });
};

//Modifica la imagen y elimina la anterior
exports.EditarImagen = async(req, res, next) => {
    const estrategia = await Estrategias.findOne({where: {id: req.params.idEstrategia, usuarioId: req.user.id}});

    //el grupo existe y es valido;
    if (!estrategia) {
        req.flash('error', 'Operación no valida');
        res.redirect('/administracion');
    }

    //revisar archivo valido y nuevo
    if (req.files) {
        const files = req.files;
        const nombres = files.map(file => file.filename);
        
        const nuevosArchivos = [...estrategia.archivos, ...nombres];
        estrategia.archivos = nuevosArchivos;

        if (!estrategia.imagen) {
            let setArchivos = [];
            nombres.forEach(nombre => {
                if (nombre.includes('.png') || nombre.includes('.jpg')) {
                    setArchivos.push(nombre);
                }
            });

            estrategia.imagen = setArchivos[0];
        }
    }

    //guardar en la bd
    await estrategia.save();
    req.flash('exito', 'Cambios almacenados correctamente');
    res.redirect('/administracion');   
};

exports.eliminarArchivo = async(req, res, next) => {
    const estrategia = await Estrategias.findOne({where: {id: req.params.idEstrategia, usuarioId: req.user.id}});

    const nuevosArchivos = [];
    if (estrategia.archivos) {
        //console.log("tamaño", estrategia.archivos.length);
        if (estrategia.archivos.length === 1) {
            res.json({msg: 'No se puede eliminar, debe existir al menos un archivo'});
            return;
        }
        for (let i = 0; i < estrategia.archivos.length; i++) {
            const element = estrategia.archivos[i];
            if (req.params.idArchivos === element) {
                const imagenAnteriorPath = __dirname+`/../public/uploads/estrategias/${element}`;
                //Eliminar archivo con filesystem
                fs.unlink(imagenAnteriorPath, (error) => {
                    if (error) {
                        console.log(error);
                    }
                    return;
                });
            }else{
                nuevosArchivos.push(element);
            }
        }
        
        //guardar en la bd
        estrategia.archivos = nuevosArchivos;
        //todo bien elimina el grupo
        await estrategia.save();
        res.status(200).send('Proyecto Eliminado Correctamente');
    }
};

exports.eliminarEstrategia = async (req, res, next) => {
    const estrategia = await Estrategias.findOne({where: {id: req.params.idEstrategia, usuarioId: req.user.id}});

    if (!estrategia) {
        res.status(403).send('Hubo un error');
        return next();
    }

    //Eliminar imagenes de la estrategia
    if (estrategia.archivos) {
        for (let i = 0; i < estrategia.archivos.length; i++) {
            const element = estrategia.archivos[i];
            const imagenAnteriorPath = __dirname+`/../public/uploads/estrategias/${element}`;
            //Eliminar archivo con filesystem
            fs.unlink(imagenAnteriorPath, (error) => {
                if (error) {
                    console.log(error);
                }
                return;
            });
        }        
    }

    //todo bien elimina el grupo
    await Estrategias.destroy({
        where: {
            id: req.params.idEstrategia
        }
    });
    res.status(200).send('Estrategia Eliminado Correctamente');
};