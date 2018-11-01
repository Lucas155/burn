    var botao = document.querySelector("#button");
    botao.addEventListener("click",function(){
        var titulo = document.querySelector("#pega-form");
        console.log(titulo);
        var sprint = titulo.titulo.value;
        console.log(sprint);
        if(!sprint == ""){
            document.querySelector('#sprint').innerHTML = sprint;
        }else{
        var a = titulo.length;
        var b = a-1;
        document.querySelector('#sprint').innerHTML = titulo[b];
    
        }
        //location.reload();
    
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
    var titulos = '';

    $.ajax({
        url: 'http://localhost:3000/burn',
        type: 'GET', //POST GET DELETE PUT
        //async: true,
        //data: {chave: valor},
        success: function (resposta) {
            $.each(resposta, function (indice, valores) {
                pontos.push(valores.points);
                extras.push(valores.extra_task);
                dias.push(asDate(valores.data));
                titulos=(valores.titulo);
                console.log(titulos);

            });
            /*
            var a = titulo.length;
            var b  = 8;
            var c = b - 1;
            console.log(c);
          console.log(titulo[c]);
          console.log(titulo[titulo.length -1]);
*/
                        

            var config = {
                type: 'line',
                data: {
                    labels: dias,
                    datasets: [
                        createDataset(window.chartColors.red, 'Points', pontos),
                        createDataset(window.chartColors.blue, 'Extra Tasks', extras),
                        //createDataset(window.chartColors.black, 'metrica',[20,0] ),
                    ]

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



    $('#pega-form').on('submit', function () {
        var form = this;
        console.log(form);//console.log(dias);
        //console.log(typeof(dias.length));
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
    var lucas = 72;
    $.ajax({
        url: 'http://localhost:3000/burn/72',
        type: 'PUT',
        
        success: function (resposta) {
            $.each(resposta, function (indice, valores) {
                console.log(resposta);
                pontos.push(valores.points);
                extras.push(valores.extra_task);
                dias.push(asDate(valores.data));
                titulos=(valores.titulo);

            });
        },
       
    });


    
});