function graf(){

$('#save-btn').click(function(){
	$('#myChart').get(0).toBlob(function(blob){
    var subor = $('input[name="subor"]').val();
		saveAs(blob, subor + ".png")
	});
});

// Global option
Chart.defaults.global.defaultFontFamily = 'Georgia';
Chart.defaults.global.defaultFontSize = 18 ;
Chart.defaults.global.defaultFontColor = 'black';
Chart.defaults.global.defaultFontStyle = 'normal';
Chart.defaults.global.responsive = true;

// Our labels along the x-axis
var years = [1500,1600,1700,1750,1800,1850,1900,1950,1999,2050];
// For drawing the lines
var africa = [86,114,106,106,107,111,133,221,783,2478];
var asia = [282,350,411,502,635,809,947,1402,3700,5267];
var europe = [168,170,178,190,203,276,408,547,675,734];
var latinAmerica = [40,20,10,16,24,38,74,167,508,784];
var northAmerica = [6,3,2,2,7,26,82,172,312,433];

var ctx = document.getElementById("myChart");
var myChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: years,
    datasets: [

      {
        data: africa,
        label: "# Africa",
        backgroundColor: '#3e95cd',
        borderColor: "#3e95cd",
        fill: false,
        hoverBorderWidth: 3,
      	hoverBorderColor: '#3e95cd',
      	pointRadius: 0,

      },
      {
        data: asia,
        label: "# Asia",
        backgroundColor: '#8e5ea2',
        borderColor: "#8e5ea2",
        fill: false,
        hoverBorderWidth: 3,
      	hoverBorderColor: '#8e5ea2',
      	pointRadius: 0
      },
      {
        data: europe,
        label: "# Europe",
        backgroundColor: '#3cba9f',
        borderColor: "#3cba9f",
        fill: false,
        hoverBorderWidth: 3,
      	hoverBorderColor: '#3cba9f',
      	pointRadius: 0
      },
      {
        data: latinAmerica,
        label: "# Latin America",
        backgroundColor: '#e8c3b9',
        borderColor: "#e8c3b9",
        fill: false,
        hoverBorderWidth: 3,
      	hoverBorderColor: '#e8c3b9',
      	pointRadius: 0
      },
      {
        data: northAmerica,
        label: "# North America",
        backgroundColor: '#c45850',
        borderColor: "#c45850",
        fill: false,
		    hoverBorderWidth: 3,
      	hoverBorderColor: '#c45850',
      	pointRadius: 0,
      }
      ]
  },
  	options: {
  		responsive: true,
  		title: {
  			display: true,
  			text: 'What ever',
  			fontSize: 25,
  			fontColor: 'blue',
  			fontStyle: 'bold',
  			padding: 5
  		},
  		legend:{
  			position: 'top',
  			display: true,
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
  					callback: function(value, index, values) {
                        return '$ ' + value;
                    },
  					max: 6000,
  					min: 0,
  					stepSize: 500,

  				},
  				scaleLabel: {
  					display: true,
  					labelString: 'Hodnoty',
  					fontColor: 'green'
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
  					labelString: 'Roky',
  					fontColor: 'green'
  				},

  			}]
  		}
  	}
});
}
/*var ctx = document.getElementById('myChart2').getContext('2d');
var myChart2 = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});
}*/