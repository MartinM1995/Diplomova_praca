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
      const select = $("#select-file");
      select.on("change", e => {
        fileId = e.target.value;
        const data = db.data.find(d => d._id === fileId);
        console.log(data);
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

  function initDataManagementGraf(loadedData) {
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
                labelString: "Čas(s)",
                fontColor: "black",
              },
              ticks: {
                beginAtZero: true,
                min: 0,
                stepSize: 50,
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

    console.log(loadedData);

    if (loadedData) {
      const data = [];
      for (let i = 0; i < Object.keys(loadedData.data).length; i++) {
        data[i] = Number(loadedData.data[i]["k4_co"]) + Number(loadedData.data[i]["k4_co2"]);
      }

      renderCOCO2Chart(data);
    }
  }


  function renderCOCO2Chart(data) {
    window.chart.options.legend.display = true;
    window.chart.options.title.display = true;
    window.chart.data.datasets = [];
    window.chart.data.labels = [];

    window.chart.data.datasets.push({
      data,
      label: "k4_co + k4_co2",
      fill: false,
      backgroundColor: "transparent",
      borderColor: getRandomColor(),
      borderWidth: 1,
    });

    // TODO: prist na to, ako vybrat nie len labels ale aj data
    for (let i = 0; i < data.length; i++) {
      window.chart.data.labels.push(i);
    }
    // window.chart.data.labels = [0];
    // let count = 0;
    // while (count < maxLength) {
    //   if (count % 25) {
    //     window.chart.data.labels.push(window.chart.data.labels[i] + 25)
    // }
    // for (let i = 0; i < maxLength; i++) {
    //   window.chart.data.labels.push(window.chart.data.labels[i] + 25)
    // }

    window.chart.options.scales = {
      xAxes: [
        {
          gridLines: {
            display: true,
            color: "black",
            borderDash: [2],
          },
          scaleLabel: {
            display: true,
            labelString: "Čas(s)",
            fontColor: "black",
          },
          ticks: {
            beginAtZero: true,
            userCallback: function(item, index) {
              if (!(index % 0.5)) return item;
            },
            min: 0,
            // max: 500,
            stepSize: 50,
          },
        },
      ],
    };

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
      initDataManagementGraf(data);
      document.getElementById("file-status").innerHTML = `Status: ${data.status}`;
    });

    $("#vyhovuje").on("click", event => {
      if (data) {
        fetch(`/api/set-status/${data._id}`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: "Vyhovujúci",
          }),
        })
          .then(async res => {
            const response = await res.json();
            document.getElementById("file-status").innerHTML = `Status: ${response.data.status}`;
            alert("Status súboru bol nastavený na vyhovujúci.");
          })
          .catch(err => {
            console.error(err);
            alert("Nastal problem s komunikáciou s databázou.");
          });
      }
    });

    $("#nevyhovuje").on("click", event => {
      if (data) {
        fetch(`/api/set-status/${data._id}`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: "Nevyhovujúci",
          }),
        })
          .then(async res => {
            const response = await res.json();
            document.getElementById("file-status").innerHTML = `Status: ${response.data.status}`;
            alert("Status súboru bol nastavený na nevyhovujúci.");
          })
          .catch(err => {
            console.error(err);
            alert("Nastal problem s komunikáciou s databázou.");
          });
      }
    });

    initDataManagementGraf(data);
  }

  setup();

}($));
