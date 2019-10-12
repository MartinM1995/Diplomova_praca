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
      $('#chart-canvas-2').removeClass("d-none");
      initKlzavyPriemerChart(data);
    });


  });

  initGradientChart(data);
  initKlzavyPriemerChart(data);

}

setup();