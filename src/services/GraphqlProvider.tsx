import React, { useContext } from "react";
import { InMemoryCache } from "apollo-cache-inmemory";
import ApolloClient from "apollo-client";
import { split } from "apollo-link";
import { HttpLink } from "apollo-link-http";
import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "apollo-utilities";
import { ApolloProvider } from "react-apollo";

import { authCtx } from "../auth/contexts";

const GraphqlProvider = ({ children }: React.PropsWithChildren<any>) => {
  const authState = useContext(authCtx);
  const isIn = authState.status === "in";

  const headers = isIn ? { Authorization: `Bearer ${authState.token}` } : {};

  const httpLink = new HttpLink({
    uri: "https://famous-pigeon-73.hasura.app/v1/graphql",
    headers
  });

  const wsLink = new WebSocketLink({
    uri: "wss://famous-pigeon-73.hasura.app/v1/graphql",
    options: {
      reconnect: true,
      connectionParams: {
        headers
      }
    }
  });

  const link = split(
    ({ query }) => {
      const { kind, operation } = getMainDefinition(query);
      return kind === "OperationDefinition" && operation === "subscription";
    },
    wsLink,
    httpLink
  );

  const client = new ApolloClient({
    link,
    cache: new InMemoryCache()
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default GraphqlProvider;
