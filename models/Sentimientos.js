const Sequelize = require('sequelize');
const Usuarios = require('./Usuarios');
const db = require('../config/db');

const Sentimientos = db.define('sentimientos', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fecha: {
        type: Sequelize.DATE,
        defaultValue: Date.now 
    },
    sentimiento: {
        type: Sequelize.STRING(11),
        allowNull: false
    }
});

Sentimientos.belongsTo(Usuarios);

module.exports = Sentimientos;