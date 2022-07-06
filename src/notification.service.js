const cowsay = require("cowsay");
const { isAfter, addHours } = require('date-fns');
const { sendMessage } = require("./telegram.client");
// Map<string, Date> [["btc", '2022/12/25 20:38:54']]
const notifiedTokensWithDate = new Map();

function notifyLiquidity(tokensWithMinimumLiquidity) {
  if (tokensWithMinimumLiquidity.length === 0) {
    console.info("No liquidity available");
    return;
  }
  return __notifyOnceEvery60Minutes(tokensWithMinimumLiquidity);
}

async function __notifyOnceEvery60Minutes(tokensWithMinimumLiquidity) {
  const now = new Date();
  const tokensToNotify = tokensWithMinimumLiquidity.filter(({ symbol }) =>
    !notifiedTokensWithDate.has(symbol)
    || isAfter(now, addHours(notifiedTokensWithDate.get(symbol), 1)));

  if (tokensToNotify.length === 0) {
    const message = JSON.stringify(tokensWithMinimumLiquidity, null, 2);
    console.info(`There is liquidity but all tokens have already been notified: \n${message}`)
    return;
  }

  await __notify(tokensToNotify);

  // updating lastNotifationTime for each token
  tokensToNotify.forEach(({ symbol }) => notifiedTokensWithDate.set(symbol, now));

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
