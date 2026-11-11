import { Injectable } from '@nestjs/common';
import { ProductRepository } from '../../../domain/repositories/product.repository';
import { ProductEntity } from '../../../domain/entities/product.entity';

@Injectable()
export class ProductNosqlRepository implements ProductRepository {
  async create(product: Omit<ProductEntity, 'id'>): Promise<ProductEntity> {
    throw new Error('Not implemented');
  }

  async findById(id: string): Promise<ProductEntity | null> {
    throw new Error('Not implemented');
  }

  async update(
    id: string,
    updateData: Partial<Omit<ProductEntity, 'id'>>,
  ): Promise<ProductEntity> {
    throw new Error('Not implemented');
  }

  async delete(id: string): Promise<void> {
    throw new Error('Not implemented');
  }

  async list(): Promise<ProductEntity[]> {
    throw new Error('Not implemented');
  }
}