import express from "express";
import path from "path";
import bodyParser from "body-parser";
import cors from "cors";
import apiRoutes from "./api";
import { connectDB, Data } from "./db";

const app = express();

connectDB();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/** API path that will upload the files */
app.use("/api", apiRoutes);

app.use("/", express.static(path.join(__dirname, "../public")));

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

app.listen("80", function() {
  console.log("running on 3000...");
});
