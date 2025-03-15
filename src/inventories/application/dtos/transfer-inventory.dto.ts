import { IsEnum, IsInt, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

import { MovementType } from '../../../shared/aplication/enums';

export class TransferInventoryDto {
  @IsEnum(MovementType)
  type: MovementType;

  @IsString()
  sourceStoreId: string;

  @IsString()
  @IsOptional()
  toStoreId?: string;

  @IsInt()
  @Type(() => Number)
  productId: number;

  @IsInt()
  @Type(() => Number)
  quantity: number;
}
