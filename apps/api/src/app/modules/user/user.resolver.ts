import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  createUser(@Args('input') input: CreateUserInput): Promise<User> {
    return this.userService.createUser(input);
  }

  @Query(() => [User])
  users(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Query(() => User)
  user(@Args('id') id: string): Promise<User | null> {
    return this.userService.findById(id);
  }
}
