import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';

import { GetAllProductsQuery } from '../implementations';
import { IProductRepository } from '../../../domain/interfaces';
import { IProduct } from '../../interfaces';

@QueryHandler(GetAllProductsQuery)
export class GetAllProductsHandler
  implements IQueryHandler<GetAllProductsQuery>
{
  constructor(
    @Inject('IProductRepository')
    private readonly productRepository: IProductRepository,
  ) {}

  async execute(
    query: GetAllProductsQuery,
  ): Promise<{ products: IProduct[]; counter: number }> {
    const { productPaginationDto } = query;

    const { entities, counter } =
      await this.productRepository.getAllProducts(productPaginationDto);

    return {
      products: entities.map((product) => product.getDetails()),
      counter,
    };
  }
}
