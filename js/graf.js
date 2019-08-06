function myPage(){

	registerUploadFile();

$('#save-btn').click(function(){
	$('#myChart').get(0).toBlob(function(blob){
        var subor = $('input[name="subor"]').val();
		saveAs(blob, subor + ".png")
	});
});

$('input[type="file"]').change(function(e){
    var fileName = e.target.files[0].name;
    alert('Bol vybratý "' + fileName +  '" súbor.');
});


// Global option
Chart.defaults.global.defaultFontFamily = 'Georgia';
Chart.defaults.global.defaultFontSize = 18 ;
Chart.defaults.global.defaultFontColor = 'black';
Chart.defaults.global.defaultFontStyle = 'normal';
Chart.defaults.global.responsive = true;

var ctx = document.getElementById('myChart').getContext('2d');
window.chart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{}],
    },
options: {
        responsive: true,
        title: {
            display: false,
            text: 'Analýza technologických dát o procese skujňovania',
            fontSize: 25,
            fontColor: 'blue',
            fontStyle: 'bold',
            padding: 5
        },

        legend:{
            position: 'top',
            display: false,
            fontStyle: 'bold',
        },

        layout: {
            padding: {
                left: 20,
                top: 20,
                left: 0,
                bottom: 0
            }
        },

        scales: {
            yAxes: [{
                gridLines: {
                    display: true,
                    color: 'black',
                    borderDash: [2]
                },
                ticks:{
                    beginAtZero: true,

                },
                scaleLabel: {
                    display: true,
                    labelString: 'Hodnoty',
                    fontColor: 'black'
                },

            }],
            xAxes: [{
                gridLines: {
                    display: true,
                    color: 'black',
                    borderDash: [2]
                },
                scaleLabel: {
                    display: true,
                    labelString: 'Čas(s)',
                    fontColor: 'black'
                },

            }]
        },
        pan: {
          enabled: true,
          mode: 'xy'
      },

      zoom: {
          enabled: true,
          mode: 'xy',
      }
    }
});
}
