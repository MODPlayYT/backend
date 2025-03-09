import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Request } from './entities/request.entity';
import { RequestsService } from './requests.service';
import { User } from '../users/entities/user.entity';

describe('RequestsService', () => {
  let service: RequestsService;
  let repository: Repository<Request>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RequestsService,
        {
          provide: getRepositoryToken(Request),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            save: jest.fn(),
            delete: jest.fn(),
            create: jest.fn(), // Добавляем метод create
            remove: jest.fn(), // Добавляем метод remove
          },
        },
      ],
    }).compile();

    service = module.get<RequestsService>(RequestsService);
    repository = module.get<Repository<Request>>(getRepositoryToken(Request));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of requests', async () => {
      const user: User = {
        id: 1,
        name: 'Test User',
        email: 'test@example.com',
        password: 'password',
        role: 'user',
        registrations: [],
        requests: [],
      };
      const result: Request[] = [
        {
          id: 1,
          type: 'transport',
          description: 'Need help',
          status: 'pending',
          createdAt: new Date(),
          user,
          userId: user.id,
        },
      ];
      jest.spyOn(repository, 'find').mockResolvedValue(result);

      expect(await service.findAll()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return a single request', async () => {
      const user: User = {
        id: 1,
        name: 'Test User',
        email: 'test@example.com',
        password: 'password',
        role: 'user',
        registrations: [],
        requests: [],
      };
      const result: Request = {
        id: 1,
        type: 'transport',
        description: 'Need help',
        status: 'pending',
        createdAt: new Date(),
        user,
        userId: user.id,
      };
      jest.spyOn(repository, 'findOne').mockResolvedValue(result);

      expect(await service.findOne(1)).toBe(result);
    });

    it('should throw NotFoundException if request is not found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(null);

      await expect(service.findOne(1)).rejects.toThrowError('Заявка с ID 1 не найдена');
    });
  });

  describe('create', () => {
    it('should create a new request', async () => {
      const user: User = {
        id: 1,
        name: 'Test User',
        email: 'test@example.com',
        password: 'password',
        role: 'user',
        registrations: [],
        requests: [],
      };
      const requestData = { type: 'transport', description: 'Need help', userId: user.id };
      const result: Request = {
        id: 1,
        ...requestData,
        status: 'pending',
        createdAt: new Date(),
        user,
        userId: user.id,
      };

      // Мокируем метод create
      jest.spyOn(repository, 'create').mockReturnValue(result);
      // Мокируем метод save
      jest.spyOn(repository, 'save').mockResolvedValue(result);

      expect(await service.create(requestData)).toBe(result);
      expect(repository.create).toHaveBeenCalledWith(requestData);
      expect(repository.save).toHaveBeenCalledWith(result);
    });
  });

  describe('remove', () => {
    it('should delete a request', async () => {
      const user: User = {
        id: 1,
        name: 'Test User',
        email: 'test@example.com',
        password: 'password',
        role: 'user',
        registrations: [],
        requests: [],
      };
      const request: Request = {
        id: 1,
        type: 'transport',
        description: 'Need help',
        status: 'pending',
        createdAt: new Date(),
        user,
        userId: user.id,
      };

      // Мокируем метод findOne
      jest.spyOn(repository, 'findOne').mockResolvedValue(request);
      // Мокируем метод remove
      jest.spyOn(repository, 'remove').mockResolvedValue({} as any);

      await service.remove(1);
      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(repository.remove).toHaveBeenCalledWith(request);
    });
  });
});