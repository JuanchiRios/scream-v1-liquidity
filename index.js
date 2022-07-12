const { getTokens, runValidations } = require('./src/config');
const { process } = require('./src/scream-liquidity-processor');
const { sendMessage } = require('./src/telegram.client');
const tokens = getTokens();

runValidations();

sendMessage(`Initiliazed bot - tokens ${tokens}`);

console.info(`Executing Scream sh v1 liquidity seeker for tokens: ${tokens}`);

function main() {
  process()
  .then(() => console.info('Waiting 1 minute until next execution :D'));
}

main();
// Second will be executed in one minute
setInterval(main, 60 * 1000);
