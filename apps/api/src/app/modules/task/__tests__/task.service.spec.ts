import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskService } from '../task.service';
import { Task } from '../task.entity';
import { User } from '../../user';
import { CreateTaskInput } from '../dto/create-task.input';
import { UpdateTaskInput } from '../dto/update-task.input';

const createMockRepository = () => ({
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  findOneOrFail: jest.fn(),
  remove: jest.fn(),
});

describe('TaskService', () => {
  let service: TaskService;
  let taskRepository: jest.Mocked<Repository<Task>>;

  const mockUser: User = { id: 'u1', role: 'VIEWER' } as User;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaskService,
        {
          provide: getRepositoryToken(Task),
          useFactory: createMockRepository,
        },
      ],
    }).compile();

    service = module.get<TaskService>(TaskService);
    taskRepository = module.get(getRepositoryToken(Task));
  });

  describe('createTask', () => {
    it('should create and return a new task', async () => {
      const input: CreateTaskInput = {
        title: 'Test Task',
        description: 'Some description',
        category: 'Work',
      };
      const expectedTask = {
        id: '1',
        ...input,
        owner: mockUser,
        status: 'TODO',
      };

      taskRepository.create.mockReturnValue(expectedTask as Task);
      taskRepository.save.mockResolvedValue(expectedTask as Task);

      const result = await service.createTask(input, mockUser);

      expect(taskRepository.create).toHaveBeenCalledWith({ ...input, owner: mockUser });
      expect(taskRepository.save).toHaveBeenCalledWith(expectedTask);
      expect(result).toEqual(expectedTask);
    });
  });

  describe('findAllTasks', () => {
    it('should return all tasks for ADMIN', async () => {
      const adminUser = { id: 'admin', role: 'ADMIN' } as User;
      const tasks = [{ id: '1' }, { id: '2' }] as Task[];

      taskRepository.find.mockResolvedValue(tasks);

      const result = await service.findAllTasks(adminUser);

      expect(taskRepository.find).toHaveBeenCalled();
      expect(result).toEqual(tasks);
    });

    it('should return only own tasks for VIEWER', async () => {
      const viewerTasks = [{ id: '1', owner: { id: 'u1' } }] as Task[];

      taskRepository.find.mockResolvedValue(viewerTasks);

      const result = await service.findAllTasks(mockUser);

      expect(taskRepository.find).toHaveBeenCalledWith({ where: { owner: { id: 'u1' } } });
      expect(result).toEqual(viewerTasks);
    });
  });

  describe('updateTask', () => {
    it('should update and return the task if user is the owner', async () => {
      const input: UpdateTaskInput = { id: '1', title: 'Updated Title' };
      const existingTask = { id: '1', title: 'Old Title', owner: { id: 'u1' } } as Task;
      const updatedTask = { ...existingTask, ...input };

      taskRepository.findOneOrFail.mockResolvedValue(existingTask);
      taskRepository.save.mockResolvedValue(updatedTask);

      const result = await service.updateTask(input, mockUser);

      expect(result.title).toBe('Updated Title');
    });

    it('should throw an error if VIEWER tries to update a task they do not own', async () => {
      const input: UpdateTaskInput = { id: '1', title: 'Updated Title' };
      const otherUsersTask = { id: '1', owner: { id: 'other-user' } } as Task;

      taskRepository.findOneOrFail.mockResolvedValue(otherUsersTask);

      await expect(service.updateTask(input, mockUser)).rejects.toThrow('Forbidden');
    });
  });

  describe('delete', () => {
    it('should delete the task if user is the owner', async () => {
      const task = { id: '1', owner: { id: 'u1' } } as Task;

      taskRepository.findOneOrFail.mockResolvedValue(task);
      taskRepository.remove.mockResolvedValue(task);

      const result = await service.delete('1', mockUser);

      expect(result).toBe(true);
    });

    it('should throw an error if VIEWER tries to delete a task they do not own', async () => {
      const task = { id: '1', owner: { id: 'someone-else' } } as Task;

      taskRepository.findOneOrFail.mockResolvedValue(task);

      await expect(service.delete('1', mockUser)).rejects.toThrow('Forbidden');
    });
  });
});
