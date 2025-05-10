import { Field, InputType, registerEnumType } from '@nestjs/graphql';

export enum TaskStatus {
  TODO = 'todo',
  IN_PROGRESS = 'in-progress',
  DONE = 'done',
}

registerEnumType(TaskStatus, {
  name: 'TaskStatus',
});

export enum TaskPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
}

registerEnumType(TaskPriority, {
  name: 'TaskPriority',
});

@InputType()
export class CreateTaskDto {
  @Field()
  title!: string;

  @Field()
  description!: string;

  @Field(() => TaskStatus)
  status!: TaskStatus;

  @Field()
  category!: string;

  @Field()
  ownerId!: string;

  @Field(() => TaskPriority, { nullable: true })
  priority?: TaskPriority;
}
