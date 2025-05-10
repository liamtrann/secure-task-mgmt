import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AuditEntry {
  @Field()
  timestamp?: string;

  @Field()
  userId!: string;

  @Field()
  action?: string;

  @Field({ nullable: true })
  targetId?: string;

  @Field({ nullable: true })
  metadata?: string;
}
