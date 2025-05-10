import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateTaskInput {
  @Field()
  title!: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  status!: 'todo' | 'in-progress' | 'done';

  @Field()
  category!: string;

  @Field()
  ownerId!: string;

  @Field({ nullable: true })
  priority?: 'low' | 'medium' | 'high';
}
