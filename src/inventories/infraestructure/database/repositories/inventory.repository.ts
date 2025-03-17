import { EntityManager, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { InventoryEntity } from '../../../../shared/infrastructure/database/entities';
import { DB } from '../../../../utils/constants';
import { IInventoryRepository } from '../../../domain/interfaces';
import { InventoryModel } from '../../../domain/models';

@Injectable()
export class InventoryRepository implements IInventoryRepository {
  constructor(
    @InjectRepository(InventoryEntity, DB.WRITE_CONNECTION)
    private readonly inventoryEntityWriteRepository: Repository<InventoryEntity>,

    @InjectRepository(InventoryEntity, DB.READ_CONNECTION)
    private readonly inventoryEntityReadRepository: Repository<InventoryEntity>,
  ) {}

  async findByStoreId(storeId: string): Promise<InventoryModel[] | null> {
    const entities = await this.inventoryEntityReadRepository.find({
      where: { storeId },
      relations: ['product'],
    });

    if (!entities) {
      return null;
    }
    return entities.map((entity) => this.mapToDomain(entity));
  }

  async findByStoreIdAndProductId(
    storeId: string,
    productId: number,
  ): Promise<InventoryModel | null> {
    const entity = await this.inventoryEntityReadRepository.findOne({
      where: { storeId, productId },
      relations: ['product'],
    });

    if (!entity) {
      return null;
    }

    return this.mapToDomain(entity);
  }

  async findLowStockInventories(): Promise<InventoryModel[] | null> {
    const { INVENTORY } = DB.TABLES;
    const entities = await this.inventoryEntityReadRepository
      .createQueryBuilder(INVENTORY)
      .where(`${INVENTORY}.quantity <= ${INVENTORY}.minStock`)
      .leftJoinAndSelect(`${INVENTORY}.product`, 'product')
      .orderBy(`${INVENTORY}.minStock - ${INVENTORY}.quantity`, 'DESC')
      .getMany();

    if (!entities) {
      return null;
    }

    return entities.map((entity) => this.mapToDomain(entity));
  }

  async save(
    inventory: InventoryModel,
    transactionManager?: EntityManager,
  ): Promise<InventoryModel> {
    const entity = this.mapToEntity(inventory);

    let newEntity;
    if (transactionManager) {
      newEntity = await transactionManager.save(entity);
    } else {
      newEntity = await this.inventoryEntityWriteRepository.save(entity);
    }

    return this.mapToDomain(newEntity);
  }

  private mapToEntity(inventory: InventoryModel): InventoryEntity {
    const entity = new InventoryEntity();
    entity.productId = inventory.productId;
    entity.storeId = inventory.storeId;
    entity.quantity = inventory.quantity;
    entity.minStock = inventory.minStock;
    entity.createdAt = inventory.createdAt;
    entity.updatedAt = inventory.updatedAt;
    entity.id = inventory.id;
    return entity;
  }

  private mapToDomain(entity: InventoryEntity): InventoryModel {
    return new InventoryModel(
      entity.productId,
      entity.storeId,
      entity.quantity,
      entity.minStock,
      entity.createdAt,
      entity.updatedAt,
      entity.id,
      entity.product,
    );
  }
}
