import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const GRAPHQL_URL = 'http://localhost:3000/graphql';

const client = new ApolloClient({
  link: new HttpLink({
    uri: GRAPHQL_URL,
    credentials: 'same-origin',
  }),
  cache: new InMemoryCache(),
});

export default client;
