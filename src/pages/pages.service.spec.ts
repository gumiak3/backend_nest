import { Test, TestingModule } from '@nestjs/testing';
import { PagesService } from './pages.service';
import { PagesModule } from './pages.module';
import { Page } from './entities/Page';
import { getRepositoryToken } from '@mikro-orm/nestjs';
import { MongoEntityManager } from '@mikro-orm/mongodb';

describe('PagesService', () => {
  let service: PagesService;

  const mockRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    persistAndFlush: jest.fn(),
    // Add other repository methods as needed
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PagesModule, MongoEntityManager],
      providers: [PagesService],
    }).compile();

    service = module.get(PagesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
