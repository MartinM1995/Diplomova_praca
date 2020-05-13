(function ($) {
  'use strict';

  $ = $ && Object.prototype.hasOwnProperty.call($, 'default') ? $['default'] : $;

  var config = {
    frontendUrl: 'http://localhost:3000',
    backendUrl: 'http://localhost:3000'
  };

  function registerUploadFile() {

    $("#but_upload").click(function () {
      $("#files-loading").removeClass("d-none");
      var lang = localStorage.getItem('lang');
      var file = $("#file")[0].files[0];
      var formData = new FormData();
      Object.values($("#file")[0].files).forEach(file => {
        formData.append("files", file);
      });

      fetch(`${config.backendUrl}/api/upload`, {
        method: "POST",
        mode: "cors",
        body: formData,
      })
        .then(res => res.json())
        .then(response => {
          if (response && response != 0) {
            window.myJSONData = response.data;

            var fileName = $("input[type=file]")
              .val()
              .split("\\")
              .pop();
            $("#target").attr("value", "Súbor: " + fileName);

            if (response.data && response.data[0]) {

              if (lang === 'sk') {
                alert("Súbory boli úspešne nahrané!", response);
              } else {
                alert("The files were uploaded successfully!", response);
              }
            } else {
              if (lang === 'sk') {
                alert("Súbory sa nenahrali!");
              } else {
                alert("The files were not uploaded!");
              }
            }
            $("#files-loading").addClass("d-none");
          }
        })
        .catch(error => console.error("Error:", error));
    });
  }

  // $('#files-loading')

  $('input[type="file"]').change(function (e) {
    var lang = localStorage.getItem("lang");
    var fileName = e.target.files[0].name;
    if (lang === "sk") {
      alert("Súbory boli vybraté.");
    } else {
      alert("The files was selected.");
    }

    // alert(CURRENT_LANG["fileName"](fileName));
  });

  registerUploadFile();

}($));
