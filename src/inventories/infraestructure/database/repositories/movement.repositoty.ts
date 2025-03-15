import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { IMovementRepository } from '../../../domain/interfaces';
import { MovementModel } from '../../../domain/models';
import { MovementEntity } from '../../../../shared/infrastructure/database/entities';
import { DB } from '../../../../utils/constants';

@Injectable()
export class MovementRepository implements IMovementRepository {
  constructor(
    @InjectRepository(MovementEntity, DB.WRITE_CONNECTION)
    private readonly movementEntityWriteRepository: Repository<MovementEntity>,
  ) {}

  async save(movement: MovementModel): Promise<MovementModel> {
    const entity = this.mapToEntity(movement);
    const newEntity = await this.movementEntityWriteRepository.save(entity);
    return this.mapToDomain(newEntity);
  }

  private mapToEntity(movement: MovementModel): MovementEntity {
    const entity = new MovementEntity();
    entity.productId = movement.productId;
    entity.sourceStoreId = movement.sourceStoreId;
    entity.toStoreId = movement.toStoreId;
    entity.quantity = movement.quantity;
    entity.type = movement.type;
    entity.createdAt = movement.createdAt;
    entity.updatedAt = movement.updatedAt;
    return entity;
  }

  private mapToDomain(entity: MovementEntity): MovementModel {
    return new MovementModel(
      entity.productId,
      entity.sourceStoreId,
      entity.toStoreId,
      entity.quantity,
      entity.type,
      entity.createdAt,
      entity.updatedAt,
      entity.id,
    );
  }
}
