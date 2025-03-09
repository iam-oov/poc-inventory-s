import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { HttpException, HttpStatus, Inject } from '@nestjs/common';

import { UpdateStoreCommand } from '../implementations';
import { IStoreRepository } from '../../../domain/repositories';
import { formatMessage, TEXTS } from '../../../../utils/constants';
import { StoreUpdatedEvent } from '../../events/implementatios';

@CommandHandler(UpdateStoreCommand)
export class UpdateStoreHandler implements ICommandHandler<UpdateStoreCommand> {
  constructor(
    @Inject('IStoreRepository')
    private readonly storeRepository: IStoreRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: UpdateStoreCommand): Promise<{ id: number }> {
    const { name, lat, lng } = command.updateStoreDto;
    const { id } = command;

    // validate if store exists
    const store = await this.storeRepository.findById(id);
    if (!store) {
      throw new HttpException(
        {
          message: formatMessage(TEXTS.ERROR.STORE_NOT_FOUND, {
            id,
          }),
          code: 'upstha27-1222',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    // validate if store with the same name already exists
    const existingStore = await this.storeRepository.findByName(name);
    if (existingStore && existingStore.id !== id) {
      throw new HttpException(
        {
          message: formatMessage(TEXTS.ERROR.STORE_NAME_ALREADY_EXISTS, {
            name,
          }),
          code: 'upstha42-1249',
        },
        HttpStatus.CONFLICT,
      );
    }

    store.updateDetails(name, lat, lng);
    const updatedStore = await this.storeRepository.save(store);

    // publish event
    this.eventBus.publish(
      new StoreUpdatedEvent(store.id, {
        name: store.name,
        lat: store.lat,
        lng: store.lng,
      }),
    );

    return { id: updatedStore.id };
  }
}
