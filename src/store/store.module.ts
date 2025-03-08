import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

import { StoreEntity } from '../shared/infrastructure/database/entities';
import { StoreController } from './infrastructure/controllers';
import { StoreRepository } from './infrastructure/database/repositories';
import {
  CreateStoreHandler,
  StoreCreatedHandler,
} from './application/commands/handlers';
import { DB } from '../utils/constants';

const CommandHandlers = [
  CreateStoreHandler,
  // UpdateStoreHandler,
  // ActivateStoreHandler,
  // DeactivateStoreHandler
];
const QueryHandlers = [
  // GetStoreHandler,
  // GetStoresByOwnerHandler,
  // GetActiveStoresHandler
];
const EventHandlers = [
  StoreCreatedHandler,
  // StoreUpdatedHandler
];

@Module({
  imports: [
    TypeOrmModule.forFeature([StoreEntity], DB.WRITE_CONNECTION),
    CqrsModule,
  ],
  controllers: [StoreController],
  providers: [
    {
      provide: 'IStoreRepository',
      useClass: StoreRepository,
    },
    // handlers
    ...CommandHandlers,
    ...QueryHandlers,
    ...EventHandlers,
  ],
  exports: ['IStoreRepository'],
})
export class StoreModule {}
