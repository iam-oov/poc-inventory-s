import { Controller, Get, Param } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { InventoryModel } from '../../domain/models';
import { GetInventoryByQuery } from '../../application/queries/implementations';

@Controller('v1/stores')
export class StoreController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get(':id/inventory')
  async getInventoryByStoreId(
    @Param('id') storeId: string,
  ): Promise<{ data: InventoryModel[] }> {
    const inventories = await this.queryBus.execute(
      new GetInventoryByQuery({ storeId }),
    );
    return { data: inventories };
  }
}
