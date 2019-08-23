import $ from "jquery";
import { loadData } from "./lib/tabulky"

$("#databaza-container").hide();
$("#databaza-loading").show();
$("#databaza-no-data").hide();

loadData();
