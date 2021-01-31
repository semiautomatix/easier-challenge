import { ApolloClient, InMemoryCache, makeVar } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://rickandmortyapi.com/graphql',
  cache: new InMemoryCache(),
});

export default client

export const locationIdVar = makeVar<number|undefined>(undefined);