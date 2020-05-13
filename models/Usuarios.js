const Sequelize = require('sequelize');
const db = require('../config/db');
const bcrypt = require('bcrypt-nodejs');

const Usuarios = db.define('usuarios', { 
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: Sequelize.STRING(60),
    aPaterno: Sequelize.STRING(60),
    aMaterno: Sequelize.STRING(60),
    imagen: Sequelize.STRING(60),
    secretToken: Sequelize.STRING(60),
    email:{
        type: Sequelize.STRING(60),
        allowNull: false,
        lowerCase: true,
        validate: {
            isEmail: {msg: 'Agrega un correo válido'}
        },
        unique:{
            args: true,
            msg: 'Usuario ya registrado'
        }
    },
    password: {
        type: Sequelize.STRING(60),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'El password no puede ir vacio'
            }
        }
    },
    activo: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
    },
    descripcion: {
        type: Sequelize.TEXT
    },
    genero: {
        type: Sequelize.TEXT
    },
    fechanacimiento: {
        type: Sequelize.DATEONLY
    },
    ocupacion: {
        type: Sequelize.TEXT
    },
    direccion: {
        type: Sequelize.TEXT
    },
    discapacidad: {
        type: Sequelize.TEXT
    },
    telefono: {
        type: Sequelize.STRING(10)
    },
    cv: {
        type: Sequelize.STRING(60)
    },
    rol: {
        type: Sequelize.STRING(1),
        allowNull: false
    },
    familiarEnfermedad: {
        type: Sequelize.TEXT
    },
    enfermedadPersonal: {
        type: Sequelize.TEXT
    },
    vivienda: {
        type: Sequelize.STRING(20)
    },
    viviendo: {
        type: Sequelize.STRING(10)
    },
    mascota: {
        type: Sequelize.STRING(4)
    },
    alimentacion: {
        type: Sequelize.STRING(10)
    },
    estadoActual: {
        type: Sequelize.STRING(1)
    },
    whatsapp: {
        type: Sequelize.STRING(10)
    },
    cualidades: {
        type: Sequelize.STRING(500)
    },
    aboutme: {
        type: Sequelize.STRING(500)
    },
    nacionalidad: {
        type: Sequelize.STRING(30)
    },
    idiomaEspanol: {
        type: Sequelize.BOOLEAN
    },
    idiomaIngles: {
        type: Sequelize.BOOLEAN
    },
    idiomaPortugues: {
        type: Sequelize.BOOLEAN
    },
    idiomaFrances: {
        type: Sequelize.BOOLEAN
    },
    idiomaItaliano: {
        type: Sequelize.BOOLEAN
    }
}, {
    hooks: {
        beforeCreate(usuario){
            usuario.password = Usuarios.prototype.hashPassword(usuario.password);
        }
    }
});

//Metodo para comparar los passwords 
Usuarios.prototype.validarPassword = function(password){
    return bcrypt.compareSync(password, this.password);
};

//
Usuarios.prototype.hashPassword = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);

};

module.exports = Usuarios;
