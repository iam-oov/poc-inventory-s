import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { join } from 'path';

import { envs, PRODUCTION } from './configs';

console.log('🚀 ~ PRODUCTION:', PRODUCTION);
console.log('🚀 ~ envs:', envs.db);
console.log('🚀 ~ envs:', envs.nodeEnv);

export const AppDataSource = new DataSource({
  type: envs.db.dialect as any,
  ...(envs.nodeEnv === PRODUCTION
    ? {
        url: envs.db.url,
      }
    : {
        host: envs.db.host,
        port: envs.db.port,
        username: envs.db.username,
        password: envs.db.password,
        database: envs.db.database,
      }),
  logging: false,
  subscribers: [],
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  migrations: [join(__dirname, '/migrations/*{.ts, .js}')],
  synchronize: false,
});
