import { ProductPaginationDto } from '../../application/dtos';
import { ProductModel } from '../models';

export interface IProductRepository {
  findById(id: number): Promise<ProductModel | null>;
  findByName(name: string): Promise<ProductModel | null>;
  getAllProducts(
    filters: ProductPaginationDto,
  ): Promise<{ entities: ProductModel[]; counter: number }>;
  save(product: ProductModel): Promise<ProductModel>;
  delete(product: ProductModel): Promise<{ id: number }>;
}
