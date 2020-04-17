const Usuarios = require('../models/Usuarios');
const Estrategias = require('../models/Estrategias');

exports.panelAdministracion = async (req, res) => {
    //const usuario = await Usuarios.findByPk(req.user.id);
    //console.log(usuario.nombre)
    //const estrategias = await Estrategias.findAll({where: {id: req.user.id}});
    //console.log(estrategias)

    const consultas = [];
    consultas.push(Usuarios.findByPk(req.user.id))
    consultas.push(Estrategias.findAll({where: {usuarioId: req.user.id}}));

    const [usuario, estrategias] = await Promise.all(consultas);
    console.log(estrategias);
    res.render('administracion', {
        nombrePagina: 'Panel de Administracion',
        nombre: usuario.nombre,
        estrategias
    })
}