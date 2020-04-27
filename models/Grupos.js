const Sequelize = require('sequelize');
//const Usuarios = require('./Usuarios');
const db = require('../config/db');

const Grupos = db.define('grupos', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    msg: {
        type: Sequelize.TEXT,
    },
    email: {
        type: Sequelize.STRING(60) 
    },
    room: {
        type: Sequelize.STRING(10) 
    },
    fecha: {
        type: Sequelize.DATE,
        defaultValue: Date.now 
    }

})

module.exports = Grupos;