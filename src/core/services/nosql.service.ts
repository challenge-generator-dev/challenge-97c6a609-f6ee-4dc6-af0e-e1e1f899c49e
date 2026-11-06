import { MongoClient, ObjectId } from 'mongodb';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand, GetCommand, UpdateCommand, DeleteCommand, ScanCommand } from '@aws-sdk/lib-dynamodb';
import { Cliente, ClienteNoSQL, CreateClienteDTO, UpdateClienteDTO } from '../models/cliente.model';

/**
 * Servicio para interactuar con bases de datos NoSQL (MongoDB y DynamoDB).
 * Proporciona métodos para operaciones CRUD sobre clientes.
 */
export class NosqlService {
  private mongoClient: MongoClient;
  private dynamoClient: DynamoDBDocumentClient;
  private mongoCollectionName = 'clientes';
  private dynamoTableName = 'Clientes';

  constructor() {
    // Inicialización de clientes (en un entorno real, estas conexiones vendrían de un pool)
    this.mongoClient = new MongoClient(process.env.MONGODB_URI || 'mongodb://localhost:27017');
    const dynamoDBClient = new DynamoDBClient({ region: process.env.AWS_REGION || 'us-east-1' });
    this.dynamoClient = DynamoDBDocumentClient.from(dynamoDBClient);
  }

  /**
   * Determina si se está usando MongoDB o DynamoDB basado en la configuración.
   * @returns 'mongodb' o 'dynamodb'
   */
  private getDatabaseType(): 'mongodb' | 'dynamodb' {
    return process.env.NOSQL_TYPE === 'dynamodb' ? 'dynamodb' : 'mongodb';
  }

  /**
   * Crea un nuevo cliente en la base de datos NoSQL seleccionada.
   * @param clienteData Datos del cliente a crear
   * @returns Promesa con el cliente creado incluyendo su ID
   */
  async createCliente(clienteData: CreateClienteDTO): Promise<ClienteNoSQL> {
    const dbType = this.getDatabaseType();
    const cliente: ClienteNoSQL = {
      ...clienteData,
      fechaRegistro: clienteData.fechaRegistro || new Date()
    };

    if (dbType === 'mongodb') {
      const collection = this.mongoClient.db().collection(this.mongoCollectionName);
      const result = await collection.insertOne(cliente);
      return { ...cliente, id: result.insertedId };
    } else {
      // DynamoDB
      const params = {
        TableName: this.dynamoTableName,
        Item: {
          id: { S: uuidv4() },
          nombre: { S: cliente.nombre },
          apellido: { S: cliente.apellido },
          email: { S: cliente.email },
          telefono: { S: cliente.telefono },
          direccion: { S: cliente.direccion },
          ciudad: { S: cliente.ciudad },
          pais: { S: cliente.pais },
          fechaRegistro: { S: cliente.fechaRegistro.toISOString() },
          ...(cliente.metadata && { metadata: { M: this.convertMetadataToDynamo(cliente.metadata) } })
        }
      };

      // En un entorno real, aquí iría el comando PutCommand
      // await this.dynamoClient.send(new PutCommand(params));

      return {
        ...cliente,
        id: params.Item.id.S,
        metadata: cliente.metadata
      };
    }
  }

  /**
   * Convierte metadata a formato DynamoDB.
   * @param metadata Metadata a convertir
   * @returns Metadata en formato DynamoDB
   */
  private convertMetadataToDynamo(metadata: Record<string, any>): Record<string, any> {
    const result: Record<string, any> = {};
    for (const [key, value] of Object.entries(metadata)) {
      if (typeof value === 'string') {
        result[key] = { S: value };
      } else if (typeof value === 'number') {
        result[key] = { N: value.toString() };
      } else if (typeof value === 'boolean') {
        result[key] = { BOOL: value };
      } else if (value instanceof Date) {
        result[key] = { S: value.toISOString() };
      } else if (Array.isArray(value)) {
        result[key] = { L: value.map(v => this.convertMetadataToDynamo(v)) };
      } else if (typeof value === 'object' && value !== null) {
        result[key] = { M: this.convertMetadataToDynamo(value) };
      } else {
        result[key] = { S: String(value) };
      }
    }
    return result;
  }

