// TODO(reto): Implementar las operaciones CRUD para PostgreSQL usando TypeORM
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../../domain/entities/product.entity';
import { CreateProductDto } from '../../application/dto/create-product.dto';
import { UpdateProductDto } from '../../application/dto/update-product.dto';

@Injectable()
export class ProductSqlRepository {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    // TODO(reto): Implementar la creación de un producto en PostgreSQL
    const product = this.productRepository.create(createProductDto);
    return await this.productRepository.save(product);
  }

  async findAll(): Promise<Product[]> {
    // TODO(reto): Implementar la obtención de todos los productos
    return await this.productRepository.find();
  }

  async findOne(id: string): Promise<Product> {
    // TODO(reto): Implementar la obtención de un producto por ID
    return await this.productRepository.findOne({ where: { id } });
  }

  async update(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
    // TODO(reto): Implementar la actualización de un producto
    await this.productRepository.update(id, updateProductDto);
    return await this.productRepository.findOne({ where: { id } });
  }

  async remove(id: string): Promise<void> {
    // TODO(reto): Implementar la eliminación de un producto
    await this.productRepository.delete(id);
  }
}