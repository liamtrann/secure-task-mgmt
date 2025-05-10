import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Organization } from '../organization';
import { Role } from '@secure-task-mgmt/data';

@ObjectType()
@Entity()
export class User {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Field()
  @Column()
  name!: string;

  @Field()
  @Column({ unique: true })
  email?: string;

  @Field(() => Role)
  @Column({ type: 'enum', enum: Role })
  role!: Role;

  @Field(() => Organization)
  @ManyToOne(() => Organization, (org) => org.users)
  organization?: Organization;
}
