import { gql } from '@apollo/client';

const getAllFoods = gql`
  query {
    allFoodEntries {
      id
      name
      calorieCount
      foodTakenOnDate
      foodTakenOnTime
      price
      createdAt
      username
    }
  }
`;

export default getAllFoods;
