const Usuarios = require('../models/Usuarios');
const Estrategias = require('../models/Estrategias');
const Categorias = require('../models/Categorias');
const Citas = require('../models/Citas');
const Sentimientos = require('../models/Sentimientos');

//Método que llama a la pantalla de Mapa
exports.visualizacionMapa = async (req, res) => {
    const usuario = await Usuarios.findByPk(req.user.id, {
        attributes: ['rol', 'id', 'nombre', 'estadoActual', 'email']
    });    
    const userPerfil = await Usuarios.findOne({
        where: { email: req.params.correo },
        attributes: ['email', 'rol', 'id']
    });
    const citas = await Citas.findAll({
        where: { usuarioprofesional: req.user.id },
        include: [
            {
                model: Usuarios,
                attributes: ['email', 'imagen', 'nombre', 'rol'],
                required: true
            }
        ]
    });

    const estrategias = await Estrategias.findAll({
        where: { usuarioId: req.user.id },
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
    });

    const citaspersonales = await Citas.findAll({
        where: { usuarioId: req.user.id }
    });

    res.render('mapa', {
        nombrePagina: 'Mapa',
        usuario,
        citas,
        citaspersonales,
        estrategias,
        userPerfil
    });
};