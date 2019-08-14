function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function renderChart(chartModel){
    window.chart.options.legend.display = true;
    window.chart.options.title.display = true;
    window.chart.data.datasets = [];
    window.chart.data.labels = [];
   

    let maxLength = 0;

    for (let col in chartModel) {
        window.chart.data.datasets.push({
            data: chartModel[col].data,
            label: chartModel[col].label,
            fill: false,
            backgroundColor: "transparent",
            borderColor: chartModel[col].borderColor,
            borderWidth: 1
        });

    if (maxLength < chartModel[col].data.length)
        maxLength = chartModel[col].data.length;
    }

    for (let i = 0; i < maxLength; i++) {
        window.chart.data.labels.push(i + 1);
    }

     // window.chart.options.scales = {
     //    xAxes: [{
     //            gridLines: {
     //                display: true,
     //                color: 'black',
     //                borderDash: [2]
     //            },
     //            scaleLabel: {
     //                display: true,
     //                labelString: 'Čas(s)',
     //                fontColor: 'black'
     //            },
     //            ticks:{
     //                userCallback: function(item, index) {
     //                    if (!(index % 0.5)) return item;
     //                    },
     //                min: 0,
     //                stepSize: 50,
     //            },

     //        }]
     //    };

    window.chart.update();
}

registerUploadFile = () => {
    $("#but_upload").click(function() {
        var fd = new FormData();
        var files = $('#file')[0].files[0];
        fd.append('file', files);

        $.ajax({
            url: 'upload',
            type: 'post',
            data: fd,
            contentType: false,
            processData: false,
            success: function(response){
                if(response != 0){
                    console.log('response: ', response);
                    window.myJSONData = response.data;

                    var fileName = $('input[type=file]').val().split('\\').pop();
                        $('#target').attr('value', "Súbor: " + fileName);

                    let novyRiadok =  $('#vkladanie').clone();
                    novyRiadok.removeClass("d-none");
                    novyRiadok.addClass("div-css");

                    // Pridanie nového ID pre novyRiadok
                    let n = $(".col").length;
                    let div_id = "div-id" + n++;

                    novyRiadok.attr('id', function() {
                        return div_id;
                    });

                    // Pridanie stĺpcov do dropdownu
                    const columns = Object.keys(response.data[0]);
                    for (let i = 0; i < columns.length; i++) {
                        const option = "<option>" + columns[i] + "</option>";
                        novyRiadok.find(".selectpicker").append(option);
                     };

                    // Pridanie multiselectu
                    novyRiadok.find(".selectpicker").selectpicker();
                    novyRiadok.find("button[role='button']").last().remove();

                    // Pridanie nového riadku
                    novyRiadok.appendTo($('.row'));

                    // Zmazanie riadku
                    let riadok = novyRiadok;
                    riadok.find("#delete-novyRiadok").click(function(){
                        $("#" + novyRiadok.attr("id")).remove();
                        alert("Súbor bol zmazaný.");
                    });

                    // Pridanie do grafu
                    dataObject = {};
                    for (let i = 0; i < response.data.length; i++) { // Prechádzanie riadkov odpovede
                        let row = response.data[i]; // Uloženie jedného riadku do premennej row, riadok má tvar objektu
                        for (let key in row) {
                            if (!dataObject[key]){
                            dataObject[key] = [];
                            }
                            dataObject[key].push(parseFloat(row[key])); // Urobí atribút s názvom akutálneho stĺpca
                        }
                    }

                    window.uploadedData[fileName] = dataObject;

                    riadok.find('#add-to-chart').click(function(){
                        let stlpcestring = $("#" + novyRiadok.attr("id")).find(".btn.dropdown-toggle.btn-light").attr("title");
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

                    riadok.find('#sum_co_co2').click(function(){
                        let stlpcestring = $("#" + novyRiadok.attr("id")).find(".btn.dropdown-toggle.btn-light").attr("title");
                        let stlpce = stlpcestring.split(", ");

                        // for (let i = 0; i < stlpce.length; i++){
                        //     window.chartModel[fileName + "_" + stlpce[i]] = 
                        // }

                        // let pole1 = []; 
                        // let pole2 = [];
                        // let vysledok = [];

                        // for(let i = 0; i < stlpce.length; i++){
                        //     window.chartModel[fileName + "_" + stlpce[i]] = pole1.push(stlpce[i].length);
                        //     window.chartModel[fileName + "_" + stlpce[i]] = pole2.push(stlpce[i].length);

                        //     pole1 =  array[i].val();
                        // }
                        // for(var i = 0; i < pole1.length; i++){
                        //    vysledok.push(pole1[i] + pole2[i]);
                        // }    

                        // console.log("Výsledný stĺpec: ", stlpce.length);
                        

                    });

                    // Zmazanie z grafu
                    riadok.find('#delete-from-chart').click(function(){
                        let stlpcestring = $("#" + novyRiadok.attr("id")).find(".btn.dropdown-toggle.btn-light").attr("title");
                        let stlpce = stlpcestring.split(", ");

                        for (let i = 0; i < stlpce.length; i++){
                            delete window.chartModel[fileName + "_" + stlpce[i]];
                        }

                        renderChart(chartModel);
                    });

                    alert('Súbor bol úspešne nahraný! ', response);
                }
                else{
                    alert('Súbor sa nenahral!');
                }
            },

        });
    });

};