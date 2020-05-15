const Sequelize = require('sequelize');
const Usuarios = require('./Usuarios');
const db = require('../config/db');

const Reportes = db.define('reportes', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fecha: {
        type: Sequelize.DATE,
        defaultValue: Date.now 
    },
    razon: {
        type: Sequelize.STRING(150),
        allowNull: false
    },
    usuarioEmisor: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

Reportes.belongsTo(Usuarios);

module.exports = Reportes;