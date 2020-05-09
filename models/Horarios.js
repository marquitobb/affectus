const Sequelize = require('sequelize');
const db = require('../config/db');
const Usuarios = require('./Usuarios');

const Horarios = db.define('horarios', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    lunes: {
        type: Sequelize.STRING,
    },
    
    InicioLunes: { 
        type: Sequelize.STRING,
        defaultValue: null,
        get() {
            return this.getDataValue('InicioLunes').split(';')
        },
        set(val) {
           //console.log(typeof(val))
           if (val === '') {
               val = null;
               return 
           }
           if (typeof(val) === "string") {
            this.setDataValue('InicioLunes', val);
           }else{
            this.setDataValue('InicioLunes', val.join(';'));
           } 
        }, 
    },
    FinLunes: { 
        type: Sequelize.STRING,
        allowNull: true,

        get() {
            return this.getDataValue('FinLunes').split(';')
        },
        set(val) {
            if (val === '') {
                val = null;
                return 
            }
           if (typeof(val) === "string") {
            this.setDataValue('FinLunes', val);
           }else{
            this.setDataValue('FinLunes', val.join(';'));
           }
        },
    }, 
    martes: {
        type: Sequelize.STRING,
    },
    InicioMartes: { 
        type: Sequelize.STRING,
        allowNull: true,
        get() {
            return this.getDataValue('InicioMartes').split(';')
        },
        set(val) {
            if (val === '') {
                val = null;
                return 
            }
           if (typeof(val) === "string") {
            this.setDataValue('InicioMartes', val);
           }else{
            this.setDataValue('InicioMartes', val.join(';'));
           }
        },
    },
    FinMartes: { 
        type: Sequelize.STRING,
        allowNull: true,

        get() {
            return this.getDataValue('FinMartes').split(';')
        },
        set(val) {
            if (val === '') {
                val = null;
                return 
            }
           if (typeof(val) === "string") {
            this.setDataValue('FinMartes', val);
           }else{
            this.setDataValue('FinMartes', val.join(';'));
           }
        },
    },
    miercoles: {
        type: Sequelize.STRING,
    },
    InicioMiercoles: { 
        type: Sequelize.STRING,
        allowNull: true,

        get() {
            return this.getDataValue('InicioMiercoles').split(';')
        },
        set(val) {
            if (val === '') {
                val = null;
                return 
            }
           if (typeof(val) === "string") {
            this.setDataValue('InicioMiercoles', val);
           }else{
            this.setDataValue('InicioMiercoles', val.join(';'));
           }
        },
    },
    FinMiercoles: { 
        type: Sequelize.STRING,
        allowNull: true,

        get() {
            return this.getDataValue('FinMiercoles').split(';')
        },
        set(val) {
            if (val === '') {
                val = null;
                return 
            }
           if (typeof(val) === "string") {
            this.setDataValue('FinMiercoles', val);
           }else{
            this.setDataValue('FinMiercoles', val.join(';'));
           }
        },
    },
    jueves: {
        type: Sequelize.STRING,
    },
    InicioJueves: { 
        type: Sequelize.STRING,
        allowNull: true,

        get() {
            return this.getDataValue('InicioJueves').split(';')
        },
        set(val) {
            if (val === '') {
                val = null;
                return 
            }
           if (typeof(val) === "string") {
            this.setDataValue('InicioJueves', val);
           }else{
            this.setDataValue('InicioJueves', val.join(';'));
           }
        },
    },
    FinJueves: { 
        type: Sequelize.STRING,
        allowNull: true,

        get() {
            return this.getDataValue('FinJueves').split(';')
        },
        set(val) {
            if (val === '') {
                val = null;
                return 
            }
           if (typeof(val) === "string") {
            this.setDataValue('FinJueves', val);
           }else{
            this.setDataValue('FinJueves', val.join(';'));
           }
        },
    },
    viernes: {
        type: Sequelize.STRING,
    },
    InicioViernes: { 
        type: Sequelize.STRING,
        allowNull: true,

        get() {
            return this.getDataValue('InicioViernes').split(';')
        },
        set(val) {
            if (val === '') {
                val = null;
                return 
            }
           if (typeof(val) === "string") {
            this.setDataValue('InicioViernes', val);
           }else{
            this.setDataValue('InicioViernes', val.join(';'));
           }
        },
    },
    FinViernes: { 
        type: Sequelize.STRING,
        allowNull: true,

        get() {
            return this.getDataValue('FinViernes').split(';')
        },
        set(val) {
            if (val === '') {
                val = null;
                return 
            }
           if (typeof(val) === "string") {
            this.setDataValue('FinViernes', val);
           }else{
            this.setDataValue('FinViernes', val.join(';'));
           }
        },
    },
    sabado: {
        type: Sequelize.STRING,
    },
    InicioSabado: { 
        type: Sequelize.STRING,
        allowNull: true,

        get() {
            return this.getDataValue('InicioSabado').split(';')
        },
        set(val) {
            if (val === '') {
                val = null;
                return 
            }
           if (typeof(val) === "string") {
            this.setDataValue('InicioSabado', val);
           }else{
            this.setDataValue('InicioSabado', val.join(';'));
           }
        },
    },
    FinSabado: { 
        type: Sequelize.STRING,
        allowNull: true,

        get() {
            return this.getDataValue('FinSabado').split(';')
        },
        set(val) {
            if (val === '') {
                val = null;
                return 
            }
           if (typeof(val) === "string") {
            this.setDataValue('FinSabado', val);
           }else{
            this.setDataValue('FinSabado', val.join(';'));
           }
        },
    },
    domingo: {
        type: Sequelize.STRING,
    },
    InicioDomingo: { 
        type: Sequelize.STRING,
        allowNull: true,

        allowNull: true,
        get() {
            return this.getDataValue('InicioDomingo').split(';')
        },
        set(val) {
            if (val === '') {
                val = null;
                return 
            }
           if (typeof(val) === "string") {
            this.setDataValue('InicioDomingo', val);
           }else{
            this.setDataValue('InicioDomingo', val.join(';'));
           }
        },
    },
    FinDomingo: { 
        type: Sequelize.STRING,
        allowNull: true,
        get() {
            return this.getDataValue('FinDomingo').split(';')
        },
        set(val) {
            if (val === '') {
                val = null;
                return 
            }
           if (typeof(val) === "string") { 
            this.setDataValue('FinDomingo', val);
           }else{
            this.setDataValue('FinDomingo', val.join(';'));
           }  
        },
    },
});

Horarios.belongsTo(Usuarios);


module.exports = Horarios;

// lunes: 'on',
//   InicioLunes: '13:35',
//   FinLunes: '13:36',
//   martes: 'on',
//   InicioMartes: '13:35',
//   FinMartes: '13:36',
//   miercoles: 'on',
//   InicioMiercoles: '13:36',
//   FinMiercoles: '14:36',
//   jueves: 'on',
//   InicioJueves: '14:36',
//   FinJueves: '15:36',
//   viernes: 'on',
//   InicioViernes: '13:36',
//   FinViernes: '14:36',
//   sabado: 'on',
//   InicioSabado: '13:36',
//   FinSabado: '14:36',
//   domingo: 'on',
//   InicioDomingo: '13:36',
//   FinDomingo: '14:36',