(function ($) {
  'use strict';

  $ = $ && $.hasOwnProperty('default') ? $['default'] : $;

  async function getOkData() {
    return fetch("/api/okdata")
      .then(res => res.json())
      .catch(err => console.error(err));
  }

  // export function renderTable(fileId) {
  //   $("")
  // }

  function getRandomColor() {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  function defaultSettings(){
    Chart.defaults.global.defaultFontFamily = "Georgia";
    Chart.defaults.global.defaultFontSize = 18;
    Chart.defaults.global.defaultFontColor = "black";
    Chart.defaults.global.defaultFontStyle = "normal";
    Chart.defaults.global.responsive = true;
  }

  function createNewChart(element, text, yAxesLabel, xAxesLabel){
    defaultSettings();
    return new Chart(element, {
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

  function renderChart(chartModel, chart) {
    chart.options.scales.xAxes[0].scaleLabel.display = true;
    chart.options.scales.yAxes[0].scaleLabel.display = true;
    chart.options.pan.enabled = true;
    chart.options.zoom.enabled = true;
    chart.options.legend.display = true;
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
        borderColor: chartModel[col].borderColor,
        borderWidth: 1,
      });

      if (maxLength < chartModel[col].data.length) maxLength = chartModel[col].data.length;
    }

    for (let i = 0; i < maxLength; i++) {
      chart.data.labels.push(i);
    }

    chart.update();
  }

  $("#databaza-container").hide();
  $("#databaza-loading").show();
  $("#databaza-no-data").hide();

  let data = null;

  window.getSelected = () => {
    const filenamesstring = $('#vkladanie').find(".btn.dropdown-toggle.btn-light").attr("title");
    return filenamesstring.split(", ");
  };

  async function setup() {
    const loadedData = await getOkData();
    data = loadedData.data;

    console.log("loadedData", loadedData);

    $('#loading').hide();
    $('.action-button').removeClass("d-none");
    $('#vkladanie').removeClass("d-none");
    $('#input-krok').addClass("d-none");

    $('#vkladanie').find(".selectpicker").empty();

    if (loadedData && loadedData.data && loadedData.data.length > 0) {
      // Pridanie súborov do dropdownu
      const files = loadedData.data;
      for (let i = 0; i < files.length; i++) {
        // console.log("ADDING: ", i);
        const option = "<option>" + files[i].name + "</option>";
        $('#vkladanie').find(".selectpicker").append(option);
      }

      let newVkladanie = $('#vkladanie').clone();
      newVkladanie.find(".selectpicker").selectpicker();
      newVkladanie
        .find("button[role='button']")
        .last()
        .remove();
      $("#vkladanie-container").empty();
      $("#vkladanie-container").append(newVkladanie);
      $('#vkladanie-conainer').append($('.addingButtons'));

      window.loadedData = loadedData.data.reduce((result, file) => {
        let dataObject = {};
        for (let i = 0; i < Object.values(file.data).length; i++) {
          let row = file.data[i]; // Uloženie jedného riadku do premennej row, riadok má tvar objektu
          for (let key in row) {
            if (!dataObject[key]) {
              dataObject[key] = [];
            }
            dataObject[key].push(parseFloat(row[key]));
          }
        }
        result[file.name] = dataObject;
        return result;
      }, {});

    }
    $("#co_co2").on("click", event => {
      $('#chart-canvas').removeClass('d-none');

      let selected = getSelected();
      const chartModel = [];

      // Prechádzanie vľetkých vybratých súborov
      for (let i = 0; i < selected.length; i++) {
        // Počítanie hodnôt CO + CO2
        let COPlusCO2 = [];

        for (let j = 0; j < Object.keys(window.loadedData[selected[i]]['k4_co']).length; j++) {

          const valueCO = window.loadedData[selected[i]]['k4_co'][j];
          const valueCO2 = window.loadedData[selected[i]]['k4_co2'][j];

          if (valueCO < 0) {
            valueCO = 0;
          }
          if (valueCO2 < 0) {
            valueCO2 = 0;
          }
          if (valueCO > 100) {
            valueCO = 100;
          }
          if (valueCO2 > 100) {
            valueCO2 = 100;
          }

          let resultValue = Number(valueCO) + Number(valueCO2);

          if (resultValue > 100) {
            resultValue = 100;
          }
          COPlusCO2.push(resultValue);
        }

        // Pridávanie hodnôt do modelu
        chartModel.push({
          data: COPlusCO2,
          label: selected[i] + "_" + "CO + CO2",
          backgroundColor: getRandomColor(),
        });
      }

      var myChartCOCO2 = document.getElementById("myChartCOCO2").getContext("2d");

      const chart = createNewChart(myChartCOCO2, 'Analýza technologických dát o procese skujňovania',
        'Koncentrácia (%)', 'Čas (s)');
      renderChart(chartModel, chart);

      console.log('render done');
    });

    $("#gradient").on("click", event => {
      console.log('gradient');
      $('#chart-canvas-2').removeClass("d-none");

      let selected = getSelected();
      const chartModel = [];

      // Prechádzanie vľetkých vybratých súborov
      for (let i = 0; i < selected.length; i++) {
        // Počítanie hodnôt CO + CO2
        let gradient = [];

        for (let j = 0; j < Object.keys(window.loadedData[selected[i]]['k4_co']).length; j++) {

          const valueCOcurrent = window.loadedData[selected[i]]['k4_co'][j];
          const valueCO2current = window.loadedData[selected[i]]['k4_co2'][j];

          const valueCOprevious = window.loadedData[selected[i]]['k4_co'][j - 1];
          const valueCO2previous = window.loadedData[selected[i]]['k4_co2'][j - 1];

          let sumCOCO2current = (Number(valueCOcurrent) + Number(valueCO2current));
          let sumCO2previous = (Number(valueCOprevious) + Number(valueCO2previous));

          if (valueCOcurrent < 0) {
            valueCOcurrent = 0;
          }
          if (valueCO2current < 0) {
            valueCO2current = 0;
          }
          if (valueCOcurrent > 100) {
            valueCOcurrent = 100;
          }
          if (valueCO2current > 100) {
            valueCO2current = 100;
          }
          if (sumCOCO2current > 100) {
            sumCOCO2current = 100;
          }

          let resultValue = (Number(sumCOCO2current) - Number(sumCO2previous));

          gradient.push(resultValue);
        }

        // Pridávanie hodnôt do modelu
        chartModel.push({
          data: gradient,
          label: selected[i],
          backgroundColor: getRandomColor(),
        });
      }

      var myChartGradient = document.getElementById("myChartGradient").getContext("2d");

      const chart = createNewChart(myChartGradient, 'Analýza technologických dát o procese skujňovania',
        'Koncentrácia (%/s)', 'Čas (s)');
      renderChart(chartModel, chart);

      console.log('render done');

    });

    $("#klzavy-priemer").on("click", event => {
      console.log('klzavy priemer');
      $('#chart-canvas-3').removeClass("d-none");

      var txt;
      var krok = prompt("Zadajte krok pre kĺzavý priemer:", "0");
      if (krok == 0 || krok == "") {
        txt = "Nezdali ste krok.";
      } else {
        txt = "Zadali ste krok: " + krok;
      }
      document.getElementById("input-krok").innerHTML = txt;

      $('#input-krok').removeClass("d-none");

      let selected = getSelected();
      // var klzavyPriemer = [];
      const chartModel = [];

      // Prechádzanie vľetkých vybratých súborov
      for (let i = 0; i < selected.length; i++) {
        let gradient = [];

        for (let j = 0; j < Object.keys(window.loadedData[selected[i]]['k4_co']).length; j++) {

          const valueCOcurrent = window.loadedData[selected[i]]['k4_co'][j];
          const valueCO2current = window.loadedData[selected[i]]['k4_co2'][j];

          const valueCOprevious = window.loadedData[selected[i]]['k4_co'][j - 1];
          const valueCO2previous = window.loadedData[selected[i]]['k4_co2'][j - 1];

          let sumCOCO2current = (Number(valueCOcurrent) + Number(valueCO2current));
          let sumCO2previous = (Number(valueCOprevious) + Number(valueCO2previous));

          if (valueCOcurrent < 0) {
            valueCOcurrent = 0;
          }
          if (valueCO2current < 0) {
            valueCO2current = 0;
          }
          if (valueCOcurrent > 100) {
            valueCOcurrent = 100;
          }
          if (valueCO2current > 100) {
            valueCO2current = 100;
          }
          if (sumCOCO2current > 100) {
            sumCOCO2current = 100;
          }

          let resultValue = (Number(sumCOCO2current) - Number(sumCO2previous));
          gradient.push(resultValue);
          console.log(resultValue);

          // klzavyPriemer = gradient / n;
          // array.push(klzavy_priemer);

          // sum = array.reduce((a, b) => a + b, 0);


        }

        // Pridávanie hodnôt do modelu
        chartModel.push({
          data: gradient,
          label: selected[i],
          backgroundColor: getRandomColor(),
        });
      }

      var myChartPriemer = document.getElementById("myChartPriemer").getContext("2d");

      const chart = createNewChart(myChartPriemer, 'Analýza technologických dát o procese skujňovania',
        'Koncentrácia (%/s)', 'Čas (s)');
      renderChart(chartModel, chart);

      console.log('render done');

    });

  }

  setup();

}($));
