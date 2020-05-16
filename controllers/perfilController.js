const Usuarios = require('../models/Usuarios');
const Saluds = require('../models/datosSalud');
const Estrategias = require('../models/Estrategias');
const Categorias = require('../models/Categorias');
const Sentimientos = require('../models/Sentimientos');
const Citas = require('../models/Citas');
const Horarios = require('../models/Horarios');
const Reportes = require('../models/Reportes');

require('dotenv').config({ path: 'variables.env' });
const mailer = require('../misc/mailer');

const multer = require('multer');
const shortid = require('shortid');
const fs = require('fs');

//Visualizar página de perfil
exports.visualizarPerfil = async (req, res) => {
    const email = req.params.correo;
    const userPerfil = await Usuarios.findOne({ where: { email } });
    const consultas = [];
    consultas.push(Usuarios.findByPk(req.user.id));
    consultas.push(Estrategias.findAll({
        where: { usuarioId: userPerfil.id },
        include: [
            {
                model: Usuarios,
                attributes: ['email', 'imagen', 'nombre', 'aPaterno', 'descripcion', 'fechanacimiento', 'email'],
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
    consultas.push(Sentimientos.findAll({
        where: { usuarioId: userPerfil.id },
        include: [
            {
                model: Usuarios,
                attributes: ['nombre'],
                required: true
            }
        ]
    }));
    consultas.push(Citas.findAll({ where: { usuarioprofesional: req.user.id } }));
    const [usuario, estrategias, categorias, sentimientos, citas] = await Promise.all(consultas);
    const horario = await Horarios.findOne({ where: { usuarioId: req.user.id } });
    res.render('perfil', {
        nombrePagina: 'Perfil',
        categorias,
        estrategias,
        nombre: usuario.nombre,
        usuario,
        userPerfil,
        sentimientos,
        citas, horario
    });
};

//Método para reporte de usuario
exports.reportarPerfilProfesional = async (req, res) => {
    const usuario = await Usuarios.findOne({ where: { email: req.params.email } });
    const datos = req.body.params;
    datos.usuarioId = usuario.id;

    usuario.reportes = usuario.reportes + 1;

    try {
        const html = `Hi ${usuario.nombre},
        <br/>
        You have been reported!
        <br/> <br/>
        The reason for the report is shown below
        <br/> <br/>
        ${req.body.params.razon}
        <br/> <br/>
        You have ${usuario.reportes} reports currently
        <br/> <br/>
        Have a pleasant day!`;

        //Envío de correo
        await mailer.sendEmail('Affectus', usuario.email, 'Affectus: You have been reported !!', html);

        await usuario.save();
        await Reportes.create(datos);

        res.status(200).send('Reporte generado correctamente');

    } catch (error) {
        res.status(403).send('Hubo un error');
    }
};