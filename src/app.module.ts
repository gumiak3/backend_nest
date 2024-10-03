import { join } from 'node:path';

import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Author } from './entities/Author';
import config from './mikro-orm.config';
import { PagesModule } from './pages/pages.module';
import { PagesService } from './pages/pages.service';

@Module({
  imports: [
    ServeStaticModule.forRoot({ rootPath: join(__dirname, '..', 'public') }),
    MikroOrmModule.forFeature({ entities: [Author] }),
    // @ts-ignore
    MikroOrmModule.forRoot(config),
    PagesModule,
  ],
  controllers: [AppController],
  providers: [AppService, PagesService],
})
export class AppModule {}
