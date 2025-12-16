export async function getCropRecommendation(input) {
  const res = await fetch("http://localhost:6001/api/ml/crop-recommendation", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input)
  });
  return res.json();
}

export async function detectDisease(input) {
  const res = await fetch("http://localhost:6001/api/ml/disease-detect", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input)
  });
  return res.json();
}

export async function getMarketPrice(input) {
  const res = await fetch("http://localhost:6001/api/ml/market-price", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input)
  });
  return res.json();
}


export async function detectDiseaseFromImage(input) {
  const res = await fetch("http://localhost:6001/api/ml/disease-from-image", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input)
  });
  return res.json();
}

