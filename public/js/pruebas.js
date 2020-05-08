$(document).ready(function () {
    //Horarios de atención
    //Lunes
    var lunes = document.getElementById('lunes');
    lunes.addEventListener("change", lunesFuncion, false);
    var lunesT = document.getElementById('24lunes');
    lunesT.addEventListener("change", lunesTFuncion, false);

    function lunesFuncion() {
        if (lunes.checked) {
            document.getElementById("lunesTodo").style.display = "block";
            document.getElementById("horarioLunes").style.display = "block";
        } else {
            document.getElementById("lunesTodo").style.display = "none";
            document.getElementById("horarioLunes").style.display = "none";
            if (lunesT.checked) {
                document.getElementById("24lunes").checked = false;
            }
        }
    }

    function lunesTFuncion() {
        if (lunesT.checked) {
            document.getElementById("horarioLunes").style.display = "none";
        } else {
            document.getElementById("horarioLunes").style.display = "block";
        }
    }

    //Martes
    var martes = document.getElementById('martes');
    martes.addEventListener("change", martesFuncion, false);
    var martesT = document.getElementById('24martes');
    martesT.addEventListener("change", martesTFuncion, false);

    function martesFuncion() {
        if (martes.checked) {
            document.getElementById("martesTodo").style.display = "block";
            document.getElementById("horarioMartes").style.display = "block";
        } else {
            document.getElementById("martesTodo").style.display = "none";
            document.getElementById("horarioMartes").style.display = "none";
            if (martesT.checked) {
                document.getElementById("24martes").checked = false;
            }
        }
    }

    function martesTFuncion() {
        if (martesT.checked) {
            document.getElementById("horarioMartes").style.display = "none";
        } else {
            document.getElementById("horarioMartes").style.display = "block";
        }
    }
    //Miércoles
    var miercoles = document.getElementById('miercoles');
    miercoles.addEventListener("change", miercolesFuncion, false);
    var miercolesT = document.getElementById('24miercoles');
    miercolesT.addEventListener("change", miercolesTFuncion, false);

    function miercolesFuncion() {
        if (miercoles.checked) {
            document.getElementById("miercolesTodo").style.display = "block";
            document.getElementById("horarioMiercoles").style.display = "block";
        } else {
            document.getElementById("miercolesTodo").style.display = "none";
            document.getElementById("horarioMiercoles").style.display = "none";
            if (miercolesT.checked) {
                document.getElementById("24miercoles").checked = false;
            }
        }
    }

    function miercolesTFuncion() {
        if (miercolesT.checked) {
            document.getElementById("horarioMiercoles").style.display = "none";
        } else {
            document.getElementById("horarioMiercoles").style.display = "block";
        }
    }

    //Jueves
    var jueves = document.getElementById('jueves');
    jueves.addEventListener("change", juevesFuncion, false);
    var juevesT = document.getElementById('24jueves');
    juevesT.addEventListener("change", juevesTFuncion, false);

    function juevesFuncion() {
        if (jueves.checked) {
            document.getElementById("juevesTodo").style.display = "block";
            document.getElementById("horarioJueves").style.display = "block";
        } else {
            document.getElementById("juevesTodo").style.display = "none";
            document.getElementById("horarioJueves").style.display = "none";
            if (juevesT.checked) {
                document.getElementById("24jueves").checked = false;
            }
        }
    }

    function juevesTFuncion() {
        if (juevesT.checked) {
            document.getElementById("horarioJueves").style.display = "none";
        } else {
            document.getElementById("horarioJueves").style.display = "block";
        }
    }

    //Viernes
    var viernes = document.getElementById('viernes');
    viernes.addEventListener("change", viernesFuncion, false);
    var viernesT = document.getElementById('24viernes');
    viernesT.addEventListener("change", viernesTFuncion, false);

    function viernesFuncion() {
        if (viernes.checked) {
            document.getElementById("viernesTodo").style.display = "block";
            document.getElementById("horarioViernes").style.display = "block";
        } else {
            document.getElementById("viernesTodo").style.display = "none";
            document.getElementById("horarioViernes").style.display = "none";
            if (viernesT.checked) {
                document.getElementById("24viernes").checked = false;
            }
        }
    }

    function viernesTFuncion() {
        if (viernesT.checked) {
            document.getElementById("horarioViernes").style.display = "none";
        } else {
            document.getElementById("horarioViernes").style.display = "block";
        }
    }

    //Sábado
    var sabado = document.getElementById('sabado');
    sabado.addEventListener("change", sabadoFuncion, false);
    var sabadoT = document.getElementById('24sabado');
    sabadoT.addEventListener("change", sabadoTFuncion, false);

    function sabadoFuncion() {
        if (sabado.checked) {
            document.getElementById("sabadoTodo").style.display = "block";
            document.getElementById("horarioSabado").style.display = "block";
        } else {
            document.getElementById("sabadoTodo").style.display = "none";
            document.getElementById("horarioSabado").style.display = "none";
            if (sabadoT.checked) {
                document.getElementById("24sabado").checked = false;
            }
        }
    }

    function sabadoTFuncion() {
        if (sabadoT.checked) {
            document.getElementById("horarioSabado").style.display = "none";
        } else {
            document.getElementById("horarioSabado").style.display = "block";
        }
    }

    //Domingo
    var domingo = document.getElementById('domingo');
    domingo.addEventListener("change", domingoFuncion, false);
    var domingoT = document.getElementById('24domingo');
    domingoT.addEventListener("change", domingoTFuncion, false);

    function domingoFuncion() {
        if (domingo.checked) {
            document.getElementById("domingoTodo").style.display = "block";
            document.getElementById("horarioDomingo").style.display = "block";
        } else {
            document.getElementById("domingoTodo").style.display = "none";
            document.getElementById("horarioDomingo").style.display = "none";
            if (domingoT.checked) {
                document.getElementById("24domingo").checked = false;
            }
        }
    }

    function domingoTFuncion() {
        if (domingoT.checked) {
            document.getElementById("horarioDomingo").style.display = "none";
        } else {
            document.getElementById("horarioDomingo").style.display = "block";
        }
    }
});

