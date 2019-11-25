(function ($) {
  'use strict';

  $ = $ && $.hasOwnProperty('default') ? $['default'] : $;

  var config = {
    frontendUrl: 'http://localhost:3000',
    backendUrl: 'http://localhost:3000'
  };

  function registerUploadFile() {

    $("#but_upload").click(function () {
      var lang = localStorage.getItem('lang');
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

            if (response.data && response.data[0]) {

              if (lang === 'sk') {
                alert("Súbor " + " " + fileName  + " " + " bol úspešne nahraný! ", response);
              } else {
                alert("The file " + " " + fileName + " " + " uploaded successfully! ", response);
              }
            } else { 
              if (lang === 'sk') {
                alert("Súbor sa nenahral!");
              } else {
                alert("The file not uploaded!");
              }
            }
          }
        })
        .catch(error => console.error("Error:", error));
    });
  }

  $('input[type="file"]').change(function (e) {
    var fileName = e.target.files[0].name;
    var lang = localStorage.getItem('lang');

    if (lang === 'sk') {
      alert('Bol vybratý "' + fileName + '" súbor.');
    } else {
      alert('The file "' + fileName + '" was selected.');
    }
    
  });

  registerUploadFile();

}($));
