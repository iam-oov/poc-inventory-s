import { IProduct } from '../../interfaces';

export class ProductCreatedEvent {
  constructor(public readonly data: IProduct) {}
}
