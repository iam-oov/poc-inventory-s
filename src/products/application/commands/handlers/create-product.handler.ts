import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { HttpException, HttpStatus, Inject } from '@nestjs/common';

import { CreateProductCommand } from '../implementations';
import { IProductRepository } from '../../../domain/interfaces';
import { ProductModel } from '../../../domain/models';
import { ProductCreatedEvent } from '../../events/implementations';
import { formatMessage, TEXTS } from '../../../../utils/constants';

@CommandHandler(CreateProductCommand)
export class CreateProductHandler
  implements ICommandHandler<CreateProductCommand>
{
  constructor(
    @Inject('IProductRepository')
    private readonly productRepository: IProductRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: CreateProductCommand): Promise<{ id: number }> {
    const { name, description, category, price, sku } =
      command.createProductDto;

    // validate if product with the same name already exists
    const existingProduct = await this.productRepository.findByName(name);
    if (existingProduct) {
      throw new HttpException(
        {
          message: formatMessage(TEXTS.ERROR.PRODUCT_NAME_ALREADY_EXISTS, {
            name,
          }),
          code: 'crprha32-1910',
        },
        HttpStatus.CONFLICT,
      );
    }

    const now = new Date();
    const product = new ProductModel(
      name,
      description,
      category,
      price,
      sku,
      now,
      now,
    );

    const newProduct = await this.productRepository.save(product);

    // publish event
    this.eventBus.publish(
      new ProductCreatedEvent({
        name: product.name,
        description: product.description,
        category: product.category,
        price: product.price,
        sku: product.sku,
        id: newProduct.id,
      }),
    );

    return { id: newProduct.id };
  }
}
