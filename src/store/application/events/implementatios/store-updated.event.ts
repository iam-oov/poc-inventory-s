import { IStoreWithoutId } from '../../interfaces';

export class StoreUpdatedEvent {
  constructor(
    public readonly id: number,
    public readonly data: IStoreWithoutId,
  ) {}
}
