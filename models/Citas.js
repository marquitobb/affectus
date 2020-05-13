const Sequelize = require('sequelize');
const Usuarios = require('./Usuarios');
const Horarios = require('./Horarios');
const db = require('../config/db');

const Citas = db.define('citas', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    dia: {
        type: Sequelize.STRING,
    },
    diainicio: {
        type: Sequelize.STRING,
    },
    diafin: {
        type: Sequelize.STRING,
 
    },
    usuarioprofesional: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

Citas.belongsTo(Usuarios);
Citas.belongsTo(Horarios);

module.exports = Citas;