import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
} from '@nestjs/common';
import { Request } from 'express';

import { CreatePageDto } from './dto/create-page.dto';
import { UpdatePageDto } from './dto/update-page-dto';
import { PagesService } from './pages.service';

// todo: response codes and messages
// todo: swagger

@Controller('pages')
export class PagesController {
  constructor(private readonly pageService: PagesService) {}

  @Post()
  create(@Body() createPageDto: CreatePageDto) {
    return this.pageService.create(createPageDto);
  }

  @Get('all')
  findAll() {
    return this.pageService.findAll();
  }

  @Get('find')
  findOne(@Query() query) {
    const { email, username } = query;
    if (email && typeof email === 'string') {
      return this.pageService.findByEmail(email);
    }
    if (username && typeof username === 'string') {
      return this.pageService.findByUsername(username);
    }
  }

  @Put('update/:email')
  update(
    @Param('email') email: string,
    @Body() updatePageDto: Partial<UpdatePageDto>,
  ) {
    return this.pageService.update(email, updatePageDto);
  }
}
