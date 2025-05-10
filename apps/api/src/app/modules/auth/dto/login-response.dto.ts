// src/auth/dto/login-response.dto.ts
import { ObjectType, Field } from '@nestjs/graphql';
import { User } from '../../user';

@ObjectType()
export class LoginResponse {
  @Field()
  accessToken!: string;

  @Field(() => User)
  user!: User;
}
