import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';

import {
  InventoryEntity,
  MovementEntity,
} from '../shared/infrastructure/database/entities';
import { DB } from '../utils/constants';
import { StoreController } from './infraestructure/controllers';
import { InventoryRepository } from './infraestructure/database/repositories';
import { GetInventoryByHandler } from './application/queries/handlers';

const CommandHandlers = [];
const QueryHandlers = [GetInventoryByHandler];
const EventHandlers = [];

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [InventoryEntity, MovementEntity],
      DB.WRITE_CONNECTION,
    ),
    TypeOrmModule.forFeature([InventoryEntity], DB.READ_CONNECTION),
    CqrsModule,
  ],
  controllers: [StoreController],
  providers: [
    {
      provide: 'IInventoryRepository',
      useClass: InventoryRepository,
    },
    // handlers
    ...CommandHandlers,
    ...QueryHandlers,
    ...EventHandlers,
  ],
  exports: [],
})
export class InventoryModule {}
