import { IsNumber, IsOptional, IsString } from 'class-validator';
import { PaginationDto } from '../../../shared/aplication/dtos';
import { Transform, Type } from 'class-transformer';

export class ProductPaginationDto extends PaginationDto {
  @IsString()
  @IsOptional()
  @Transform(({ value }) => value?.toLowerCase())
  category?: string;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  price?: number;

  @IsString()
  @IsOptional()
  sku?: string;
}
