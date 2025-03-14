import { ProductPaginationDto } from '../../dtos';

export class GetAllProductsQuery {
  constructor(public readonly productPaginationDto: ProductPaginationDto) {}
}
