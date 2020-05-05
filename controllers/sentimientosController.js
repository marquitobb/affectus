const Usuarios = require('../models/Usuarios');
const Sentimientos = require('../models/Sentimientos');

exports.formAgregarSentimiento = async (req, res) => {
    const usuario = await Usuarios.findByPk(req.user.id);
    res.render('agregar-sentimiento', {
        nombrePagina: "¿Cómo te sientes hoy?",
        usuario
    });
};

exports.guardadoSentimientos = async (req, res) => {
    const sent = req.params.sentimiento;
    //sent.usuarioid = req.usuarioid;

    //console.log(sent.usuarioid);

    //await Sentimientos.create(sent);
};