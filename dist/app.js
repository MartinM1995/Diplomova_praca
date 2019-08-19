'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var express = _interopDefault(require('express'));
var path = _interopDefault(require('path'));
var bodyParser = _interopDefault(require('body-parser'));
var multer = _interopDefault(require('multer'));
var xlstojson = _interopDefault(require('xls-to-json-lc'));
var xlsxtojson = _interopDefault(require('xlsx-to-json-lc'));
var mongoose$1 = _interopDefault(require('mongoose'));

const mongoose = require("mongoose");

const DataSchema = new mongoose.Schema(
  {
    _id: "String",
    name: "String",
    filePath: "String",
    status: "String",
    data: {
      k4_co: "String",
      k4_co2: "String",
      k4_h2: "String",
      k4_o2: "String",
      k41_p_o2_out: "String",
      k41_prietok_o2: "String",
      k41_vyska_trysky: "String",
      k42_p_o2_out: "String",
      k42_prietok_o2: "String",
      k42_vyska_trysky: "String",
      oc2_comm1_k4_fukanie: "String",
      oc2_k4_dynamicky_model_rychlost_oduhlicenia: "String",
      oc2_k4_p_podtlak_pretlak_dymnik: "String",
      oc2_k4_zkp_analyza_co2_q4341b: "String",
      oc2_k4_zkp_analyza_co_q4341a: "String",
      oc2_k4_zkp_analyza_h2_q4341d: "String",
      oc2_k4_zkp_analyza_o2_q4341c: "String",
      oc2_k4_zkp_prietok_spalin_aktualny: "String",
      oc2_k4_zkp_prietok_spalin_normovany: "String",
      oc2_k4_zkp_tep_odpad_plyn_vent_t4339_1: "String",
      oc2_k4_zkp_tep_odpad_plyn_vent_t4339_2: "String",
      oc2_k4_zkp_tlak_odpad_plyn_vent_p4338: "String",
      oc2_plck4_meranie_prietoku_spal_promecon: "String",
      oc2_plck4_podtlak_granivor_vystup: "String",
      oc2_plck4_vai_hladina_vody_v_kvap_odlucovaci_l4388: "String",
      oc2_plck4_vai_teplota_1_na_vst_do_granivoru: "String",
      oc2_plck4_vai_teplota_1_odpad_plyn_za_gran: "String",
      oc2_plck4_vai_teplota_2_na_vst_do_granivoru: "String",
      oc2_plck4_vai_teplota_2_odpad_plyn_za_gran: "String",
    },
  },
  { strict: false }
);
const Data = mongoose.model("Data", DataSchema);
const DataModel = new Data();

function connectDB() {
  mongoose.connect("mongodb://localhost:27017/mroc-dipl", { useNewUrlParser: true });

  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error:"));
  db.once("open", function() {
    console.log("Pripojenie do databázy prebehlo úspešne.");
  });
}

const app = express();

connectDB();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var storage = multer.diskStorage({
  //multers disk storage settings
  destination: function(req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function(req, file, cb) {
    var datetimestamp = Date.now();
    cb(
      null,
      file.fieldname + "-" + datetimestamp + "." + file.originalname.split(".")[file.originalname.split(".").length - 1]
    );
  },
});

var upload = multer({
  //multer settings
  storage: storage,
  fileFilter: function(req, file, callback) {
    //file filter
    if (["xls", "xlsx"].indexOf(file.originalname.split(".")[file.originalname.split(".").length - 1]) === -1) {
      return callback(new Error("Wrong extension type"));
    }
    callback(null, true);
  },
}).single("file");

/** API path that will upload the files */
app.post("/upload", function(req, res) {
  var exceltojson;
  upload(req, res, function(err) {
    if (err) {
      res.json({ error_code: 1, err_desc: err });
      return;
    }
    /** Multer gives us file info in req.file object */
    if (!req.file) {
      res.json({ error_code: 1, err_desc: "No file passed" });
      return;
    }
    /** Check the extension of the incoming file and
     *  use the appropriate module
     */
    if (req.file.originalname.split(".")[req.file.originalname.split(".").length - 1] === "xlsx") {
      exceltojson = xlsxtojson;
    } else {
      exceltojson = xlstojson;
    }
    console.log(req.file.path);
    try {
      exceltojson(
        {
          input: req.file.path,
          output: null, //since we don't need output.json
          lowerCaseHeaders: true,
        },
        function(err, result) {
          if (err) {
            return res.json({ error_code: 1, err_desc: err, data: null });
          }
          const doc = new Data({
            _id: new mongoose$1.Types.ObjectId(),
            name: req.file.filename,
            filePath: req.file.path,
            data: result,
            status: "NOT_TESTED"
          });
          doc.save(result, function(err, success) {
            if (err) {
              console.error(err);
              return;
            }
            console.log(success);
            console.log(success._id);
            res.json({ error_code: 0, err_desc: null, data: result });
          });
        }
      );
    } catch (e) {
      res.json({ error_code: 1, err_desc: "Corupted excel file" });
    }
  });
});

app.get("/data", function(req, res) {
  Data.find({}, function(err, result) {
    if (err) {
      res.json({ error_code: 1, err_desc: "Empty dataset" });
    } else {
      res.json({ error_code: 0, err_desc: null, data: result });
    }
  });
});

app.get("/data/:id", function(req, res) {
  Data.findById(req.params.id, function(err, result) {
    if (err) {
      res.json({ error_code: 1, err_desc: "Empty dataset" });
    } else {
      console.log(result);
      res.json({ error_code: 0, err_desc: null, data: result });
    }
  });
});

app.use('/', express.static(path.join(__dirname, '../public')));

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

app.listen("3000", function() {
  console.log("running on 3000...");
});
//# sourceMappingURL=app.js.map
