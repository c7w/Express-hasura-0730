import { GraphQLClient } from "graphql-request";

// const client = new GraphQLClient("http://localhost:8080/v1/graphql", {
const client = new GraphQLClient("http://121.5.165.232:10004/v1/graphql", {
  headers: {
    "Content-Type": "application/json",
  },
});

export default client;
