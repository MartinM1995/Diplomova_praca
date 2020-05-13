import $ from "jquery";
import { loadData } from "./lib/tabulky";
import { initCOCO2Chart } from "./lib/graf";
import { STATUS_TYPES } from "./lib/types";

$("#databaza-container").hide();
$("#databaza-loading").show();
$("#databaza-no-data").hide();

let data = null;

async function setup() {
  const loadedData = await loadData();

  $("#select-file").on("change", event => {
    let lang = localStorage.getItem('lang');
    const id = event.target.value;
    data = loadedData.data.find(d => d._id === id);
    initCOCO2Chart(data);
    $('#file-status').removeClass("d-none");
    $('#chart-canvas').removeClass("d-none");
    $('#vyhovuje').removeClass("d-none");
    $('#nevyhovuje').removeClass("d-none");

    document.getElementById("file-status").innerHTML = `Status: ${STATUS_TYPES[data.status][lang]}`;

  });

  $("#vyhovuje").on("click", event => {
    if (data) {
      let lang = localStorage.getItem('lang');

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
          document.getElementById("file-status").innerHTML = `Status: ${STATUS_TYPES[response.data.status][lang]}`;
          if (lang === "sk") {
            alert("Status súboru bol nastavený na 'Vyhovujúci'.");
          } else {
            alert("File status set to 'Correct'.");
          }
        })
        .catch(err => {
          console.error(err);
          if (lang === "sk") {
            alert("Nastal problém v komunikácií s databázou.");
          } else {
            alert("Problem in communication with database.");
          }
        });
        
    }
  });

  $("#nevyhovuje").on("click", event => {
    if (data) {
      let lang = localStorage.getItem('lang');

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
          document.getElementById("file-status").innerHTML = `Status: ${STATUS_TYPES[response.data.status][lang]}`;
          if (lang === "sk") {
            alert("Status súboru bol nastavený na 'Nevyhovujúci'.");
          } else {
            alert("File status set to 'Incorrect'.");
          }        })
        .catch(err => {
          console.error(err);
          alert("Nastal problém v komunikácií s databázou.");
        });
    }
  }); 

  initCOCO2Chart(data);
}

setup();


