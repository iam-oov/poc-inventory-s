import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { IProductRepository } from '../../../domain/interfaces';
import { ProductEntity } from '../../../../shared/infrastructure/database/entities';
import { DB } from '../../../../utils/constants';
import { ProductModel } from '../../../domain/models';
import { convertToSlug } from '../../../../utils/strings.util';

@Injectable()
export class ProductRepository implements IProductRepository {
  constructor(
    @InjectRepository(ProductEntity, DB.WRITE_CONNECTION)
    private readonly productEntityRepository: Repository<ProductEntity>,
  ) {}

  async findById(id: number): Promise<ProductModel | null> {
    const entity = await this.productEntityRepository.findOne({
      where: { id },
    });
    if (!entity) {
      return null;
    }
    return this.mapToDomain(entity);
  }

  async findByName(name: string): Promise<ProductModel | null> {
    const slug = convertToSlug(name);
    const entity = await this.productEntityRepository.findOne({
      where: { slug },
    });
    if (!entity) {
      return null;
    }
    return this.mapToDomain(entity);
  }

  async save(product: ProductModel): Promise<ProductModel> {
    const entity = this.mapToEntity(product);
    const newEntity = await this.productEntityRepository.save(entity);
    return this.mapToDomain(newEntity);
  }

  private mapToDomain(entity: ProductEntity): ProductModel {
    return new ProductModel(
      entity.name,
      entity.description,
      entity.category,
      entity.price,
      entity.sku,
      entity.createdAt,
      entity.updatedAt,
      entity.id,
      entity.slug,
    );
  }

  private mapToEntity(product: ProductModel): ProductEntity {
    const entity = new ProductEntity();
    entity.name = product.name ?? entity.name;
    entity.description = product.description;
    entity.category = product.category;
    entity.price = product.price;
    entity.sku = product.sku;
    entity.createdAt = product.createdAt;
    entity.updatedAt = product.updatedAt;
    entity.id = product.id;
    entity.slug = product.name ? convertToSlug(product.name) : entity.slug;
    return entity;
  }
}
