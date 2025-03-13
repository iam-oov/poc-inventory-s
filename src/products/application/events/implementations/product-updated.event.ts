import { IProductWithoutId } from '../../interfaces';

export class ProductUpdatedEvent {
  constructor(
    public readonly id: number,
    public readonly data: IProductWithoutId,
  ) {}
}
