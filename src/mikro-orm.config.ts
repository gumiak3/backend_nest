import { defineConfig } from '@mikro-orm/mongodb';
import { Logger } from '@nestjs/common';

import { Author } from './entities/Author';
import { Page } from './pages/entities/Page';

const logger = new Logger('MikroORM');

export default defineConfig({
  entities: [Author, Page],
  dbName: process.env.DB_NAME,
  logger: logger.log.bind(logger),
  clientUrl: process.env.DATABASE,
  driverOptions: {
    tls: true,
    tlsAllowInvalidCertificates: true,
  },
});
