(function ($) {
  'use strict';

  $ = $ && $.hasOwnProperty('default') ? $['default'] : $;

  async function getData() {
    return fetch("/api/data")
      .then(res => res.json())
      .catch(err => console.error(err));
  }

  // export function renderTable(fileId) {
  //   $("")
  // }

  let fileId = null;
  let db = null;

  async function loadData() {
    db = await getData();
    if (db && db.data && db.data.length > 0) {
      $("#databaza-container").show();
      $("#databaza-loading").hide();
      $("#databaza-no-data").hide();
      $('#select-file').removeClass("d-none");
      const select = $("#select-file");
      select.on("change", e => {
        fileId = e.target.value;
        const data = db.data.find(d => d._id === fileId);
        console.log("Data:", data);
        renderTable(data);
      });
      db.data.forEach(data => {
        console.log(data._id);
        const option = `<option value=${data._id}>${data.name}</option>`;

        select.append(option);
      });
      select.selectpicker();
    } else {
      $("#databaza-container").hide();
      $("#databaza-loading").hide();
      $("#databaza-no-data").show();
    }
    return db;
  }

  async function renderTable(data) {
    if (data && data._id) {
      $("#tabulka").show();
      const tbody = $("#tabulka > tbody");

      Object.values(data.data).forEach(row => {
        const html = `
        <tr>
          ${Object.values(row).map(val => `<td>${val}</td>`)}
        </tr>
      `;
        tbody.append(html);
      });
    } else {
      $("#tabulka").hide();
      return false;
    }
  }

  function getRandomColor() {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  function initGradientChart(loadedData) {
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
          data[i] = 100;
        }
      }
      renderGradientChart(data);
    }
  }

  function renderGradientChart(data) {
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

  $("#databaza-container").hide();
  $("#databaza-loading").show();
  $("#databaza-no-data").hide();

  let data = null;

  async function setup() {
    const loadedData = await loadData();

    $("#select-file").on("change", event => {
      const id = event.target.value;
      data = loadedData.data.find(d => d._id === id);
      $('#file-status').removeClass("d-none");
      $('#gradient').removeClass("d-none");
      $('#klzavy-priemer').removeClass("d-none");
      document.getElementById("file-status").innerHTML = `Status: ${data.status}`;

      $('#vkladanie').removeClass("d-none");
      // $('#save-chart').removeClass("d-none");
      // $('#work-with-data').removeClass("d-none");
      $('#vkladanie').find(".selectpicker").empty();

      $("#gradient").on("click", event => {
        $('#chart-canvas').removeClass("d-none");
        initGradientChart(data);
      });

      $("#klzavy-priemer").on("click", event => {

        if (data) {
          // const data = [];
          let history = 0;

          for (let i = 0; i < Object.keys(data.data).length; i++) {
            if (data.data[i]["k4_co"] < 0) {
              data.data[i]["k4_co"] = 0;
            }
            if (data.data[i]["k4_co2"] < 0) {
              data.data[i]["k4_co"] = 0;
            }
            if (data.data[i]["k4_co"] > 100) {
              data.data[i]["k4_co"] = 100;
            }
            if (data.data[i]["k4_co2"] > 100) {
              data.data[i]["k4_co"] = 100;
            }

            if (i === 0) {
              history = (Number(data.data[i]["k4_co"]) + Number(data.data[i]["k4_co2"]));
              data[i] = history;

            }
            else {
              var current_value = (Number(data.data[i]["k4_co"]) + Number(data.data[i]["k4_co2"]));
              data[i] = current_value - history;
              history = current_value;
            }

            if (data[i] > 100) {
              data[i] = 100;
            }
            
            var klzavy_priemer = [];
            klzavy_priemer = data[i] / Object.keys(data.data).length;
            console.log(klzavy_priemer);
            
            var sum = klzavy_priemer.reduce((a, b) => a + b, 0);
          }

          
          // function sum(obj) {
          //   var sum = 0;
          //   for (var el in obj) {
          //     if (obj.hasOwnProperty(el)) {
          //       sum += parseFloat(obj[el]);
          //     }
          //   }
          //   return sum;
          // }
          
          // var sample = klzavy_priemer;
          // console.log(sample)
          // var summed = sum(sample);
          
        }

          document.getElementById("hodnota_priemeru").innerHTML = `${sum}`;

      });
    });

    initGradientChart(data);

  }
  setup();

}($));
