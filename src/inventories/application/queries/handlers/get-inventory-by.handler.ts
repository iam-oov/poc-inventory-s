import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { HttpException, HttpStatus, Inject } from '@nestjs/common';

import { GetInventoryByQuery } from '../implementations';
import { IInventoryRepository } from '../../../domain/interfaces';
import { InventoryModel } from '../../../domain/models';
import { formatMessage, TEXTS } from '../../../../utils/constants';
import { IInventory } from '../../interfaces';

@QueryHandler(GetInventoryByQuery)
export class GetInventoryByHandler
  implements IQueryHandler<GetInventoryByQuery>
{
  constructor(
    @Inject('IInventoryRepository')
    private readonly inventoryRepository: IInventoryRepository,
  ) {}

  async execute(query: GetInventoryByQuery): Promise<IInventory[]> {
    const { storeId } = query.myQuery;

    const inventories = await this.findInventoriesByStoreId(storeId);

    return inventories.map((inventory) => inventory.getDetails());
  }

  private async findInventoriesByStoreId(
    storeId: string,
  ): Promise<InventoryModel[]> {
    const inventories = await this.inventoryRepository.findByStoreId(storeId);

    if (!inventories) {
      throw new HttpException(
        {
          message: formatMessage(TEXTS.ERROR.NO_INVETORY_FOUND_BY_STORE_ID, {
            storeId,
          }),
          code: 'geinby35-1251',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    return inventories;
  }
}