//Variables Globales
var totalHorarios = 5; //Número total de horarios desponibles permitidos para un día
var xLunes = 1, conLunes = 1;
var xMartes = 1, conMartes = 1;
var xMiercoles = 1, conMiercoles = 1;
var xJueves = 1, conJueves = 1;
var xViernes = 1, conViernes = 1;
var xSabado = 1, conSabado = 1;
var xDomingo = 1, conDomingo = 1;


//Agregar horario lunes
function agregarLunes() {
    if (xLunes < totalHorarios) {
        xLunes++;
        conLunes++;
        $('#btnEliminarLunes').show();
        if (xLunes == totalHorarios) {
            $('#addLunes').hide();
        }
        $('#divHorariosLunes').append('<div class="form-inline lunes' + conLunes + '"><input class="mb-2" type="time" name="InicioLunes"><hr style="height: 1px; width: 5%; background-color: rgb(110, 109, 109);"><input class="mb-2 mr-2" type="time" name="FinLunes"><span id="btnEliminarLunes" onclick="eliminarLunes(' + conLunes + ');"><i class="far fa-times-circle fa-2x"></i></span></div>');
    }
}
//Eliminar horario Lunes
function eliminarLunes(numero) {
    $('div.lunes' + numero).remove();
    xLunes--;
    if (xLunes == 1) {
        $('#btnEliminarLunes').hide();
    }
    $('#addLunes').show();
}

//Agregar horario martes
function agregarMartes() {
    if (xMartes < totalHorarios) {
        xMartes++;
        conMartes++;
        $('#btnEliminarMartes').show();
        if (xMartes == totalHorarios) {
            $('#addMartes').hide();
        }
        $('#divHorariosMartes').append('<div class="form-inline martes' + conMartes + '"><input class="mb-2" type="time" name="InicioMartes"><hr style="height: 1px; width: 5%; background-color: rgb(110, 109, 109);"><input class="mb-2 mr-2" type="time" name="FinMartes"><span id="btnEliminarMartes" onclick="eliminarMartes(' + conMartes + ');"><i class="far fa-times-circle fa-2x"></i></span></div>');
    }
}
//Eliminar horario Martes
function eliminarMartes(numero) {
    $('div.martes' + numero).remove();
    xMartes--;
    if (xMartes == 1) {
        $('#btnEliminarMartes').hide();
    }
    $('#addMartes').show();
}

//Agregar horario miercoles
function agregarMiercoles() {
    if (xMiercoles < totalHorarios) {
        xMiercoles++;
        conMiercoles++;
        $('#btnEliminarMiercoles').show();
        if (xMiercoles == totalHorarios) {
            $('#addMiercoles').hide();
        }
        $('#divHorariosMiercoles').append('<div class="form-inline miercoles' + conMiercoles + '"><input class="mb-2" type="time" name="InicioMiercoles"><hr style="height: 1px; width: 5%; background-color: rgb(110, 109, 109);"><input class="mb-2 mr-2" type="time" name="FinMiercoles"><span id="btnEliminarMiercoles" onclick="eliminarMiercoles(' + conMiercoles + ');"><i class="far fa-times-circle fa-2x"></i></span></div>');
    }
}

