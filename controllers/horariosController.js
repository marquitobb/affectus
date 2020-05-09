const Horarios = require('../models/Horarios');

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

    console.log(req.body);

    const horario = await Horarios.findOne({where: {usuarioId: req.user.id}});
    
    //valida si el grupo existe o no o no es el dueño
    if (!horario) {
        res.status(403).send('Hubo un error');
        return next();
    }

    const {lunes, InicioLunes, FinLunes, martes, InicioMartes, FinMartes, miercoles, InicioMiercoles, FinMiercoles, jueves, InicioJueves, FinJueves, viernes, InicioViernes, FinViernes, sabado, InicioSabado, FinSabado, domingo, InicioDomingo, FinDomingo} = req.body;

    //leer los valores si todo esta bien
    horario.lunes = lunes;
    horario.InicioLunes = InicioLunes;
    horario.FinLunes = FinLunes;
    horario.martes = martes;
    horario.InicioMartes = InicioMartes;
    horario.FinMartes = FinMartes;
    horario.miercoles = miercoles;
    horario.InicioMiercoles = InicioMiercoles;
    horario.FinMiercoles = FinMiercoles;
    horario.jueves = jueves;
    horario.InicioJueves = InicioJueves;
    horario.FinJueves = FinJueves;
    horario.viernes = viernes;
    horario.InicioViernes = InicioViernes;
    horario.FinViernes = FinViernes;
    horario.sabado = sabado;
    horario.InicioSabado = InicioSabado;
    horario.FinSabado = FinSabado;
    horario.domingo = domingo;
    horario.InicioDomingo = InicioDomingo;
    horario.FinDomingo = FinDomingo;

    try {
        await horario.save();
        req.flash('exito', 'Se añadieron tus horarios correctamente');
        res.redirect('/administracion');
    } catch (error) {
        req.flash('error', 'Hubo un error al actualizar');
        res.redirect('/administracion');
    }     



}
