import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { IStoreRepository } from '../../../domain/repositories/store.repository.interface';
import { StoreEntity } from '../../../../shared/infrastructure/database/entities';
import { StoreModel } from '../../../domain/models';
import { DB } from '../../../../utils/constants';

@Injectable()
export class StoreRepository implements IStoreRepository {
  constructor(
    @InjectRepository(StoreEntity, DB.WRITE_CONNECTION)
    private readonly storeEntityRepository: Repository<StoreEntity>,
  ) {}

  async findById(id: number): Promise<StoreModel | null> {
    const entity = await this.storeEntityRepository.findOne({ where: { id } });
    if (!entity) {
      return null;
    }
    return this.mapToDomain(entity);
  }

  async findAll(): Promise<StoreModel[]> {
    const entities = await this.storeEntityRepository.find();
    return entities.map((entity) => this.mapToDomain(entity));
  }

  async findActiveStores(): Promise<StoreModel[]> {
    const entities = await this.storeEntityRepository.find({
      where: { isActive: true },
    });
    return entities.map((entity) => this.mapToDomain(entity));
  }

  async save(store: StoreModel): Promise<StoreModel> {
    const entity = this.mapToEntity(store);
    const newEntity = await this.storeEntityRepository.save(entity);
    return this.mapToDomain(newEntity);
  }

  async delete(id: string): Promise<void> {
    await this.storeEntityRepository.delete(id);
  }

  private mapToDomain(entity: StoreEntity): StoreModel {
    return new StoreModel(
      entity.name,
      entity.location,
      entity.isActive,
      entity.createdAt,
      entity.updatedAt,
      entity.id,
    );
  }

  private mapToEntity(store: StoreModel): StoreEntity {
    const entity = new StoreEntity();
    entity.id = store.id;
    entity.name = store.name;
    entity.location = store.location;
    entity.isActive = store.isActive;
    entity.createdAt = store.createdAt;
    entity.updatedAt = store.updatedAt;
    return entity;
  }
}
