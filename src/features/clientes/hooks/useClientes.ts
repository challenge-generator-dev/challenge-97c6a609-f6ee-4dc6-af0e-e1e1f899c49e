import { useState, useEffect, useCallback } from 'react';
import { Cliente, CreateClienteDTO, UpdateClienteDTO } from '@core/models/cliente.model';
import { SqlService } from '@core/services/sql.service';
import { NosqlService } from '@core/services/nosql.service';

interface UseClientesOptions {
  autoLoad?: boolean;
  syncDatabases?: boolean;
}

interface ClienteState {
  clientes: Cliente[];
  isLoading: boolean;
  error: string | null;
}

interface UseClientesReturn extends ClienteState {
  createCliente: (data: CreateClienteDTO) => Promise<Cliente | null>;
  updateCliente: (data: UpdateClienteDTO) => Promise<Cliente | null>;
  deleteCliente: (id: string) => Promise<boolean>;
  getClienteById: (id: string) => Promise<Cliente | null>;
  refreshClientes: () => Promise<void>;
  clearError: () => void;
}

export function useClientes(options: UseClientesOptions = {}): UseClientesReturn {
  const { autoLoad = true, syncDatabases = true } = options;
  
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sqlService = new SqlService();
  const nosqlService = new NosqlService();

  const loadClientes = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const [clientesSQL, clientesNoSQL] = await Promise.all([
        sqlService.getAllClientes(),
        nosqlService.getAllClientes()
      ]);

      const merged = mergeClientesById(clientesSQL, clientesNoSQL);
      setClientes(merged);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
      setError(`Error al cargar clientes: ${errorMessage}`);
      console.error('Error loading clientes:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  function mergeClientesById(sql: Cliente[], nosql: Cliente[]): Cliente[] {
    const mergedMap = new Map<string, Cliente>();
    
    sql.forEach(cliente => {
      mergedMap.set(cliente.id, cliente);
    });
    
    nosql.forEach(cliente => {
      if (!mergedMap.has(cliente.id)) {
        mergedMap.set(cliente.id, cliente);
      }
    });
    
    return Array.from(mergedMap.values());
  }

  useEffect(() => {
    if (autoLoad) {
      loadClientes();
    }
  }, [autoLoad, loadClientes]);

  const createCliente = useCallback(async (data: CreateClienteDTO): Promise<Cliente | null> => {
    setIsLoading(true);
    setError(null);

    try {
      validateClienteData(data);

      if (syncDatabases) {
        const [sqlResult, nosqlResult] = await Promise.all([
          sqlService.createCliente(data),
          nosqlService.createCliente(data)
        ]);

        const newCliente: Cliente = {
          ...data,
          id: sqlResult.id,
          fechaRegistro: sqlResult.fechaRegistro
        };

        setClientes(prev => [...prev, newCliente]);
        return newCliente;
      } else {
        const sqlResult = await sqlService.createCliente(data);
        const newCliente: Cliente = {
          ...data,
          id: sqlResult.id,
          fechaRegistro: sqlResult.fechaRegistro
        };
        setClientes(prev => [...prev, newCliente]);
        return newCliente;
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al crear cliente';
      setError(errorMessage);
      console.error('Error creating cliente:', err);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [syncDatabases]);

  const updateCliente = useCallback(async (data: UpdateClienteDTO): Promise<Cliente | null> => {
    if (!data.id) {
      setError('ID de cliente es requerido para actualizar');
      return null;
    }

    setIsLoading(true);
    setError(null);

    try {
      validateClienteData(data as CreateClienteDTO);

      let updatedCliente: Cliente | null = null;

      if (syncDatabases) {
        const [sqlResult, nosqlResult] = await Promise.all([
          sqlService.updateCliente(data),
          nosqlService.updateCliente(data)
        ]);

        updatedCliente = sqlResult || nosqlResult;
      } else {
        updatedCliente = await sqlService.updateCliente(data);
      }

      if (updatedCliente) {
        setClientes(prev =>
          prev.map(c => c.id === updatedCliente!.id ? updatedCliente! : c)
        );
      }

      return updatedCliente;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al actualizar cliente';
      setError(errorMessage);
      console.error('Error updating cliente:', err);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [syncDatabases]);

  const deleteCliente = useCallback(async (id: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      if (syncDatabases) {
        await Promise.all([
          sqlService.deleteCliente(id),
          nosqlService.deleteCliente(id)
        ]);
      } else {
        await sqlService.deleteCliente(id);
      }

      setClientes(prev => prev.filter(c => c.id !== id));
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al eliminar cliente';
      setError(errorMessage);
      console.error('Error deleting cliente:', err);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [syncDatabases]);

  const getClienteById = useCallback(async (id: string): Promise<Cliente | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const [sqlCliente, nosqlCliente] = await Promise.all([
        sqlService.getClienteById(id),
        nosqlService.getClienteById(id)
      ]);

      return sqlCliente || nosqlCliente;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al obtener cliente';
      setError(errorMessage);
      console.error('Error getting cliente by id:', err);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const refreshClientes = useCallback(async () => {
    await loadClientes();
  }, [loadClientes]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  function validateClienteData(data: CreateClienteDTO): void {
    if (!data.nombre || data.nombre.trim().length === 0) {
      throw new Error('El nombre es requerido');
    }

    if (!data.email || data.email.trim().length === 0) {
      throw new Error('El email es requerido');
    }

    if (!data.email.includes('@')) {
      throw new Error('El email debe tener un formato válido');
    }

    if (!data.numeroDocumento || data.numeroDocumento.trim().length === 0) {
      throw new Error('El número de documento es requerido');
    }

    const validTiposDocumento = ['CC', 'CE', 'NIT', 'PASAPORTE'];
    if (data.tipoDocumento && !validTiposDocumento.includes(data.tipoDocumento)) {
      throw new Error('Tipo de documento inválido');
    }

    const validEstados = ['activo', 'inactivo', 'suspendido'];
    if (data.estado && !validEstados.includes(data.estado)) {
      throw new Error('Estado inválido');
    }
  }

  return {
    clientes,
    isLoading,
    error,
    createCliente,
    updateCliente,
    deleteCliente,
    getClienteById,
    refreshClientes,
    clearError
  };
}

export default useClientes;