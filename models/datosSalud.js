const Sequelize = require('sequelize');
const Usuarios = require('./Usuarios');
const db = require('../config/db');

const Salud = db.define('saluds', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fecha: {
        type: Sequelize.DATE,
        defaultValue: Date.now 
    },
    peso: {
        type: Sequelize.FLOAT,
        allowNull: true
    },
    azucar: {
        type: Sequelize.SMALLINT,
        allowNull: true
    },
    temperatura: {
        type: Sequelize.FLOAT,
        allowNull: true
    },
    estatura: {
        type: Sequelize.FLOAT,
        allowNull: true
    },
    presion: {
        type: Sequelize.SMALLINT,
        allowNull: true
    }
});

Salud.belongsTo(Usuarios);

module.exports = Salud;