import $ from "jquery";
import { loadData } from "./lib/tabulky";
import { initMainGraf } from "./lib/graf";
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

      }
    });
}

initMainGraf(data);
setup();