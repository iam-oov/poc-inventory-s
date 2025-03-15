import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { TransferInventoryDto } from '../../application/dtos';
import { TransferInventoryCommand } from '../../application/commands/implementations';

@Controller('v1/inventories')
export class InventoryController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post('transfer')
  async transferInventory(
    @Body() transferInventoryDto: TransferInventoryDto,
  ): Promise<{ message: string }> {
    await this.commandBus.execute(
      new TransferInventoryCommand(transferInventoryDto),
    );

    return { message: 'Inventory transfered' };
  }
}
