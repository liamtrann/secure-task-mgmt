import { Role } from '@secure-task-mgmt/data';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field()
  name!: string;

  @Field()
  email?: string;

  @Field(() => Role)
  role!: Role;

  @Field()
  organizationId?: string;
}
