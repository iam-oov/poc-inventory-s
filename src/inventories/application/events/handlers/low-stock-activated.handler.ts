import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

import { LowStockActivatedEvent } from '../implementations';

@EventsHandler(LowStockActivatedEvent)
export class LowStockActivatedHandler
  implements IEventHandler<LowStockActivatedEvent>
{
  private readonly logger = new Logger(LowStockActivatedHandler.name);

  async handle(event: LowStockActivatedEvent): Promise<void> {
    const { product, quantity, minStock, storeId } = event.data;

    if (quantity > minStock) {
      return;
    }

    if (quantity == minStock) {
      this.logger.debug(
        `The product <${product.name} (${product.id})> is at the minimum stock in the <${storeId}> storeId. Quantity: ${quantity}`,
      );
      return;
    }

    this.logger.debug(
      `Low stock of the product <${product.name} (${product.id})> in the <${storeId}> storeId. Quantity: ${quantity}`,
    );
  }
}
