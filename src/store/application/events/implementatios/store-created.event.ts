import { IStore } from '../../interfaces';

export class StoreCreatedEvent {
  constructor(public readonly data: IStore) {}
}
