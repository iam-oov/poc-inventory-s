import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProductDto {
  /**
   * The name of the product.
   * @example "Product 1"
   */
  @IsString()
  name: string;

  /**
   * The description of the product.
   * @example "This is a product description"
   */
  @IsString()
  description: string;

  /**
   * The category of the product.
   * @example "electronics"
   */
  @IsString()
  @IsOptional()
  category?: string;

  /**
   * The price of the product.
   * @example 100.99
   */
  @IsNumber()
  @Type(() => Number)
  price: number;

  /**
   * The stock keeping unit of the product.
   * @example "SKU-123"
   */
  @IsString()
  sku: string;
}
