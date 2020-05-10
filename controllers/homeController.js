const Estrategias = require('../models/Estrategias');
const Usuarios = require('../models/Usuarios');
const Categorias = require('../models/Categorias');


exports.home = async (req, res) => {
    const estrategias = await Estrategias.findAll({
        include: [
            {
                model: Usuarios,
                attributes: ['id', 'email', 'imagen', 'nombre', 'rol'],
                required: true
            },
            {
                model: Categorias,
                attributes: ['nombre'],
                required: true
            }
        ]
    });
    const categorias = await Categorias.findAll();
    res.render('home',{
        nombrePagina: 'Home',
        estrategias,
        categorias
    });
};