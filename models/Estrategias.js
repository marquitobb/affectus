const Sequelize = require('sequelize');
const db = require('../config/db');
const Usuarios = require('./Usuarios');
const Categorias = require('./Categorias');

const Estrategias = db.define('estrategias', { 
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: Sequelize.STRING(60),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'El nombre no puede ir vacio'
            }
        }
    },
    fecha_creacion: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Debe agregar una fecha'
            }
        } 
    },
    archivos: { 
        type: Sequelize.STRING,
        allowNull: false,
        get() {
            return this.getDataValue('archivos').split(';')
        },
        set(val) {
            console.log(typeof(val))
           if (typeof(val) === "string") {
            this.setDataValue('archivos', val);
           }else{
            this.setDataValue('archivos', val.join(';'));
           }
        },
        validate: {
            notEmpty: {
                msg: 'Debe Existir Al Menos un Archivo'
            }
        } 
    },
    imagen: {
        type: Sequelize.STRING
    },
    pais: {
        type: Sequelize.STRING(50),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'El pais no puede ir vacio'
            }
        }
    },
    descripcion: {
        type: Sequelize.TEXT
    },
    
});

Estrategias.belongsTo(Usuarios);
Estrategias.belongsTo(Categorias);



module.exports = Estrategias;
