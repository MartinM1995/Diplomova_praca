import $ from "jquery";
import config from "../config";

export function registerUploadFile() {

  $("#but_upload").click(function () {
    var lang = localStorage.getItem('lang');
    console.log($("#file")[0])
    var file = $("#file")[0].files[0];
    var formData = new FormData();
    console.log(Object.values($("#file")[0].files))
    let formDataArray = []
    Object.values($("#file")[0].files).forEach(file => {
      formData.append("files", file);
      // console.log(file, formData)
      // formDataArray.push(formData)
    })
    console.log(formDataArray)

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
          console.log(response.data)
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
