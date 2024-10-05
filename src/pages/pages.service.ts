import { EntityManager } from '@mikro-orm/mongodb';
import { Injectable, NotFoundException } from '@nestjs/common';

import { CreatePageDto } from './dto/create-page.dto';
import { Page } from './entities/Page';

@Injectable()
export class PagesService {
  constructor(private em: EntityManager) {}

  async create(createPageDto: CreatePageDto): Promise<void> {
    const page = this.em.create(Page, createPageDto);

    await this.em.persistAndFlush(page);
  }

  async findAll(): Promise<Page[]> {
    return this.em.findAll(Page);
  }

  async findByEmail(email: string): Promise<Page> {
    return this.em.findOne(Page, { email: email });
  }

  async findByUsername(username: string): Promise<Page> {
    return this.em.findOne(Page, { username: username });
  }

  async update(email: string, updatePageDto: Partial<CreatePageDto>) : Promise<void> {
    const pageToUpdate = await this.em.findOne(Page, { email: email });

    if (!pageToUpdate) {
      throw new NotFoundException();
    }

    const updated = this.em.assign(pageToUpdate, updatePageDto);

    await this.em.flush();
  }
}
