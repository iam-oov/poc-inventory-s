import { Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class CreateStoreDto {
  @IsString()
  name: string;

  @IsNumber()
  @Type(() => Number)
  lat: number;

  @IsNumber()
  @Type(() => Number)
  lng: number;
}