  /**
   * Obtiene un cliente por su ID.
   * @param id ID del cliente a buscar
   * @returns Promesa con el cliente encontrado o null si no existe
   */
  async getClienteById(id: string): Promise<ClienteNoSQL | null> {
    const dbType = this.getDatabaseType();

    if (dbType === 'mongodb') {
      const collection = this.mongoClient.db().collection(this.mongoCollectionName);
      const result = await collection.findOne({ _id: new ObjectId(id) });
      if (!result) return null;

      return {
        ...result,
        id: result._id.toString()
      };
    } else {
      // DynamoDB
      const params = {
        TableName: this.dynamoTableName,
        Key: { id }
      };

      // En un entorno real, aquí iría el comando GetCommand
      // const result = await this.dynamoClient.send(new GetCommand(params));
      // if (!result.Item) return null;

      // Simulación de respuesta
      return {
        id,
        nombre: 'Juan',
        apellido: 'Pérez',
        email: 'juan.perez@example.com',
        telefono: '123456789',
        direccion: 'Calle Falsa 123',
        ciudad: 'Medellín',
        pais: 'Colombia',
        fechaRegistro: new Date(),
        metadata: { tipo: 'premium', ultimoAcceso: new Date() }
      };
    }
  }

  /**
   * Obtiene todos los clientes de la base de datos NoSQL.
   * @returns Promesa con un array de clientes
   */
  async getAllClientes(): Promise<ClienteNoSQL[]> {
    const dbType = this.getDatabaseType();

    if (dbType === 'mongodb') {
      const collection = this.mongoClient.db().collection(this.mongoCollectionName);
      const results = await collection.find().toArray();
      return results.map(doc => ({
        ...doc,
        id: doc._id.toString()
      }));
    } else {
      // DynamoDB
      const params = {
        TableName: this.dynamoTableName
      };

      // En un entorno real, aquí iría el comando ScanCommand
      // const result = await this.dynamoClient.send(new ScanCommand(params));
      // return result.Items?.map(item => this.convertDynamoItemToCliente(item)) || [];

      // Simulación de respuesta
      return [
        {
          id: uuidv4(),
          nombre: 'Juan',
          apellido: 'Pérez',
          email: 'juan.perez@example.com',
          telefono: '123456789',
          direccion: 'Calle Falsa 123',
          ciudad: 'Medellín',
          pais: 'Colombia',
          fechaRegistro: new Date(),
          metadata: { tipo: 'premium' }
        },
        {
          id: uuidv4(),
          nombre: 'María',
          apellido: 'Gómez',
          email: 'maria.gomez@example.com',
          telefono: '987654321',
          direccion: 'Avenida Siempre Viva 456',
          ciudad: 'Bogotá',
          pais: 'Colombia',
          fechaRegistro: new Date(Date.now() - 86400000),
          metadata: { tipo: 'estándar' }
        }
      ];
    }
  }

  /**
   * Convierte un item de DynamoDB a un objeto Cliente.
   * @param item Item de DynamoDB
   * @returns Objeto Cliente
   */
  private convertDynamoItemToCliente(item: any): ClienteNoSQL {
    return {
      id: item.id.S,
      nombre: item.nombre.S,
      apellido: item.apellido.S,
      email: item.email.S,
      telefono: item.telefono.S,
      direccion: item.direccion.S,
      ciudad: item.ciudad.S,
      pais: item.pais.S,
      fechaRegistro: new Date(item.fechaRegistro.S),
      ...(item.metadata && { metadata: this.convertDynamoMetadataToObject(item.metadata.M) })
    };
  }

