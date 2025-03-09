import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

import { StoreCreatedEvent } from '../implementatios';

@EventsHandler(StoreCreatedEvent)
export class StoreCreatedHandler implements IEventHandler<StoreCreatedEvent> {
  private readonly logger = new Logger(StoreCreatedHandler.name);

  handle(event: StoreCreatedEvent): void {
    const { id, name, lat, lng } = event.data;

    this.logger.log(
      `New store "${name} (${id})" created in LAT: ${lat} & LNG: ${lng}`,
    );

    // Here you could trigger side effects:
    // - Send welcome email to store owner
    // - Create store statistics profile
    // - Initialize store settings
  }
}
