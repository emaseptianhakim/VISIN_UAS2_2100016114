google.charts.load('current', { packages: ['corechart'] });
google.charts.setOnLoadCallback(getSpreadsheetData);

function getSpreadsheetData() {
    var spreadsheetId = '1PCHgmhgOmNiS6Q1dv-i7K8_0Pjos1vvtMMtLoq7j1nI';
    var range = 'Kematian Berdasarkan Tahun dan Tipe!A6:D29';

    var query = new google.visualization.Query('https://docs.google.com/spreadsheets/d/' + spreadsheetId + '/gviz/tq?gid=0&range=' + range);
    query.send(handleQueryResponse);
}

function handleQueryResponse(response) {
    if (response.isError()) {
        console.error('Error: ' + response.getMessage());
        return;
    }

    var data = response.getDataTable();
    drawCharts(data);
}

function drawCharts(data) {
    var formatter = new google.visualization.NumberFormat({ pattern: '0' });
    formatter.format(data, 1);

    var options = {
        title: 'Jumlah Kematian di Indonesia Berdasarkan Tahun dan Tipe',
        width: 1500,
        height: 700,
        hAxis: { title: 'Tahun', titleTextStyle: { color: '#333', fontSize: 14 } },
        vAxis: { title: 'Jumlah Kematian', titleTextStyle: { color: '#333', fontSize: 14 } },
        colors: ['#ff0000', '#0583F2', '#000000', '#FFFF00'],
        chartArea: { width: '80%', height: '70%' },
        backgroundColor: { fill: '#f9f9f9', fillOpacity: 0.8 },
        legend: { textStyle: { color: '#555', fontSize: 12 } },
        titleTextStyle: { color: '#333', fontSize: 18, bold: true },
        isStacked: true,
        series: {
            0: { areaOpacity: 0.6 },
            1: { areaOpacity: 0.6 },
            2: { areaOpacity: 0.6 },
            3: { areaOpacity: 0.6 }
        },
        animation: {
            duration: 1000,
            startup: true,
            easing: 'out'
        },
        tooltip: { textStyle: { fontSize: 12 } }
    };

    var chart1 = new google.visualization.AreaChart(document.getElementById('chart1'));
    chart1.draw(data, options);
}