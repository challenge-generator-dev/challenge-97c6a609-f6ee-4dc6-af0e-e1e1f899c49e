import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductSqlRepository } from '../../infrastructure/repositories/product-sql.repository';
import { ProductNosqlRepository } from '../../infrastructure/repositories/product-nosql.repository';
import { ProductDynamodbRepository } from '../../infrastructure/repositories/product-dynamodb.repository';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { Product } from '../../domain/entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    private readonly productSqlRepository: ProductSqlRepository,
    private readonly productNosqlRepository: ProductNosqlRepository,
    private readonly productDynamodbRepository: ProductDynamodbRepository,
  ) {}

  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    // Usamos SQL como fuente principal para este ejemplo
    return this.productSqlRepository.create(createProductDto);
  }

  async findAllProducts(): Promise<Product[]> {
    // Usamos SQL como fuente principal para este ejemplo
    return this.productSqlRepository.findAll();
  }

  async findProductById(id: string): Promise<Product> {
    // Usamos SQL como fuente principal para este ejemplo
    const product = await this.productSqlRepository.findOne(id);
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  async updateProduct(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
    // Usamos SQL como fuente principal para este ejemplo
    const product = await this.productSqlRepository.findOne(id);
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return this.productSqlRepository.update(id, updateProductDto);
  }

  async deleteProduct(id: string): Promise<void> {
    // Usamos SQL como fuente principal para este ejemplo
    const product = await this.productSqlRepository.findOne(id);
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return this.productSqlRepository.remove(id);
  }
}