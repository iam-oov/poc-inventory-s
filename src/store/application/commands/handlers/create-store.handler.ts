import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';

import { CreateStoreCommand } from '../create-store.command';
import { IStoreRepository } from '../../../domain/repositories';
import { StoreModel } from '../../../domain/models';
import { StoreCreatedEvent } from '../../events';

@CommandHandler(CreateStoreCommand)
export class CreateStoreHandler implements ICommandHandler<CreateStoreCommand> {
  constructor(
    @Inject('IStoreRepository')
    private readonly storeRepository: IStoreRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: CreateStoreCommand): Promise<{ id: number }> {
    const { name, location } = command.createStoreDto;

    const now = new Date();
    const store = new StoreModel(
      name,
      location,
      true, // stores are active by default
      now,
      now,
    );

    const storeObj = await this.storeRepository.save(store);

    // publish event
    this.eventBus.publish(
      new StoreCreatedEvent(store.name, store.location, storeObj.id),
    );

    return { id: storeObj.id };
  }
}
