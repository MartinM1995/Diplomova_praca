import $ from "jquery";
import { getOkData } from "./lib/api";
import { renderChart } from "./lib/graf";
import { createNewChart } from "./lib/graf";
import { getRandomColor } from "./lib/utils";

$("#databaza-container").hide();
$("#databaza-loading").show();
$("#databaza-no-data").hide();

let data = null;
var lang = localStorage.getItem('lang');

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
  $('#input-krok').addClass("d-none");
  $('#vkladanie').removeClass("d-none");
  $('#vkladanie').find(".selectpicker").empty();

  if (loadedData && loadedData.data && loadedData.data.length > 0) {
    // Pridanie súborov do dropdownu
    const files = loadedData.data;
    for (let i = 0; i < files.length; i++) {
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
  } else {
    $('#vkladanie').addClass("d-none");
    $("#databaza-no-data").show();
  };

  $("#co_co2").on("click", event => {
    console.log("CO + CO2");
    $('#chart-canvas').removeClass('d-none');

    let selected = getSelected();
    const chartModel = [];

    // Prechádzanie všetkých vybratých súborov
    for (let i = 0; i < selected.length; i++) {
      // Počítanie hodnôt CO + CO2
      var COPlusCO2 = [];

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

    let myChartCOCO2 = document.getElementById("myChartCOCO2");

    const chart = createNewChart(myChartCOCO2, 'Analýza technologických dát o procese skujňovania',
      'Koncentrácia (%)', 'Čas (s)');
    renderChart(chartModel, chart);

  });

  $("#gradient").on("click", event => {
    console.log('gradient');
    $('#chart-canvas-2').removeClass("d-none");

    let selected = getSelected();
    const chartModel = [];

    // Prechádzanie všetkých vybratých súborov
    for (let i = 0; i < selected.length; i++) {
      // Počítanie hodnôt CO + CO2
      let gradient = [];

      for (let j = 1; j < Object.keys(window.loadedData[selected[i]]['k4_co']).length; j++) {

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

    var myChartGradient = document.getElementById("myChartGradient");

    const chart = createNewChart(myChartGradient, 'Analýza technologických dát o procese skujňovania',
      'Koncentrácia (%/s)', 'Čas (s)');
    renderChart(chartModel, chart);

  });

  $("#klzavy-priemer").on("click", event => {
    console.log('klzavy priemer');

    var txt;
    if (lang === 'sk') {
      var krok = Number(prompt("Zadajte krok pre kĺzavý priemer:", "0"));
    } else {
      var krok = Number(prompt("Enter the step for sliding diameter:", "0"));
    }
    console.log(krok)
    if (krok == 0 || krok == "") {
      if (lang = 'sk') {
        alert("Nezadali ste krok.")
        txt = "Nezdali ste krok.";
        return;
      } else {
        alert("You haven't entered a step.")
        txt = "You haven't entered a step.";
        return;
      }
    } else {
      if (lang === 'sk') {
        txt = "Zadali ste krok: " + krok;
      } else {
        txt = "Entered step is: " + krok;
      }
    }

    document.getElementById("input-krok").innerHTML = txt;

    $('#chart-canvas-3').removeClass("d-none");
    $('#input-krok').removeClass("d-none");

    let selected = getSelected();
    const chartModel = [];
    const lastValues = [];
    let pomArray = [];

    // Prechádzanie všetkých vybratých súborov
    for (let i = 0; i < selected.length; i++) {

      // Počítanie hodnôt CO + CO2
      var klzavyPriemer = [];
      let pomocnyArray = [];
      let gradient = [];


      for (let j = 1; j < Object.keys(window.loadedData[selected[i]]['k4_co']).length; j++) {

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

        // let kroky = (Object.keys(window.loadedData[selected[i]]['k4_co']).length) / krok;
        // console.log('pocet krokov:', kroky)

        // Čiastkový gradient
        let resultValue = (Number(sumCOCO2current) - Number(sumCO2previous));
        gradient.push(resultValue);

        pomocnyArray.push(resultValue)

        if (pomocnyArray.length < krok) {
          let sum = pomocnyArray.reduce((a, b) => a + b, 0);
          let ciastkovyKlzavyPriemer = sum / pomocnyArray.length;
          klzavyPriemer.push(ciastkovyKlzavyPriemer);
        } else {
          var novyArray = pomocnyArray.slice(j - krok, j);
          let sum = novyArray.reduce((a, b) => a + b, 0);
          let ciastkovyKlzavyPriemer = sum / krok;
          klzavyPriemer.push(ciastkovyKlzavyPriemer);

          novyArray = [];
        }
      }

      // Pridávanie hodnôt do modelu
      chartModel.push({
        data: klzavyPriemer,
        label: selected[i],
        backgroundColor: getRandomColor(),
      });

      // Štatistika
      const findMax = objectArray => {
        let max = objectArray[0];
        for (let i = 0; i < objectArray.length; i++) {
          if (objectArray[i].value > max.value) {
            max = objectArray[i];
          }
        }
        return max;
      }

      const findMin = objectArray => {
        let min = objectArray[0];
        for (let i = 0; i < objectArray.length; i++) {
          if (objectArray[i].value < min.value) {
            min = objectArray[i];
          }
        }
        return min;
      }

      let calculationLastValue = klzavyPriemer[klzavyPriemer.length - 1];
      lastValues.push({ value: calculationLastValue, fileName: selected[i] });

      console.log("lastvalue", lastValues)

      let maximum = findMax(lastValues);
      let minimum = findMin(lastValues);

      let priemer = lastValues.map(a => a.value).reduce((a, b) => a + b, 0) / lastValues.length;

      let pomVyp = lastValues[i].value - priemer;
      let pomVypNa2 = Math.pow(pomVyp, 2);
      pomArray.push(pomVypNa2);

      let sucetPomArray = pomArray.reduce((a, b) => a + b, 0);
      let rozptyl = (1 / lastValues.length) * sucetPomArray;

      $('#poslednaHodnota').empty();
      $('#aritmetickyPriemer').empty();
      $('#maximum').empty();
      $('#minimum').empty();
      $('#rozptyl').empty();

      $('#poslednaHodnota').append(" " + lastValues + ", " + " ");
      $('#aritmetickyPriemer').append(priemer);
      $('#maximum').append(maximum.value + " (" + maximum.fileName + ")");
      $('#minimum').append(minimum.value + " (" + minimum.fileName + ")");
      $('#rozptyl').append(rozptyl);
    }

    var myChartPriemer = document.getElementById("myChartPriemer");

    const chart = createNewChart(myChartPriemer, 'Analýza technologických dát o procese skujňovania',
      'Koncentrácia (%/s)', 'Čas (s)');
    renderChart(chartModel, chart);

  });

}

setup();
