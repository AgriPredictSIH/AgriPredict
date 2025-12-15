/* -----------------------------------------
   Crop Recommendation
----------------------------------------- */
export async function getCropRecommendation(input) {
  const res = await fetch(
    "http://localhost:6001/api/ml/crop-recommendation",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input)
    }
  );
  if (!res.ok) {
    throw new Error("ML service failed");
  }

  return res.json();
}

/* -----------------------------------------
   Disease Detection
----------------------------------------- */
export async function detectDisease(input) {
  const res = await fetch(
    "http://localhost:6001/api/ml/disease-detect",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input)
    }
  );

  return res.json();
}

/* -----------------------------------------
   Market Price Prediction
----------------------------------------- */
export async function getMarketPrice(input) {
  const res = await fetch(
    "http://localhost:6001/api/ml/market-price",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input)
    }
  );

  return res.json();
}
