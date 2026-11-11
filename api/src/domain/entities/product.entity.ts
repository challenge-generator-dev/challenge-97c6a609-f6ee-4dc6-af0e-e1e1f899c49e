import { IsNumber, IsPositive, IsString, Min } from 'class-validator';

export class ProductEntity {
  id: string;

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

  constructor(id: string, name: string, price: number, stock: number, category: string) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.stock = stock;
    this.category = category;
    this.validateInvariants();
  }

  private validateInvariants(): void {
    if (this.price <= 0) {
      throw new Error('Price must be positive');
    }
    if (this.stock < 0) {
      throw new Error('Stock cannot be negative');
    }
    if (!this.name || this.name.trim().length === 0) {
      throw new Error('Name is required');
    }
    if (!this.category || this.category.trim().length === 0) {
      throw new Error('Category is required');
    }
  }

  updateDetails(updateData: { name?: string; price?: number; stock?: number; category?: string }): void {
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
    this.validateInvariants();
  }
}