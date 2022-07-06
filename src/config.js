const config = require("./config/config.json")

function getTokens() {
  return config.tokens;
}

module.exports = {
  getTokens,
}
