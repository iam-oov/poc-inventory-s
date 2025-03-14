import { IProductWithoutId } from '../../interfaces';

export class ProductDeletedEvent {
  constructor(
    public readonly id: number,
    public readonly data: IProductWithoutId,
  ) {}
}
