import axios from "axios"
import { generateSignals } from "./engine.js"
import { getFundingRates } from "./funding.js"

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
          limit: "50",
          convert: "USD"
        }
      }
    )

    const coins = res.data.data.map(c => ({
      symbol: c.symbol,
      price: c.quote.USD.price,
      change24h: c.quote.USD.percent_change_24h,
      volume24h: c.quote.USD.volume_24h
    }))

    const fundingRates = await getFundingRates()

    const signals = generateSignals(coins, fundingRates)

    return signals

  } catch (err) {

    return { error: err.message }

  }

}