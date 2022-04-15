import { getUser } from './user';
import { allFoodEntries, getAllUser } from './admin';
import { getUserFoodEntries } from './userFoodEntries';

export default {
  user: getUser,
  allUsers: getAllUser,
  foodEntries: getUserFoodEntries,
  allFoodEntries: allFoodEntries,
};
