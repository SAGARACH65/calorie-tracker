import { gql } from '@apollo/client';

const getUserConsumedFood = gql`
  query {
    foodEntries {
      id
      name
      calorieCount
      foodTakenOnDate
      foodTakenOnTime
      price
      createdAt
    }
  }
`;

export default getUserConsumedFood;
