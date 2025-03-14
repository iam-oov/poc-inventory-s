interface IInventoryQuery {
  storeId?: string;
}

export class GetInventoryByQuery {
  constructor(public readonly myQuery: IInventoryQuery) {}
}
