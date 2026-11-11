/**
 * Tipos TypeScript para Producto.
 * Define las estructuras de datos utilizadas en las operaciones CRUD de productos.
 */

export interface ProductEntity {
  id: string;
  name: string;
  price: number;
  stock: number;
  category: string;
}

export interface CreateProductDto {
  name: string;
  price: number;
  stock: number;
  category: string;
}

export interface UpdateProductDto {
  name?: string;
  price?: number;
  stock?: number;
  category?: string;
}