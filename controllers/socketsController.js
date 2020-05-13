const Categorias = require('../models/Categorias');

exports.index = async (req, res) => {
    //console.log(req.user.email);
    const categorias = await Categorias.findAll();

    res.render('index', {
        nombrePagina: 'Binvenida Chat',
        usuario: req.user.email,
        categorias
    });
};

exports.chat = (req, res) => {
    res.render('chat', {
        nombrePagina: 'Chat'
    });
};

exports.chatIndividual = (req, res) => {
    //console.log("usuario envia", req.user.email);
    //console.log("usuario recibe", req.params.emailRecibe)
    res.render('chatIndividual', {
        nombrePagina: 'Chat Personal',
        usuarioEnvia: req.user.email,
        usuarioRecibe : req.params.emailRecibe
    });
};