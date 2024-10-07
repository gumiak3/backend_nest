import { ObjectId } from '@mikro-orm/mongodb';
import { Test, TestingModule } from '@nestjs/testing';

import { CreatePageDto } from './dto/create-page.dto';
import { UpdatePageDto } from './dto/update-page-dto';
import { Page } from './entities/Page';
import { PagesController } from './pages.controller';
import { PagesService } from './pages.service';

describe('PagesController', () => {
  let controller: PagesController;

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

  const mockPagesService = {
    findAll: jest.fn(() => [mockPageObject]),
    create: jest.fn((dto: CreatePageDto) => ({
      ...dto,
      ...mockPageObject,
    })),
    update: jest.fn((email: string, updatePageDto: Partial<UpdatePageDto>) => ({
      email: email,
      ...updatePageDto,
      ...mockPageObject,
    })),
    findByEmail: jest.fn((email: string) => ({
      ...mockPageObject,
      email: email,
    })),
    findByUsername: jest.fn((username: string) => ({
      ...mockPageObject,
      username: username,
    })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PagesController],
      providers: [PagesService],
    })
      .overrideProvider(PagesService)
      .useValue(mockPagesService)
      .compile();

    controller = module.get(PagesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a new page', async () => {
    const mockCreatePageDto: CreatePageDto = {
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
    };

    const expected = {
      message: 'Page registered',
    };

    const result = await controller.create(mockCreatePageDto);

    expect(mockPagesService.create).toHaveBeenCalledWith(mockCreatePageDto);

    expect(result).toEqual(expected);
  });

  it('should return array of pages', async () => {
    const expected = [mockPageObject];

    const result = await controller.findAll();

    expect(result).toEqual(expected);
  });

  it('should return a page when email is provided', async () => {
    const query = { email: 'test@gmail.com' };

    const expected: Page = {
      ...mockPageObject,
      email: query.email,
    };

    const result = await controller.findOne(query);

    expect(mockPagesService.findByEmail).toHaveBeenCalledWith(query.email);

    expect(result).toEqual(expected);
  });

  it('should return a page when username is provided', async () => {
    const query = { username: 'test232' };

    const expected: Page = {
      ...mockPageObject,
      username: query.username,
    };

    const result = await controller.findOne(query);

    expect(mockPagesService.findByUsername).toHaveBeenCalledWith(
      query.username,
    );

    expect(result).toEqual(expected);
  });

  it('should return empty when nothing is provided', async () => {
    const query = {};

    const expected = { message: 'Provided parameters are invalid' };

    const result = await controller.findOne(query);

    expect(result).toEqual(expected);
  });

  it('should update a page', async () => {
    const mockUpdateDto = {
      bio: 'testowe bio',
    };
    const mockEmail = 'testowyemail@gmail.com';

    const expected = {
      message: 'Page has been updated successfully',
    };

    const result = await controller.update(mockEmail, mockUpdateDto);

    expect(mockPagesService.update).toHaveBeenCalledWith(
      mockEmail,
      mockUpdateDto,
    );

    expect(result).toEqual(expected);
  });
});
