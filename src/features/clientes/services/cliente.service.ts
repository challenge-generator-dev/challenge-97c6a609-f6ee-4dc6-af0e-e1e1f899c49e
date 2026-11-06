import { Cliente, ClienteSQL, ClienteNoSQL, CreateClienteDTO, UpdateClienteDTO } from '@core/models/cliente.model';
import { SqlService } from '@core/services/sql.service';
import { NosqlService } from '@core/services/nosql.service';

export interface ClienteServiceConfig {
  preferNoSQL: boolean;
  syncBothDatabases: boolean;
}

export class ClienteService {
  private sqlService: SqlService;
  private nosqlService: NosqlService;
  private config: ClienteServiceConfig;

  constructor(config: ClienteServiceConfig = { preferNoSQL: false, syncBothDatabases: false }) {
    this.sqlService = new SqlService();
    this.nosqlService = new NosqlService();
    this.config = config;
  }

  private async syncToBothDatabases(clienteData: CreateClienteDTO): Promise<{ sql: ClienteSQL | null; nosql: ClienteNoSQL | null }> {
    const results = { sql: null as ClienteSQL | null, nosql: null as ClienteNoSQL | null };
    
    try {
      results.sql = await this.sqlService.createCliente(clienteData);
    } catch (error) {
      console.error('Error syncing to SQL:', error);
    }

    try {
      results.nosql = await this.nosqlService.createCliente(clienteData);
    } catch (error) {
      console.error('Error syncing to NoSQL:', error);
    }

    return results;
  }

  async createCliente(clienteData: CreateClienteDTO): Promise<{ sql?: ClienteSQL; nosql?: ClienteNoSQL }> {
    if (this.config.syncBothDatabases) {
      const results = await this.syncToBothDatabases(clienteData);
      return { sql: results.sql ?? undefined, nosql: results.nosql ?? undefined };
    }

    if (this.config.preferNoSQL) {
      try {
        const nosqlResult = await this.nosqlService.createCliente(clienteData);
        return { nosql: nosqlResult };
      } catch (error) {
        console.error('NoSQL creation failed, falling back to SQL:', error);
        const sqlResult = await this.sqlService.createCliente(clienteData);
        return { sql: sqlResult };
      }
    }

    try {
      const sqlResult = await this.sqlService.createCliente(clienteData);
      return { sql: sqlResult };
    } catch (error) {
      console.error('SQL creation failed, falling back to NoSQL:', error);
      const nosqlResult = await this.nosqlService.createCliente(clienteData);
      return { nosql: nosqlResult };
    }
  }

  async getClienteById(id: string): Promise<Cliente | null> {
    if (this.config.preferNoSQL) {
      try {
        const nosqlResult = await this.nosqlService.getClienteById(id);
        if (nosqlResult) return nosqlResult;
      } catch (error) {
        console.error('NoSQL query failed:', error);
      }
      return this.sqlService.getClienteById(id);
    }

    try {
      const sqlResult = await this.sqlService.getClienteById(id);
      if (sqlResult) return sqlResult;
    } catch (error) {
      console.error('SQL query failed:', error);
    }
    return this.nosqlService.getClienteById(id);
  }

  async getAllClientes(): Promise<Cliente[]> {
    if (this.config.preferNoSQL) {
      try {
        const nosqlResults = await this.nosqlService.getAllClientes();
        if (nosqlResults.length > 0) return nosqlResults;
      } catch (error) {
        console.error('NoSQL query failed:', error);
      }
      return this.sqlService.getAllClientes();
    }

    try {
      const sqlResults = await this.sqlService.getAllClientes();
      if (sqlResults.length > 0) return sqlResults;
    } catch (error) {
      console.error('SQL query failed:', error);
    }
    return this.nosqlService.getAllClientes();
  }

  async updateCliente(id: string, clienteData: UpdateClienteDTO): Promise<Cliente | null> {
    if (this.config.preferNoSQL) {
      try {
        const nosqlResult = await this.nosqlService.updateCliente({ ...clienteData, id });
        if (nosqlResult) return nosqlResult;
      } catch (error) {
        console.error('NoSQL update failed:', error);
      }
      return this.sqlService.updateCliente({ ...clienteData, id });
    }

    try {
      const sqlResult = await this.sqlService.updateCliente({ ...clienteData, id });
      if (sqlResult) return sqlResult;
    } catch (error) {
      console.error('SQL update failed:', error);
    }
    return this.nosqlService.updateCliente({ ...clienteData, id });
  }

  async deleteCliente(id: string): Promise<boolean> {
    let success = false;

    if (this.config.syncBothDatabases) {
      try {
        const sqlDeleted = await this.sqlService.deleteCliente(id);
        const nosqlDeleted = await this.nosqlService.deleteCliente(id);
        return sqlDeleted || nosqlDeleted;
      } catch (error) {
        console.error('Error deleting from both databases:', error);
        return false;
      }
    }

    if (this.config.preferNoSQL) {
      try {
        success = await this.nosqlService.deleteCliente(id);
        if (!success) {
          success = await this.sqlService.deleteCliente(id);
        }
      } catch (error) {
        console.error('NoSQL delete failed:', error);
        success = await this.sqlService.deleteCliente(id);
      }
    } else {
      try {
        success = await this.sqlService.deleteCliente(id);
        if (!success) {
          success = await this.nosqlService.deleteCliente(id);
        }
      } catch (error) {
        console.error('SQL delete failed:', error);
        success = await this.nosqlService.deleteCliente(id);
      }
    }

    return success;
  }

  async closeConnections(): Promise<void> {
    await this.nosqlService.closeConnections();
  }

  setConfig(config: Partial<ClienteServiceConfig>): void {
    this.config = { ...this.config, ...config };
  }

  getConfig(): ClienteServiceConfig {
    return { ...this.config };
  }
}

export const clienteService = new ClienteService();