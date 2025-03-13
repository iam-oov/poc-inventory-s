import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { HttpException, HttpStatus, Inject } from '@nestjs/common';

import { UpdateProductCommand } from '../implementations';
import { IProductRepository } from '../../../domain/interfaces';
import { formatMessage, TEXTS } from '../../../../utils/constants';
import { ProductUpdatedEvent } from '../../events/implementations';

@CommandHandler(UpdateProductCommand)
export class UpdateProductHandler
  implements ICommandHandler<UpdateProductCommand>
{
  constructor(
    @Inject('IProductRepository')
    private readonly productRepository: IProductRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: UpdateProductCommand): Promise<{ id: number }> {
    const { name, description, category, price, sku } =
      command.updateProductDto;
    const { id } = command;

    // validate if product exists
    const product = await this.productRepository.findById(id);
    if (!product) {
      throw new HttpException(
        {
          message: formatMessage(TEXTS.ERROR.PRODUCT_NOT_FOUND, {
            id,
          }),
          code: 'upstha32-1222',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    // validate if product with the same name already exists
    const existingProduct = await this.productRepository.findByName(
      product.name,
    );
    if (existingProduct && existingProduct.id !== id) {
      throw new HttpException(
        {
          message: formatMessage(TEXTS.ERROR.PRODUCT_NAME_ALREADY_EXISTS, {
            name: product.name,
          }),
          code: 'upprha46-1731',
        },
        HttpStatus.CONFLICT,
      );
    }

    product.updateDetails(name, description, category, price, sku);
    const updatedProduct = await this.productRepository.save(product);

    // publish event
    this.eventBus.publish(
      new ProductUpdatedEvent(product.id, {
        name: product.name,
      }),
    );

    return { id: updatedProduct.id };
  }
}
