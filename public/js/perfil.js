$(document).ready(function () {
    $('#reportePerfil').click(function () {
        var email = $('#reportePerfil').attr('name');
        var usuarioEmisor = $('#reportePerfil').attr('value');
        Swal.fire({
            title: '¿Estás seguro de reportar al usuario?',
            text: "Escribe la razón por la que reportarás al usuario " + email + ". Debe ingresar al menos 20 caracteres para que se procese su reporte.",
            input: 'text',
            inputAttributes: {
                autocapitalize: 'off',
                id: 'razonReporte',
                maxlength: 150
            },
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Segur@, ¡Repórtalo!'
        }).then((result) => {
            var razon = $('#razonReporte').val().trim();
            if (razon.length < 20) {
                Swal.fire(
                    'Reporte no procesado',
                    'La cantidad de caracteres de reporte es inferior a la solicitada',
                    'error'
                );
            } else {
                if (result.value) {
                    const url = `${location.origin}/reporte/${email}`;
                    axios
                        .post(url, {
                            params: { url, usuarioEmisor, razon},
                        })
                        .then(function (respuesta) {
                            Swal.fire(
                                'Excelente!',
                                respuesta.data,
                                'success'
                            );
                        })
                        .catch((error) => {
                            Swal.fire({
                                type: "error",
                                title: "Hubo un error",
                                text: "No se pudo generar el reporte",
                            });
                        });
                }
            }
        });
    });
});