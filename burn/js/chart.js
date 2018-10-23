//modal
const   REMANING_DATASET = 0,
        EXTRA_DATASET = 1,
        BUGS_DATASET = 2,
        IMPROVEMENTS_DATASET = 3;



function removeItemsOnSameDate(date, dataset) {
    var itemPosition = mySpecialChart.data.labels.indexOf(date);
    if(itemPosition >= 0) mySpecialChart.data.datasets[dataset].data.splice(itemPosition, 1);
}

function insertItemOnDataset(item, dataset) {
    var dataset = mySpecialChart.data.datasets[dataset];
    dataset.data.push(item);
}

function insertLabelIfNotExists(date) {
    if(mySpecialChart.data.labels.indexOf(date) < 0) mySpecialChart.data.labels.push(date);
}

function updateChart(total, date, type) {
    insertLabelIfNotExists(date);
    removeItemsOnSameDate(date, type);
    insertItemOnDataset(total, type);
}


function updateOnDatabase(total, date, dataset) {
    //TODO Requisição para o banco
}
/*
var enviar = addEventListener('click', function(event){
                
    var pega = document.querySelector('#pega-form');
    var points = pega.points.value;
    console.log(points);

});
*/




   
  //   if (pontos) updateChart(pontos, date, REMANING_DATASET);
    // if (extras) updateChart(extras, date, EXTRA_DATASET);


  //mySpecialChart.update();
    
    



// });

function createDataset(color, name) {
    return {
        label: name,
        backgroundColor: color,
        borderColor: color,
        data: [],
        fill: false,
    }
}




//chart
var mySpecialChart = null;

var config = {
    type: 'line',
    data: {
        labels: [],
        datasets: [
            createDataset(window.chartColors.red, 'Points'),
            createDataset(window.chartColors.blue, 'Extra Tasks'),
            createDataset(window.chartColors.black, 'metrica'),

        ]

        
    },


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
};






window.onload = function () {

    var ctx = document.getElementById('canvas').getContext('2d');
    mySpecialChart = new Chart(ctx, config);
    window.myLine = mySpecialChart;
};




/*
document.getElementById('randomizeData').addEventListener('click', function () {
    config.data.datasets.forEach(function (dataset) {
        dataset.data = dataset.data.map(function () {
            return randomScalingFactor();
        });

    });

    window.myLine.update();
});
*/
/*
var colorNames = Object.keys(window.chartColors);
document.getElementById('addDataset').addEventListener('click', function () {
    var colorName = colorNames[config.data.datasets.length % colorNames.length];
    var newColor = window.chartColors[colorName];
    var newDataset = {
        label: 'Dataset ' + config.data.datasets.length,
        backgroundColor: newColor,
        borderColor: newColor,
        data: [],
        fill: false
    };

    for (var index = 0; index < config.data.labels.length; ++index) {
        newDataset.data.push(randomScalingFactor());
    }

    config.data.datasets.push(newDataset);
    window.myLine.update();
});




document.getElementById('addData').addEventListener('click', function () {
    if (config.data.datasets.length > 0) {
        var month = MONTHS[config.data.labels.length % MONTHS.length];
        config.data.labels.push(month);

        config.data.datasets.forEach(function (dataset) {
            dataset.data.push(randomScalingFactor());
        });

        window.myLine.update();
    }
});

/*
document.getElementById('removeDataset').addEventListener('click', function () {
    config.data.datasets.splice(0, 1);
    window.myLine.update();
});

document.getElementById('removeData').addEventListener('click', function () {
    config.data.labels.splice(-1, 1); // remove the label first

    config.data.datasets.forEach(function (dataset) {
        dataset.data.pop();
    });

    window.myLine.update();
});

*/
