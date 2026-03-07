import axios from "axios"

export async function getFundingRates() {

  try {

    const res = await axios.get(
      "https://fapi.binance.com/fapi/v1/premiumIndex"
    )

    const data = res.data

    const signals = data
      .filter(x => Math.abs(parseFloat(x.lastFundingRate)) > 0.01)
      .slice(0, 30)
      .map(x => ({
        symbol: x.symbol,
        fundingRate: parseFloat(x.lastFundingRate),
        markPrice: parseFloat(x.markPrice)
      }))

    return signals

  } catch (err) {

    return []

  }

}