import $ from "jquery";
import { loadData } from "./lib/tabulky";
import { initGradientChart } from "./lib/graf";
import { initKlzavyPriemerChart } from "./lib/graf";
import { renderGradientChart } from "./lib/graf";
import { renderKlzavyPriemerChart } from "./lib/graf";
import { getRandomColor } from "./lib/utils";

$("#databaza-container").hide();
$("#databaza-loading").show();
$("#databaza-no-data").hide();

let data = null;
let sum = null;

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

      if (data && Object.keys(data.data).length) {
        // const data = [];
        let history = 0;
        var array = [];

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
            data[i] = 100
          }

          var klzavy_priemer = [];
          klzavy_priemer = data[i] / Object.keys(data.data).length;
          array.push(klzavy_priemer);

          sum = array.reduce((a, b) => a + b, 0);

          document.getElementById("hodnota_priemeru").innerHTML = `${sum}`;
        }
      }

    });
  });

  initGradientChart(data);

}
setup();