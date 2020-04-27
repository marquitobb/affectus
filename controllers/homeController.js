const Estrategias = require('../models/Estrategias');
const Usuarios = require('../models/Usuarios');
const Categorias = require('../models/Categorias');


exports.home = async (req, res) => {
    const estrategias = await Estrategias.findAll({
        include: [
            {
                model: Usuarios,
                attributes: ['email', 'imagen']
            }
        ]
    })
    const categorias = await Categorias.findAll();
    //console.log("1111111", estrategias.usuarios);
    res.render('home',{
        nombrePagina: 'Home',
        estrategias,
        categorias
    });
};