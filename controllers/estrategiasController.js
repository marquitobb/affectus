const Categorias = require('../models/Categorias');
const Estrategias = require('../models/Estrategias');
const multer = require('multer');
const shortid = require('shortid');


const configuracionMulter = {
    limits: { fileSize: 1000000},
    storage: fileStorage = multer.diskStorage({
        destination: (req, file, next) => {
            next(null, __dirname+'/../public/uploads/estrategias')
        },
        filename: (req, file, next) => {
            const extension = file.mimetype.split('/')[1];
            next(null, `${shortid.generate()}.${extension}`);
        }
    }),
    fileFilter(req, file, next){
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            //Format Valid
            next(null, true);
        }else{
            //Format not valid
            next(new Error('Formato De Imagen No Valido'), false)
        }
    }
}

console.log(configuracionMulter);

const upload = multer(configuracionMulter).array('archivos', 10);

//Sube una imagen en el servidor
exports.subirImagen = (req, res, next) => {
    upload(req, res, function(error){
        if (error) {
            //TODO MANEJAR ERRORES
            if (error instanceof multer.MulterError) {
                if (error.code === 'LIMIT_FILE_SIZE') {
                    req.flash('error', 'El archivo es muy grande')
                }else{
                    console.log(error);

                    req.flash('error', error.message)
                } 
            }else if(error.hasOwnProperty('message')){
                console.log(error);

                req.flash('error', error.message);
            }
            res.redirect('back');
            return;
        }else{
            next()
        }     
    })

}


exports.formNuevaEstrategia = async (req, res) => {
    const categorias = await Categorias.findAll();
    res.render('nueva-estrategia', {
        nombrePagina: 'Nueva Estrategia',
        categorias
    })
}

exports.nuevaEstrategia = async (req, res, next) => {
    req.sanitizeBody('nombre');
    req.sanitizeBody('descripcion')
    req.sanitizeBody('pais')

    const estrategia = req.body;
    console.log(estrategia)

    estrategia.usuarioId = req.user.id;
    //leer imagen

    const files = req.files;
    const nombres = files.map(file => file.filename);
    estrategia.archivos = nombres;   

    try {
        await Estrategias.create(estrategia);
        req.flash('exito', 'Se creo el grupo correctamente');
        res.redirect('/administracion')
    } catch (error) {
        console.log(error);
        const erroresSequelize = error.errors.map(err=>err.message);
        req.flash('error', erroresSequelize);
        res.redirect('/nueva-estrategia')
    }
}
