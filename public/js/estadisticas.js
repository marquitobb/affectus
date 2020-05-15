google.charts.load('current', { 'packages': ['corechart'] });
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
    var rol = $('#rolUsuarioInput').val();
    var id = $('#idUsuarioInput').val();

    if (rol == 1) {
        /***********************USUARIO *********************/
        //SENTIMIENTOS
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Sentimientos');
        data.addColumn('number', 'Cantidad');

        const sent = ['Feliz', 'Enojado', 'Preocupado', 'Sorprendido', 'Triste'];
        sent.forEach(sent => {
            const url = `${location.origin}/estadisticaSentimientos/` + sent + `/` + id;
            axios
                .get(url)
                .then(function (answer) {
                    data.addRows([[sent, answer.data.length]]);

                    var options = {
                        title: 'Sentimientos'
                    };

                    // Gráfica de pastel de sentimientos
                    var chart = new google.visualization.PieChart(document.getElementById('pieSentimientos'));
                    chart.draw(data, options);
                    // Gráfica de pastel de sentimientos
                    var chartPastel = new google.visualization.ColumnChart(document.getElementById('barraSentimientos'));
                    chartPastel.draw(data, options);
                })
                .catch((error) => {
                    console.log(error);
                });
        });


        //PESO
        var peso = new google.visualization.DataTable();
        peso.addColumn('string', 'Fecha');
        peso.addColumn('number', 'Peso');
        //TEMPERATURA
        var temperatura = new google.visualization.DataTable();
        temperatura.addColumn('string', 'Fecha');
        temperatura.addColumn('number', 'Temperatura');
        //PRESIÓN
        var presion = new google.visualization.DataTable();
        presion.addColumn('string', 'Fecha');
        presion.addColumn('number', 'Nivel de Presión Arterial');
        //AZUCAR
        var azucar = new google.visualization.DataTable();
        azucar.addColumn('string', 'Fecha');
        azucar.addColumn('number', 'Nivel de Azúcar');
        //ESTATURA
        var estatura = new google.visualization.DataTable();
        estatura.addColumn('string', 'Fecha');
        estatura.addColumn('number', 'Estatura');

        const url = `${location.origin}/salud/` + id;
        axios
            .get(url)
            .then(function (answer) {
                answer.data.forEach(answer => {
                    var fecha = answer.fecha.substr(0, 10);                    
                    peso.addRows([[fecha, answer.peso]]);
                    temperatura.addRows([[fecha, answer.temperatura]]);
                    presion.addRows([[fecha, answer.presion]]);
                    azucar.addRows([[fecha, answer.azucar]]);
                    estatura.addRows([[fecha, answer.estatura]]);
                });

                //PESO
                var opcionPeso = {
                    title: 'Peso'
                };
                //TEMPERATURA
                var opcionTemperatura = {
                    title: 'Temperatura'
                };
                //PRESIÓN
                var opcionPresion = {
                    title: 'Presión'
                };
                //AZUCAR
                var opcionAzucar = {
                    title: 'Azúcar'
                };
                //ESTATURA
                var opcionEstatura = {
                    title: 'Estatura'
                };


                //PESO
                var graficaPeso = new google.visualization.LineChart(document.getElementById('pesoLineal'));
                graficaPeso.draw(peso, opcionPeso);
                //TEMPERATURA
                var graficaTemperatura = new google.visualization.LineChart(document.getElementById('temperaturaLineal'));
                graficaTemperatura.draw(temperatura, opcionTemperatura);
                //PRESIÓN
                var graficaPresion = new google.visualization.LineChart(document.getElementById('presionLineal'));
                graficaPresion.draw(presion, opcionPresion);
                //AZUCAR
                var graficaAzucar = new google.visualization.LineChart(document.getElementById('azucarLineal'));
                graficaAzucar.draw(azucar, opcionAzucar);
                //ESTATURA
                var graficaEstatura = new google.visualization.LineChart(document.getElementById('estaturaLineal'));
                graficaEstatura.draw(estatura, opcionEstatura);
            })
            .catch((error) => {
                console.log(error);
            });

    } else {
        if (rol == 2) {
            /***********************PROFESIONAL *********************/
            const urlCat = `${location.origin}/categorias`;
            axios
                .get(urlCat)
                .then(function (respuesta) {
                    var datos = new google.visualization.DataTable();
                    datos.addColumn('string', 'Categorias');
                    datos.addColumn('number', 'Publicaciones');

                    respuesta.data.forEach(cate => {
                        const url = `${location.origin}/estadistica/` + cate.id + `/` + id;
                        axios
                            .get(url)
                            .then(function (answer) {
                                datos.addRows([[cate.nombre, answer.data.length]]);

                                var opciones = {
                                    title: 'Publicaciones por categoría'
                                };

                                // Gráfica de pastel de sentimientos
                                var barraCategoria = new google.visualization.PieChart(document.getElementById('barraCategorias'));
                                barraCategoria.draw(datos, opciones);
                                // Gráfica de pastel de sentimientos
                                var pastelCate = new google.visualization.ColumnChart(document.getElementById('pieSCategorias'));
                                pastelCate.draw(datos, opciones);
                            })
                            .catch((error) => {
                                console.log(error);
                            });
                    });
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }
}