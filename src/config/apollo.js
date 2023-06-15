import {
    ApolloClient,
    ApolloLink,
    createHttpLink,
    from,
    InMemoryCache,
} from '@apollo/client/core';
import { RetryLink } from '@apollo/client/link/retry';
import { onError } from '@apollo/client/link/error';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import { createClient } from 'graphql-ws';

import storage from 'store';
//import { useIdentityStore } from 'src/stores/identity';

import { Notify } from 'quasar';

//const store = useIdentityStore();

// Add bearer token to existing header (if any)
// and return connectionParams object
const connectionParams = (headers = {}) => {
    const token = storage.get('token');
    return token ?
        {
            headers: {
                ...headers,
                authorization: `Bearer ${token}`,
            },
        } :
        headers;
};

// Apollo link for use with queries and mutations
const httpLink = createHttpLink({
    uri: process.env.HINDEKE_GRAPHQL_HTTP_URL,
});

// Apollo link for use with subscriptions
const wsLink = new GraphQLWsLink(
    createClient({
        url: process.env.HINDEKE_GRAPHQL_WS_URL,
    })
);

// Callback for checking if the GraphQL operation is a subscription
const subscriptionCheck = ({ query }) => {
    const definition = getMainDefinition(query);
    return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
    );
};

// RetryLink().split() - Apollo directional link composition (branching link chain)
// --------------------------------------------------------------------
// Uses wsLink if the subscriptionCheck returns true,
// or httpLink if subscriptionCheck returns false
const baseLink = new RetryLink.split(subscriptionCheck, wsLink, httpLink);

// onError() - Apollo error handler link
const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
        // Token invalid or expired
        if (graphQLErrors[0].extensions.code === 'invalid-jwt') {
            Notify.create({
                message: 'Session Expired',
                type: 'negative',
            });
        } else {
            console.log(graphQLErrors);
        }
        if (networkError) {
            Notify.create({
                message: 'Unable to connect to the server. Please try again later.',
                type: 'negative',
            });
        }
    }
});

// Link for authentication handling (puts token in the header basically)
const authMiddleware = new ApolloLink((operation, forward) => {
    operation.setContext(({ headers = {} }) => {
        return connectionParams(headers);
    });
    return forward(operation);
});

const link = from([errorLink, authMiddleware, baseLink]);

// InMemoryCache for queries
const cache = new InMemoryCache({
    addTypename: false,
});

// Client
export const hindekeClient = new ApolloClient({
    cache: cache,
    link: link,
    defaultOptions: {
        query: {
            // fetchPolicy: 'cache-and-network',
            fetchPolicy: 'no-cache',
        },
        watchQuery: {
            fetchPolicy: 'cache-and-network',
            // fetchPolicy: 'no-cache',
        },
        mutate: {
            // fetchPolicy: 'cache-and-network',
            fetchPolicy: 'no-cache',
        },
    },
});