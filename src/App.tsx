import React, { useState, useEffect, useCallback } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { Cliente, CreateClienteDTO, UpdateClienteDTO } from './core/models/cliente.model';
import { SqlService } from './core/services/sql.service';
import { NosqlService } from './core/services/nosql.service';
import ClienteList from './features/clientes/components/ClienteList';
import ClienteForm from './features/clientes/components/ClienteForm';

type DatabaseType = 'sql' | 'nosql';

interface AppState {
  clientes: Cliente[];
  loading: boolean;
  error: string | null;
  databaseType: DatabaseType;
}

const initialState: AppState = {
  clientes: [],
  loading: false,
  error: null,
  databaseType: 'sql'
};

const App: React.FC = () => {
  const [state, setState] = useState<AppState>(initialState);
  const navigate = useNavigate();
  
  const sqlService = new SqlService();
  const nosqlService = new NosqlService();

  const getActiveService = useCallback((): { service: SqlService | NosqlService; type: DatabaseType } => {
    return state.databaseType === 'sql' 
      ? { service: sqlService, type: 'sql' } 
      : { service: nosqlService, type: 'nosql' };
  }, [state.databaseType, sqlService, nosqlService]);

  const loadClientes = useCallback(async (): Promise<void> => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const { service, type } = getActiveService();
      let clientesData: Cliente[];
      
      if (type === 'sql') {
        clientesData = await (service as SqlService).getAllClientes();
      } else {
        clientesData = await (service as NosqlService).getAllClientes();
      }
      
      setState(prev => ({
        ...prev,
        clientes: clientesData,
        loading: false
      }));
      
      console.log(`Clientes cargados desde ${type.toUpperCase()}:`, clientesData.length);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido al cargar clientes';
      console.error('Error cargando clientes:', errorMessage);
      setState(prev => ({
        ...prev,
        loading: false,
        error: errorMessage
      }));
    }
  }, [getActiveService]);

  useEffect(() => {
    loadClientes();
  }, [loadClientes]);

  const handleCreateCliente = async (clienteData: CreateClienteDTO): Promise<boolean> => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const { service, type } = getActiveService();
      let nuevoCliente: Cliente | null;
      
      if (type === 'sql') {
        nuevoCliente = await (service as SqlService).createCliente(clienteData);
      } else {
        nuevoCliente = await (service as NosqlService).createCliente(clienteData);
      }
      
      if (nuevoCliente) {
        setState(prev => ({
          ...prev,
          clientes: [...prev.clientes, nuevoCliente as Cliente],
          loading: false
        }));
        console.log('Cliente creado exitosamente:', nuevoCliente.id);
        return true;
      }
      
      setState(prev => ({ ...prev, loading: false, error: 'No se pudo crear el cliente' }));
      return false;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error al crear cliente';
      console.error('Error creando cliente:', errorMessage);
      setState(prev => ({ ...prev, loading: false, error: errorMessage }));
      return false;
    }
  };

  const handleUpdateCliente = async (clienteData: UpdateClienteDTO): Promise<boolean> => {
    if (!clienteData.id) {
      setState(prev => ({ ...prev, error: 'ID de cliente requerido para actualizar' }));
      return false;
    }
    
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const { service, type } = getActiveService();
      let clienteActualizado: Cliente | null;
      
      if (type === 'sql') {
        clienteActualizado = await (service as SqlService).updateCliente(clienteData);
      } else {
        clienteActualizado = await (service as NosqlService).updateCliente(clienteData);
      }
      
      if (clienteActualizado) {
        setState(prev => ({
          ...prev,
          clientes: prev.clientes.map(c => c.id === clienteActualizado!.id ? clienteActualizado as Cliente : c),
          loading: false
        }));
        console.log('Cliente actualizado:', clienteActualizado.id);
        return true;
      }
      
      setState(prev => ({ ...prev, loading: false, error: 'Cliente no encontrado para actualizar' }));
      return false;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error al actualizar cliente';
      console.error('Error actualizando cliente:', errorMessage);
      setState(prev => ({ ...prev, loading: false, error: errorMessage }));
      return false;
    }
  };

  const handleDeleteCliente = async (id: string): Promise<boolean> => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const { service, type } = getActiveService();
      let eliminado: boolean;
      
      if (type === 'sql') {
        eliminado = await (service as SqlService).deleteCliente(id);
      } else {
        eliminado = await (service as NosqlService).deleteCliente(id);
      }
      
      if (eliminado) {
        setState(prev => ({
          ...prev,
          clientes: prev.clientes.filter(c => c.id !== id),
          loading: false
        }));
        console.log('Cliente eliminado:', id);
        return true;
      }
      
      setState(prev => ({ ...prev, loading: false, error: 'No se pudo eliminar el cliente' }));
      return false;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error al eliminar cliente';
      console.error('Error eliminando cliente:', errorMessage);
      setState(prev => ({ ...prev, loading: false, error: errorMessage }));
      return false;
    }
  };

  const handleDatabaseSwitch = (newType: DatabaseType): void => {
    setState(prev => ({ ...prev, databaseType: newType, clientes: [], loading: true, error: null }));
    console.log(`Cambiando a base de datos: ${newType.toUpperCase()}`);
  };

  const handleEditCliente = (cliente: Cliente): void => {
    navigate(`/editar/${cliente.id}`, { state: { cliente } });
  };

  const handleClearError = (): void => {
    setState(prev => ({ ...prev, error: null }));
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#f5f5f5',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <header style={{
        backgroundColor: '#1976d2',
        color: 'white',
        padding: '1rem 2rem',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{ margin: 0, fontSize: '1.5rem' }}>
          PragmaFintech - Gestión de Clientes
        </h1>
        <nav style={{ marginTop: '0.5rem', display: 'flex', gap: '1rem' }}>
          <button
            onClick={() => navigate('/')}
            style={{
              background: state.databaseType === 'sql' ? 'rgba(255,255,255,0.2)' : 'transparent',
              border: '1px solid rgba(255,255,255,0.5)',
              color: 'white',
              padding: '0.5rem 1rem',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Lista de Clientes
          </button>
          <button
            onClick={() => navigate('/crear')}
            style={{
              background: 'transparent',
              border: '1px solid rgba(255,255,255,0.5)',
              color: 'white',
              padding: '0.5rem 1rem',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Nuevo Cliente
          </button>
        </nav>
      </header>

      <main style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ 
          marginBottom: '1rem', 
          padding: '1rem', 
          backgroundColor: 'white', 
          borderRadius: '8px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <label style={{ marginRight: '0.5rem', fontWeight: 500 }}>
              Base de datos activa:
            </label>
            <select
              value={state.databaseType}
              onChange={(e) => handleDatabaseSwitch(e.target.value as DatabaseType)}
              style={{
                padding: '0.5rem',
                borderRadius: '4px',
                border: '1px solid #ccc',
                fontSize: '1rem'
              }}
            >
              <option value="sql">SQL (MySQL/PostgreSQL)</option>
              <option value="nosql">NoSQL (MongoDB/DynamoDB)</option>
            </select>
          </div>
          <div>
            <span style={{ color: '#666' }}>
              Total clientes: {state.clientes.length}
            </span>
          </div>
        </div>

        {state.error && (
          <div style={{
            marginBottom: '1rem',
            padding: '1rem',
            backgroundColor: '#ffebee',
            border: '1px solid #ef5350',
            borderRadius: '4px',
            color: '#c62828',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <span>{state.error}</span>
            <button
              onClick={handleClearError}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#c62828',
                cursor: 'pointer',
                fontSize: '1.25rem'
              }}
            >
              ×
            </button>
          </div>
        )}

        <Routes>
          <Route
            path="/"
            element={
              <ClienteList
                clientes={state.clientes}
                loading={state.loading}
                onEdit={handleEditCliente}
                onDelete={handleDeleteCliente}
              />
            }
          />
          <Route
            path="/crear"
            element={
              <ClienteForm
                onSubmit={handleCreateCliente}
                onCancel={() => navigate('/')}
              />
            }
          />
          <Route
            path="/editar/:id"
            element={
              <ClienteForm
                onSubmit={handleUpdateCliente}
                onCancel={() => navigate('/')}
              />
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <footer style={{
        textAlign: 'center',
        padding: '1rem',
        color: '#666',
        borderTop: '1px solid #e0e0e0',
        marginTop: '2rem'
      }}>
        <p style={{ margin: 0 }}>
          PragmaFintech - Sistema de Gestión de Clientes v0.1.0
        </p>
      </footer>
    </div>
  );
};

export default App;