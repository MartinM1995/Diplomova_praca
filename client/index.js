import $ from "jquery";
import { registerUploadFile } from "./lib/upload";
import { CURRENT_LANG } from "./language";

$('input[type="file"]').change(function (e) {
  var fileName = e.target.files[0].name;

  alert(CURRENT_LANG["fileName"](fileName));
});

registerUploadFile();
