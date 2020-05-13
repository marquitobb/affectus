const Usuarios = require('../models/Usuarios');
const Saluds = require('../models/datosSalud');
const Estrategias = require('../models/Estrategias');
const Categorias = require('../models/Categorias');
const Sentimientos = require('../models/Sentimientos');
const Citas = require('../models/Citas');
const Horarios = require('../models/Horarios');

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
                attributes: ['email', 'imagen', 'nombre', 'aPaterno'],
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
    consultas.push(Citas.findAll({where: {usuarioprofesional: req.user.id}}));
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