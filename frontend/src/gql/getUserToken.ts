import { gql } from '@apollo/client';

const getUsetToken = gql`
  mutation UserToken($userName: String!) {
    userToken(userName: $userName) {
      id
      userToken
      role
    }
  }
`;

export default getUsetToken;
