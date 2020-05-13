import $ from "jquery";
import { getData } from "./api";

let fileId = null;
let db = null;

export async function loadData() {
  db = await getData();
  if (db && db.data && db.data.length > 0) {
    $("#databaza-container").show();
    $("#databaza-loading").hide();
    $("#databaza-no-data").hide();
    $('#select-file').removeClass("d-none");
    const select = $("#select-file");
    select.on("change", e => {
      fileId = e.target.value;
      const data = db.data.find(d => d._id === fileId);
      renderTable(data);
    });
    db.data.forEach(data => {
      const option = `<option value=${data._id}>${data.name}</option>`;
      select.append(option);
    });
    select.selectpicker();
  } else {
    $("#databaza-container").hide();
    $("#databaza-loading").hide();
    $("#databaza-no-data").show();
  }
  return db;
}

export async function renderTable(data) {
  if (data && data._id) {
    $("#tabulka").show();
    const tbody = $("#tabulka > tbody");

    Object.values(data.data).forEach(row => {
      const html = `
        <tr>
          ${Object.values(row).map(val => `<td>${val}</td>`)}
        </tr>
      `;
      tbody.append(html);
    });
  } else {
    $("#tabulka").hide();
    return false;
  }
}
