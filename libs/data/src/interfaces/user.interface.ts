import { Role } from "src/enums/auth-roles.enum.js";

export interface IUser {
  id: string;
  name: string;
  email: string;
  role: Role;
  organizationId: string;
}
