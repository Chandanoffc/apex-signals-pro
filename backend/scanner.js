import axios from "axios";

export async function scanMarket() {

  try {

    const res = await axios.get(
      "https://api.coingecko.com/api/v3/coins/markets",
      {
        params: {
          vs_currency: "usd",
          order: "volume_desc",
          per_page: 10,
          page: 1
        }
      }
    );

    const data = res.data;

    const signals = data.map(c => ({
      symbol: c.symbol.toUpperCase(),
      price: c.current_price,
      volume: c.total_volume,
      change24h: c.price_change_percentage_24h
    }));

    return signals;

  } catch (err) {

    return { error: err.message };

  }

}