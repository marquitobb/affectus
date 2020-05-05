const Usuarios = require('../models/Usuarios');
const Categorias = require('../models/Categorias');
const Estrategias = require('../models/Estrategias');
const Sentimientos = require('../models/Sentimientos');

exports.formAgregarSentimiento = async (req, res) => {
    const consultas = [];
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
    const [estrategias] = await Promise.all(consultas);
    const usuario = await Usuarios.findByPk(req.user.id);
    res.render('agregar-sentimiento', {
        nombrePagina: "¿Cómo te sientes hoy?",
        usuario,
        estrategias
    });
};

exports.guardarSentimientos = async (req, res) => {
    const sentimiento = req.params;

    sentimiento.usuarioId = req.user.id;
    sentimiento.sentimiento = req.params.sentimiento;
    try {
        await Sentimientos.create(sentimiento);
        res.status(200).send('Sentimiento almacenado correctamente');

    } catch (error) {
        res.status(403).send('Hubo un error');
    }  
};