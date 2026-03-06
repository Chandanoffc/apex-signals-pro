import axios from "axios";

export async function scanMarket() {

  try {

    const res = await axios.get("https://api.coincap.io/v2/assets?limit=10");

    const data = res.data.data;

    const signals = data.map(c => ({
      symbol: c.symbol,
      price: parseFloat(c.priceUsd),
      change24h: parseFloat(c.changePercent24Hr),
      marketCap: parseFloat(c.marketCapUsd)
    }));

    return signals;

  } catch (err) {

    return { error: err.message };

  }

}