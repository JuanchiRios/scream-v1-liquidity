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


# Deploy process
- npm run docker:login
- npm run docker:build
- npm run docker:tag
- npm run docker:push

- npm run ssh

On the server instance:
- docker login -u AWS -p $(aws ecr get-login-password --region  us-east-1) 054734420187.dkr.ecr.us-east-1.amazonaws.com
- docker pull 054734420187.dkr.ecr.us-east-1.amazonaws.com/scream-liquidity-provider-alpine:latest
- docker ps
- docker stop CONTAINER_ID
- docker rm CONTAINER_ID
- docker run -d 054734420187.dkr.ecr.us-east-1.amazonaws.com/scream-liquidity-provider-alpine:latest

* all these commands can be simplified if we were interested in multiple people deploying.
* I don't expect so, hence I'm not spending time on it until it becomes the case.