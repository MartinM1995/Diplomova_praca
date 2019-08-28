import $ from "jquery";
import { getRandomColor } from "./utils";

export function initMainGraf(loadedData) {
  window.chartModel = {};
  window.uploadedData = {};

  $("#save-btn").click(function() {
    $("#myChart")
      .get(0)
      .toBlob(function(blob) {
        var subor = $('input[name="subor"]').val();
        saveAs(blob, subor + ".png");
      });
  });

  // Global option
  Chart.defaults.global.defaultFontFamily = "Georgia";
  Chart.defaults.global.defaultFontSize = 18;
  Chart.defaults.global.defaultFontColor = "black";
  Chart.defaults.global.defaultFontStyle = "normal";
  Chart.defaults.global.responsive = true;

  var ctx = document.getElementById("myChart").getContext("2d");
  window.chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: [],
      datasets: [],
    },
    options: {
      responsive: true,
      title: {
        display: false,
        text: "Analýza technologických dát o procese skujňovania",
        fontSize: 25,
        fontColor: "blue",
        fontStyle: "bold",
        padding: 5,
      },

      legend: {
        position: "top",
        display: true,
        fontStyle: "bold",
      },

      layout: {
        padding: {
          left: 20,
          top: 20,
          left: 0,
          bottom: 0,
        },
      },

      scales: {
        yAxes: [
          {
            gridLines: {
              display: true,
              color: "black",
              borderDash: [2],
            },
            ticks: {
              beginAtZero: true,
            },
            scaleLabel: {
              display: true,
              labelString: "Hodnoty",
              fontColor: "black",
            },
          },
        ],
        xAxes: [
          {
            gridLines: {
              display: true,
              color: "black",
              borderDash: [2],
            },
            scaleLabel: {
              display: true,
              labelString: "Čas (s)",
              fontColor: "black",
            },
            ticks: {
              beginAtZero: true,
              min: 0
            },
          },
        ],
      },
      pan: {
        enabled: true,
        mode: "xy",
      },

      zoom: {
        enabled: true,
        mode: "xy",
      },
    },
  });
}

export function initDataManagementGraf(loadedData) {
  window.chartModel = {};
  window.uploadedData = {};

  // Global option
  Chart.defaults.global.defaultFontFamily = "Georgia";
  Chart.defaults.global.defaultFontSize = 18;
  Chart.defaults.global.defaultFontColor = "black";
  Chart.defaults.global.defaultFontStyle = "normal";
  Chart.defaults.global.responsive = true;

  var ctx = document.getElementById("myChart").getContext("2d");
  window.chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: [],
      datasets: [],
    },
    options: {
      responsive: true,
      title: {
        display: false,
        text: "Analýza technologických dát o procese skujňovania",
        fontSize: 25,
        fontColor: "blue",
        fontStyle: "bold",
        padding: 5,
      },

      legend: {
        position: "top",
        display: true,
        fontStyle: "bold",
      },

      layout: {
        padding: {
          left: 20,
          top: 20,
          left: 0,
          bottom: 0,
        },
      },

      scales: {
        yAxes: [
          {
            gridLines: {
              display: true,
              color: "black",
              borderDash: [2],
            },
            ticks: {
              beginAtZero: true,
            },
            scaleLabel: {
              display: true,
              labelString: "Koncentrácia (%)",
              fontColor: "black",
            },
          },
        ],
        xAxes: [
          {
            gridLines: {
              display: true,
              color: "black",
              borderDash: [2],
            },
            scaleLabel: {
              display: true,
              labelString: "Čas (s)",
              fontColor: "black",
            },
            ticks: {
              beginAtZero: true,
              min: 0,
            },
          },
        ],
      },
      pan: {
        enabled: true,
        mode: "xy",
      },

      zoom: {
        enabled: true,
        mode: "xy",
      },
    },
  });

  if (loadedData) {
   const data = [];
    for (let i = 0; i < Object.keys(loadedData.data).length; i++) {
      if (loadedData.data[i]["k4_co"] < 0) {
        loadedData.data[i]["k4_co"]  = 0;
      }
      if (loadedData.data[i]["k4_co2"] < 0) {
        loadedData.data[i]["k4_co"]  = 0;
      }
      if (loadedData.data[i]["k4_co"] > 100) {
        loadedData.data[i]["k4_co"]  = 100;
      }
      if (loadedData.data[i]["k4_co2"] > 100) {
        loadedData.data[i]["k4_co"]  = 100;
      }

      data[i] = Number(loadedData.data[i]["k4_co"]) + Number(loadedData.data[i]["k4_co2"])

      if (data[i] > 100) {
        data[i] = 100
      }
    }
    renderCOCO2Chart(data);
  }
}

export function renderCOCO2Chart(data) {
  window.chart.options.legend.display = true;
  window.chart.options.title.display = true;
  window.chart.data.datasets = [];
  window.chart.data.labels = [];

  window.chart.data.datasets.push({
    data,
    label: "k4_co + k4_co2",
    fill: false,
    backgroundColor: getRandomColor(),
    borderColor: "transparent",
    borderWidth: 1,
  });

  // TODO: prist na to, ako vybrat nie len labels ale aj data
  for (let i = 0; i < data.length; i++) {
    window.chart.data.labels.push(i);
  }

  window.chart.update();
}

export function renderChart(chartModel) {
  window.chart.options.legend.display = true;
  window.chart.options.title.display = true;
  window.chart.data.datasets = [];
  window.chart.data.labels = [];

  let maxLength = 0;

  for (let col in chartModel) {
    window.chart.data.datasets.push({
      data: chartModel[col].data,
      label: chartModel[col].label,
      fill: false,
      backgroundColor: getRandomColor(),
      borderColor: chartModel[col].borderColor,
      borderWidth: 1,
    });

    if (maxLength < chartModel[col].data.length) maxLength = chartModel[col].data.length;
  }

  for (let i = 0; i < maxLength; i++) {
    window.chart.data.labels.push(i);
  }

  window.chart.update();
}
