import { EntityManager, ObjectId } from '@mikro-orm/mongodb';
import { Test, TestingModule } from '@nestjs/testing';

import { Page } from './entities/Page';
import { PagesService } from './pages.service';
import { UpdatePageDto } from './dto/update-page-dto';
import { CreatePageDto } from './dto/create-page.dto';

describe('PagesService', () => {
  let service: PagesService;

  const mockPageObject: Page = {
    _id: new ObjectId('65e03a72c6c6ed250aa76c19'),
    bio: 'Adventure enthusiast. Coffee lover. Dreamer.',
    username: 'user84871',
    profilePicture: [],
    premium: false,
    verified: true,
    name: 'John Doe',
    email: 'pdobrowolski99@gmail.com',
    img: 'https://utfs.io/f/3346df61-5bb2-4fe7-b813-4af7c3aad6c1-n92lk7.jpeg',
    backgroundImage:
      'https://utfs.io/f/cda5954b-852d-4ef6-bacb-6f07ad2f6482-m15jgy.png',
    socials: [
      {
        name: 'facebook',
        url: 'https://facebook.com',
        icon: 'facebook',
      },
      {
        name: 'instagram',
        url: 'https://instagram.com',
        icon: 'instagram',
      },
      {
        name: 'linkedin',
        url: 'https://linkedin.com',
        icon: 'linkedin',
      },
    ],
    buttons: [
      {
        name: 'portfolio',
        url: 'https://johndoeportfolio.com',
        image: 'https://example.com/images/portfolio.png',
      },
      {
        name: 'blog',
        url: 'https://johndoeblog.com',
        image: 'https://example.com/images/blog.png',
      },
      {
        name: 'contact',
        url: 'mailto:johndoe@example.com',
        image: 'https://example.com/images/contact.png',
      },
    ],
    background: '#000',
    font: '__Inter_aaf875',
    fontColor: '#FFF',
    radius: 'md',
    buttonStyle: 'softShadow',
    buttonTextColor: '#FFF',
    createdAt: new Date(Date.now()),
    updatedAt: new Date(Date.now()),
  };

  const mockEntityManager = {
    findAll: jest.fn().mockImplementation(() => [mockPageObject]),
    findOne: jest.fn().mockImplementation((query: Partial<Page>) => ({
      ...query,
      ...mockPageObject,
    })),
    assign: jest
      .fn()
      .mockImplementation(
        (pageToUpdate: Page, updatePageDto: UpdatePageDto) => ({
          ...updatePageDto,
          ...pageToUpdate,
        }),
      ),
    create: jest.fn().mockImplementation((dto: CreatePageDto) => ({
      ...dto,
      ...mockPageObject,
    })),
    flush: jest.fn(),
    persistAndFlush: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PagesService, EntityManager],
    })
      .overrideProvider(EntityManager)
      .useValue(mockEntityManager)
      .compile();

    service = module.get(PagesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new page record and return that', async () => {
    const mockCreatePageDto: CreatePageDto = { ...mockPageObject };

    expect(await service.create(mockCreatePageDto)).toEqual({
      ...mockCreatePageDto,
      ...mockPageObject,
    });
  });

  it('should return all pages from database', async () => {
    expect(await service.findAll()).toEqual([mockPageObject]);
  });

  it('should return Page object based on provided email', async () => {
    const email = 'test@gmail.com';

    expect(await service.findByEmail(email)).toEqual({
      email: email,
      ...mockPageObject,
    });
  });

  it('should return Page object based on provided username', async () => {
    const username = 'test';

    expect(await service.findByEmail(username)).toEqual({
      username: username,
      ...mockPageObject,
    });
  });

  it('should update a record searched by email', async () => {
    const email = 'test';
    const mockUpdatePageDto = { bio: 'aha' };

    expect(await service.update(email, mockUpdatePageDto)).toEqual({
      email: email,
      ...mockUpdatePageDto,
      ...mockPageObject,
    });
  });
});
