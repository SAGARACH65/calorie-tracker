import UserTypes from '../../enums/UserTypes';

interface User {
  id: number;
  email: string;
  role: UserTypes;
  username: string;
  budgetLimit: number;
  calioreLimit: number;
  lastName: string | null;
  firstName: string | null;
}

export default User;
