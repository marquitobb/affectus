const path = require('path')
const multer = require('multer')
const fs = require('fs');

//funcion para redireccionr a la vista de formulario csv
exports.openform = (req, res, next) => {
    console.log("subir csv controller");
    res.render('nuevo-csv', {
        nombrePagina: 'subir csv',        
    });
}
//parte de la funcion del storage
let storage = multer.diskStorage({
    destination:(req,file, cb)=>{
        const pais = req.body.pais         
        cb(null, `./public/upload/${pais}`)
    },filename:(req,file, cb)=>{
        console.log("filee-->",file);
        cb(null, file.originalname )        
        //cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

const uploadFile = multer({storage}).single('file')

exports.uploadcsv = (req, res, next) => { 
        
    uploadFile(req, res, (err)=> {
        if (err instanceof multer.MulterError) {
            // A Multer error occurred when uploading.
        } else if (err) {
            // An unknown error occurred when uploading.
        }        
        console.log("todo fine");        
    })
    res.redirect('/principal');
}