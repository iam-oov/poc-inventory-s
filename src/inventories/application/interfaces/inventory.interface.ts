import { IProduct } from '../../../products/application/interfaces';

export interface IInventory {
  id: number;
  product: IProduct;
  storeId: string;
  quantity: number;
  minStock: number;
}
