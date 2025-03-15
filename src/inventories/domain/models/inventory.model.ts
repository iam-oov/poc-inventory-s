import { IProduct } from '../../../products/application/interfaces';

export class InventoryModel {
  constructor(
    private _productId: number,
    private _storeId: string,
    private _quantity: number,
    private _minStock: number,
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

  get storeId(): string {
    return this._storeId;
  }

  get quantity(): number {
    return this._quantity;
  }

  get minStock(): number {
    return this._minStock;
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

  getDetails(): {
    id: number;
    product: IProduct;
    storeId: string;
    quantity: number;
    minStock: number;
  } {
    return {
      id: +this._id,
      product: {
        id: this.product.id,
        name: this.product.name,
        description: this.product.description,
        category: this.product.category,
        price: this.product.price,
        sku: this.product.sku,
      },
      storeId: this._storeId,
      quantity: +this._quantity,
      minStock: +this._minStock,
    };
  }
}
