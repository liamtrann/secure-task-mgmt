import { Field, InputType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateTaskInput {
  @Field(() => ID)
  id!: string;

  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  category?: string;

  @Field({ nullable: true })
  status?: string;
}
