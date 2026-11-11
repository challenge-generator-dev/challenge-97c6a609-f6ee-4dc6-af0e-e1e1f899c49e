import { Injectable } from '@nestjs/common';
import { ProductRepository } from '../../../domain/repositories/product.repository';
import { ProductEntity } from '../../../domain/entities/product.entity';
import pg from 'pg';
import { ConfigService } from '@nestjs/config';

const { Pool } = pg;

@Injectable()
export class ProductSqlRepository implements ProductRepository {
  private pool: pg.Pool;

  constructor(private configService: ConfigService) {
    this.pool = new Pool({
      host: this.configService.get<string>('DB_HOST'),
      port: this.configService.get<number>('DB_PORT'),
      user: this.configService.get<string>('DB_USER'),
      password: this.configService.get<string>('DB_PASSWORD'),
      database: this.configService.get<string>('DB_NAME'),
    });
  }

  async create(product: Omit<ProductEntity, 'id'>): Promise<ProductEntity> {
    const query = `
      INSERT INTO products (name, price, stock, category)
      VALUES ($1, $2, $3, $4)
      RETURNING id, name, price, stock, category
    `;
    const values = [product.name, product.price, product.stock, product.category];
    const result = await this.pool.query(query, values);
    return new ProductEntity(
      result.rows[0].id,
      result.rows[0].name,
      result.rows[0].price,
      result.rows[0].stock,
      result.rows[0].category
    );
  }

  async findById(id: string): Promise<ProductEntity | null> {
    const query = 'SELECT id, name, price, stock, category FROM products WHERE id = $1';
    const result = await this.pool.query(query, [id]);
    if (result.rows.length === 0) {
      return null;
    }
    return new ProductEntity(
      result.rows[0].id,
      result.rows[0].name,
      result.rows[0].price,
      result.rows[0].stock,
      result.rows[0].category
    );
  }

  async update(id: string, updateData: Partial<Omit<ProductEntity, 'id'>>): Promise<ProductEntity> {
    const setClauses: string[] = [];
    const values: (string | number)[] = [];
    let paramIndex = 1;

    if (updateData.name !== undefined) {
      setClauses.push(`name = $${paramIndex}`);
      values.push(updateData.name);
      paramIndex++;
    }
    if (updateData.price !== undefined) {
      setClauses.push(`price = $${paramIndex}`);
      values.push(updateData.price);
      paramIndex++;
    }
    if (updateData.stock !== undefined) {
      setClauses.push(`stock = $${paramIndex}`);
      values.push(updateData.stock);
      paramIndex++;
    }
    if (updateData.category !== undefined) {
      setClauses.push(`category = $${paramIndex}`);
      values.push(updateData.category);
      paramIndex++;
    }

    if (setClauses.length === 0) {
      throw new Error('No update data provided');
    }

    values.push(id);
    const query = `
      UPDATE products
      SET ${setClauses.join(', ')}
      WHERE id = $${paramIndex}
      RETURNING id, name, price, stock, category
    `;

    const result = await this.pool.query(query, values);
    if (result.rows.length === 0) {
      throw new Error('Product not found');
    }
    return new ProductEntity(
      result.rows[0].id,
      result.rows[0].name,
      result.rows[0].price,
      result.rows[0].stock,
      result.rows[0].category
    );
  }

  async delete(id: string): Promise<void> {
    const query = 'DELETE FROM products WHERE id = $1';
    await this.pool.query(query, [id]);
  }

  async list(): Promise<ProductEntity[]> {
    const query = 'SELECT id, name, price, stock, category FROM products';
    const result = await this.pool.query(query);
    return result.rows.map((row: pg.QueryResultRow) =>
      new ProductEntity(row.id, row.name, row.price, row.stock, row.category)
    );
  }
}