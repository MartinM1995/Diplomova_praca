import $ from "jquery";
import english from "../language/en.js";
import slovak from "../language/sk.js";

const whitelistLang = ["sk", "en"];

export let CURRENT_LANG = null;

function initLang() {
  var defaultLang = localStorage.getItem('lang') || window.navigator.language.slice(0, 2);
  if (whitelistLang.includes(defaultLang)) {
    localStorage.setItem("lang", defaultLang);
    return defaultLang;
  }

  return localStorage.getItem('lang') || "sk";
}

$(document).ready(function () {

  var lang = initLang();
  CURRENT_LANG = initLang() === "sk" ? slovak : english;

  console.log("jazyk:", lang)

  const arrLang = {
    en: english,
    sk: slovak
  };

  $(".lang").each(function (index, element) {

    const newValue = arrLang[lang][$(this).attr('key')];
    $(this).find(".menuValue").each(function (langIndex, langItem) {
      $(this).text(newValue);
    });

    if ($(this).prop("tagName") === "BUTTON") {
      const newValue = arrLang[lang][$(this).attr('key')];
      $(this).text(newValue);
      return;
    }

    if ($(this).prop("tagName") === "DIV") {
      const newValue = arrLang[lang][$(this).attr('key')];
      $(this).text(newValue);
      return;
    }

    if ($(this).prop("tagName") === "ALERT") {
      const newValue = arrLang[lang][$(this).attr('key')];
      $(this).text(newValue);
      return;
    }

    if ($(this).prop("tagName") === "SELECT") {
      const newValue = arrLang[lang][$(this).attr('key')];
      $(this).attr("title", newValue);

      if ($(this)[0].id === "select-file") {
        // Beware! If select library changes its classes, this won't work...
        $(".btn.dropdown-toggle.btn-light.bs-placeholder > .filter-option > .filter-option-inner > .filter-option-inner-inner").text(newValue)
      }

      return;
    }

    if ($(this).prop("tagName") === "INPUT") {
      const newValue = arrLang[lang][$(this).attr('key')];
      $(this).attr("value", newValue);
      return;
    }

    if ($(this).prop("tagName") === "H1") {
      const newValue = arrLang[lang][$(this).attr('key')];
      $(this).text(newValue);
      return;
    }

    if ($(this).prop("tagName") === "SPAN") {
      const newValue = arrLang[lang][$(this).attr('key')];
      $(this).text(newValue);
      return;
    }

    if ($(this).prop("tagName") === "TH") {
      const newValue = arrLang[lang][$(this).attr('key')];
      $(this).text(newValue);
      return;
    }

    if ($(this).prop("tagName") === "B") {
      const newValue = arrLang[lang][$(this).attr('key')];
      $(this).text(newValue);
      return;
    }

    if ($(this).prop("tagName") === "H2") {
      const newValue = arrLang[lang][$(this).attr('key')];
      $(this).text(newValue);
      return;
    }

    if ($(this).prop("tagName") === "P") {
      const newValue = arrLang[lang][$(this).attr('key')];
      $(this).text(newValue);
      return;
    }

    if ($(this).prop("tagName") === "H4") {
      const newValue = arrLang[lang][$(this).attr('key')];
      $(this).text(newValue);
      return;
    }

  });
});

$(function () {
  $('.translate').click(function () {
    var lang = $(this).attr('id');

    window.localStorage.setItem('lang', $(this).attr('id'));
    CURRENT_LANG = lang === "sk" ? slovak : english;

    const arrLang = {
      en: english,
      sk: slovak
    };

    $('.lang').each(function (index, item) {

      if ($(this).prop("tagName") === "BUTTON") {
        const newValue = arrLang[lang][$(this).attr('key')];
        $(this).text(newValue);
        return;
      }

      if ($(this).prop("tagName") === "DIV") {
        const newValue = arrLang[lang][$(this).attr('key')];
        $(this).text(newValue);
        return;
      }

      if ($(this).prop("tagName") === "ALERT") {
        const newValue = arrLang[lang][$(this).attr('key')];
        $(this).text(newValue);
        return;
      }

      if ($(this).prop("tagName") === "SELECT") {
        const newValue = arrLang[lang][$(this).attr('key')];
        $(this).attr("title", newValue);

        if ($(this)[0].id === "select-file") {
          // Beware! If select library changes its classes, this won't work...
          $(".btn.dropdown-toggle.btn-light.bs-placeholder > .filter-option > .filter-option-inner > .filter-option-inner-inner").text(newValue)
        }

        return;
      }

      if ($(this).prop("tagName") === "INPUT") {
        const newValue = arrLang[lang][$(this).attr('key')];
        $(this).attr("value", newValue);
        return;
      }

      if ($(this).prop("tagName") === "H1") {
        const newValue = arrLang[lang][$(this).attr('key')];
        $(this).text(newValue);
        return;
      }

      if ($(this).prop("tagName") === "SPAN") {
        const newValue = arrLang[lang][$(this).attr('key')];
        $(this).text(newValue);
        return;
      }

      if ($(this).prop("tagName") === "TH") {
        const newValue = arrLang[lang][$(this).attr('key')];
        $(this).text(newValue);
        return;
      }

      if ($(this).prop("tagName") === "B") {
        const newValue = arrLang[lang][$(this).attr('key')];
        $(this).text(newValue);
        return;
      }

      if ($(this).prop("tagName") === "H2") {
        const newValue = arrLang[lang][$(this).attr('key')];
        $(this).text(newValue);
        return;
      }

      if ($(this).prop("tagName") === "P") {
        const newValue = arrLang[lang][$(this).attr('key')];
        $(this).text(newValue);
        return;
      }

      if ($(this).prop("tagName") === "H4") {
        const newValue = arrLang[lang][$(this).attr('key')];
        $(this).text(newValue);
        return;
      }

      const newValue = arrLang[lang][$(this).attr('key')];
      $(this).find(".menuValue").each(function (langIndex, langItem) {
        $(this).text(newValue);
      });

      $(this).find("#data-id").each(function (langIndex, langItem) {
        $(this).text(newValue);
      });

    });
  });
});