//Eliminar horario Miercoles
function eliminarMiercoles(numero) {
    $('div.miercoles' + numero).remove();
    xMiercoles--;
    if (xMiercoles == 1) {
        $('#btnEliminarMiercoles').hide();
    }
    $('#addMiercoles').show();
}

//Agregar horario jueves
function agregarJueves() {
    if (xJueves < totalHorarios) {
        xJueves++; conJueves++; $('#btnEliminarJueves').show(); if
            (xJueves == totalHorarios) { $('#addJueves').hide(); } $('#divHorariosJueves').append('<div class="form-inline jueves' + conJueves + '"><input class="mb-2" type="time" name="InicioJueves"><hr style="height: 1px; width: 5%; background-color: rgb(110, 109, 109);"><input class="mb-2 mr-2" type="time" name="FinJueves"><span id="btnEliminarJueves" onclick="eliminarJueves(' + conJueves + ');"><i class="far fa-times-circle fa-2x"></i></span></div>');
    }
}

//Eliminar horario Jueves
function eliminarJueves(numero) {
    $('div.jueves' + numero).remove();
    xJueves--;
    if (xJueves == 1) {
        $('#btnEliminarJueves').hide();
    }
    $('#addJueves').show();
}


//Agregar horario viernes
function agregarViernes() {
    if (xViernes < totalHorarios) {
        xViernes++; conViernes++; $('#btnEliminarViernes').show(); if
            (xViernes == totalHorarios) { $('#addViernes').hide(); } $('#divHorariosViernes').append('<div class= "form-inline viernes' + conViernes + '" ><input class="mb-2" type="time" name="InicioViernes"><hr style="height: 1px; width: 5%; background-color: rgb(110, 109, 109);"><input class="mb-2 mr-2" type="time" name="FinViernes"><span id="btnEliminarViernes" onclick="eliminarViernes(' + conViernes + ');"><i class="far fa-times-circle fa-2x"></i></span></div>');
    }
}

//Eliminar horario Viernes
function eliminarViernes(numero) {
    $('div.viernes' + numero).remove();
    xViernes--;
    if (xViernes == 1) {
        $('#btnEliminarViernes').hide();
    }
    $('#addViernes').show();
}

//Agregar horario sabado
function agregarSabado() {
    if (xSabado < totalHorarios) {
        xSabado++; conSabado++; $('#btnEliminarSabado').show(); if
            (xSabado == totalHorarios) { $('#addSabado').hide(); } $('#divHorariosSabado').append('<div class="form-inline sabado' + conSabado + '"><input class="mb-2" type="time" name="InicioSabado"><hr style="height: 1px; width: 5%; background-color: rgb(110, 109, 109);"><input class="mb-2 mr-2" type="time" name="FinSabado"><span id="btnEliminarSabado" onclick="eliminarSabado(' + conSabado + ');"><i class="far fa-times-circle fa-2x"></i></span></div>');
    }
}

//Eliminar horario Sabado
function eliminarSabado(numero) {
    $('div.sabado' + numero).remove();
    xSabado--;
    if (xSabado == 1) {
        $('#btnEliminarSabado').hide();
    }
    $('#addSabado').show();
}


//Agregar horario domingo
function agregarDomingo() {
    if (xDomingo < totalHorarios) {
        xDomingo++; conDomingo++; $('#btnEliminarDomingo').show(); if
            (xDomingo == totalHorarios) { $('#addDomingo').hide(); } $('#divHorariosDomingo').append('<div class="form-inline domingo' + conDomingo + '"><input class="mb-2" type="time" name="InicioDomingo"><hr style="height: 1px; width: 5%; background-color: rgb(110, 109, 109);"><input class="mb-2 mr-2" type="time" name="FinDomingo"><span id="btnEliminarDomingo" onclick="eliminarDomingo(' + conDomingo + ');"><i class="far fa-times-circle fa-2x"></i></span></div>');
    }
}

//Eliminar horario Domingo
function eliminarDomingo(numero) {
    $('div.domingo' + numero).remove();
    xDomingo--;
    if (xDomingo == 1) {
        $('#btnEliminarDomingo').hide();
    }
    $('#addDomingo').show();
}




$('#estadoActual').change(function () {
    const url = `${location.origin}/estadoAffectus/` + $('#estadoActual').val();
    axios
        .post(url)
        .then(function (respuesta) {
            Swal.fire(
                'Excelente!',
                respuesta.data,
                'success'
            );
            var elemento = document.getElementById('circuloEstado');
            if ($('#estadoActual').val() == '0') {
                elemento.style.color = '#5cb85c';
            } else {
                if ($('#estadoActual').val() == '1') {
                    elemento.style.color = 'rgb(255, 238, 0)';
                } else {
                    elemento.style.color = 'rgb(255, 51, 0)';
                }
            }
        })
        .catch((error) => {
            console.log(error);
        });
});