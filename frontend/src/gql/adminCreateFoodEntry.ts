import { gql } from '@apollo/client';

const AdminCreateFoodEntry = gql`
  mutation AdminCreateFoodEntry(
    $assignee: String!
    $calories: Int!
    $foodName: String!
    $foodTakeOnDate: String!
    $foodTakeOnTime: String
    $price: Int
  ) {
    adminCreateFoodEntry(
      assignee: $assignee
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

export default AdminCreateFoodEntry;
