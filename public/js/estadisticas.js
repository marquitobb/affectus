google.charts.load('current', { 'packages': ['corechart'] });
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
    var rol = $('#rolUsuarioInput').val();
    var id = $('#idUsuarioInput').val();

    if (rol == 1) {
        /***********************USUARIO *********************/
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