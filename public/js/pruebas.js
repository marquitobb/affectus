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
var xLunes = 0, conLunes = 0, xLunesEdit = -1;
var xMartes = 0, conMartes = 0, xMartesEdit = 2;
var xMiercoles = 0, conMiercoles = 0, xMiercolesEdit = 2;
var xJueves = 0, conJueves = 0, xJuevesEdit = 2;
var xViernes = 0, conViernes = 0, xViernesEdit = 2;
var xSabado = 0, conSabado = 0, xSabadoEdit = 2;
var xDomingo = 0, conDomingo = 0, xDomingoEdit = 2;

var divslunes = document.getElementsByClassName("lunesCon").length;
if (divslunes === 1) {
    $('#btnEliminarLunes').hide();
    $('#addLunes').hide();
}

if (divslunes === totalHorarios) {
    $('#addLunes').hide();
}else {
    $('#addLunes').show();
}

var divsmartes = document.getElementsByClassName("martesCon").length;
if (divsmartes === 1) {
    $('#btnEliminarMartes').hide();
}

if (divsmartes === totalHorarios) {
    $('#addMartes').hide();
}else{
    $('#addMartes').show();
}

var divsmiercoles = document.getElementsByClassName("miercolesCon").length;
if (divsmiercoles === 1) {
    $('#btnEliminarMiercoles').hide();
}

if (divsmiercoles === totalHorarios) {
    $('#addMiercoles').hide();
}else{
    $('#addMiercoles').show();
}

var divsjueves = document.getElementsByClassName("juevesCon").length;
if (divsjueves === 1) {
    $('#btnEliminarJueves').hide();
}

if (divsjueves === totalHorarios) {
    $('#addJueves').hide();
}else{
    $('#addJueves').show();
}

var divsviernes = document.getElementsByClassName("viernesCon").length;
if (divsviernes === 1) {
    $('#btnEliminarViernes').hide();
}

if (divsviernes === totalHorarios) {
    $('#addViernes').hide();
}else{
    $('#addViernes').show();

}

var divssabado = document.getElementsByClassName("sabadoCon").length;
if (divssabado === 1) {
    $('#btnEliminarSabado').hide();
}

if (divssabado === totalHorarios) {
    $('#addSabado').hide();
}else{
    $('#addSabado').show();

}

var divsdomingo = document.getElementsByClassName("domingoCon").length;
if (divsdomingo === 1) {
    $('#btnEliminarDomingo').hide();
}

if (divsdomingo === totalHorarios) {
    $('#addDomingo').hide();
}else{
    $('#addDomingo').show();

}

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

function agregarLunesEditar() {
    var divs = document.getElementsByClassName("lunesCon");
    var numDivs = divs.length + 1;
    if (numDivs === totalHorarios) {
        $('#addLunes').hide();
    }
    console.log(numDivs)
    if (xLunes < totalHorarios) {
        xLunes++;
        conLunes++;
        $('#btnEliminarLunes').show();
        if (xLunes == totalHorarios) {
            $('#addLunes').hide();
        }
        $('#divHorariosLunes').append('<div class="form-inline lunes' + numDivs + ' lunesCon"><input class="mb-2" type="time" name="InicioLunes"><hr style="height: 1px; width: 5%; background-color: rgb(110, 109, 109);"><input class="mb-2 mr-2" type="time" name="FinLunes"><span id="btnEliminarLunes" onclick="eliminarLunesEditar(' + numDivs + ');"><i class="far fa-times-circle fa-2x"></i></span></div>');
    }
}

//Eliminar horario Lunes
function eliminarLunes(numero) {
    console.log("num borrado", numero);
    // xLunes--;
    // console.log("xlunes", xLunes)
    // return
    // $('#lun').val(null);
    $('div.lunes' + numero).remove();
    xLunes--;
    if (xLunes == 0) {
        $('#btnEliminarLunes').hide();
    }

    $('#addLunes').show();
}

