import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { HttpException, HttpStatus, Inject } from '@nestjs/common';

import { TransferInventoryCommand } from '../implementations';
import { IInventoryRepository } from '../../../domain/interfaces';
import { InventoryModel } from '../../../domain/models';
import { MovementCreatedEvent } from '../../events/implementations';

@CommandHandler(TransferInventoryCommand)
export class TransferInventoryHandler
  implements ICommandHandler<TransferInventoryCommand>
{
  constructor(
    @Inject('IInventoryRepository')
    private readonly inventoryRepository: IInventoryRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: TransferInventoryCommand): Promise<void> {
    const { productId, quantity, type, sourceStoreId, toStoreId } =
      command.transferInventoryDto;

    // check type of movement
    if (type === 'transfer') {
      // valitate that sourceStoreId and toStoreId are different and toStoreId is valid
      if (sourceStoreId === toStoreId || toStoreId === undefined) {
        throw new HttpException(
          {
            message: 'Source and destination store IDs must be different',
            code: 'trinha30-2323',
          },
          HttpStatus.BAD_REQUEST,
        );
      }

      // validate that sourceStoreId has enough quantity of product
      const sourceStoreInventory =
        await this.inventoryRepository.findByStoreIdAndProductId(
          sourceStoreId,
          productId,
        );
      if (!sourceStoreInventory) {
        throw new HttpException(
          {
            message: 'Source store does not exist or does not have the product',
            code: 'trinha45-1258',
          },
          HttpStatus.BAD_REQUEST,
        );
      }

      if (sourceStoreInventory.quantity < quantity) {
        throw new HttpException(
          {
            message: 'Source store does not have enough quantity of product',
            code: 'trinha56-1259',
          },
          HttpStatus.BAD_REQUEST,
        );
      }

      // get or create inventory for toStoreId
      let toStoreInventory =
        await this.inventoryRepository.findByStoreIdAndProductId(
          toStoreId,
          productId,
        );
      if (!toStoreInventory) {
        const now = new Date();
        toStoreInventory = new InventoryModel(
          productId,
          toStoreId,
          0,
          0,
          now,
          now,
        );
      }

      // transfer quantity
      sourceStoreInventory.removeQuantity(quantity);
      toStoreInventory.addQuantity(quantity);

      await this.inventoryRepository.save(sourceStoreInventory);
      await this.inventoryRepository.save(toStoreInventory);

      // publish event
      this.eventBus.publish(
        new MovementCreatedEvent({
          productId,
          sourceStoreId,
          toStoreId,
          quantity,
          type,
        }),
      );
    }
  }
}
