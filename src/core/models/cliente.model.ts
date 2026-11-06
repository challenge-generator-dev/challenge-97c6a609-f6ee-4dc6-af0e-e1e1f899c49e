import { ObjectId } from 'mongodb';

/**
 * Modelo de datos para la entidad Cliente.
 * Representa la estructura de datos de un cliente en el sistema,
 * compatible con almacenamiento tanto en bases de datos SQL como NoSQL.
 */
export interface Cliente {
  id?: string; // UUID para SQL, ObjectId para MongoDB, string para DynamoDB
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  direccion: string;
  ciudad: string;
  pais: string;
  fechaRegistro: Date;
  metadata?: {
    // Campos flexibles para NoSQL
    [key: string]: any;
  };
}

// Tipos específicos para cada base de datos
export interface ClienteSQL extends Cliente {
  id: string; // UUID
}

export interface ClienteNoSQL extends Cliente {
  id?: ObjectId | string; // ObjectId para MongoDB, string para DynamoDB
  _id?: ObjectId; // Campo específico de MongoDB
}

// Tipos para operaciones CRUD
export type CreateClienteDTO = Omit<Cliente, 'id' | 'fechaRegistro'> & {
  fechaRegistro?: Date;
};

export type UpdateClienteDTO = Partial<Omit<Cliente, 'id' | 'fechaRegistro'>> & {
  id: string;
};

// Constantes para validación
export const CLIENTE_VALIDATION_RULES = {
  NOMBRE_MAX_LENGTH: 50,
  APELLIDO_MAX_LENGTH: 50,
  EMAIL_MAX_LENGTH: 100,
  TELEFONO_MAX_LENGTH: 20,
  DIRECCION_MAX_LENGTH: 200,
  CIUDAD_MAX_LENGTH: 50,
  PAIS_MAX_LENGTH: 50
};