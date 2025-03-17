import { Body, Controller, Get, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { TransferInventoryDto } from '../../application/dtos';
import { TransferInventoryCommand } from '../../application/commands/implementations';
import { InventoryModel } from '../../domain/models';
import { GetInventoryLowStockQuery } from '../../application/queries/implementations';

@Controller('v1/inventories')
export class InventoryController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post('transfer')
  async transferInventory(
    @Body() transferInventoryDto: TransferInventoryDto,
  ): Promise<{ message: string }> {
    await this.commandBus.execute(
      new TransferInventoryCommand(transferInventoryDto),
    );
    return { message: `Inventory: <${transferInventoryDto.type}> successful` };
  }

  @Get('alerts')
  async getInventoryLowStock(): Promise<{ data: InventoryModel[] }> {
    const inventories = await this.queryBus.execute(
      new GetInventoryLowStockQuery(),
    );
    return { data: inventories };
  }
}
