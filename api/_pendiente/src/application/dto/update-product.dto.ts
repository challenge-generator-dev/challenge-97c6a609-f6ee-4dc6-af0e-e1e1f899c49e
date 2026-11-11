import { IsNumber, IsOptional, IsPositive, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProductDto {
  @ApiProperty({ example: 'Laptop', description: 'The name of the product', required: false })
  @IsString()
  @IsOptional()
  @MinLength(3)
  name?: string;

  @ApiProperty({ example: 'High-performance laptop', description: 'The description of the product', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: 999.99, description: 'The price of the product', required: false })
  @IsNumber({}, { message: 'Price must be a number' })
  @IsPositive({ message: 'Price must be a positive number' })
  @IsOptional()
  price?: number;

  @ApiProperty({ example: 10, description: 'The stock quantity of the product', required: false })
  @IsNumber({}, { message: 'Stock must be a number' })
  @IsPositive({ message: 'Stock must be a positive number' })
  @IsOptional()
  stock?: number;

  constructor(
    name?: string,
    description?: string,
    price?: number,
    stock?: number
  ) {
    if (name !== undefined) this.name = name;
    if (description !== undefined) this.description = description;
    if (price !== undefined) this.price = price;
    if (stock !== undefined) this.stock = stock;

    const errors = [];
    if (price !== undefined && price <= 0) errors.push('Price must be positive');
    if (stock !== undefined && stock <= 0) errors.push('Stock must be positive');
    if (name !== undefined && (name.length < 3)) errors.push('Name must be at least 3 characters long');

    if (errors.length > 0) {
      throw new Error(`Validation failed: ${errors.join(', ')}`);
    }
  }
}