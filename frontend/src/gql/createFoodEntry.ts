import { gql } from '@apollo/client';

const CreateFoodEntry = gql`
  mutation CreateFoodEntry(
    $calories: Int!
    $foodName: String!
    $foodTakeOnDate: String!
    $foodTakeOnTime: String
    $price: Int
  ) {
    createFoodEntry(
      calories: $calories
      foodName: $foodName
      foodTakeOnDate: $foodTakeOnDate
      foodTakeOnTime: $foodTakeOnTime
      price: $price
    ) {
      price
    }
  }
`;

export default CreateFoodEntry;
