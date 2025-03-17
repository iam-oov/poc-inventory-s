import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { HttpException, HttpStatus, Inject, Logger } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

import { TransferInventoryCommand } from '../implementations';
import { IInventoryRepository } from '../../../domain/interfaces';
import { InventoryModel } from '../../../domain/models';
import {
  LowStockActivatedEvent,
  MovementCreatedEvent,
} from '../../events/implementations';
import { DB, formatMessage, TEXTS } from '../../../../utils/constants';
import { MovementType } from '../../../../shared/aplication/enums';

@CommandHandler(TransferInventoryCommand)
export class TransferInventoryHandler
  implements ICommandHandler<TransferInventoryCommand>
{
  private readonly logger = new Logger(TransferInventoryHandler.name);

  constructor(
    @Inject('IInventoryRepository')
    private readonly inventoryRepository: IInventoryRepository,

    @InjectDataSource(DB.WRITE_CONNECTION)
    private dataSource: DataSource,

    private readonly eventBus: EventBus,
  ) {}

  async execute(command: TransferInventoryCommand): Promise<void> {
    const { productId, quantity, type, sourceStoreId, toStoreId } =
      command.transferInventoryDto;

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      switch (type) {
        case MovementType.TRANSFER:
          await this.handleTransfer(
            queryRunner,
            productId,
            quantity,
            sourceStoreId,
            toStoreId,
          );
          break;
        case MovementType.IN:
          await this.handleIn(queryRunner, productId, quantity, sourceStoreId);
          break;
        case MovementType.OUT:
          await this.handleOut(queryRunner, productId, quantity, sourceStoreId);
          break;
      }

      this.eventBus.publish(
        new MovementCreatedEvent({
          productId,
          sourceStoreId,
          toStoreId: MovementType.TRANSFER === type ? toStoreId : null,
          quantity,
          type,
        }),
      );

      await queryRunner.commitTransaction();
    } catch (error) {
      this.logger.error(`ROLLBACK: ${error.message}`);
      await queryRunner.rollbackTransaction();
      throw new HttpException(
        {
          message: error.message,
          code: 'trinha127-1430',
          sys: `ROLLBACK: ${TEXTS.ERROR.INTERNAL_SERVER_ERROR}`,
        },
        HttpStatus.BAD_REQUEST,
      );
    } finally {
      await queryRunner.release();
    }
  }

  private async handleTransfer(
    queryRunner: any,
    productId: number,
    quantity: number,
    sourceStoreId: string,
    toStoreId: string,
  ): Promise<void> {
    if (!toStoreId) {
      throw new HttpException(
        {
          message: formatMessage(TEXTS.ERROR.THE_FIELD_IS_REQUIRED, {
            field: 'toStoreId',
          }),
          code: 'trinha12-1234',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    if (sourceStoreId === toStoreId) {
      throw new HttpException(
        {
          message:
            TEXTS.ERROR.SOURCE_AND_DESTINATION_STORE_IDS_MUST_BE_DIFFERENT,
          code: 'trinha30-2323',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const sourceStoreInventory =
      await this.inventoryRepository.findByStoreIdAndProductId(
        sourceStoreId,
        productId,
      );
    if (!sourceStoreInventory || sourceStoreInventory.quantity < quantity) {
      throw new HttpException(
        {
          message:
            TEXTS.ERROR.SOURCE_STORE_DOES_NOT_HAVE_ENOUGH_QUANTITY_OF_PRODUCT,
          code: 'trinha56-1259',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

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

    sourceStoreInventory.removeQuantity(quantity);
    toStoreInventory.addQuantity(quantity);

    await this.inventoryRepository.save(
      sourceStoreInventory,
      queryRunner.manager,
    );
    await this.inventoryRepository.save(toStoreInventory, queryRunner.manager);

    console.log('🚀 ~ sourceStoreInventory:', sourceStoreInventory);

    this.eventBus.publish(
      new LowStockActivatedEvent({
        id: sourceStoreInventory.id,
        product: sourceStoreInventory.product,
        quantity: sourceStoreInventory.quantity,
        minStock: sourceStoreInventory.minStock,
        storeId: sourceStoreInventory.storeId,
      }),
    );

    this.eventBus.publish(
      new LowStockActivatedEvent({
        id: toStoreInventory.id,
        product: toStoreInventory.product,
        quantity: toStoreInventory.quantity,
        minStock: toStoreInventory.minStock,
        storeId: toStoreInventory.storeId,
      }),
    );
  }

  private async handleIn(
    queryRunner: any,
    productId: number,
    quantity: number,
    sourceStoreId: string,
  ): Promise<void> {
    let sourceStoreInventory =
      await this.inventoryRepository.findByStoreIdAndProductId(
        sourceStoreId,
        productId,
      );
    if (!sourceStoreInventory) {
      const now = new Date();
      sourceStoreInventory = new InventoryModel(
        productId,
        sourceStoreId,
        0,
        0,
        now,
        now,
      );
    }

    sourceStoreInventory.addQuantity(quantity);
    await this.inventoryRepository.save(
      sourceStoreInventory,
      queryRunner.manager,
    );

    this.eventBus.publish(
      new LowStockActivatedEvent({
        id: sourceStoreInventory.id,
        product: sourceStoreInventory.product,
        quantity: sourceStoreInventory.quantity,
        minStock: sourceStoreInventory.minStock,
        storeId: sourceStoreInventory.storeId,
      }),
    );
  }

  private async handleOut(
    queryRunner: any,
    productId: number,
    quantity: number,
    sourceStoreId: string,
  ): Promise<void> {
    const sourceStoreInventory =
      await this.inventoryRepository.findByStoreIdAndProductId(
        sourceStoreId,
        productId,
      );
    if (!sourceStoreInventory || sourceStoreInventory.quantity < quantity) {
      throw new HttpException(
        {
          message:
            TEXTS.ERROR.SOURCE_STORE_DOES_NOT_HAVE_ENOUGH_QUANTITY_OF_PRODUCT,
          code: 'trinha56-1259',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    sourceStoreInventory.removeQuantity(quantity);
    await this.inventoryRepository.save(
      sourceStoreInventory,
      queryRunner.manager,
    );

    this.eventBus.publish(
      new LowStockActivatedEvent({
        id: sourceStoreInventory.id,
        product: sourceStoreInventory.product,
        quantity: sourceStoreInventory.quantity,
        minStock: sourceStoreInventory.minStock,
        storeId: sourceStoreInventory.storeId,
      }),
    );
  }
}
