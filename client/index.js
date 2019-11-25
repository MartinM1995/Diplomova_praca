import $ from "jquery";
import { registerUploadFile } from "./lib/upload";
import english from "../language/en.js";
import slovak from "../language/sk.js";

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
