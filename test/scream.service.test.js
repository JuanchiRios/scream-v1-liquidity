const {
  fetchLiquidityForTokens, __private__: { mapAndFilterResponse }
} = require('../src/scream.service');
const screamClient = require('../src/scream.client')
const allMarkets = require('./resources/all-markets.json')

jest.mock('../src/scream.client');

const { fetchAllMarkets } = screamClient;
const BOO_WITH_LIQUIDITY = {
  "liquidityInToken": "3050.43628099979484799",
  "liquidityInUSD": 6190.257419200719,
  "symbol": "BOO",
  "priceInUSD": "2.029302319067563981"
}

describe('Scream Service', () => {
  test('mapAndFilterResponse: valid scream response, response is mapped and filtered according to tokens of interest',
    () => {

      const tokensOfInterest = mapAndFilterResponse(allMarkets, [BOO_WITH_LIQUIDITY.symbol]);

      expect(tokensOfInterest).toEqual([BOO_WITH_LIQUIDITY]);
    });

  test('fetchLiquidityForTokens: scream response without liquidity for token, returns empty array', async () => {
    fetchAllMarkets.mockImplementationOnce(() => Promise.resolve(allMarkets));

    // mock scream client fetchAllMarkets
    const tokensWithMinimumLiquidity = await fetchLiquidityForTokens(["BTC"]);

    expect(tokensWithMinimumLiquidity).toEqual([]);
  });

  test('fetchLiquidityForTokens: scream response with liquidity for token, returns tokens', async () => {
    fetchAllMarkets.mockImplementationOnce(() => Promise.resolve(allMarkets));

    // mock scream client fetchAllMarkets
    const tokensWithMinimumLiquidity = await fetchLiquidityForTokens([BOO_WITH_LIQUIDITY.symbol]);

    expect(tokensWithMinimumLiquidity).toEqual([BOO_WITH_LIQUIDITY]);
  });
});
