import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { Task } from './task.entity';
import { TaskService } from './task.service';
import { CreateTaskInput } from './dto/create-task.input';
import { UpdateTaskInput } from './dto/update-task.input';
import { Role } from '@secure-task-mgmt/data';
import { User } from '../user/user.entity';
import { UseGuards } from '@nestjs/common';
import { Roles, RolesGuard } from '@secure-task-mgmt/auth';

@Resolver(() => Task)
export class TaskResolver {
  constructor(private readonly taskService: TaskService) {}

  @UseGuards(RolesGuard)
  @Roles(Role.OWNER, Role.ADMIN, Role.VIEWER)
  @Query(() => [Task])
  tasks(@Context('user') user: User) {
    return this.taskService.findAllTasks(user);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.OWNER, Role.ADMIN)
  @Mutation(() => Task)
  createTask(
    @Args('input') input: CreateTaskInput,
    @Context('user') user: User
  ) {
    return this.taskService.createTask(input, user);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.OWNER, Role.ADMIN, Role.VIEWER)
  @Mutation(() => Task)
  updateTask(
    @Args('input') input: UpdateTaskInput,
    @Context('user') user: User
  ) {
    return this.taskService.updateTask(input, user);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.OWNER, Role.ADMIN)
  @Mutation(() => Boolean)
  deleteTask(@Args('id') id: string, @Context('user') user: User) {
    return this.taskService.delete(id, user);
  }
}
