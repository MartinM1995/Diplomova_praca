const mongoose = require("mongoose");

export const ALLOWED_STATUS = ["Netestovaný", "Vyhovujúci", "Nevyhovujúci"];

export const DataSchema = new mongoose.Schema(
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
export const Data = mongoose.model("Data", DataSchema);
export const DataModel = new Data();

export function connectDB() { 
  mongoose.connect("mongodb://178.128.195.197:27017/mroc-dipl", { useUnifiedTopology: true, useNewUrlParser: true });
  //mongodb://localhost:27017/mroc-dipl
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error:"));
  db.once("open", function() {
    console.log("Pripojenie do databázy prebehlo úspešne.");
  });
}

export function dropDB() {
  DataModel.remove({}, function(err) {
    if (err) {
      console.log(err)
      return
    }

    console.log("Databaza bola vymazana.")
  })
}
