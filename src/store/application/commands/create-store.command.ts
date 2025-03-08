import { CreateStoreDto } from '../dtos';

export class CreateStoreCommand {
  constructor(public readonly createStoreDto: CreateStoreDto) {}
}
