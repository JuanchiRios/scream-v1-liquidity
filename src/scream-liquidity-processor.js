const { format } = require('date-fns');
const { getTokens } = require('./config');
const { fetchLiquidityForTokens } = require('./scream.service');
const { notifyLiquidity } = require('./notification.service');

async function process() {
  const now = new Date();
  console.info(format(now, "yyyy/MM/dd hh:mm:ss"));
  const tokensWithMinimumLiquidity = await fetchLiquidityForTokens(getTokens())
  await notifyLiquidity(tokensWithMinimumLiquidity);
}

module.exports = {
  process
}
