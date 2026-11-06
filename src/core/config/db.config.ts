import { MongoClient } from 'mongodb';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';

interface DatabaseConfig {
  sql: {
    host: string;
    port: number;
    database: string;
    user: string;
    password: string;
    maxConnections: number;
    connectionTimeout: number;
  };
  nosql: {
    mongo: {
      uri: string;
      databaseName: string;
      options: {
        maxPoolSize: number;
        minPoolSize: number;
        connectTimeoutMS: number;
        socketTimeoutMS: number;
        serverSelectionTimeoutMS: number;
      };
    };
    dynamodb: {
      region: string;
      endpoint: string;
      tableName: string;
      options: {
        maxAttempts: number;
        tls: boolean;
        computeChecksums: boolean;
      };
    };
  };
}

const getDatabaseConfig = (): DatabaseConfig => {
  const env = import.meta.env;

  return {
    sql: {
      host: env.VITE_SQL_HOST || 'localhost',
      port: parseInt(env.VITE_SQL_PORT || '5432', 10),
      database: env.VITE_SQL_DATABASE || 'pragmafintech_clientes',
      user: env.VITE_SQL_USER || 'postgres',
      password: env.VITE_SQL_PASSWORD || 'postgres',
      maxConnections: parseInt(env.VITE_SQL_MAX_CONNECTIONS || '10', 10),
      connectionTimeout: parseInt(env.VITE_SQL_CONNECTION_TIMEOUT || '5000', 10),
    },
    nosql: {
      mongo: {
        uri: env.VITE_MONGO_URI || 'mongodb://localhost:27017',
        databaseName: env.VITE_MONGO_DATABASE || 'pragmafintech_clientes',
        options: {
          maxPoolSize: parseInt(env.VITE_MONGO_MAX_POOL_SIZE || '10', 10),
          minPoolSize: parseInt(env.VITE_MONGO_MIN_POOL_SIZE || '2', 10),
          connectTimeoutMS: parseInt(env.VITE_MONGO_CONNECT_TIMEOUT || '10000', 10),
          socketTimeoutMS: parseInt(env.VITE_MONGO_SOCKET_TIMEOUT || '45000', 10),
          serverSelectionTimeoutMS: parseInt(env.VITE_MONGO_SERVER_SELECTION_TIMEOUT || '5000', 10),
        },
      },
      dynamodb: {
        region: env.VITE_DYNAMODB_REGION || 'us-east-1',
        endpoint: env.VITE_DYNAMODB_ENDPOINT || 'http://localhost:8000',
        tableName: env.VITE_DYNAMODB_TABLE_NAME || 'Clientes',
        options: {
          maxAttempts: parseInt(env.VITE_DYNAMODB_MAX_ATTEMPTS || '3', 10),
          tls: env.VITE_DYNAMODB_TLS !== 'false',
          computeChecksums: env.VITE_DYNAMODB_COMPUTE_CHECKSUMS !== 'false',
        },
      },
    },
  };
};

const config = getDatabaseConfig();

export const createMongoClient = (): MongoClient => {
  const { uri, options } = config.nosql.mongo;
  return new MongoClient(uri, {
    maxPoolSize: options.maxPoolSize,
    minPoolSize: options.minPoolSize,
    connectTimeoutMS: options.connectTimeoutMS,
    socketTimeoutMS: options.socketTimeoutMS,
    serverSelectionTimeoutMS: options.serverSelectionTimeoutMS,
  });
};

export const createDynamoDBClient = (): DynamoDBClient => {
  const { region, endpoint, options } = config.nosql.dynamodb;
  return new DynamoDBClient({
    region,
    endpoint,
    maxAttempts: options.maxAttempts,
    tls: options.tls,
    computeChecksums: options.computeChecksums,
  });
};

export const createDynamoDBDocumentClient = (
  dynamoClient: DynamoDBClient
): DynamoDBDocumentClient => {
  return DynamoDBDocumentClient.from(dynamoClient, {
    marshallOptions: {
      removeUndefinedValues: true,
      convertClassInstanceToMap: true,
    },
    unmarshallOptions: {
      wrapNumbers: false,
    },
  });
};

export const getSqlConfig = () => config.sql;

export const getMongoConfig = () => config.nosql.mongo;

export const getDynamoDBConfig = () => config.nosql.dynamodb;

export const getDatabaseType = (): 'mongodb' | 'dynamodb' => {
  const env = import.meta.env;
  const dbType = env.VITE_NOSQL_DATABASE_TYPE || 'mongodb';
  if (dbType !== 'mongodb' && dbType !== 'dynamodb') {
    console.warn(` Tipo de base de datos NoSQL no válido: ${dbType}. Usando MongoDB por defecto.`);
    return 'mongodb';
  }
  return dbType;
};

export const validateDatabaseConfig = (): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];
  const sqlConfig = config.sql;

  if (!sqlConfig.host) errors.push('Falta configurar VITE_SQL_HOST');
  if (!sqlConfig.database) errors.push('Falta configurar VITE_SQL_DATABASE');
  if (!sqlConfig.user) errors.push('Falta configurar VITE_SQL_USER');
  if (!sqlConfig.password) errors.push('Falta configurar VITE_SQL_PASSWORD');

  const nosqlConfig = config.nosql;
  const dbType = getDatabaseType();

  if (dbType === 'mongodb') {
    if (!nosqlConfig.mongo.uri) errors.push('Falta configurar VITE_MONGO_URI');
    if (!nosqlConfig.mongo.databaseName) errors.push('Falta configurar VITE_MONGO_DATABASE');
  } else if (dbType === 'dynamodb') {
    if (!nosqlConfig.dynamodb.region) errors.push('Falta configurar VITE_DYNAMODB_REGION');
    if (!nosqlConfig.dynamodb.tableName) errors.push('Falta configurar VITE_DYNAMODB_TABLE_NAME');
  }

  return { valid: errors.length === 0, errors };
};

export default config;