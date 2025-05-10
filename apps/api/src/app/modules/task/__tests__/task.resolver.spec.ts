import { Test, TestingModule } from '@nestjs/testing';
import { TaskResolver } from '../task.resolver';
import { TaskService } from '../task.service';
import { CreateTaskInput } from '../dto/create-task.input';
import { UpdateTaskInput } from '../dto/update-task.input';
import { Task } from '../task.entity';
import { User } from '../../user';
import { Role } from '@libs/data';

describe('TaskResolver', () => {
  let resolver: TaskResolver;
  let service: TaskService;

  const mockUser: User = {
    id: '1',
    role: Role.ADMIN,
    email: 'admin@example.com',
    name: 'Admin User',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaskResolver,
        {
          provide: TaskService,
          useValue: {
            createTask: jest.fn(),
            findAllTasks: jest.fn(),
            updateTask: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    resolver = module.get<TaskResolver>(TaskResolver);
    service = module.get<TaskService>(TaskService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('tasks', () => {
    it('should return an array of tasks', async () => {
      const tasks: Task[] = [
        {
          id: 't1',
          title: 'Task 1',
          description: '',
          owner: mockUser,
        } as Task,
      ];
      jest.spyOn(service, 'findAllTasks').mockResolvedValue(tasks);

      const result = await resolver.tasks(mockUser);
      expect(result).toEqual(tasks);
    });
  });

  describe('createTask', () => {
    it('should create and return a task', async () => {
      const input: CreateTaskInput = {
        title: 'New Task',
        description: 'Description',
      };
      const createdTask: Task = {
        id: 't2',
        title: input.title,
        description: input.description,
        owner: mockUser,
      } as Task;

      jest.spyOn(service, 'createTask').mockResolvedValue(createdTask);

      const result = await resolver.createTask(input, mockUser);
      expect(result).toEqual(createdTask);
    });
  });

  describe('updateTask', () => {
    it('should update and return the task', async () => {
      const input: UpdateTaskInput = {
        id: 't3',
        title: 'Updated Title',
      };

      const updatedTask: Task = {
        id: input.id,
        title: input.title,
        description: 'Old description',
        owner: mockUser,
      } as Task;

      jest.spyOn(service, 'updateTask').mockResolvedValue(updatedTask);

      const result = await resolver.updateTask(input, mockUser);
      expect(result.title).toEqual('Updated Title');
    });
  });

  describe('deleteTask', () => {
    it('should return true on successful deletion', async () => {
      jest.spyOn(service, 'delete').mockResolvedValue(true);

      const result = await resolver.deleteTask('t4', mockUser);
      expect(result).toBe(true);
    });
  });
});
