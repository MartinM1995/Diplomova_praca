import $ from "jquery";
import { loadData } from "./lib/tabulky";
import { initDataManagementGraf } from "./lib/graf";

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
          const response = await res.json()
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
          const response = await res.json()
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
