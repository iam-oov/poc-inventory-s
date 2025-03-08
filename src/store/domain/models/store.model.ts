export class StoreModel {
  constructor(
    private _name: string,
    private _location: string,
    private _isActive: boolean,
    private readonly _createdAt: Date,
    private _updatedAt: Date,
    private readonly _id?: number,
  ) {}

  get id(): number | undefined {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get location(): string {
    return this._location;
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

  updateDetails(name: string, location: string): void {
    this._name = name;
    this._location = location;
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
