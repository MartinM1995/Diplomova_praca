import $ from "jquery";
import config from "../config";

export function registerUploadFile() {

    $("#but_upload").click(function() {
        var lang = localStorage.getItem('lang');
        var file = $("#file")[0].files[0];
        var formData = new FormData();
        let formDataArray = [];
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
                    console.log("response: ", response);
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
                }
            })
            .catch(error => console.error("Error:", error));
    });
}