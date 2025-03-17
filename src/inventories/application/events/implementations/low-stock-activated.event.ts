import { IInventory } from '../../interfaces';

export class LowStockActivatedEvent {
  constructor(public readonly data: IInventory) {}
}
