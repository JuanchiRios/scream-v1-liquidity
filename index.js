const { getTokens, runValidations, getServerName } = require('./src/config');
const { process } = require('./src/scream-liquidity-processor');
const { sendMessage } = require('./src/telegram.client');
const tokens = getTokens();

const serverNameMessage = getServerName() ? `- Ratpartner: ${getServerName()} ` : ``

runValidations();

sendMessage(`Initiliazed bot ${serverNameMessage}- tokens ${tokens}`);

console.info(`Executing Scream sh v1 liquidity seeker ${serverNameMessage}for tokens: ${tokens}`);

function main() {
  process()
}

main();
// Second will be executed in one minute
setInterval(main, 10 * 1000);
