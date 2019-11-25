import $ from "jquery";
import english from "../language/en.js";
import slovak from "../language/sk.js";

$(document).ready(function () {

  // var lang = "sk";
  var lang = localStorage.getItem('lang') || 'sk';
 
  console.log("jazyk:", lang)

  const arrLang = {
    en: english,
    sk: slovak
  };

  // Prednastavený jazyk je Sk
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
    });
  });
});