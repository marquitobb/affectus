const Usuarios = require('../models/Usuarios');
const Estrategias = require('../models/Estrategias');
const Categorias = require('../models/Categorias');

exports.panelAdministracion = async (req, res) => {
    const consultas = [];
    consultas.push(Usuarios.findByPk(req.user.id));
    consultas.push(Estrategias.findAll({where: {usuarioId: req.user.id}}));
    consultas.push(Categorias.findAll());

    const [usuario, estrategias, categorias] = await Promise.all(consultas);

    res.render('administracion', {
        nombrePagina: 'Panel de Administracion',
        nombre: usuario.nombre,
        estrategias,
        categorias,
        usuario
    });
};

