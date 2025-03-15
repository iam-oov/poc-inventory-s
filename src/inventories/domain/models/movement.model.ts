import { IProduct } from '../../../products/application/interfaces';
import { MovementType } from '../../../shared/aplication/enums';

export class MovementModel {
  constructor(
    private _productId: number,
    private _sourceStoreId: string,
    private _toStoreId: string,
    private _quantity: number,
    private _type: MovementType,
    private readonly _createdAt: Date,
    private _updatedAt: Date,
    private readonly _id?: number,
    private readonly _product?: IProduct,
  ) {}

  get id(): number | undefined {
    return this._id;
  }

  get productId(): number {
    return this._productId;
  }

  get sourceStoreId(): string {
    return this._sourceStoreId;
  }

  get toStoreId(): string {
    return this._toStoreId;
  }

  get quantity(): number {
    return this._quantity;
  }

  get type(): MovementType {
    return this._type;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  get product(): IProduct | undefined {
    return this._product;
  }
}
