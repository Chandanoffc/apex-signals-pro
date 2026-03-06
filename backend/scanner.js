import axios from "axios";

export async function scanMarket() {

  try {

    const res = await axios.get(
      "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest",
      {
        headers: {
          "X-CMC_PRO_API_KEY": process.env.CMC_KEY
        },
        params: {
          start: "1",
          limit: "10",
          convert: "USD"
        }
      }
    );

    const data = res.data.data;

    const signals = data.map(c => ({
      symbol: c.symbol,
      price: c.quote.USD.price,
      change24h: c.quote.USD.percent_change_24h,
      volume24h: c.quote.USD.volume_24h,
      marketCap: c.quote.USD.market_cap
    }));

    return signals;

  } catch (err) {

    return { error: err.message };

  }

}