var botao = document.querySelector("#button");
botao.addEventListener("click", function () {
    var titulo = document.querySelector("#pega-form");
    var sprint = titulo.titulo.value;
    console.log(sprint);
    if (!sprint == "") {
        document.querySelector('#sprint').innerHTML = sprint;
    } else {
        var a = titulo.length;
        var b = a - 1;
        document.querySelector('#sprint').innerHTML = titulo[b];

    }
    location.reload();

});

function createDataset(color, name, dados, ) {
    return {
        label: name,
        backgroundColor: color,
        borderColor: color,
        data: dados,
        fill: false,
    }
}

function asDate(data) {
    var splitedDate = data.substring(0, 10).split('-');
    return splitedDate[2] + '/' + splitedDate[1] + '/' + splitedDate[0];
}

$(document).ready(function () {
    var pontos = [];
    var extras = [];
    var dias = [];

    $.ajax({
        url: 'http://localhost:3000/burn',
        type: 'GET', //POST GET DELETE PUT
        //async: true,
        //data: {chave: valor},
        success: function (resposta) {
            $.each(resposta, function (indice, valores) {
                pontos.push(valores.points);
                extras.push(valores.extra_task);
                dias.push(valores.data.substring(0, 10));

            });


            var config = {
                type: 'line',
                data: {
                    labels: dias,
                    datasets: [
                        createDataset(window.chartColors.red, 'Points', pontos),
                        createDataset(window.chartColors.blue, 'Extra Tasks', extras),
                    ],
                },
            };

            var ctx = document.getElementById('canvas').getContext('2d');
            mySpecialChart = new Chart(ctx, config);
            window.myLine = mySpecialChart;
        },
        error: function (error) {
            //Tratar Erro
        }
    });

    document.getElementById("canvas").onclick = function (evt) {
        toggleUpdate();
        var activePoints = window.myLine.getElementsAtEventForMode(evt, 'label', window.myLine.options);
        var firstPoint = activePoints[0];
        var label = window.myLine.data.labels[firstPoint._index];
        var valuePontos = window.myLine.data.datasets[firstPoint._datasetIndex].data[firstPoint._index];
        var firstPoint1 = activePoints[1];
        var valueExtra = window.myLine.data.datasets[firstPoint1._datasetIndex].data[firstPoint1._index];

        document.getElementById('points-update').value = valuePontos;
        document.getElementById('extra-update').value = valueExtra;
        document.getElementById('date-update').value = label;

        $("#pega-form-update").on("submit", function () {

            $.ajax({
                url: 'http://localhost:3000/burn',
                type: 'PUT', //POST GET DELETE PUT
                async: true,
                data: $(this).serialize(),
                success: function (resposta) {
                    console.log(resposta);

                },
                error: function (error) {
                    //Tratar Erro
                }
            });

        });


    };


    $('#pega-form').on('submit', function () {
        var form = this;

        $.ajax({
            url: 'http://localhost:3000/burn',
            type: 'POST', //POST GET DELETE PUT
            async: true,
            data: $(form).serialize(),
            success: function (resposta) {


            },
            error: function (error) {
                //Tratar Erro
            }
        });
    });




});







