/**
 * Fetch available liquidity for the specified tokens
 * @param tokens Array<String>
 */
const { fetchAllMarkets } = require('./scream.client');

async function fetchLiquidityForTokens(tokens) {
  const markets = await fetchAllMarkets();

  const tokensOfInterest = mapAndFilterResponse(markets, tokens);

  return tokensOfInterest.filter(({ liquidityInUSD }) => liquidityInUSD > 100);
}

/**
 * {
 *   underlyingSymbol: Underlying token symbol
 *   cash: The cToken contract balance of ERC20 or ETH
 *   underlyingPriceUSD: Underlying token price in USD
 * }
 * @param markets froms scream v1
 * @param tokensOfInterest tokens of interest
 * @returns enriched and filtered markets
 *   {
 *       liquidityInToken: number,
 *       liquidityInUSD: number,
 *       symbol: string,
 *       priceInUSD: number
 *    }
 * @private
 */
function mapAndFilterResponse(markets, tokensOfInterest) {

  return markets.map(({ underlyingSymbol, cash, underlyingPriceUSD }) => {
    return {
      liquidityInToken: cash,
      liquidityInUSD: underlyingPriceUSD * cash,
      symbol: underlyingSymbol,
      priceInUSD: underlyingPriceUSD
    }
  }).filter(({ symbol }) => tokensOfInterest.includes(symbol));
}

module.exports = {
  fetchLiquidityForTokens,
  __private__: {
    mapAndFilterResponse
  }
}
