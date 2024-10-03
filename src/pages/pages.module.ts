import { MikroOrmModule } from '@mikro-orm/nestjs/mikro-orm.module';
import { Module } from '@nestjs/common';

import { Page } from './entities/Page';
import { PagesController } from './pages.controller';
import { PagesService } from './pages.service';

@Module({
  imports: [MikroOrmModule.forFeature({ entities: [Page] })],
  controllers: [PagesController],
  providers: [PagesService],
})
export class PagesModule {}
