import { gql } from '@apollo/client';

const getUserData = gql`
  query {
    user {
      id
      username
      email
      firstName
      lastName
      role
      calorieLimit
      budgetLimit
    }
  }
`;

export default getUserData;
