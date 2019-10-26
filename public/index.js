(function ($) {
  'use strict';

  $ = $ && $.hasOwnProperty('default') ? $['default'] : $;

  function getRandomColor() {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  function renderChart(chartModel, chart) {
    chart.options.scales.xAxes[0].scaleLabel.display = true;
    chart.options.scales.yAxes[0].scaleLabel.display = true;
    chart.options.pan.enabled = true;
    chart.options.zoom.enabled = true;
    chart.options.legend.display = true;
    chart.options.title.display = true;
    chart.data.datasets = [];
    chart.data.labels = [];

    let maxLength = 0;

    for (let col in chartModel) {
      chart.data.datasets.push({
        data: chartModel[col].data,
        label: chartModel[col].label,
        fill: false,
        backgroundColor: chartModel[col].backgroundColor,
        borderColor: chartModel[col].borderColor,
        borderWidth: 1,
      });

      if (maxLength < chartModel[col].data.length) maxLength = chartModel[col].data.length;
    }

    for (let i = 0; i < maxLength; i++) {
      chart.data.labels.push(i);
    }

    chart.update();
  }

  var config = {
    frontendUrl: 'http://localhost:3000',
    backendUrl: 'http://localhost:3000'
  };

  function registerUploadFile() {
    $("#but_upload").click(function() {
      var formData = new FormData();
      var file = $("#file")[0].files[0];
      console.log(file);
      formData.append("file", file);

      fetch(`${config.backendUrl}/api/upload`, {
        method: "POST",
        mode: "cors",
        body: formData,
      })
        .then(res => res.json())
        .then(response => {
          if (response && response != 0) {
            console.log("response: ", response);
            window.myJSONData = response.data;

            var fileName = $("input[type=file]")
              .val()
              .split("\\")
              .pop();
            $("#target").attr("value", "Súbor: " + fileName);

            let novyRiadok = $("#vkladanie").clone();
            novyRiadok.removeClass("d-none");
            novyRiadok.addClass("div-css");

            // Pridanie nového ID pre novyRiadok
            let n = $(".col").length;
            let div_id = "div-id" + n++;

            novyRiadok.attr("id", function() {
              return div_id;
            });

            if (response.data && response.data[0]) {
              // Pridanie stĺpcov do dropdownu
              const columns = Object.keys(response.data[0]);
              for (let i = 0; i < columns.length; i++) {
                const option = "<option>" + columns[i] + "</option>";
                novyRiadok.find(".selectpicker").append(option);
              }

              // Pridanie multiselectu
              novyRiadok.find(".selectpicker").selectpicker();
              novyRiadok
                .find("button[role='button']")
                .last()
                .remove();

              // Pridanie nového riadku
              novyRiadok.appendTo($(".row"));

              // Zmazanie riadku
              let riadok = novyRiadok;
              riadok.find("#delete-novyRiadok").click(function() {
                $("#" + novyRiadok.attr("id")).remove();
                alert("Súbor bol zmazaný.");
              });

              // Pridanie do grafu
              let dataObject = {};
              for (let i = 0; i < response.data.length; i++) {
                // Prechádzanie riadkov odpovede
                let row = response.data[i]; // Uloženie jedného riadku do premennej row, riadok má tvar objektu
                for (let key in row) {
                  if (!dataObject[key]) {
                    dataObject[key] = [];
                  }
                  dataObject[key].push(parseFloat(row[key])); // Urobí atribút s názvom akutálneho stĺpca
                }
              }

              // window.uploadedData[fileName] = dataObject;

              riadok.find("#add-to-chart").click(function() {
                let stlpcestring = $("#" + novyRiadok.attr("id"))
                  .find(".btn.dropdown-toggle.btn-light")
                  .attr("title");
                let stlpce = stlpcestring.split(", ");

                for (let i = 0; i < stlpce.length; i++) {
                  window.chartModel[fileName + "_" + stlpce[i]] = {
                    data: window.uploadedData[fileName][stlpce[i]],
                    label: fileName + "_" + stlpce[i],
                    borderColor: getRandomColor(),
                  };
                }

                renderChart(chartModel);
              });

              // Zmazanie z grafu
              riadok.find("#delete-from-chart").click(function() {
                let stlpcestring = $("#" + novyRiadok.attr("id"))
                  .find(".btn.dropdown-toggle.btn-light")
                  .attr("title");
                let stlpce = stlpcestring.split(", ");

                for (let i = 0; i < stlpce.length; i++) {
                  delete window.chartModel[fileName + "_" + stlpce[i]];
                }

                renderChart(chartModel);
              });

              alert("Súbor bol úspešne nahraný! ", response);
            }
          } else {
            alert("Súbor sa nenahral!");
          }
        })
        .catch(error => console.error("Error:", error));
    });
  }

  $('input[type="file"]').change(function(e) {
    var fileName = e.target.files[0].name;
    alert('Bol vybratý "' + fileName + '" súbor.');
  });

  registerUploadFile();

}($));
