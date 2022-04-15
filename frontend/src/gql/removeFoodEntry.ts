import { gql } from '@apollo/client';

const DeleteFoodEntry = gql`
  mutation DeleteFoodEntry($entryId: String!) {
    deleteFoodEntry(entryId: $entryId) {
      id
    }
  }
`;

export default DeleteFoodEntry;
