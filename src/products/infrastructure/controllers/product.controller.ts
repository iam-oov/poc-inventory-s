import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { IProductIdResponse, IProductResponse } from '../interfaces';
import {
  CreateProductDto,
  ProductPaginationDto,
  UpdateProductDto,
} from '../../application/dtos';
import {
  CreateProductCommand,
  DeleteProductCommand,
  UpdateProductCommand,
} from '../../application/commands/implementations';
import {
  GetAllProductsQuery,
  GetProductByQuery,
} from '../../application/queries/implementations';

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

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getProductById(@Param('id') id: number): Promise<IProductResponse> {
    const product = await this.queryBus.execute(new GetProductByQuery({ id }));
    return { data: product };
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createProduct(
    @Body() createProductDto: CreateProductDto,
  ): Promise<IProductIdResponse> {
    const newProduct = await this.commandBus.execute(
      new CreateProductCommand(createProductDto),
    );
    return { data: { id: newProduct.id } };
  }

  @Patch(':id')
  async updateProduct(
    @Param('id') id: number,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<IProductIdResponse> {
    const updatedProduct = await this.commandBus.execute(
      new UpdateProductCommand(id, updateProductDto),
    );
    return { data: { id: updatedProduct.id } };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async deleteProduct(@Param('id') id: number): Promise<IProductIdResponse> {
    await this.commandBus.execute(new DeleteProductCommand(id));
    return { data: { id } };
  }
}
