const cowsay = require("cowsay");
const { isAfter, addHours } = require('date-fns');
const { sendMessage } = require("./telegram.client");
// Map<string, Date> [["btc", { 'notifiedDate' :'2022/12/25 20:38:54', 'liquidityInUSD': 300}]]
const notifiedTokensWithDate = new Map();

/**
 *
 * @param tokensWithMinimumLiquidity
 * [ {
 *       liquidityInToken: number,
 *       liquidityInUSD: number,
 *       symbol: string,
 *       priceInUSD: number
 *    }
 * ]
 * @returns {Promise<void>}
 */
//TODO add tests
function notifyLiquidity(tokensWithMinimumLiquidity) {
  if (tokensWithMinimumLiquidity.length === 0) {
    console.info("No liquidity available");
    return;
  }
  return __notifyOnceEvery60MinutesForSameLiquidity(tokensWithMinimumLiquidity);
}

/**
 * Avoids duplicate notifications for the same liquidity in USD within the last hour.
 */
async function __notifyOnceEvery60MinutesForSameLiquidity(tokensWithMinimumLiquidity) {
  const now = new Date();
  const tokensToNotify = tokensWithMinimumLiquidity.filter(({ symbol, liquidityInUSD }) =>
    !notifiedTokensWithDate.has(symbol)
    || isAfter(now, addHours(notifiedTokensWithDate.get(symbol).notifiedDate, 1))
    || notifiedTokensWithDate.get(symbol).liquidityInUSD !== liquidityInUSD
  );

  if (tokensToNotify.length === 0) {
    const message = JSON.stringify(tokensWithMinimumLiquidity, null, 2);
    console.info(`There is liquidity but all tokens have already been notified: \n${message}`)
    return;
  }

  await __notify(tokensToNotify);

  // updating lastNotifationTime and liquidityInUSD for each token
  tokensToNotify.forEach(({ symbol, liquidityInUSD }) =>
    notifiedTokensWithDate.set(symbol, { 'notifiedDate': now, 'liquidityInUSD': liquidityInUSD}));

}

function __notify(tokensWithMinimumLiquidity) {

  const cowsayMessage = cowsay.say({
    text: "There is liquidity bitch",
    e: "oO",
    T: "U "
  });

  console.info(cowsayMessage);

  const message = JSON.stringify(tokensWithMinimumLiquidity, null, 2);
  console.info(`tokens with minimum liquidity: ${message}`)

  return sendMessage(`${cowsayMessage}\n${message}`);
}

module.exports = {
  notifyLiquidity
}
