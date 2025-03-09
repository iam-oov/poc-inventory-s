export class StoreModel {
  constructor(
    private _name: string,
    private _lat: number,
    private _lng: number,
    private _isActive: boolean,
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

  get lat(): number {
    return this._lat;
  }

  get lng(): number {
    return this._lng;
  }

  get slug(): string | undefined {
    return this._slug;
  }

  get isActive(): boolean {
    return this._isActive;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  updateDetails(name: string, lat: number, lng: number): void {
    this._name = name;
    this._lat = lat;
    this._lng = lng;
    this._updatedAt = new Date();
  }

  activate(): void {
    this._isActive = true;
    this._updatedAt = new Date();
  }

  deactivate(): void {
    this._isActive = false;
    this._updatedAt = new Date();
  }
}
