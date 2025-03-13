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

import { ICreateProductResponse } from '../interfaces';
import { CreateProductDto, UpdateProductDto } from '../../application/dtos';
import {
  CreateProductCommand,
  UpdateProductCommand,
} from '../../application/commands/implementations';

@Controller('v1/products')
export class ProductController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllProducts(@Query() productPaginationDto: ProductPaginationDto) {
    const products = await this.queryBus.execute(
      new GetAllProductsCommand(productPaginationDto),
    );
    return { data: products };
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
