import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

import { ProductDeletedEvent } from '../implementations';

@EventsHandler(ProductDeletedEvent)
export class ProductDeletedHandler
  implements IEventHandler<ProductDeletedEvent>
{
  private readonly logger = new Logger(ProductDeletedHandler.name);

  handle(event: ProductDeletedEvent): void {
    const { name } = event.data;
    const { id } = event;

    this.logger.log(`Product deleted "${name} (${id})"`);

    // side effects
  }
}
