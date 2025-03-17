import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';

import {
  InventoryEntity,
  MovementEntity,
} from '../shared/infrastructure/database/entities';
import { DB } from '../utils/constants';
import {
  InventoryController,
  StoreController,
} from './infraestructure/controllers';
import {
  InventoryRepository,
  MovementRepository,
} from './infraestructure/database/repositories';
import {
  GetInventoryByHandler,
  GetInventoryLowStockHandler,
} from './application/queries/handlers';
import { TransferInventoryHandler } from './application/commands/handlers';
import {
  LowStockActivatedHandler,
  MovementCreatedHandler,
} from './application/events/handlers';

const CommandHandlers = [TransferInventoryHandler];
const QueryHandlers = [GetInventoryByHandler, GetInventoryLowStockHandler];
const EventHandlers = [MovementCreatedHandler, LowStockActivatedHandler];

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [InventoryEntity, MovementEntity],
      DB.WRITE_CONNECTION,
    ),
    TypeOrmModule.forFeature([InventoryEntity], DB.READ_CONNECTION),
    CqrsModule,
  ],
  controllers: [StoreController, InventoryController],
  providers: [
    {
      provide: 'IInventoryRepository',
      useClass: InventoryRepository,
    },
    {
      provide: 'IMovementRepository',
      useClass: MovementRepository,
    },
    // handlers
    ...CommandHandlers,
    ...QueryHandlers,
    ...EventHandlers,
  ],
  exports: [],
})
export class InventoryModule {}
