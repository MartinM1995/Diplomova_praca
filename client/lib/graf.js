import $ from "jquery";
import { getRandomColor } from "./utils";

export function initMainGraf(loadedData) {
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
              display: false,
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
              display: false,
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

export function initGradientChart(loadedData) {
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
              display: false,
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
    let history = 0;

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

      if (i === 0) {
        history = (Number(loadedData.data[i]["k4_co"]) + Number(loadedData.data[i]["k4_co2"]));
        data[i] = history;
      }
      else {
        var current_value = (Number(loadedData.data[i]["k4_co"]) + Number(loadedData.data[i]["k4_co2"]));
        data[i] = current_value - history;
        history = current_value;
      }

      if (data[i] > 100) {
        data[i] = 100
      }
    }
    renderGradientChart(data);
  }
}

export function renderCOCO2Chart(data) {
  window.chart.options.scales.xAxes[0].scaleLabel.display = true;
  window.chart.options.scales.yAxes[0].scaleLabel.display = true;
  window.chart.options.pan.enabled = true;
  window.chart.options.zoom.enabled = true;
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

export function renderGradientChart(data) {
  window.chart.options.scales.xAxes[0].scaleLabel.display = true;
  window.chart.options.scales.yAxes[0].scaleLabel.display = true;
  window.chart.options.pan.enabled = true;
  window.chart.options.zoom.enabled = true;
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
  window.chart.options.scales.xAxes[0].scaleLabel.display = true;
  window.chart.options.scales.yAxes[0].scaleLabel.display = true;
  window.chart.options.pan.enabled = true;
  window.chart.options.zoom.enabled = true;
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
      backgroundColor: chartModel[col].backgroundColor,
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
