const { getTokens } = require('./src/config')
const { process } = require('./src/scream-liquidity-processor')
const tokens = getTokens();

if (tokens.length < 1) {
  throw new Error("configure tokens property in /src/config/config.json");
}

console.info(`Executing Scream sh v1 liquidity seeker for tokens: ${tokens}`);

function main() {
  process().then( () => console.info('Waiting 1 minute until next execution :D'));
}

main();
// Second will be executed in one minute
setInterval(main, 60 * 1000);
