import { MovementModel } from '../models';

export interface IMovementRepository {
  save(movement: MovementModel): Promise<MovementModel>;
}
