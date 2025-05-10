import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskService } from '../task.service';
import { User } from '../../user';
import { Task } from '../task.entity';
import { CreateTaskInput } from '../dto/create-task.input';
import { UpdateTaskInput } from '../dto/update-task.input';

const mockTaskRepository = () => ({
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  findOneOrFail: jest.fn(),
  remove: jest.fn(),
});

describe('TaskService', () => {
  let service: TaskService;
  let repo: jest.Mocked<Repository<Task>>;

  const mockUser: User = { id: 'u1', role: 'VIEWER' } as User;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaskService,
        {
          provide: getRepositoryToken(Task),
          useFactory: mockTaskRepository,
        },
      ],
    }).compile();

    service = module.get<TaskService>(TaskService);
    repo = module.get(getRepositoryToken(Task));
  });

  it('should create a task', async () => {
    const input: CreateTaskInput = { title: 'Test', description: '...', category: 'Work' };
    const savedTask = { id: '1', ...input, owner: mockUser, status: 'TODO' };

    repo.create.mockReturnValue(savedTask);
    repo.save.mockResolvedValue(savedTask);

    const result = await service.createTask(input, mockUser);
    expect(repo.create).toHaveBeenCalledWith({ ...input, owner: mockUser });
    expect(repo.save).toHaveBeenCalledWith(savedTask);
    expect(result).toEqual(savedTask);
  });

  it('should return all tasks for OWNER/ADMIN', async () => {
    const adminUser = { id: 'admin', role: 'ADMIN' } as User;
    const tasks = [{ id: '1' }, { id: '2' }] as Task[];

    repo.find.mockResolvedValue(tasks);

    const result = await service.findAllTasks(adminUser);
    expect(repo.find).toHaveBeenCalled();
    expect(result).toEqual(tasks);
  });

  it('should return own tasks for VIEWER', async () => {
    const viewerTasks = [{ id: '1', owner: { id: 'u1' } }] as Task[];
    repo.find.mockResolvedValue(viewerTasks);

    const result = await service.findAllTasks(mockUser);
    expect(repo.find).toHaveBeenCalledWith({ where: { owner: { id: 'u1' } } });
    expect(result).toEqual(viewerTasks);
  });

  it('should update task if user is owner', async () => {
    const input: UpdateTaskInput = { id: '1', title: 'Updated' };
    const task = { id: '1', owner: { id: 'u1' }, title: 'Old' } as Task;

    repo.findOneOrFail.mockResolvedValue(task);
    repo.save.mockResolvedValue({ ...task, ...input });

    const result = await service.updateTask(input, mockUser);
    expect(result.title).toBe('Updated');
  });

  it('should throw error if VIEWER tries to update others\' task', async () => {
    const input: UpdateTaskInput = { id: '1', title: 'Updated' };
    const task = { id: '1', owner: { id: 'someone-else' } } as Task;

    repo.findOneOrFail.mockResolvedValue(task);

    await expect(service.updateTask(input, mockUser)).rejects.toThrow('Forbidden');
  });

  it('should delete task if user is owner', async () => {
    const task = { id: '1', owner: { id: 'u1' } } as Task;

    repo.findOneOrFail.mockResolvedValue(task);
    repo.remove.mockResolvedValue(task);

    const result = await service.delete('1', mockUser);
    expect(result).toBe(true);
  });

  it('should throw error if VIEWER tries to delete others\' task', async () => {
    const task = { id: '1', owner: { id: 'other-user' } } as Task;

    repo.findOneOrFail.mockResolvedValue(task);

    await expect(service.delete('1', mockUser)).rejects.toThrow('Forbidden');
  });
});
