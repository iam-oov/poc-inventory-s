import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Inject, Logger } from '@nestjs/common';

import { MovementCreatedEvent } from '../implementations';
import { MovementModel } from '../../../domain/models';
import { IMovementRepository } from '../../../domain/interfaces';

@EventsHandler(MovementCreatedEvent)
export class MovementCreatedHandler
  implements IEventHandler<MovementCreatedEvent>
{
  constructor(
    @Inject('IMovementRepository')
    private readonly movementRepository: IMovementRepository,
  ) {}

  private readonly logger = new Logger(MovementCreatedHandler.name);

  async handle(event: MovementCreatedEvent): Promise<void> {
    const { productId, sourceStoreId, toStoreId, quantity, type } = event.data;

    const now = new Date();
    const movement = new MovementModel(
      productId,
      sourceStoreId,
      toStoreId,
      quantity,
      type,
      now,
      now,
    );

    await this.movementRepository.save(movement);
  }
}
