interface IProductQuery {
  id?: number;
  name?: string;
}

export class GetProductByQuery {
  constructor(public readonly myQuery: IProductQuery) {}
}
