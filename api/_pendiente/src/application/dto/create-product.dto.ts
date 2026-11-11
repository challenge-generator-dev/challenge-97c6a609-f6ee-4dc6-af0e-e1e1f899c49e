import { IsNotEmpty, IsNumber, IsPositive, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ example: 'Laptop', description: 'The name of the product' })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @ApiProperty({ example: 'High-performance laptop', description: 'The description of the product' })
  @IsString()
  description: string;

  @ApiProperty({ example: 999.99, description: 'The price of the product' })
  @IsNumber({}, { message: 'Price must be a number' })
  @IsPositive({ message: 'Price must be a positive number' })
  price: number;

  @ApiProperty({ example: 10, description: 'The stock quantity of the product' })
  @IsNumber({}, { message: 'Stock must be a number' })
  @IsPositive({ message: 'Stock must be a positive number' })
  stock: number;

  constructor(name: string, description: string, price: number, stock: number) {
    this.name = name;
    this.description = description;
    this.price = price;
    this.stock = stock;

    const errors = [];
    if (price <= 0) errors.push('Price must be positive');
    if (stock <= 0) errors.push('Stock must be positive');
    if (!name || name.length < 3) errors.push('Name must be at least 3 characters long');

    if (errors.length > 0) {
      throw new Error(`Validation failed: ${errors.join(', ')}`);
    }
  }
}