import { IsNumber, IsPositive, IsString, Min } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsNumber()
  @IsPositive()
  price: number;

  @IsNumber()
  @Min(0)
  stock: number;

  @IsString()
  category: string;

  constructor(name: string, price: number, stock: number, category: string) {
    this.name = name;
    this.price = price;
    this.stock = stock;
    this.category = category;
  }
}