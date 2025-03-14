import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { HttpException, HttpStatus, Inject } from '@nestjs/common';

import { DeleteProductCommand } from '../implementations';
import { IProductRepository } from '../../../domain/interfaces';
import { formatMessage, TEXTS } from '../../../../utils/constants';
import { ProductDeletedEvent } from '../../events/implementations';

@CommandHandler(DeleteProductCommand)
export class DeleteProductHandler
  implements ICommandHandler<DeleteProductCommand>
{
  constructor(
    @Inject('IProductRepository')
    private readonly productRepository: IProductRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: DeleteProductCommand): Promise<void> {
    const { id } = command;

    // validate if product exists
    const product = await this.productRepository.findById(id);
    if (!product) {
      throw new HttpException(
        {
          message: formatMessage(TEXTS.ERROR.PRODUCT_NOT_FOUND_ID, {
            id,
          }),
          code: 'deprha30-1107',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    await this.productRepository.delete(product);

    // publish event
    this.eventBus.publish(
      new ProductDeletedEvent(product.id, {
        name: product.name,
      }),
    );
  }
}
