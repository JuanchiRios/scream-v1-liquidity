const { fetchAllMarkets } = require('../src/scream.client')
const { GraphQLClient } = require('graphql-request')

jest.mock('graphql-request')

const graphqlClientInstanceMock = { request: jest.fn() }

describe('Scream Client', () => {
  beforeEach(() => {
    GraphQLClient.mockImplementationOnce(() => graphqlClientInstanceMock)
  })

  test('fetchAllMarkets: it retries up to 5 consecutive times before throwing the Error', async () => {
    const errorMessage = 'custom error'
    graphqlClientInstanceMock.request.mockImplementation(() => {
      throw new Error(errorMessage);
    })
    try {
      await fetchAllMarkets();
    } catch (error) {
      expect(graphqlClientInstanceMock.request).toHaveBeenCalledTimes(5);
      expect(error.message).toEqual(errorMessage)
    }
  });
});
