import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { join } from 'path';

import { envs } from './configs';
console.log('🚀 ~ envs:', envs.db);

export const AppDataSource = new DataSource({
  type: envs.db.dialect as any,
  host: envs.db.host,
  port: envs.db.port,
  username: envs.db.username,
  password: envs.db.password,
  database: envs.db.database,
  logging: false,
  subscribers: [],
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  migrations: [join(__dirname, '/migrations/*{.ts, .js}')],
  synchronize: false,
});
