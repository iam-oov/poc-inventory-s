import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

import { StoreCreatedEvent } from '../../events';

@EventsHandler(StoreCreatedEvent)
export class StoreCreatedHandler implements IEventHandler<StoreCreatedEvent> {
  private readonly logger = new Logger(StoreCreatedHandler.name);

  handle(event: StoreCreatedEvent): void {
    this.logger.log(
      `New store "${event.name} (${event.id})" created in ${event.location}`,
    );

    // Here you could trigger side effects:
    // - Send welcome email to store owner
    // - Create store statistics profile
    // - Initialize store settings
  }
}
