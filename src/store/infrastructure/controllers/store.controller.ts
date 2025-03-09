import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { CreateStoreDto, UpdateStoreDto } from '../../application/dtos';
import {
  CreateStoreCommand,
  UpdateStoreCommand,
} from '../../application/commands/implementations';
import { ICreateStoreResponse } from '../interfaces';

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
  ): Promise<ICreateStoreResponse> {
    const newStore = await this.commandBus.execute(
      new CreateStoreCommand(createStoreDto),
    );
    return { data: { id: newStore.id } };
  }

  @Patch(':id')
  async updateStore(
    @Param('id') id: number,
    @Body() updateStoreDto: UpdateStoreDto,
  ): Promise<ICreateStoreResponse> {
    const updatedStore = await this.commandBus.execute(
      new UpdateStoreCommand(id, updateStoreDto),
    );
    return { data: { id: updatedStore.id } };
  }

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
