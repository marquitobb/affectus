const Usuarios = require('../models/Usuarios');
const Saluds = require('../models/datosSalud');
const Estrategias = require('../models/Estrategias');
const Categorias = require('../models/Categorias');
const Sentimientos = require('../models/Sentimientos');
require('dotenv').config({ path: 'variables.env' });
const mailer = require('../misc/mailer');

const multer = require('multer');
const shortid = require('shortid');
const fs = require('fs');

//Visualizar página de perfil
exports.visualizarPerfil = async(req, res) => {
    const email = req.params.correo;
    const userPerfil = await Usuarios.findOne({ where: { email } });
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
    res.render('perfil', {
        nombrePagina: 'Perfil',
        categorias,
        estrategias,
        nombre: usuario.nombre,
        usuario,
        userPerfil
    });
};