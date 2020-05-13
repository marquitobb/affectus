const Usuarios = require('../models/Usuarios');
const Estrategias = require('../models/Estrategias');
const Categorias = require('../models/Categorias');
const Citas = require('../models/Citas');

exports.panelPrincipal = async (req, res) => {
    const consultas = [];
    consultas.push(Usuarios.findByPk(req.user.id));
    consultas.push(Estrategias.findAll({
        include: [
            {
                model: Usuarios,
                attributes: ['id', 'email', 'imagen', 'nombre', 'rol', aPaterno],
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
    consultas.push(Citas.findAll({where: {usuarioprofesional: req.user.id}}));

    const [usuario, estrategias, categorias, citas] = await Promise.all(consultas);

    res.render('principal', {
        nombrePagina: 'Principal',
        estrategias,
        categorias,
        nombre: usuario.nombre,
        usuario,
        citas
    });
};