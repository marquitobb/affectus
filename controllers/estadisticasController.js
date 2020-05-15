const Usuarios = require('../models/Usuarios');
const Estrategias = require('../models/Estrategias');
const Categorias = require('../models/Categorias');
const Citas = require('../models/Citas');
const Sentimientos = require('../models/Sentimientos');
const Salud = require('../models/datosSalud');

//Método que llama a la pantalla de estadisticas
exports.estadisticas = async (req, res) => {
    const usuario = await Usuarios.findByPk(req.user.id, {
        attributes: ['rol', 'id', 'nombre', 'estadoActual', 'email']
    });    
    const userPerfil = await Usuarios.findOne({
        where: { email: req.params.correo },
        attributes: ['email', 'rol', 'id']
    });
    const citas = await Citas.findAll({
        where: { usuarioprofesional: req.user.id },
        include: [
            {
                model: Usuarios,
                attributes: ['email', 'imagen', 'nombre', 'rol'],
                required: true
            }
        ]
    });

    const estrategias = await Estrategias.findAll({
        where: { usuarioId: req.user.id },
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
    });

    const citaspersonales = await Citas.findAll({
        where: { usuarioId: req.user.id }
    });

    res.render('estadisticas', {
        nombrePagina: 'Estadísticas',
        usuario,
        citas,
        citaspersonales,
        estrategias,
        userPerfil
    });
};

exports.estadisticaProfesional =  async (req, res) => {  
    try {
        const estrategias = await Estrategias.findAll({
            where: { usuarioId: req.params.id, categoriaId: req.params.categoria},
            include: [
                {
                    model: Usuarios,
                    attributes: ['nombre'],
                    required: true
                },
                {
                    model: Categorias,
                    attributes: ['nombre'],
                    required: true
                }
            ]
        });
        //await Sentimientos.create(sentimiento);
        res.status(200).send(estrategias);

    } catch (error) {
        res.status(403).send('Hubo un error');
    }
};

exports.obtencionCategorias =  async (req, res) => {    
    try {
        const categorias = await Categorias.findAll({
            attributes:['nombre', 'id']
        });
        
        res.status(200).send(categorias);

    } catch (error) {
        res.status(403).send('Hubo un error');
    }
};

exports.obtencionSentimientos =  async (req, res) => {    
    try {
        const sentimiento = await Sentimientos.findAll({
            where: { usuarioId: req.params.id, sentimiento: req.params.sentimiento},
        });
        
        res.status(200).send(sentimiento);

    } catch (error) {
        res.status(403).send('Hubo un error');
    }
};

//Método para obtener los datos de salud del usuario que se visualizará en la pantalla
exports.obtencionSaludUser =  async (req, res) => {    
    try {
        const salud = await Salud.findAll({
            where: {usuarioId: req.params.id},
            attributes:['fecha', 'peso', 'azucar', 'temperatura', 'estatura', 'presion']
        });
        
        res.status(200).send(salud);

    } catch (error) {
        res.status(403).send('Hubo un error');
    }
};