import { IsNumber, IsString } from 'class-validator';
import { PaginationDto } from '../../../shared/aplication/dtos';
import { Type } from 'class-transformer';

export class OrderPaginationDto extends PaginationDto {
  @IsString()
  category: string;

  @IsNumber()
  @Type(() => Number)
  price: number;
}
