import { UserType } from "../enum/UserType";

export interface User {
  scope: string;
  userType: UserType;
  name: string;
  id: string;
  email: string;
}
