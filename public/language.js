(function ($) {
  'use strict';

  $ = $ && $.hasOwnProperty('default') ? $['default'] : $;

  var english = {
    "loading-files": "Loading files",
    "file-management": "File management",
    "data-rendering": "Data rendering",
    "data-analysis": "Data analysis",
    "database": "Database",
    "about": "About",
    "author": "Author",
    "load": "Load",
    "header-loading-files": "Select a xls. or xlsx. file",
    "load-text": "Upload file",
    "header-data-management": "Select a file from database",
    "loading-data": "Loading data from database...",
    "database-warning": "There is no data in database...",
    "select-file": "Select file",
    "success": "Success",
    "not-success": "Not success",
    "header-coco2": "Rendered values CO + CO2",
    "select-columns-file": "Select columns",
    "select-columns": "Select columns",
    "add-chart": "Add to chart",
    "delete-chart": "Delete from chart",
    "save-chart": "Save chart",
    "save-as-picture": "Save as picture",
    "add-name": "Add picture name",
    "render-chart": "Rendered graph",
    "show-coco2": "Show CO+CO2",
    "show-gradient": "Show gradient",
    "show-average": "Show sliding diameter",
    "co-co2": "CO + CO2",
    "gradient": "Gradient",
    "sliding-diameter": "Sliding diameter",
    "statistics": "Statistical calculations",
    "aritmetic-average": "Arithmetically average",
    "spread": "Spread",
    "max-value": "Maximum value",
    "min-value": "Minimum value",
    "database-name": "Database",
    "author-name": "Author name:",
    "study-program": "Study program:",
    "study-section": "Study section:",
    "training-center": "Training station:",
    "trainer": "Trainer:",
    "consultant": "Consultant:",
    "year": "Year:",
    "header-aplication": "Web application for analysis of technological data about the process of steel making",
    "aplication-description": "This application is used to analyze the technological data of the stell making. Using the application, the user can display data in the form of graphs from selected files.",
    "header-loading-file": "Loading files",
    "loading-file-description": "In this section of the menu, he user can get all the files he wants work later. Use the Upload button to save all files to the database.",
    "header-datas-management": "Data management",
    "datas-management-description": "File management serves the user to display CO + CO2 data from a given file and also on marking the file whether or not it is suitable for others processing.",
    "header-data-rendering": "Data rendering",
    "data-rendering-deccription": "The plotted data is used to display any data (columns) from the file. User can display data from different files in the same graph. You must first select file from which the user wants to display data and then select specific columns. Use the Add to Chart button to display all selected columns in the chart. For remove added columns use button Delete from chart.",
    "hedaer-data-analysis": "Data analysis",
    "data-analysis-decription": "Data analysis serves the user to display a gradient, sliding-diameter from the gradient and for statistical calculations.",
    "header-database": "Database",
    "database-description": "The database is used to display values from a given file.",
  };

  var slovak = {
    "loading-files": "Načítanie súborov",
    "file-management": "Správa súborov",
    "data-rendering": "Vykresľovanie dát",
    "data-analysis": "Analýza dát",
    "database": "Databáza",
    "about": "O aplikácií",
    "author": "Autor",
    "load": "Nahrať",
    "header-loading-files": "Vyberte súbor vo formáte .xls alebo .xlsx",
    "load-text": "Nahrať súbor",
    "header-data-management": "Výber súboru z databázy",
    "loading-data": "Načítanie databázy...",
    "database-warning": "V databáze zatiaľ nie sú žiadne dáta..",
    "select-file": "Vyberte súbor",
    "success": "Vyhovujúci",
    "not-success": "Nevyhovujúci",
    "header-coco2": "Vykreslené hodnoty CO + CO2",
    "select-columns-file": "Vyberte stĺpce",
    "select-columns": "Výber stĺpcov",
    "add-chart": "Pridať do grafu",
    "delete-chart": "Odstrániť z grafu",
    "save-chart": "Uloženie grafu",
    "save-as-picture": "Uložiť ako obrázok",
    "add-name": "Zadajte názov",
    "render-chart" : "Vykreslenie grafu",
    "show-coco2": "Zobrazenie CO+CO2",
    "show-gradient": "Zobrazenie gradient",
    "show-average": "Zobrazenie kĺzavého priemeru",
    "co-co2": "CO + CO2",
    "gradient": "Gradient",
    "statistics": "Štatistické výpočty",
    "aritmetic-average": "Aritmetický priemer",
    "spread": "Rozptyl",
    "max-value": "Maximálna hodnota",
    "min-value": "Minimálna hodnota",
    "database-name": "Databáza",
    "author-name": "Autor:",
    "study-program": "Študijný program:",
    "study-section": "Študijný odbor:",
    "training-center": "Školiace pracovisko:",
    "trainer": "Školiteľ:",
    "consultant": "Konzultant:",
    "year": "Year:",
    "header-aplication": "Webová aplikácia pre analýzu technologických dát o procese skujňovania ocele",
    "aplication-description": "Táto aplikácia slúži pre analýzu technologických dát o procese skujňovania. Pomocou aplikácie môže užívateľ zobrazovať dáta vo forme grafov z vybraných súborov.",
    "header-loading-file": "Načítanie súborov",
    "loading-file-description": "V tejto časti menu môže užívateľ načítať všetky súbory s ktorými bude chcieť neskôr pracovať. Pomocou tlačidla Nahrať sa všetky súbory uložia do databázy.",
    "header-datas-management": "Správa súborov",
    "datas-management-description": " Správa súborov slúži užívateľovi na zobrazenie dát CO + CO2 z daného súbora a tiež na označenie súbora, či je Vyhovujúci alebo Nevyhovujúci pre ďalšie spracovanie.",
    "header-data-rendering": "Vykresľovanie dát",
    "data-rendering-deccription": "Vykresľovanie dát slúži pre zobrazenie akýchkoľvek dát (stĺpcov) zo súbora. Užívateľ môže zobrazovať v jednom grafe aj dáta z rôznych súborov. Najprv je potrebné vybrať súbor z ktorého chce užívateľ zobraziť dáta a potom vybrať konkrétne stĺpce. Pomocou tlačidla Pridať do grafu aplikácia zobrazí všetky vybrané stĺpce do grafu. Na odstránenie pridaných stĺpcov slúži tlačidlo Odstrániť z grafu.",
    "hedaer-data-analysis": "Analýza dát",
    "data-analysis-decription": "Analýza dát slúži užívateľovi pre zobrazenie gradientu, kĺzavého priemeru z gradientu a pre štatistické výpočty.",
    "header-database": "Databáza",
    "database-description": "Databáza slúži pre zobrazenie hodnôt z daného súbora."

  };

  const whitelistLang = ["sk", "en"];

  function initLang() {
    var defaultLang = window.navigator.language.slice(0, 2);
    if (whitelistLang.includes(defaultLang)) {
      localStorage.setItem("lang", defaultLang);
      return defaultLang
    }

    return localStorage.getItem('lang') || "sk"
  }

  $(document).ready(function () {

    // var lang = "sk";
    var lang = initLang();

    console.log("jazyk:", lang);

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

}($));
