export function generateSignals(coins, fundingRates) {

  const signals = []

  coins.forEach(c => {

    let score = 0
    let bias = "NEUTRAL"

    // momentum
    if (c.change24h > 3) {
      score++
      bias = "LONG"
    }

    if (c.change24h < -3) {
      score++
      bias = "SHORT"
    }

    // volume strength
    if (c.volume24h > 1000000000) score++

    // funding imbalance
    const funding = fundingRates.find(f => f.symbol === c.symbol + "USDT")

    if (funding) {

      if (funding.fundingRate < -0.01) {
        score++
        bias = "LONG"
      }

      if (funding.fundingRate > 0.01) {
        score++
        bias = "SHORT"
      }

    }

    if (score >= 2) {

      signals.push({
        symbol: c.symbol,
        bias,
        confidence: score,
        price: c.price,
        change24h: c.change24h
      })

    }

  })

  return signals

}