import { UpdateStoreDto } from '../../dtos';

export class UpdateStoreCommand {
  constructor(
    public readonly id: number,
    public readonly updateStoreDto: UpdateStoreDto,
  ) {}
}
