import UserTypes from '../../enums/UserTypes';

interface User {
  id: number;
  email: string;
  role: UserTypes;
  username: string;
  budgetLimit: number;
  calorieLimit: number;
  lastName: string | null;
  firstName: string | null;
}

export default User;
