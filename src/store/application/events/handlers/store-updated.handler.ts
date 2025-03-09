import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

import { StoreUpdatedEvent } from '../implementatios';

@EventsHandler(StoreUpdatedEvent)
export class StoreUpdatedHandler implements IEventHandler<StoreUpdatedEvent> {
  private readonly logger = new Logger(StoreUpdatedHandler.name);

  handle(event: StoreUpdatedEvent): void {
    const { name, lat, lng } = event.data;

    this.logger.log(
      `Store ${name} (${event.id}) was updated to ${lat}, ${lng}`,
    );

    // Here you could trigger side effects:
    // - Update search index
    // - Send notification to subscribers
    // - Update related entities
  }
}
