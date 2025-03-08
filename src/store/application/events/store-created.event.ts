export class StoreCreatedEvent {
  constructor(
    public readonly name: string,
    public readonly location: string,
    public readonly id: number,
  ) {}
}
