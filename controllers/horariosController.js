const Horarios = require('../models/Horarios');
const Citas = require('../models/Citas');
const Usuarios = require('../models/Usuarios');

exports.formAgregarHorario = async (req, res) => {
    const horario = await Horarios.findOne({where: {usuarioId : req.user.id}})
    res.render('agregar-horario', {
        nombrePagina: 'Agrega Horarios',
        horario
    })
}

exports.agregarHorarios = async (req, res, next) => {
    console.log(req.body);
    const horarios = req.body;

    horarios.usuarioId = req.user.id;

    try {
        await Horarios.create(horarios);
        req.flash('exito', 'Se añadieron tus horarios correctamente');
        res.redirect('/administracion');
    } catch (error) {
        console.log(error);
        res.redirect('/nueva-estrategia');
    }

}

exports.formEditarHorario = async (req, res, next) => {
    const horario = await Horarios.findOne({where: {usuarioId : req.user.id}})
    res.render('editar-horario', {
        nombrePagina: 'Agrega Horarios',
        horario
    })
}

exports.EditarHorario =async (req, res, next) => {

    // console.log(req.body.lunes);
    // return;
    const horario = await Horarios.findOne({where: {usuarioId: req.user.id}});
    //valida si el grupo existe o no o no es el dueño
    if (!horario) {
        res.status(403).send('Hubo un error');
        return next();
    }

    const {lunes, InicioLunes, FinLunes, martes, InicioMartes, FinMartes, miercoles, InicioMiercoles, FinMiercoles, jueves, InicioJueves, FinJueves, viernes, InicioViernes, FinViernes, sabado, InicioSabado, FinSabado, domingo, InicioDomingo, FinDomingo, lunescompleto, martescompleto, miercolescompleto,juevescompleto, viernescompleto, sabadocompleto, domingocompleto} = req.body;

    console.log("1111", lunes)

    //Lunes
    if (lunes === undefined) {
        horario.lunes = null
        horario.InicioLunes = []
        horario.FinLunes = []
    }else{
        horario.lunes = lunes
        horario.InicioLunes = InicioLunes
        horario.FinLunes = FinLunes
    }

    //Martes
    if (martes === undefined) {
        horario.martes = null;
        // horario.InicioMartes.map(hi => console.log(hi));
        // return;
        horario.InicioMartes = []
        horario.FinMartes = []
    }else{
        horario.martes = martes 
        horario.InicioMartes = InicioMartes
        horario.FinMartes = FinMartes
    }

    //Miercoles
    if (miercoles === undefined) {
        horario.miercoles = null
        horario.InicioMiercoles = []
        horario.FinMiercoles = []
    }else{
        horario.miercoles = miercoles
        horario.InicioMiercoles = InicioMiercoles
        horario.FinMiercoles = FinMiercoles
    }

    //Jueves
    if (jueves === undefined) {
        horario.jueves = null
        horario.InicioJueves = []
        horario.FinJueves = []
    }else{
        horario.jueves = jueves
        horario.InicioJueves = InicioJueves
        horario.FinJueves = FinJueves
    }

    //Viernes
    if (viernes === undefined) {
        horario.viernes = null
        horario.InicioViernes = []
        horario.FinViernes = []
    }else{
        horario.viernes = viernes
        horario.InicioViernes = InicioViernes
        horario.FinViernes = FinViernes
    }

    //Sabado
    if (sabado === undefined) {
        horario.sabado = null
        horario.InicioSabado = []
        horario.FinSabado = []
    }else{
        horario.sabado = sabado
        horario.InicioSabado = InicioSabado
        horario.FinSabado = FinSabado
    }

    //Domingo
    if (domingo === undefined) {
        horario.domingo = null
        horario.InicioDomingo = []
        horario.FinDomingo = []
    }else{
        horario.domingo = domingo
        horario.InicioDomingo = InicioDomingo
        horario.FinDomingo = FinDomingo
    }

    //leer los valores si todo esta bien
    // horario.lunes = lunes;
    // horario.InicioLunes = InicioLunes;
    // horario.FinLunes = FinLunes;
    // horario.martes = martes;
    // horario.InicioMartes = InicioMartes;
    // horario.FinMartes = FinMartes;
    // horario.miercoles = miercoles;
    // horario.InicioMiercoles = InicioMiercoles;
    // horario.FinMiercoles = FinMiercoles;
    // horario.jueves = jueves;
    // horario.InicioJueves = InicioJueves;
    // horario.FinJueves = FinJueves;
    // horario.viernes = viernes;
    // horario.InicioViernes = InicioViernes;
    // horario.FinViernes = FinViernes;
    // horario.sabado = sabado;
    // horario.InicioSabado = InicioSabado;
    // horario.FinSabado = FinSabado;
    // horario.domingo = domingo;
    // horario.InicioDomingo = InicioDomingo;
    // horario.FinDomingo = FinDomingo;

    if (lunescompleto === undefined) {
        horario.lunescompleto = null;
    }else{
        horario.lunescompleto = lunescompleto;
    }

    if (martescompleto === undefined) {
        horario.martescompleto = null;
    }else{
        horario.martescompleto = martescompleto;
    }

    if (miercolescompleto === undefined) {
        horario.miercolescompleto = null;
    }else{
        horario.miercolescompleto = miercolescompleto;
    }

    if (juevescompleto === undefined) {
        horario.juevescompleto = null;
    }else{
        horario.juevescompleto = juevescompleto;
    }

    if (viernescompleto === undefined) {
        horario.viernescompleto = null;
    }else{
        horario.viernescompleto = viernescompleto;
    }

    if (sabadocompleto === undefined) {
        horario.sabadocompleto = null;
    }else{
        horario.sabadocompleto = sabadocompleto;
    }

    if (domingocompleto === undefined) {
        horario.domingocompleto = null;
    }else{
        horario.domingocompleto = domingocompleto;
    }

    if (lunescompleto === 'on') {
        horario.InicioLunes = []
        horario.FinLunes = []
    }

    if (martescompleto === 'on') {
        horario.InicioMartes = []
        horario.FinMartes = []
    }

    if (miercolescompleto === 'on') {
        horario.InicioMiercoles = []
        horario.FinMiercoles = []
    }

    if (juevescompleto === 'on') {
        horario.InicioJueves = []
        horario.FinJueves = []
    }

    if (viernescompleto === 'on') {
        horario.InicioViernes = []
        horario.FinViernes = []
    }

    if (sabadocompleto === 'on') {
        horario.InicioSabado = []
        horario.FinSabado = []
    }

    if (domingocompleto === 'on') {
        horario.InicioDomingo = []
        horario.FinDomingo = []
    }

    // horario.lunescompleto = lunescompleto;
    // horario.martescompleto = martescompleto;
    // horario.miercolescompleto = miercolescompleto;
    // horario.juevescompleto = juevescompleto;
    // horario.viernescompleto = viernescompleto;
    // horario.sabadocompleto = sabadocompleto;
    // horario.domingocompleto = domingocompleto

    try {
        await horario.save();
        req.flash('exito', 'Se añadieron tus horarios correctamente');
        res.redirect('/administracion');
    } catch (error) {
        req.flash('error', 'Hubo un error al actualizar');
        res.redirect('/administracion');
    }     

}

