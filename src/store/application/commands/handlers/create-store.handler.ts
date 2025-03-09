import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { HttpException, HttpStatus, Inject } from '@nestjs/common';

import { CreateStoreCommand } from '../implementations/create-store.command';
import { IStoreRepository } from '../../../domain/repositories';
import { StoreModel } from '../../../domain/models';
import { StoreCreatedEvent } from '../../events/implementatios';
import { formatMessage, TEXTS } from '../../../../utils/constants';

@CommandHandler(CreateStoreCommand)
export class CreateStoreHandler implements ICommandHandler<CreateStoreCommand> {
  constructor(
    @Inject('IStoreRepository')
    private readonly storeRepository: IStoreRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: CreateStoreCommand): Promise<{ id: number }> {
    const { name, lat, lng } = command.createStoreDto;

    // validate if store with the same name already exists
    const existingStore = await this.storeRepository.findByName(name);
    if (existingStore) {
      throw new HttpException(
        {
          message: formatMessage(TEXTS.ERROR.STORE_NAME_ALREADY_EXISTS, {
            name,
          }),
          code: 'crstha32-1955',
        },
        HttpStatus.CONFLICT,
      );
    }

    const now = new Date();
    const store = new StoreModel(
      name,
      lat,
      lng,
      true, // stores are active by default
      now,
      now,
    );

    const newStore = await this.storeRepository.save(store);

    // publish event
    this.eventBus.publish(
      new StoreCreatedEvent({
        name: store.name,
        lat: store.lat,
        lng: store.lng,
        id: newStore.id,
      }),
    );

    return { id: newStore.id };
  }
}
