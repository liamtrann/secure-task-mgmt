import { registerEnumType } from '@nestjs/graphql';
export enum Role {
  OWNER = 'OWNER',
  ADMIN = 'ADMIN',
  VIEWER = 'VIEWER',
}

registerEnumType(Role, {
  name: 'Role', 
});