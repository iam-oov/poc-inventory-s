import { EntityManager } from 'typeorm';

import { InventoryModel } from '../models';

export interface IInventoryRepository {
  findByStoreId(storeId: string): Promise<InventoryModel[] | null>;
  findByStoreIdAndProductId(
    storeId: string,
    productId: number,
  ): Promise<InventoryModel | null>;
  findLowStockInventories(): Promise<InventoryModel[] | null>;
  save(
    inventory: InventoryModel,
    transactionManager?: EntityManager,
  ): Promise<InventoryModel>;
}
