import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Task } from './task.entity';
import { CreateTaskInput } from './dto/create-task.input';
import { UpdateTaskInput } from './dto/update-task.input';
import { User } from '../user';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepo: Repository<Task>,
  ) {}

  async createTask(input: CreateTaskInput, user: User): Promise<Task> {
    const task = this.taskRepo.create({ ...input, owner: user });
    return this.taskRepo.save(task);
  }

  async findAllTasks(user: User): Promise<Task[]> {
    if (user.role === 'OWNER' || user.role === 'ADMIN') {
      return this.taskRepo.find();
    }

    return this.taskRepo.find({
      where: { owner: { id: user.id } },
    });
  }

  async updateTask(input: UpdateTaskInput, user: User): Promise<Task> {
    const task = await this.taskRepo.findOneOrFail({
      where: { id: input.id },
      relations: ['owner'],
    });

    if (task.owner.id !== user.id && user.role === 'VIEWER') {
      throw new Error('Forbidden: You do not have permission to update this task.');
    }

    Object.assign(task, input);
    return this.taskRepo.save(task);
  }

  async delete(id: string, user: User): Promise<boolean> {
    const task = await this.taskRepo.findOneOrFail({
      where: { id },
      relations: ['owner'],
    });

    if (task.owner.id !== user.id && user.role === 'VIEWER') {
      throw new Error('Forbidden: You do not have permission to delete this task.');
    }

    await this.taskRepo.remove(task);
    return true;
  }
}
