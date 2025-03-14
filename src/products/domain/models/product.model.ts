import { convertToSlug } from '../../../utils/strings.util';

export class ProductModel {
  constructor(
    private _name: string,
    private _description: string,
    private _category: string,
    private _price: number,
    private _sku: string,
    private readonly _createdAt: Date,
    private _updatedAt: Date,
    private readonly _id?: number,
    private _slug?: string,
  ) {}

  get id(): number | undefined {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get description(): string {
    return this._description;
  }

  get category(): string {
    return this._category;
  }

  get price(): number {
    return this._price;
  }

  get sku(): string {
    return this._sku;
  }

  get slug(): string | undefined {
    return this._slug;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  getDetails(): {
    id: number;
    name: string;
    description: string;
    category: string;
    price: number;
    sku: string;
  } {
    return {
      id: this._id as number,
      name: this._name,
      description: this._description,
      category: this._category,
      price: this._price,
      sku: this._sku,
    };
  }

  updateDetails(
    name: string,
    description: string,
    category: string,
    price: number,
    sku: string,
  ): void {
    this._name = name ?? this._name;
    this._description = description;
    this._category = category;
    this._price = price;
    this._sku = sku;
    this._slug = convertToSlug(this._name);
    this._updatedAt = new Date();
  }
}
