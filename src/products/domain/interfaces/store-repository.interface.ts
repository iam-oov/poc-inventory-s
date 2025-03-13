import { ProductModel } from '../models';

export interface IProductRepository {
  findById(id: number): Promise<ProductModel | null>;
  findByName(name: string): Promise<ProductModel | null>;
  save(product: ProductModel): Promise<ProductModel>;
}
