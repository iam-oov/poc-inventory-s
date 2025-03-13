import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

import { ProductUpdatedEvent } from '../implementations';

@EventsHandler(ProductUpdatedEvent)
export class ProductUpdatedHandler
  implements IEventHandler<ProductUpdatedEvent>
{
  private readonly logger = new Logger(ProductUpdatedHandler.name);

  handle(event: ProductUpdatedEvent): void {
    const { name } = event.data;
    const { id } = event;

    this.logger.log(`New product "${name} (${id})" created`);

    // Here you could trigger side effects:
    // - Send welcome email to product owner
    // - Create product statistics profile
    // - Initialize product settings
  }
}
