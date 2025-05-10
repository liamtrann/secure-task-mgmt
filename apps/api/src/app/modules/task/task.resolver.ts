import { Resolver, Mutation, Args, Query, Context } from '@nestjs/graphql';
import { Task } from './task.entity';
import { TaskService } from './task.service';
import { CreateTaskInput } from './dto/create-task.input';
import { UpdateTaskInput } from './dto/update-task.input';
import { UseGuards } from '@nestjs/common';
import { User } from '../user';
import { RolesGuard, Roles } from '@secure-task-mgmt/auth';
import { Role } from '@secure-task-mgmt/data';

@Resolver(() => Task)
export class TaskResolver {
  constructor(private readonly taskService: TaskService) {}

  @UseGuards(RolesGuard)
  @Roles(Role.OWNER, Role.ADMIN, Role.VIEWER)
  @Query(() => [Task])
  tasks(@Context('user') user: User) {
    return this.taskService.findAll(user);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.OWNER, Role.ADMIN)
  @Mutation(() => Task)
  createTask(
    @Args('input') input: CreateTaskInput,
    @Context('user') user: User
  ) {
    return this.taskService.create(input, user);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.OWNER, Role.ADMIN, Role.VIEWER)
  @Mutation(() => Task)
  updateTask(
    @Args('input') input: UpdateTaskInput,
    @Context('user') user: User
  ) {
    return this.taskService.update(input, user);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.OWNER, Role.ADMIN)
  @Mutation(() => Boolean)
  deleteTask(@Args('id') id: string, @Context('user') user: User) {
    return this.taskService.delete(id, user);
  }
}
