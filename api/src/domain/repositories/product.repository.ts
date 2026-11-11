import { ProductEntity } from '../entities/product.entity';

export interface ProductRepository {
  create(product: Omit<ProductEntity, 'id'>): Promise<ProductEntity>;
  findById(id: string): Promise<ProductEntity | null>;
  update(id: string, updateData: Partial<Omit<ProductEntity, 'id'>>): Promise<ProductEntity>;
  delete(id: string): Promise<void>;
  list(): Promise<ProductEntity[]>;
}