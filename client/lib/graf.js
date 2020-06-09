import $ from "jquery";
import { getRandomColor } from "./utils";

function defaultSettings() {
  Chart.defaults.global.defaultFontFamily = "Georgia";
  Chart.defaults.global.defaultFontSize = 18;
  Chart.defaults.global.defaultFontColor = "black";
  Chart.defaults.global.defaultFontStyle = "normal";
  Chart.defaults.global.responsive = true;
}

function chartOptions() {
  window.chart.options.scales.xAxes[0].scaleLabel.display = true;
  window.chart.options.scales.yAxes[0].scaleLabel.display = true;
  window.chart.options.pan.enabled = true;
  window.chart.options.zoom.enabled = true;
  window.chart.options.legend.display = true;
  // window.chart.options.title.display = false;
  window.chart.data.datasets = [];
  window.chart.data.labels = [];
}

export function initMainGraf(loadedData) {

  var lang = localStorage.getItem('lang');

  window.chartModel = {};
  window.uploadedData = {};

  $("#save-btn").click(function () {
    $("#myChart")
      .get(0)
      .toBlob(function (blob) {
        var subor = $('input[name="subor"]').val();
        saveAs(blob, subor + ".png");
      });
  });

  var yAxesText = null;
  var xAxesText = null;

  if (lang === 'sk') {
    yAxesText = "Hodnoty"
    xAxesText = "Čas (s)"
  } else {
    yAxesText = "Values"
    xAxesText = "Time (s)"
  }

  // Global option
  defaultSettings();

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
        text: "",
        fontSize: 25,
        fontColor: "blue",
        fontStyle: "bold",
        padding: 5,
      },

      legend: {
        position: "top",
        display: false,
        fontStyle: "bold",
      },

      layout: {
        padding: {
          left: 20,
          top: 20,
          right: 0,
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
              display: false,
              labelString: yAxesText,
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
              display: false,
              labelString: xAxesText,
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
        enabled: false,
        mode: "xy",
      },

      zoom: {
        enabled: false,
        mode: "xy",
      },
    },
  });
}

export function createNewChart(element, text, yAxesLabel, xAxesLabel) {

  const defaultElementChart = element.cloneNode();
  const chartContainer = element.parentElement;
  chartContainer.removeChild(element);
  chartContainer.appendChild(defaultElementChart);

  defaultSettings();

  let targetElement = defaultElementChart.getContext("2d");
  return new Chart(targetElement, {
    type: "line",
    data: {
      labels: [],
      datasets: [],
    },
    options: {
      responsive: true,
      title: {
        display: false,
        text: text,
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
          right: 20,
          bottom: 20,
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
              display: false,
              labelString: yAxesLabel,
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
              display: false,
              labelString: xAxesLabel,
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
        enabled: false,
        mode: "xy",
      },

      zoom: {
        enabled: false,
        mode: "xy",
      },
    },
  });
}

export function initCOCO2Chart(loadedData) {

  var lang = localStorage.getItem('lang');
  var yAxesText = null;
  var xAxesText = null;

  if (lang === 'sk') {
    yAxesText = "Koncentrácia (%)"
  } else {
    yAxesText = "Concentration (%)"
  }

  if (lang === 'sk') {
    xAxesText = "Čas (s)"
  } else {
    xAxesText = "Time (s)"
  }

  window.chartModel = {};
  window.uploadedData = {};

  if (window.chart) {
    window.chart.destroy()
  }
  // Global option
  defaultSettings();

  const ctx = document.getElementById("myChartCOCO2").getContext("2d");
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
          right: 20,
          bottom: 20,
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
              display: false,
              labelString: yAxesText,
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
              display: false,
              labelString: xAxesText,
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
        enabled: false,
        mode: "xy",
      },

      zoom: {
        enabled: false,
        mode: "xy",
      },
    },
  });

  if (loadedData) {
    const data = [];
    for (let i = 0; i < Object.keys(loadedData.data).length; i++) {
      if (loadedData.data[i]["k4_co"] < 0) {
        loadedData.data[i]["k4_co"] = 0;
      }
      if (loadedData.data[i]["k4_co2"] < 0) {
        loadedData.data[i]["k4_co"] = 0;
      }
      if (loadedData.data[i]["k4_co"] > 100) {
        loadedData.data[i]["k4_co"] = 100;
      }
      if (loadedData.data[i]["k4_co2"] > 100) {
        loadedData.data[i]["k4_co"] = 100;
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

  chartOptions();

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

export function renderChart(chartModel, chart, displayLegend) {
  chart.options.scales.xAxes[0].scaleLabel.display = true;
  chart.options.scales.yAxes[0].scaleLabel.display = true;
  chart.options.pan.enabled = true;
  chart.options.zoom.enabled = true;
  chart.options.legend.display = displayLegend || true;
  chart.options.title.display = true;
  chart.data.datasets = [];
  chart.data.labels = [];

  let maxLength = 0;

  for (let col in chartModel) {
    chart.data.datasets.push({
      data: chartModel[col].data,
      label: chartModel[col].label,
      fill: false,
      backgroundColor: chartModel[col].backgroundColor,
      borderColor: chartModel[col].backgroundColor,
      pointBackgroundColor: "transparent",
      pointBorderColor: "transparent",
      borderWidth: 3,
    });

    if (maxLength < chartModel[col].data.length) {
      maxLength = chartModel[col].data.length;
    }
  }

  for (let i = 0; i < maxLength; i++) {
    chart.data.labels.push(i);
  }

  chart.update();
}