exports.formAgregarCita = async (req, res) => {
    const horario = await Horarios.findOne({where: {usuarioId: req.params.id}})
    console.log(horario)
    res.render('agendar-cita', {
        nombrePagina: 'Agrega Cita',
        horario
    })
}

exports.AgregarCita = async (req, res, next) => {
    console.log(req.body.params);
    const {dia, inicio, fin, usuarioprofesional, idagenda} = req.body.params

    const cita = {
        dia,
        diainicio: inicio,
        diafin: fin,
        usuarioprofesional,
        usuarioId: req.user.id,
        horarioId: idagenda

    }

    try {
        await Citas.create(cita);
        console.log('correcto')
        res.json('Cita agregada correctamente')
        //req.flash('exito', 'Se añadieron tus citas correctamente');
        //res.redirect('/administracion');
    } catch (error) {
        console.log(error);
        res.json('Hubo un error')
        //res.redirect('/nueva-estrategia');
    }
}


exports.formVerCitas = async(req, res) => {
    const usuario = await Usuarios.findByPk(req.user.id, {
        attributes: ['rol']
    });
    const citas = await Citas.findAll({
        where: {usuarioprofesional: req.user.id},
        include: [
            {
                model: Usuarios,
                attributes: ['email', 'imagen', 'nombre', 'rol'],
                required: true
            }
        ]
    });

    const citaspersonales = await Citas.findAll({
        where: {usuarioId : req.user.id}
    })
    
    res.render('ver-citas', {
        nombrePagina: 'Mis citas',
        usuario,
        citas,
        citaspersonales
    })
}

exports.eliminarCita = async(req, res) => {
    console.log(req.params);
    const cita = await Citas.findOne({where: {id: req.params.idcita, usuarioId: req.user.id}});

    if (!cita) {
        res.status(403).send('Hubo un error');
        return next();
    }

    try {
        //todo bien elimina el grupo
        await Citas.destroy({
            where: {
                id: req.params.idcita
            }
        });
    res.status(200).send('Cita Eliminada Correctamente');
    } catch (error) {
        console.log(error)
        res.status(500).send('Hubo un error');
    }
    
}