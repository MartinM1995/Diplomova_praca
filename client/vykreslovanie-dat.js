import $ from "jquery";
import { loadData } from "./lib/tabulky";
import { initMainGraf } from "./lib/graf";
import { renderChart } from "./lib/graf";
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
    // initMainGraf(data);
    $('#file-status').removeClass("d-none");
    document.getElementById("file-status").innerHTML = `Status: ${data.status}`;

    $('#vkladanie').removeClass("d-none");
    $('#vkladanie').addClass("div-css");
    $('#vkladanie').find(".selectpicker").empty();

    if (data.data && data.data[0]) {
      // Pridanie stĺpcov do dropdownu
      const columns = Object.keys(data.data[0]);
      for (let i = 0; i < columns.length; i++) {
        const option = "<option>" + columns[i] + "</option>";
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

      window.fileName = data.name;
      window.vkladanie = newVkladanie;

       // Pridanie do grafu
      window.dataObject = {};
      for (let i = 0; i < loadedData.data.length; i++) {
        let row = data.data[i]; // Uloženie jedného riadku do premennej row, riadok má tvar objektu
        for (let key in row) {
          if (!dataObject[key]){
          dataObject[key] = [];
          }
          dataObject[key].push(parseFloat(row[key]));
        }
      }
      window.uploadedData[fileName] = dataObject;

      vkladanie.find('#add-to-chart').click(function(){
        let stlpcestring = $("#" + newVkladanie.attr("id")).find(".btn.dropdown-toggle.btn-light").attr("title");
        let stlpce = stlpcestring.split(", ");

        for (let i = 0; i < stlpce.length; i++){
          window.chartModel[fileName + "_" + stlpce[i]] = {
            data: window.uploadedData[fileName][stlpce[i]],
            label: fileName + "_" + stlpce[i],
            borderColor: getRandomColor()
          }
        }
        renderChart(chartModel);
      });

      }
    });
  initMainGraf(data);
  renderChart(chartModel);
}

setup();