// TODO(reto): Implementar las operaciones CRUD para DynamoDB usando AWS SDK
import { Injectable } from '@nestjs/common';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand, ScanCommand, GetCommand, UpdateCommand, DeleteCommand } from '@aws-sdk/lib-dynamodb';
import { CreateProductDto } from '../../application/dto/create-product.dto';
import { UpdateProductDto } from '../../application/dto/update-product.dto';
import { Product } from '../../domain/entities/product.entity';

@Injectable()
export class ProductDynamodbRepository {
  private readonly client: DynamoDBDocumentClient;

  constructor() {
    const dynamoDBClient = new DynamoDBClient({ region: process.env.AWS_REGION || 'us-east-1' });
    this.client = DynamoDBDocumentClient.from(dynamoDBClient);
  }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    // TODO(reto): Implementar la creación de un producto en DynamoDB
    const params = {
      TableName: process.env.DYNAMODB_TABLE || 'Products',
      Item: {
        id: Date.now().toString(),
        ...createProductDto,
      },
    };
    await this.client.send(new PutCommand(params));
    return params.Item as Product;
  }

  async findAll(): Promise<Product[]> {
    // TODO(reto): Implementar la obtención de todos los productos
    const params = {
      TableName: process.env.DYNAMODB_TABLE || 'Products',
    };
    const result = await this.client.send(new ScanCommand(params));
    return result.Items as Product[];
  }

  async findOne(id: string): Promise<Product> {
    // TODO(reto): Implementar la obtención de un producto por ID
    const params = {
      TableName: process.env.DYNAMODB_TABLE || 'Products',
      Key: { id },
    };
    const result = await this.client.send(new GetCommand(params));
    return result.Item as Product;
  }

  async update(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
    // TODO(reto): Implementar la actualización de un producto
    const updateExpressions = [];
    const expressionAttributeValues = {};
    const expressionAttributeNames = {};

    Object.entries(updateProductDto).forEach(([key, value]) => {
      updateExpressions.push(`#${key} = :${key}`);
      expressionAttributeNames[`#${key}`] = key;
      expressionAttributeValues[`:${key}`] = value;
    });

    const params = {
      TableName: process.env.DYNAMODB_TABLE || 'Products',
      Key: { id },
      UpdateExpression: 'SET ' + updateExpressions.join(', '),
      ExpressionAttributeNames: expressionAttributeNames,
      ExpressionAttributeValues: expressionAttributeValues,
      ReturnValues: 'ALL_NEW',
    };

    const result = await this.client.send(new UpdateCommand(params));
    return result.Attributes as Product;
  }

  async remove(id: string): Promise<void> {
    // TODO(reto): Implementar la eliminación de un producto
    const params = {
      TableName: process.env.DYNAMODB_TABLE || 'Products',
      Key: { id },
    };
    await this.client.send(new DeleteCommand(params));
  }
}