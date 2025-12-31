import express from "express";
import cors from "cors";
import { recommendCrop } from "./cropLogic.js";
import { detectDisease } from "./diseaseLogic.js";
import { predictPrice } from "./marketLogic.js";
import { detectDiseaseFromImage } from "./imageDiseaseLogic.js";
const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/ml/crop-recommendation", (req, res) => {
  res.json(recommendCrop(req.body));
});

app.post("/api/ml/disease-detect", (req, res) => {
  res.json(detectDisease(req.body));
});

app.post("/api/ml/market-price", (req, res) => {
  res.json(predictPrice(req.body));
});

app.post("/api/ml/disease-from-image", (req, res) => {
  const { filename, crop } = req.body;
  res.json(detectDiseaseFromImage(filename, crop));
});

app.listen(6001, () => console.log("Mock ML running on 6001"));
