import axios from "axios";

export async function scanMarket() {

  try {

    const res = await axios.get(
      "https://api.coingecko.com/api/v3/simple/price",
      {
        params: {
          ids: "bitcoin,ethereum,solana,binancecoin,xrp,dogecoin,cardano,avalanche-2",
          vs_currencies: "usd",
          include_24hr_change: "true"
        }
      }
    );

    const data = res.data;

    const signals = Object.keys(data).map(k => ({
      symbol: k.toUpperCase(),
      price: data[k].usd,
      change24h: data[k].usd_24h_change
    }));

    return signals;

  } catch (err) {

    return { error: err.message };

  }

}