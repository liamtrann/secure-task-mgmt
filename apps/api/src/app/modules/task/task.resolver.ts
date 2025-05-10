import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { Task } from './task.entity';
import { TaskService } from './task.service';
import { CreateTaskInput } from './dto/create-task.input';
import { UpdateTaskInput } from './dto/update-task.input';
import { User } from '../user/user.entity';

import { Role } from '@secure-task-mgmt/data';
import { Roles, RolesGuard } from '@secure-task-mgmt/auth';

@Resolver(() => Task)
export class TaskResolver {
  constructor(private readonly taskService: TaskService) {}

  @Query(() => [Task])
  @UseGuards(RolesGuard)
  @Roles(Role.OWNER, Role.ADMIN, Role.VIEWER)
  tasks(@Context('user') user: User) {
    return this.taskService.findAllTasks(user);
  }

  @Mutation(() => Task)
  @UseGuards(RolesGuard)
  @Roles(Role.OWNER, Role.ADMIN)
  createTask(
    @Args('input') input: CreateTaskInput,
    @Context('user') user: User,
  ) {
    return this.taskService.createTask(input, user);
  }

  @Mutation(() => Task)
  @UseGuards(RolesGuard)
  @Roles(Role.OWNER, Role.ADMIN, Role.VIEWER)
  updateTask(
    @Args('input') input: UpdateTaskInput,
    @Context('user') user: User,
  ) {
    return this.taskService.updateTask(input, user);
  }

  @Mutation(() => Boolean)
  @UseGuards(RolesGuard)
  @Roles(Role.OWNER, Role.ADMIN)
  deleteTask(
    @Args('id') id: string,
    @Context('user') user: User,
  ) {
    return this.taskService.delete(id, user);
  }
}
