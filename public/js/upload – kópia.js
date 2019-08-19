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
                        const option = "<option> "+ columns[i] +" </option>";
                        novyRiadok.find(".selectpicker").append(option);
                     };

                    // Pridanie multiselectu 
                    novyRiadok.find(".selectpicker").selectpicker();
                    novyRiadok.find("button[role='button']").last().remove();

                    // Pridanie nového riadku
                    novyRiadok.appendTo($('.row'));
                    
                    // Zmazanie riadku
                    let riadok = novyRiadok;
                    riadok.find("#delete-vkladanie").click(function(){
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

                    riadok.find('#add-to-chart').click(function(){
                        let stlpcestring = $("#" + novyRiadok.attr("id")).find(".btn.dropdown-toggle.btn-light").attr("title");
                        let stlpce = stlpcestring.split(", ");
                        
                        // Pridanie hodnôt na os y
                        for (let i = 0; i < stlpce.length; i++){ 
                            window.chart.data.datasets[i].data = dataObject[stlpce[i]];
                        }

                        // Pridanie hodnôt na os x
                        for (let i = 0; i < response.data.length; i++) {
                            window.chart.data.labels.push(i + 1);                        
                        }

                        // Pridanie legendy
                        for (let i = 0; i < stlpce.length; i++) {
                            window.chart.options.legend.display = true; 
                            window.chart.options.title.display = true; 
                            window.chart.data.datasets[i].label = stlpce[i].slice(0, 20);
                        }
                                      
                        window.chart.update();
                    });

                    // Zmazanie z grafu
                    riadok.find('#delete-from-chart').click(function(){
                        let stlpcestring = $("#" + novyRiadok.attr("id")).find(".btn.dropdown-toggle.btn-light").attr("title");
                        let stlpce = stlpcestring.split(", ");

                        // Potrebujem podmienku, aby zmazalo label až vtedy, keď už je len jeden graf
                        // for (let i = 0; i < response.data.length; i++) {
                        //     window.chart.data.labels.pop();
                        //     }

                        // Zmazanie stĺpcov z grafu
                        for (let i = 0; i < stlpce.length; i++){ 
                            window.chart.data.datasets[0].data = [];
                        }
        
                        window.chart.update(); 
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
