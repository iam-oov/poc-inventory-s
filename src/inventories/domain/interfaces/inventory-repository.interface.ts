import { InventoryModel } from '../models';

export interface IInventoryRepository {
  findByStoreId(storeId: string): Promise<InventoryModel[] | null>;
}
