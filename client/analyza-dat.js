import $ from "jquery";
import { getOkData } from "./lib/api";
import { renderChart } from "./lib/graf";
import { createNewChart } from "./lib/graf";
import { getRandomColor } from "./lib/utils";

$("#databaza-container").hide();
$("#databaza-loading").show();
$("#databaza-no-data").hide();

let data = null;

window.getSelected = () => {
  const filenamesstring = $('#vkladanie').find(".btn.dropdown-toggle.btn-light").attr("title");
  return filenamesstring.split(", ");
}

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
    $('#vkladanie-conainer').append($('.addingButtons'))

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

  };

  $("#co_co2").on("click", event => {
    $('#chart-canvas').removeClass('d-none')

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
          resultValue = 100
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
          sumCOCO2current = 100
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
      // Počítanie hodnôt CO + CO2

      var klzavyPriemer = [];
      let gradient = [];
      let n = 10;

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
          sumCOCO2current = 100
        }

        let array = [];

        let resultValue = (Number(sumCOCO2current) - Number(sumCO2previous));
        gradient.push(resultValue);
        console.log(resultValue)

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