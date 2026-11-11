import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
@Schema()
export class Product {
  @ApiProperty({ example: '1', description: 'The unique identifier of the product' })
  @PrimaryGeneratedColumn('uuid')
  @Prop({ type: String, required: true, unique: true })
  id: string;

  @ApiProperty({ example: 'Laptop', description: 'The name of the product' })
  @Column()
  @Prop({ required: true })
  name: string;

  @ApiProperty({ example: 'High-performance laptop', description: 'The description of the product' })
  @Column()
  @Prop()
  description: string;

  @ApiProperty({ example: 999.99, description: 'The price of the product' })
  @Column('decimal', { precision: 10, scale: 2 })
  @Prop({ required: true, type: Number })
  price: number;

  @ApiProperty({ example: 10, description: 'The stock quantity of the product' })
  @Column()
  @Prop({ required: true, type: Number })
  stock: number;
}

export type ProductDocument = Product & Document;
export const ProductSchema = SchemaFactory.createForClass(Product);