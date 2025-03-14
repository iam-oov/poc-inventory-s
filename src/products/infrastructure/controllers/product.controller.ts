import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { ICreateProductResponse, IProductResponse } from '../interfaces';
import {
  CreateProductDto,
  ProductPaginationDto,
  UpdateProductDto,
} from '../../application/dtos';
import {
  CreateProductCommand,
  UpdateProductCommand,
} from '../../application/commands/implementations';
import { GetAllProductsQuery } from '../../application/queries/implementations';

@Controller('v1/products')
export class ProductController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllProducts(
    @Query() productPaginationDto: ProductPaginationDto,
  ): Promise<IProductResponse> {
    const { products, counter } = await this.queryBus.execute(
      new GetAllProductsQuery(productPaginationDto),
    );

    return {
      data: products,
      meta: {
        pagination: {
          page: productPaginationDto.page,
          lastPage: Math.ceil(counter / productPaginationDto.limit),
        },
      },
    };
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createProduct(
    @Body() createProductDto: CreateProductDto,
  ): Promise<ICreateProductResponse> {
    const newProduct = await this.commandBus.execute(
      new CreateProductCommand(createProductDto),
    );
    return { data: { id: newProduct.id } };
  }

  @Patch(':id')
  async updateProduct(
    @Param('id') id: number,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<ICreateProductResponse> {
    const updatedProduct = await this.commandBus.execute(
      new UpdateProductCommand(id, updateProductDto),
    );
    return { data: { id: updatedProduct.id } };
  }
}
