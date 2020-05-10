const Usuarios = require('../models/Usuarios');
const Estrategias = require('../models/Estrategias');
const Categorias = require('../models/Categorias');

exports.panelPrincipal = async (req, res) => {
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

    res.render('principal', {
        nombrePagina: 'Principal',
        estrategias,
        categorias,
        nombre: usuario.nombre,
        usuario
    });
};