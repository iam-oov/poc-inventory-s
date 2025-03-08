import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { CreateStoreDto } from '../../application/dtos';
import { CreateStoreCommand } from '../../application/commands';

@Controller('v1/stores')
export class StoreController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createStore(
    @Body() createStoreDto: CreateStoreDto,
  ): Promise<{ id: number }> {
    const newStore = await this.commandBus.execute(
      new CreateStoreCommand(createStoreDto),
    );
    console.log('🚀 ~ StoreController ~ newStore:', newStore);
    return { id: newStore.id };
  }

  // @Put(':id')
  // async updateStore(
  //   @Param('id') id: string,
  //   @Body() dto: UpdateStoreDto,
  // ): Promise<void> {
  //   const command = new UpdateStoreCommand(
  //     id,
  //     dto.name,
  //     dto.description,
  //     dto.address,
  //   );
  //   await this.commandBus.execute(command);
  // }

  // @Put(':id/activate')
  // async activateStore(@Param('id') id: string): Promise<void> {
  //   const command = new ActivateStoreCommand(id);
  //   await this.commandBus.execute(command);
  // }

  // @Put(':id/deactivate')
  // async deactivateStore(@Param('id') id: string): Promise<void> {
  //   const command = new DeactivateStoreCommand(id);
  //   await this.commandBus.execute(command);
  // }

  // @Get(':id')
  // async getStore(@Param('id') id: string): Promise<StoreDto> {
  //   try {
  //     return await this.queryBus.execute(new GetStoreQuery(id));
  //   } catch (error) {
  //     if (error instanceof NotFoundException) {
  //       throw error;
  //     }
  //     throw new Error('Error fetching store');
  //   }
  // }

  // @Get()
  // async getStores(@Query('ownerId') ownerId?: string): Promise<StoreDto[]> {
  //   if (ownerId) {
  //     return this.queryBus.execute(new GetStoresByOwnerQuery(ownerId));
  //   }
  //   return this.queryBus.execute(new GetActiveStoresQuery());
  // }
}
