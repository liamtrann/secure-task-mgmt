import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateTaskDto {
  @Field()
  title!: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  status!: 'TODO' | 'IN_PROGRESS' | 'DONE';

  @Field()
  owner!: string;
}
