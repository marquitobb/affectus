const Usuarios = require('../models/Usuarios');
const Estrategias = require('../models/Estrategias');
const Categorias = require('../models/Categorias');
const Citas = require('../models/Citas');

exports.panelAdministracion = async (req, res) => {
    const consultas = [];
    consultas.push(Usuarios.findByPk(req.user.id));
    consultas.push(Estrategias.findAll({where: {usuarioId: req.user.id}}));
    consultas.push(Categorias.findAll());
    consultas.push(Citas.findAll({where: {usuarioprofesional: req.user.id}}));

    const [usuario, estrategias, categorias, citas] = await Promise.all(consultas);

    res.render('administracion', {
        nombrePagina: 'Panel de Administracion',
        nombre: usuario.nombre,
        estrategias,
        categorias,
        usuario,
        citas
    });
};

