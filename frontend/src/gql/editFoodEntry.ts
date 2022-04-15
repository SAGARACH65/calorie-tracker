import { gql } from '@apollo/client';

const EditFoodEntry = gql`
  mutation EditFoodEntry(
    $id: String!
    $calories: Int!
    $foodName: String!
    $foodTakeOnDate: String!
    $foodTakeOnTime: String
    $price: Int
  ) {
    editFoodEntry(
      id: $id
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

export default EditFoodEntry;
