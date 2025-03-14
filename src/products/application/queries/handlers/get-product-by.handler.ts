import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { HttpException, HttpStatus, Inject } from '@nestjs/common';

import { GetProductByQuery } from '../implementations';
import { IProductRepository } from '../../../domain/interfaces';
import { IProduct } from '../../interfaces';
import { formatMessage, TEXTS } from '../../../../utils/constants';
import { ProductModel } from '../../../domain/models';

@QueryHandler(GetProductByQuery)
export class GetProductByHandler implements IQueryHandler<GetProductByQuery> {
  constructor(
    @Inject('IProductRepository')
    private readonly productRepository: IProductRepository,
  ) {}

  async execute(query: GetProductByQuery): Promise<IProduct> {
    const { id, name } = query.myQuery;

    const product = id
      ? await this.findProductById(id)
      : await this.findProductByName(name);

    return product.getDetails();
  }

  private async findProductById(id: number): Promise<ProductModel> {
    const product = await this.productRepository.findById(id);

    if (!product) {
      throw new HttpException(
        {
          message: formatMessage(TEXTS.ERROR.PRODUCT_NOT_FOUND_ID, { id }),
          code: 'geprby34-1014',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    return product;
  }

  private async findProductByName(name: string): Promise<ProductModel> {
    const product = await this.productRepository.findByName(name);

    if (!product) {
      throw new HttpException(
        {
          message: formatMessage(TEXTS.ERROR.PRODUCT_NOT_FOUND_NAME, { name }),
          code: 'geprby50-1015',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    return product;
  }
}
