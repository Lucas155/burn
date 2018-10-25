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
                dias.push(valores.data);
            });
            console.log(pontos, extras, dias);

            var config = {
                type: 'line',
                data: {
                    labels: dias,
                    datasets: [
                        createDataset(window.chartColors.red, 'Points', pontos, dias),
                        createDataset(window.chartColors.blue, 'Extra Tasks', extras, dias),
                        //createDataset(window.chartColors.black, 'metrica',[20,0] ),

                    ]


                },

/*
                options: {
                    responsive: true,
                    title: {
                        display: true,
                        text: 'Burndown'
                    },
                    tooltips: {
                        mode: 'index',
                        intersect: false,
                    },
                    hover: {
                        mode: 'nearest',
                        intersect: true
                    },
                    scales: {
                        xAxes: [{
                            display: true,
                            scaleLabel: {
                                display: true,
                                labelString: 'Month'
                            }
                        }],
                        yAxes: [{
                            display: true,
                            scaleLabel: {
                                display: true,
                                labelString: 'Value'
                            }
                        }]
                    }
                }

                */
            };


            var ctx = document.getElementById('canvas').getContext('2d');
            mySpecialChart = new Chart(ctx, config);
            window.myLine = mySpecialChart;


        },
        error: function (error) {
            //Tratar Erro
        }
    });



    $('#pega-form').on('submit', function () {
        var form = this;
        console.log(form);
        $.ajax({
            url: 'http://localhost:3000/burn',
            type: 'POST', //POST GET DELETE PUT
            async: true,
            data: $(form).serialize(),
            success: function (resposta) {
                console.log(resposta);

            },
            error: function (error) {
                //Tratar Erro
            }
        });
    });



});