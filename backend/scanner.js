import axios from "axios";

export async function scanMarket() {

  try {

    const res = await axios.get(
      "https://fapi.binance.com/fapi/v1/premiumIndex"
    );

    const data = res.data;

    const signals = data
      .filter(x => Math.abs(parseFloat(x.lastFundingRate)) > 0.01)
      .slice(0, 10)
      .map(x => ({
        symbol: x.symbol,
        fundingRate: x.lastFundingRate,
        markPrice: x.markPrice
      }));

    return signals;

  } catch (err) {

    return { error: err.message };

  }

}