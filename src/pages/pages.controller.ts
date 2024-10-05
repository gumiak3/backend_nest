import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiQuery, ApiBody } from '@nestjs/swagger';
import { CreatePageDto } from './dto/create-page.dto';
import { UpdatePageDto } from './dto/update-page-dto';
import { PagesService } from './pages.service';

@Controller('pages')
export class PagesController {
  constructor(private readonly pageService: PagesService) {}

  @Post() 
  create(@Body() createPageDto: CreatePageDto) {
    this.pageService.create(createPageDto);
    
    return {message: 'Page registered'}
  }

  @Get('all')
  findAll() {
    return this.pageService.findAll();
  }

  @Get('search')
  @ApiQuery({ name: 'email', type: 'string', required: false })
  @ApiQuery({ name: 'username', type: 'string', required: false })
  findOne(@Query() query) {
    const { email, username } = query;
    
    if (email && typeof email === 'string') {
      return this.pageService.findByEmail(email);
    }
    
    if (username && typeof username === 'string') {
      return this.pageService.findByUsername(username);
    }

    return {message: 'Provided parameters are invalid'}
  }

  @Put('update/:email')
  @ApiBody({ type: UpdatePageDto })
  update(
    @Param('email') email: string,
    @Body() updatePageDto: Partial<UpdatePageDto>,
  ) {
    this.pageService.update(email, updatePageDto);

    return { message: 'Page has been updated successfully' };
  }
}
