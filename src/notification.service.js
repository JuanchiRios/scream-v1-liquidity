const cowsay = require("cowsay");


async function notifyLiquidity(tokensWithMinimumLiquidity) {
  tokensWithMinimumLiquidity.length === 0
    ? console.info("No liquidity available")
    : __notify(tokensWithMinimumLiquidity);
}

function __notify(tokensWithMinimumLiquidity){
  // TODO implement telegram notification service
  console.info(cowsay.say({
    text : "There is liquidity bitch",
    e : "oO",
    T : "U "
  }));

  console.info(`tokens with minimum liquidity: ${JSON.stringify(tokensWithMinimumLiquidity, null, 2)}`)
}

module.exports = {
  notifyLiquidity
}
