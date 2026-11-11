import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { Product } from './domain/entities/product.entity';
import { ProductSchema } from './domain/entities/product.entity';
import { ProductSqlRepository } from './infrastructure/repositories/product-sql.repository';
import { ProductNosqlRepository } from './infrastructure/repositories/product-nosql.repository';
import { ProductDynamodbRepository } from './infrastructure/repositories/product-dynamodb.repository';
import { ProductsController } from './api/products.controller';
import { ProductsService } from './application/services/products.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST || 'localhost',
      port: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
      username: process.env.POSTGRES_USER || 'postgres',
      password: process.env.POSTGRES_PASSWORD || 'postgres',
      database: process.env.POSTGRES_DB || 'products',
      entities: [Product],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Product]),
    MongooseModule.forRoot(process.env.MONGODB_URI || 'mongodb://localhost:27017/products'),
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
  ],
  controllers: [ProductsController],
  providers: [
    ProductsService,
    ProductSqlRepository,
    ProductNosqlRepository,
    ProductDynamodbRepository,
  ],
})
export class AppModule {}