  /**
   * Convierte metadata de DynamoDB a objeto JavaScript.
   * @param metadata Metadata de DynamoDB
   * @returns Objeto JavaScript
   */
  private convertDynamoMetadataToObject(metadata: any): Record<string, any> {
    const result: Record<string, any> = {};
    for (const [key, value] of Object.entries(metadata)) {
      if (value.S !== undefined) {
        result[key] = value.S;
      } else if (value.N !== undefined) {
        result[key] = Number(value.N);
      } else if (value.BOOL !== undefined) {
        result[key] = value.BOOL;
      } else if (value.L !== undefined) {
        result[key] = value.L.map((v: any) => this.convertDynamoMetadataToObject(v.M));
      } else if (value.M !== undefined) {
        result[key] = this.convertDynamoMetadataToObject(value.M);
      }
    }
    return result;
  }

  /**
   * Actualiza un cliente existente en la base de datos NoSQL.
   * @param clienteData Datos del cliente a actualizar
   * @returns Promesa con el cliente actualizado o null si no existía
   */
  async updateCliente(clienteData: UpdateClienteDTO): Promise<ClienteNoSQL | null> {
    const dbType = this.getDatabaseType();
    const clienteExistente = await this.getClienteById(clienteData.id);
    if (!clienteExistente) {
      return null;
    }

    const clienteActualizado: ClienteNoSQL = {
      ...clienteExistente,
      ...clienteData
    };

    if (dbType === 'mongodb') {
      const collection = this.mongoClient.db().collection(this.mongoCollectionName);
      await collection.updateOne(
        { _id: new ObjectId(clienteData.id) },
        { $set: clienteData }
      );
      return clienteActualizado;
    } else {
      // DynamoDB
      const updateExpression = [];
      const expressionAttributeValues = {};
      const expressionAttributeNames = {};

      // Construir la expresión de actualización
      for (const [key, value] of Object.entries(clienteData)) {
        if (key !== 'id' && value !== undefined) {
          updateExpression.push(`#${key} = :${key}`);
          expressionAttributeNames[`#${key}`] = key;
          expressionAttributeValues[`:${key}`] = value;
        }
      }

      if (updateExpression.length === 0) {
        return clienteActualizado;
      }

      const params = {
        TableName: this.dynamoTableName,
        Key: { id: clienteData.id },
        UpdateExpression: 'SET ' + updateExpression.join(', '),
        ExpressionAttributeNames: expressionAttributeNames,
        ExpressionAttributeValues: expressionAttributeValues,
        ReturnValues: 'ALL_NEW'
      };

      // En un entorno real, aquí iría el comando UpdateCommand
      // const result = await this.dynamoClient.send(new UpdateCommand(params));
      // return this.convertDynamoItemToCliente(result.Attributes);

      return clienteActualizado;
    }
  }

  /**
   * Elimina un cliente por su ID.
   * @param id ID del cliente a eliminar
   * @returns Promesa con true si se eliminó, false si no existía
   */
  async deleteCliente(id: string): Promise<boolean> {
    const dbType = this.getDatabaseType();

    if (dbType === 'mongodb') {
      const collection = this.mongoClient.db().collection(this.mongoCollectionName);
      const result = await collection.deleteOne({ _id: new ObjectId(id) });
      return result.deletedCount > 0;
    } else {
      // DynamoDB
      const params = {
        TableName: this.dynamoTableName,
        Key: { id }
      };

      // En un entorno real, aquí iría el comando DeleteCommand
      // const result = await this.dynamoClient.send(new DeleteCommand(params));
      // return !!result.Attributes;

      return true;
    }
  }

  /**
   * Cierra las conexiones a las bases de datos.
   */
  async closeConnections(): Promise<void> {
    await this.mongoClient.close();
    // DynamoDB no requiere cerrar conexión explícitamente
  }
}

// Helper para generar UUIDs (necesario para DynamoDB)
function uuidv4(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}