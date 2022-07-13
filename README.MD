# scream-v1-liquidity

Node script to pull data from scream sh v1 and notify thru a telegram channel when there is available liquidity for
tokens

# Roadmap

* implement telegram notifier

# Configuration

The config file is located in `./src/config/config.json`. Make sure to configure the tokens of interest.

# How to install dependencies?

```
npm install
```

# How to run the script?

```
node index.js
```

# How to run test?

```
npm test
```

# Doubts about the scream v1 model?

For more information, visit: https://thegraph.com/hosted-service/subgraph/screamsh/scream-v1?query=Market%20query

# Environment Variables

You can export an environment variable by simply running

```
export TELEGRAM_BOT_API_KEY=<your_api_key>
```

Or create .env file in the root of the project and then you can `npm run` to execute the script

```
TELEGRAM_BOT_API_KEY=<your_api_key>
TELEGRAM_CHANNEL_ID=<your_channel_name>
SERVER_NAME=<your-name>
```
