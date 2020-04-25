const Sequelize = require('sequelize');
const Usuarios = require('./Usuarios');
const db = require('../config/db');

const Chats = db.define('chats', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    msg: {
        type: Sequelize.TEXT,
    },
    nick: {
        type: Sequelize.STRING(60) 
    },
    recibe: {
        type: Sequelize.STRING(60)
    },
    fecha: {
        type: Sequelize.DATE,
        defaultValue: Date.now 
    }

})

module.exports = Chats;