import axios from "axios";

let cachedData = null;
let lastFetch = 0;

export async function scanMarket() {
  const now = Date.now();

  // Use cached data if last request was within 60 seconds
  if (cachedData && now - lastFetch < 60000) {
    return cachedData;
  }

  try {
    const res = await axios.get(
      "https://api.coingecko.com/api/v3/coins/markets",
      {
        params: {
          vs_currency: "usd",
          order: "volume_desc",
          per_page: 10,
          page: 1
        },
        headers: {
          "User-Agent": "apex-signals"
        }
      }
    );

    const signals = res.data.map(c => ({
      symbol: c.symbol.toUpperCase(),
      price: c.current_price,
      volume: c.total_volume,
      change24h: c.price_change_percentage_24h
    }));

    cachedData = signals;
    lastFetch = now;

    return signals;

  } catch (err) {
    return { error: err.message };
  }
}