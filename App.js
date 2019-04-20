import React from "react";
import AWSAppSyncClient from "aws-appsync";
import { ApolloProvider } from "react-apollo";
import awsConfig from "./src/global/config";
import Home from "./src/screens/Home";

export const client = new AWSAppSyncClient({
  url: awsConfig.aws_appsync_graphqlEndpoint,
  region: awsConfig.aws_appsync_region,
  auth: {
    type: awsConfig.aws_appsync_authenticationType,
    apiKey: awsConfig.aws_appsync_apiKey
  }
});
const WithProvider = () => (
  <ApolloProvider client={client}>
    <Home />
  </ApolloProvider>
);

export default WithProvider;
