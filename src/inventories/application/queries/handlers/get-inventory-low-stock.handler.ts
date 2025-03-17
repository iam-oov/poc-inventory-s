import { QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';

import { GetInventoryLowStockQuery } from '../implementations';
import { IInventory } from '../../interfaces';
import { IInventoryRepository } from '../../../domain/interfaces';

@QueryHandler(GetInventoryLowStockQuery)
export class GetInventoryLowStockHandler {
  constructor(
    @Inject('IInventoryRepository')
    private readonly inventoryRepository: IInventoryRepository,
  ) {}

  async execute(): Promise<IInventory[] | null> {
    const inventories =
      await this.inventoryRepository.findLowStockInventories();
    return inventories.map((inventory) => inventory.getDetails());
  }
}
