import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';


const httpLink = createHttpLink({
    uri: process.env.apiUrl, 
});

const authLink = setContext((_, { headers }) => {
  const apiKey = process.env.apiKey;

  return {
    headers: {
      ...headers,
      apiKey: apiKey,
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;