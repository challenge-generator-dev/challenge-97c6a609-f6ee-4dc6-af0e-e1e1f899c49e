import { IsNumber, IsOptional, IsPositive, IsString, Min } from 'class-validator';

export class UpdateProductDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  price?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  stock?: number;

  @IsString()
  @IsOptional()
  category?: string;

  constructor(updateData: { name?: string; price?: number; stock?: number; category?: string }) {
    if (updateData.name !== undefined) {
      this.name = updateData.name;
    }
    if (updateData.price !== undefined) {
      this.price = updateData.price;
    }
    if (updateData.stock !== undefined) {
      this.stock = updateData.stock;
    }
    if (updateData.category !== undefined) {
      this.category = updateData.category;
    }
  }
}