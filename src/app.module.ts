import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DB } from './utils/constants';
import { envs } from './configs';
import { ProductModule } from './products/product.module';
import { InventoryModule } from './inventories/inventory.module';
import { HealthCheckModule } from './shared/health-check/health-check.module';

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forRoot({
      name: DB.WRITE_CONNECTION,
      type: envs.db.dialect as any,
      host: envs.db.host,
      port: envs.db.port,
      username: envs.db.username,
      password: envs.db.password,
      database: envs.db.database,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false,
    }),

    TypeOrmModule.forRoot({
      name: DB.READ_CONNECTION,
      type: envs.db.dialect as any,
      host: envs.db.host,
      port: envs.db.port,
      username: envs.db.username,
      password: envs.db.password,
      database: envs.db.database,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false,
    }),
    HealthCheckModule,
    ProductModule,
    InventoryModule,
  ],
  controllers: [],
})
export class AppModule {}
