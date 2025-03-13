import { UpdateProductDto } from '../../dtos';

export class UpdateProductCommand {
  constructor(
    public readonly id: number,
    public readonly updateProductDto: UpdateProductDto,
  ) {}
}
