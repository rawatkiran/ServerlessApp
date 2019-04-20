import gql from "graphql-tag";
export const createItem = gql`
  mutation CreateItem($name: String!, $status: Boolean!) {
    createItem(input: { name: $name, status: $status }) {
      id
      name
      status
    }
  }
`;