function eliminarLunesEditar(numero) {
    var divs = document.getElementsByClassName("lunesCon");
    var numDivs = divs.length - 1;
    console.log("num divs", numDivs);

    $('div.lunes' + numero).remove();

    if (numDivs == 1) {
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

//Agregar horario martes
function agregarMartesEditar() {
    var divs = document.getElementsByClassName("martesCon");
    var numDivs = divs.length + 1;
    if (numDivs === totalHorarios) {
        $('#addMartes').hide();
    }
    if (xMartes < totalHorarios) {
        xMartes++;
        conMartes++;
        $('#btnEliminarMartes').show();
        if (xMartes == totalHorarios) {
            $('#addMartes').hide();
        }
        $('#divHorariosMartes').append('<div class="form-inline martes' + numDivs + ' martesCon"><input class="mb-2" type="time" name="InicioMartes"><hr style="height: 1px; width: 5%; background-color: rgb(110, 109, 109);"><input class="mb-2 mr-2" type="time" name="FinMartes"><span id="btnEliminarMartes" onclick="eliminarMartesEditar(' + numDivs + ');"><i class="far fa-times-circle fa-2x"></i></span></div>');
    }
}
//Eliminar horario Martes
function eliminarMartes(numero) {
    // console.log(numero);
    // return
    $('div.martes' + numero).remove();
    xMartes--;
    if (xMartes == 0) {
        $('#btnEliminarMartes').hide();
    }

    $('#addMartes').show();
}

//Eliminar horario Martes
function eliminarMartesEditar(numero) {
    // console.log(numero);
    // return
    var divs = document.getElementsByClassName("martesCon");
    var numDivs = divs.length - 1;
    $('div.martes' + numero).remove();
    if (numDivs == 1) {
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

//Agregar horario miercoles
function agregarMiercolesEditar() {
    var divs = document.getElementsByClassName("miercolesCon");
    var numDivs = divs.length + 1;
    if (numDivs === totalHorarios) {
        $('#addMiercoles').hide();
    }
    if (xMiercoles < totalHorarios) {
        xMiercoles++;
        conMiercoles++;
        $('#btnEliminarMiercoles').show();
        if (xMiercoles == totalHorarios) {
            $('#addMiercoles').hide();
        }
        $('#divHorariosMiercoles').append('<div class="form-inline miercoles' + numDivs + ' miercolesCon"><input class="mb-2" type="time" name="InicioMiercoles"><hr style="height: 1px; width: 5%; background-color: rgb(110, 109, 109);"><input class="mb-2 mr-2" type="time" name="FinMiercoles"><span id="btnEliminarMiercoles" onclick="eliminarMiercolesEditar(' + numDivs + ');"><i class="far fa-times-circle fa-2x"></i></span></div>');
    }
}

//Eliminar horario Miercoles
function eliminarMiercoles(numero) {
    // console.log(numero);
    // return
    $('div.miercoles' + numero).remove();
    xMiercoles--;
    if (xMiercoles == 0) {
        $('#btnEliminarMiercoles').hide();
    }

    $('#addMiercoles').show();
}

//Eliminar horario Miercoles
function eliminarMiercolesEditar(numero) {
    // console.log(numero);
    // return
    var divs = document.getElementsByClassName("miercolesCon");
    var numDivs = divs.length - 1;
    $('div.miercoles' + numero).remove();
    if (numDivs == 1) {
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

//Agregar horario jueves
function agregarJuevesEditar() {
    var divs = document.getElementsByClassName("juevesCon");
    var numDivs = divs.length + 1;
    if (numDivs === totalHorarios) {
        $('#addJueves').hide();
    }
    if (xJueves < totalHorarios) {
        xJueves++; conJueves++; $('#btnEliminarJueves').show(); if
            (xJueves == totalHorarios) { $('#addJueves').hide(); } $('#divHorariosJueves').append('<div class="form-inline jueves' + numDivs + ' juevesCon"><input class="mb-2" type="time" name="InicioJueves"><hr style="height: 1px; width: 5%; background-color: rgb(110, 109, 109);"><input class="mb-2 mr-2" type="time" name="FinJueves"><span id="btnEliminarJueves" onclick="eliminarJuevesEditar(' + numDivs + ');"><i class="far fa-times-circle fa-2x"></i></span></div>');
    }
}

//Eliminar horario Jueves
function eliminarJueves(numero) {
    // console.log(numero);
    // return
    $('div.jueves' + numero).remove();
    xJueves--;
    if (xJueves == 0) {
        $('#btnEliminarJueves').hide();
    }

    $('#addJueves').show();
}

//Eliminar horario Jueves
function eliminarJuevesEditar(numero) {
    // console.log(numero);
    // return
    var divs = document.getElementsByClassName("juevesCon");
    var numDivs = divs.length - 1;
    $('div.jueves' + numero).remove();
    if (numDivs == 1) {
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

//Agregar horario viernes
function agregarViernesEditar() {
    var divs = document.getElementsByClassName("viernesCon");
    var numDivs = divs.length + 1;
    if (numDivs === totalHorarios) {
        $('#addViernes').hide();
    }
    if (xViernes < totalHorarios) {
        xViernes++; conViernes++; $('#btnEliminarViernes').show(); if
            (xViernes == totalHorarios) { $('#addViernes').hide(); } $('#divHorariosViernes').append('<div class= "form-inline viernes' + numDivs + ' viernesCon" ><input class="mb-2" type="time" name="InicioViernes"><hr style="height: 1px; width: 5%; background-color: rgb(110, 109, 109);"><input class="mb-2 mr-2" type="time" name="FinViernes"><span id="btnEliminarViernes" onclick="eliminarViernesEditar(' + numDivs + ');"><i class="far fa-times-circle fa-2x"></i></span></div>');
    }
}

//Eliminar horario Viernes
function eliminarViernes(numero) {
    // console.log(numero);
    // return
    $('div.viernes' + numero).remove();
    xViernes--;
    if (xViernes == 0) {
        $('#btnEliminarViernes').hide();
    }

    $('#addViernes').show();
}

//Eliminar horario Viernes
function eliminarViernesEditar(numero) {
    // console.log(numero);
    // return
    var divs = document.getElementsByClassName("viernesCon");
    var numDivs = divs.length - 1;
    $('div.viernes' + numero).remove();
    if (numDivs == 1) {
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

//Agregar horario sabado
function agregarSabadoEditar() {
    var divs = document.getElementsByClassName("sabadoCon");
    var numDivs = divs.length + 1;
    if (numDivs === totalHorarios) {
        $('#addSabado').hide();
    }
    if (xSabado < totalHorarios) {
        xSabado++; conSabado++; $('#btnEliminarSabado').show(); if
            (xSabado == totalHorarios) { $('#addSabado').hide(); } $('#divHorariosSabado').append('<div class="form-inline sabado' + numDivs + ' sabadoCon"><input class="mb-2" type="time" name="InicioSabado"><hr style="height: 1px; width: 5%; background-color: rgb(110, 109, 109);"><input class="mb-2 mr-2" type="time" name="FinSabado"><span id="btnEliminarSabado" onclick="eliminarSabadoEditar(' + numDivs + ');"><i class="far fa-times-circle fa-2x"></i></span></div>');
    }
}

//Eliminar horario Sabado
function eliminarSabado(numero) {
    // console.log(numero);
    // return
    $('div.sabado' + numero).remove();
    xSabado--;
    if (xSabado == 0) {
        $('#btnEliminarSabado').hide();
    }

    $('#addSabado').show();
}

//Eliminar horario Sabado
function eliminarSabadoEditar(numero) {
    // console.log(numero);
    // return
    var divs = document.getElementsByClassName("sabadoCon");
    var numDivs = divs.length - 1;
    $('div.sabado' + numero).remove();
    if (numDivs == 1) {
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

//Agregar horario domingo
function agregarDomingoEditar() {
    var divs = document.getElementsByClassName("domingoCon");
    var numDivs = divs.length + 1;
    if (numDivs === totalHorarios) {
        $('#addDomingo').hide();
    }
    if (xDomingo < totalHorarios) {
        xDomingo++; conDomingo++; $('#btnEliminarDomingo').show(); if
            (xDomingo == totalHorarios) { $('#addDomingo').hide(); } $('#divHorariosDomingo').append('<div class="form-inline domingo' + numDivs + ' domingoCon"><input class="mb-2" type="time" name="InicioDomingo"><hr style="height: 1px; width: 5%; background-color: rgb(110, 109, 109);"><input class="mb-2 mr-2" type="time" name="FinDomingo"><span id="btnEliminarDomingo" onclick="eliminarDomingoEditar(' + numDivs + ');"><i class="far fa-times-circle fa-2x"></i></span></div>');
    }
}

//Eliminar horario Domingo
function eliminarDomingo(numero) {
    // console.log(numero);
    // return
    $('div.domingo' + numero).remove();
    xDomingo--;
    if (xDomingo == 0) {
        $('#btnEliminarDomingo').hide();
    }

    $('#addDomingo').show();
}

//Eliminar horario Domingo
function eliminarDomingoEditar(numero) {
    // console.log(numero);
    // return
    var divs = document.getElementsByClassName("domingoCon");
    var numDivs = divs.length - 1;
    $('div.domingo' + numero).remove();
    if (numDivs == 1) {
        $('#btnEliminarDomingo').hide();
    }

    $('#addDomingo').show();
}

//Agregar cita lunes
function agregarCitaLunes(numero) {
    const hiddenlunes = $('#hiddenlunes').val();
    const iniciolunes = $(`#iniciolunes${numero}`).val();
    const finlunes = $(`#finlunes${numero}`).val();
    const usuarioprofesional = $(`#usuarioprofesional`).val();
    const idagenda = $(`#idagenda`).val();
    agregarCitas(hiddenlunes, iniciolunes, finlunes, usuarioprofesional, idagenda);
}

//Agregar cita martes
function agregarCitaMartes(numero) {
    const hiddenmartes = $('#hiddenmartes').val();
    const iniciomartes = $(`#iniciomartes${numero}`).val();
    const finmartes = $(`#finmartes${numero}`).val();
    const usuarioprofesional = $(`#usuarioprofesional`).val();
    const idagenda = $(`#idagenda`).val();
    agregarCitas(hiddenmartes, iniciomartes, finmartes, usuarioprofesional, idagenda);
}

//Agregar cita miercoles
function agregarCitaMiercoles(numero) {
    const hiddenmiercoles = $('#hiddenmiercoles').val();
    const iniciomiercoles = $(`#iniciomiercoles${numero}`).val();
    const finmiercoles = $(`#finmiercoles${numero}`).val();
    const usuarioprofesional = $(`#usuarioprofesional`).val();
    const idagenda = $(`#idagenda`).val();
    agregarCitas(hiddenmiercoles, iniciomiercoles, finmiercoles, usuarioprofesional, idagenda);
}

//Agregar cita jueves
function agregarCitaJueves(numero) {
    const hiddenjueves = $('#hiddenjueves').val();
    const iniciojueves = $(`#iniciojueves${numero}`).val();
    const finjueves = $(`#finjueves${numero}`).val();
    const usuarioprofesional = $(`#usuarioprofesional`).val();
    const idagenda = $(`#idagenda`).val();
    agregarCitas(hiddenjueves, iniciojueves, finjueves, usuarioprofesional, idagenda);
}

//Agregar cita viernes
function agregarCitaViernes(numero) {
    const hiddenviernes = $('#hiddenviernes').val();
    const inicioviernes = $(`#inicioviernes${numero}`).val();
    const finviernes = $(`#finviernes${numero}`).val();
    const usuarioprofesional = $(`#usuarioprofesional`).val();
    const idagenda = $(`#idagenda`).val();
    agregarCitas(hiddenviernes, inicioviernes, finviernes, usuarioprofesional, idagenda);
}

//Agregar cita saabado
function agregarCitaSabado(numero) {
    const hiddensabado = $('#hiddensabado').val();
    const iniciosabado = $(`#iniciosabado${numero}`).val();
    const finsabado = $(`#finsabado${numero}`).val();
    const usuarioprofesional = $(`#usuarioprofesional`).val();
    const idagenda = $(`#idagenda`).val();
    agregarCitas(hiddensabado, iniciosabado, finsabado, usuarioprofesional, idagenda);
}

//Agregar cita domingo
function agregarCitaDomingo(numero) {
    const hiddendomingo = $('#hiddendomingo').val();
    const iniciodomingo = $(`#iniciodomingo${numero}`).val();
    const findomingo = $(`#findomingo${numero}`).val();
    const usuarioprofesional = $(`#usuarioprofesional`).val();
    const idagenda = $(`#idagenda`).val();
    agregarCitas(hiddendomingo, iniciodomingo, findomingo, usuarioprofesional, idagenda);
}


function agregarCitas(dia, inicio, fin, usuarioprofesional, idagenda) {
    Swal.fire({
        title: '¿Seguro que quieres agregar la cita?',
        icon: 'success',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si agregala!'
    }).then((result) => {
        if (result.value) {
            const url = `${location.origin}/agendar-cita/${usuarioprofesional}`;
            axios.post(url, {
                params: {
                    dia,
                    inicio,
                    fin,
                    usuarioprofesional,
                    idagenda
                }
            }).then(function (respuesta) {
                if (respuesta.status === 200) {
                    Swal.fire("Correcto!", respuesta.data, "success");
                }
            }).catch(function (error) {
                Swal.fire({
                    type: "error",
                    title: "Hubo un error",
                    text: error.data,
                });
            });
        }
    });
}

function eliminarCita(idcita) {
    Swal.fire({
        title: '¿Seguro que eliminar la cita?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminala!'
    }).then((result) => {
        if (result.value) {
            const url = `${location.origin}/eliminar-cita/${idcita}`;
            axios.delete(url, {
                params: {
                    idcita
                }
            }).then(function (respuesta) {
                if (respuesta.status === 200) {
                    Swal.fire("Correcto!", respuesta.data, "success");
                    $('#citaspersonales').remove();
                }
            }).catch(function (error) {
                Swal.fire({
                    type: "error",
                    title: "Hubo un error",
                    text: error.data,
                });
            });
        }
    });
}