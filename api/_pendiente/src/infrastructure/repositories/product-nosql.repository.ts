// TODO(reto): Implementar las operaciones CRUD para MongoDB usando Mongoose
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from '../../domain/entities/product.entity';
import { CreateProductDto } from '../../application/dto/create-product.dto';
import { UpdateProductDto } from '../../application/dto/update-product.dto';

@Injectable()
export class ProductNosqlRepository {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    // TODO(reto): Implementar la creación de un producto en MongoDB
    const createdProduct = new this.productModel(createProductDto);
    return await createdProduct.save();
  }

  async findAll(): Promise<Product[]> {
    // TODO(reto): Implementar la obtención de todos los productos
    return await this.productModel.find().exec();
  }

  async findOne(id: string): Promise<Product> {
    // TODO(reto): Implementar la obtención de un producto por ID
    return await this.productModel.findById(id).exec();
  }

  async update(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
    // TODO(reto): Implementar la actualización de un producto
    return await this.productModel.findByIdAndUpdate(id, updateProductDto, { new: true }).exec();
  }

  async remove(id: string): Promise<void> {
    // TODO(reto): Implementar la eliminación de un producto
    await this.productModel.findByIdAndDelete(id).exec();
  }
}