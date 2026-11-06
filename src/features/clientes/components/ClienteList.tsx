import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Cliente, ClienteSQL, ClienteNoSQL } from '@core/models/cliente.model';
import { SqlService } from '@core/services/sql.service';
import { NosqlService } from '@core/services/nosql.service';

export function ClienteList() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterEstado, setFilterEstado] = useState<string>('todos');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const sqlService = new SqlService();
  const nosqlService = new NosqlService();

  useEffect(() => {
    loadClientes();
  }, []);

  async function loadClientes() {
    setIsLoading(true);
    setError(null);
    try {
      const [clientesSQL, clientesNoSQL] = await Promise.all([
        sqlService.getAllClientes(),
        nosqlService.getAllClientes()
      ]);

      const mergedClientes = mergeClientes(clientesSQL, clientesNoSQL);
      setClientes(mergedClientes);
    } catch (err) {
      setError('Error al cargar los clientes');
      console.error('Error loading clientes:', err);
    } finally {
      setIsLoading(false);
    }
  }

  function mergeClientes(sql: ClienteSQL[], nosql: ClienteNoSQL[]): Cliente[] {
    const merged = new Map<string, Cliente>();
    
    sql.forEach(cliente => {
      merged.set(cliente.id, cliente);
    });
    
    nosql.forEach(cliente => {
      if (!merged.has(cliente.id)) {
        merged.set(cliente.id, cliente);
      }
    });
    
    return Array.from(merged.values());
  }

  async function handleDelete(id: string) {
    if (!confirm('¿Está seguro de que desea eliminar este cliente?')) {
      return;
    }

    try {
      await Promise.all([
        sqlService.deleteCliente(id),
        nosqlService.deleteCliente(id)
      ]);
      
      setClientes(prev => prev.filter(c => c.id !== id));
    } catch (err) {
      setError('Error al eliminar el cliente');
      console.error('Error deleting cliente:', err);
    }
  }

  const filteredClientes = clientes.filter(cliente => {
    const matchesSearch = 
      cliente.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cliente.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cliente.numeroDocumento.includes(searchTerm);
    
    const matchesFilter = 
      filterEstado === 'todos' || 
      cliente.estado === filterEstado;
    
    return matchesSearch && matchesFilter;
  });

  const totalPages = Math.ceil(filteredClientes.length / itemsPerPage);
  const paginatedClientes = filteredClientes.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  function getEstadoBadge(estado: string) {
    const estadoClasses: Record<string, string> = {
      activo: 'badge-success',
      inactivo: 'badge-danger',
      suspendido: 'badge-warning'
    };
    
    return (
      <span className={`badge ${estadoClasses[estado] || 'badge-default'}`}>
        {estado.charAt(0).toUpperCase() + estado.slice(1)}
      </span>
    );
  }

  function formatDate(date: Date | string) {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toLocaleDateString('es-CO', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  if (isLoading) {
    return (
      <div className="cliente-list-container">
        <div className="loading-overlay">
          <div className="loading-spinner">Cargando clientes...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="cliente-list-container">
      <div className="list-header">
        <h2>Gestión de Clientes</h2>
        <Link to="/clientes/nuevo" className="btn-primary">
          + Nuevo Cliente
        </Link>
      </div>

      {error && (
        <div className="error-banner">
          {error}
          <button onClick={() => setError(null)} className="close-btn">×</button>
        </div>
      )}

      <div className="filters-section">
        <div className="search-box">
          <input
            type="text"
            placeholder="Buscar por nombre, email o documento..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="search-input"
          />
        </div>
        
        <div className="filter-box">
          <label>Estado:</label>
          <select
            value={filterEstado}
            onChange={(e) => {
              setFilterEstado(e.target.value);
              setCurrentPage(1);
            }}
            className="filter-select"
          >
            <option value="todos">Todos</option>
            <option value="activo">Activo</option>
            <option value="inactivo">Inactivo</option>
            <option value="suspendido">Suspendido</option>
          </select>
        </div>
      </div>

      <div className="table-container">
        <table className="cliente-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Email</th>
              <th>Teléfono</th>
              <th>Documento</th>
              <th>Estado</th>
              <th>Fecha Registro</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {paginatedClientes.length === 0 ? (
              <tr>
                <td colSpan={7} className="empty-state">
                  {searchTerm || filterEstado !== 'todos'
                    ? 'No se encontraron clientes con los filtros aplicados'
                    : 'No hay clientes registrados'}
                </td>
              </tr>
            ) : (
              paginatedClientes.map((cliente) => (
                <tr key={cliente.id}>
                  <td className="nombre-cell">
                    {cliente.nombre}
                  </td>
                  <td>{cliente.email}</td>
                  <td>{cliente.telefono || '-'}</td>
                  <td>
                    <span className="documento-type">
                      {cliente.tipoDocumento}
                    </span>
                    {' '}
                    {cliente.numeroDocumento}
                  </td>
                  <td>{getEstadoBadge(cliente.estado)}</td>
                  <td>{formatDate(cliente.fechaRegistro)}</td>
                  <td className="actions-cell">
                    <Link
                      to={`/clientes/editar/${cliente.id}`}
                      className="btn-icon btn-edit"
                      title="Editar"
                    >
                      ✏️
                    </Link>
                    <button
                      onClick={() => handleDelete(cliente.id)}
                      className="btn-icon btn-delete"
                      title="Eliminar"
                      disabled={cliente.estado === 'suspendido'}
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="pagination-btn"
          >
            Anterior
          </button>
          
          <span className="page-info">
            Página {currentPage} de {totalPages}
          </span>
          
          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="pagination-btn"
          >
            Siguiente
          </button>
        </div>
      )}

      <div className="list-stats">
        <span>Total de clientes: {filteredClientes.length}</span>
        <button onClick={loadClientes} className="btn-refresh">
          🔄 Actualizar
        </button>
      </div>
    </div>
  );
}

export default ClienteList;