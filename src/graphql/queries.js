import gql from "graphql-tag";
export const listItems = gql`
  query {
    listItems {
      items {
        id
        name
        status
        description
      }
    }
  }
`;

export const getItem = gql`
  query getItem($savedId: String!) {
    getItem(id: $savedId) {
      id
      name
      status
      description
    }
  }
`;
