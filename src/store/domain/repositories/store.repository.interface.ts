import { StoreModel } from '../models';

export interface IStoreRepository {
  findById(id: number): Promise<StoreModel | null>;
  findAll(): Promise<StoreModel[]>;
  findActiveStores(): Promise<StoreModel[]>;
  save(store: StoreModel): Promise<StoreModel>;
  delete(id: string): Promise<void>;
}
