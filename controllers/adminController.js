const Usuarios = require('../models/Usuarios');
exports.panelAdministracion = async (req, res) => {
    const usuario = await Usuarios.findByPk(req.user.id);
    console.log(usuario.nombre)
    res.render('administracion', {
        nombrePagina: 'Panel de Administracion',
        nombre: usuario.nombre
    })
}