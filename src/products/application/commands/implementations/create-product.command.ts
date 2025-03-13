import { CreateProductDto } from '../../dtos';

export class CreateProductCommand {
  constructor(public readonly createProductDto: CreateProductDto) {}
}
