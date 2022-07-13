const _ = require('lodash');
const config = require("./config/config.json")

const { TELEGRAM_BOT_API_KEY, TELEGRAM_CHANNEL_ID, SERVER_NAME } = process.env;

function getTokens() {
  return config.tokens;
}

function getTelegramBotApiKey() {
  return TELEGRAM_BOT_API_KEY;
}

function getServerName() {
  return SERVER_NAME || '';
}

function getTelegramCredentials() {
  return {
    TELEGRAM_BOT_API_KEY,
    TELEGRAM_CHANNEL_ID
  }
}

function __envVarsValidations() {
  if (_.isEmpty(TELEGRAM_BOT_API_KEY)) {
    throw new Error("Missing env var: TELEGRAM_BOT_API_KEY. See 'Environment Variables' section in README.MD ");
  }
  if (_.isEmpty(TELEGRAM_CHANNEL_ID)) {
    throw new Error("Missing env var: TELEGRAM_CHANNEL_ID. See 'Environment Variables' section in README.MD ");
  }
}

function runValidations() {
  if (getTokens().length < 1) {
    throw new Error("configure tokens property in /src/config/config.json");
  }
  __envVarsValidations();
}

module.exports = {
  getTokens,
  getTelegramCredentials,
  runValidations,
  getServerName
}
