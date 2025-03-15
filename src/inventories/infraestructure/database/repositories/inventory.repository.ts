import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { InventoryEntity } from '../../../../shared/infrastructure/database/entities';
import { DB } from '../../../../utils/constants';
import { IInventoryRepository } from '../../../domain/interfaces';
import { InventoryModel } from '../../../domain/models';

@Injectable()
export class InventoryRepository implements IInventoryRepository {
  constructor(
    @InjectRepository(InventoryEntity, DB.READ_CONNECTION)
    private readonly productEntityReadRepository: Repository<InventoryEntity>,
  ) {}

  async findByStoreId(storeId: string): Promise<InventoryModel[] | null> {
    const entities = await this.productEntityReadRepository.find({
      where: { storeId },
      relations: ['product'],
    });

    if (!entities) {
      return null;
    }
    return entities.map((entity) => this.mapToDomain(entity));
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
