import {
  getUserTokenFromUserName,
  addUserFoodEntry,
  deleteUserFoodEntry,
  adminAddUserFoodEntry,
  editFoodEntry,
} from './user';

export default {
  userToken: getUserTokenFromUserName,
  createFoodEntry: addUserFoodEntry,
  adminCreateFoodEntry: adminAddUserFoodEntry,
  deleteFoodEntry: deleteUserFoodEntry,
  editFoodEntry: editFoodEntry,
};
