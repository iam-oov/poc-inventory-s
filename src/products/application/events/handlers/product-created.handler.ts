import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

import { ProductCreatedEvent } from '../implementations';

@EventsHandler(ProductCreatedEvent)
export class ProductCreatedHandler
  implements IEventHandler<ProductCreatedEvent>
{
  private readonly logger = new Logger(ProductCreatedHandler.name);

  handle(event: ProductCreatedEvent): void {
    const { id, name } = event.data;

    this.logger.log(`New product "${name} (${id})" created`);

    // Here you could trigger side effects:
    // - Send welcome email to product owner
    // - Create product statistics profile
    // - Initialize product settings
  }
}
