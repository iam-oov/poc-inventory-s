import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';

import { DB } from '../utils/constants';
import { ProductEntity } from '../shared/infrastructure/database/entities';
import { ProductController } from './infrastructure/controllers';
import { ProductRepository } from './infrastructure/database/repositories';
import {
  CreateProductHandler,
  UpdateProductHandler,
} from './application/commands/handlers';
import {
  ProductCreatedHandler,
  ProductUpdatedHandler,
} from './application/events/handlers';
import { GetAllProductsHandler } from './application/queries/handlers';

const CommandHandlers = [CreateProductHandler, UpdateProductHandler];
const QueryHandlers = [GetAllProductsHandler];
const EventHandlers = [ProductCreatedHandler, ProductUpdatedHandler];

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductEntity], DB.WRITE_CONNECTION),
    CqrsModule,
  ],
  controllers: [ProductController],
  providers: [
    {
      provide: 'IProductRepository',
      useClass: ProductRepository,
    },
    // handlers
    ...CommandHandlers,
    ...QueryHandlers,
    ...EventHandlers,
  ],
  exports: [],
})
export class ProductModule {}
