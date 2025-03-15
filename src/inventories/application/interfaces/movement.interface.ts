import { MovementType } from '../../../shared/aplication/enums';

export interface IMovementWithouId {
  productId: number;
  sourceStoreId: string;
  toStoreId: string;
  quantity: number;
  type: MovementType;
}
