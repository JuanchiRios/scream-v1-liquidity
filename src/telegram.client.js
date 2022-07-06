const axios = require('axios').default;
const { getTelegramCredentials } = require('./config')

async function sendMessage(message) {
  const {
    TELEGRAM_BOT_API_KEY,
    TELEGRAM_CHANNEL_ID
  } = getTelegramCredentials();

  const URL = `https://api.telegram.org/bot${TELEGRAM_BOT_API_KEY}/sendMessage?chat_id=${TELEGRAM_CHANNEL_ID}&text=${message}`;

  return axios.get(URL).catch(function (error) {
    console.error(`Error while sending message to telegram channel: ${JSON.stringify(error.toJSON(), null, 2)}`);
    throw error;
  });
}

module.exports = {
  sendMessage
}
