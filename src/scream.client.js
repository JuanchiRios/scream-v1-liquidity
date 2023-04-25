const { gql, GraphQLClient } = require('graphql-request');

let __graphQLClient;

const SCREAM_API_ENDPOINT = 'https://api.thegraph.com/subgraphs/name/screamsh/scream-v1'

const MARKETS_REQUEST_BODY = gql`
    {
        markets(first: 100) {
            underlyingSymbol
            cash
            underlyingPriceUSD
        }
    }
`;

async function fetchAllMarkets(retries = 5) {
  const graphQLClient = __getGraphQLClient(SCREAM_API_ENDPOINT);
  let response;
  try {
    response = await graphQLClient.request(MARKETS_REQUEST_BODY);
    return response.markets;
  } catch (error) {
    console.error(`Error while fetching the markets from scream. Details: ${error}`);
    if (retries > 1) {
      return fetchAllMarkets(retries - 1)
    }
    throw error
  }

}


function __getGraphQLClient(graphqlServerURL) {
  __graphQLClient = __graphQLClient || new GraphQLClient(graphqlServerURL, {});
  return __graphQLClient;
}

module.exports = {
  fetchAllMarkets
}
