export function predictPrice({ crop }) {
  const prices = {
    Rice: 2200,
    Millets: 1800,
    Tomato: 1600
  };

  return {
    crop,
    price: prices[crop] || 1500,
    trend: "stable",
    confidence: 0.7
  };
}
