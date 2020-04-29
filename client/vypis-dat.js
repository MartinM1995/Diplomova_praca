import $ from "jquery";
import { loadData } from "./lib/tabulky"

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
    document.getElementById("file-status").innerHTML = `Status: ${data.status}`;
  });
}

setup();
loadData();
