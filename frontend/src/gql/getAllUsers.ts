import { gql } from '@apollo/client';

const getAllUsers = gql`
  query {
    allUsers {
      id
      username
    }
  }
`;

export default getAllUsers;
