import $ from "jquery";
import { registerUploadFile } from "./lib/upload";
import { CURRENT_LANG } from "./language";

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

registerUploadFile()