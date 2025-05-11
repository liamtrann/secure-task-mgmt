import { Role } from './enums';

export interface AuthState {
  currentRole: Role;
  isAuthenticated: boolean;
}
