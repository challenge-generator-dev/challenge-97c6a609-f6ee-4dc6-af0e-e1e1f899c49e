import { useState, useEffect, FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Cliente, CreateClienteDTO, UpdateClienteDTO } from '@core/models/cliente.model';
import { SqlService } from '@core/services/sql.service';
import { NosqlService } from '@core/services/nosql.service';

interface ClienteFormProps {
  isEditMode?: boolean;
}

export function ClienteForm({ isEditMode = false }: ClienteFormProps) {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<CreateClienteDTO>({
    nombre: '',
    email: '',
    telefono: '',
    direccion: '',
    tipoDocumento: 'CC',
    numeroDocumento: '',
    estado: 'activo',
    metadata: {}
  });

  const sqlService = new SqlService();
  const nosqlService = new NosqlService();

  useEffect(() => {
    if (isEditMode && id) {
      loadCliente(id);
    }
  }, [isEditMode, id]);

  async function loadCliente(clienteId: string) {
    setIsLoading(true);
    setError(null);
    try {
      const clienteSQL = await sqlService.getClienteById(clienteId);
      if (clienteSQL) {
        const { id: _, fechaRegistro: __, ...clienteData } = clienteSQL;
        setFormData(clienteData as CreateClienteDTO);
      } else {
        const clienteNoSQL = await nosqlService.getClienteById(clienteId);
        if (clienteNoSQL) {
          const { id: _, fechaRegistro: __, ...clienteData } = clienteNoSQL;
          setFormData(clienteData as CreateClienteDTO);
        } else {
          setError('Cliente no encontrado');
        }
      }
    } catch (err) {
      setError('Error al cargar el cliente');
      console.error('Error loading cliente:', err);
    } finally {
      setIsLoading(false);
    }
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }

  function handleMetadataChange(key: string, value: string) {
    setFormData(prev => ({
      ...prev,
      metadata: {
        ...prev.metadata,
        [key]: value
      }
    }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      if (!validateForm()) {
        setError('Por favor complete todos los campos requeridos');
        setIsLoading(false);
        return;
      }

      if (isEditMode && id) {
        const updateData: UpdateClienteDTO = { id, ...formData };
        await sqlService.updateCliente(updateData);
        await nosqlService.updateCliente(updateData);
      } else {
        await sqlService.createCliente(formData);
        await nosqlService.createCliente(formData);
      }

      navigate('/clientes');
    } catch (err) {
      setError('Error al guardar el cliente');
      console.error('Error saving cliente:', err);
    } finally {
      setIsLoading(false);
    }
  }

  function validateForm(): boolean {
    return (
      formData.nombre.trim().length > 0 &&
      formData.email.trim().length > 0 &&
      formData.email.includes('@') &&
      formData.numeroDocumento.trim().length > 0
    );
  }

  function handleCancel() {
    navigate('/clientes');
  }

  if (isLoading && isEditMode && !formData.nombre) {
    return (
      <div className="cliente-form-container">
        <div className="loading-spinner">Cargando cliente...</div>
      </div>
    );
  }

  return (
    <div className="cliente-form-container">
      <h2>{isEditMode ? 'Editar Cliente' : 'Nuevo Cliente'}</h2>
      
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="cliente-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="nombre">Nombre completo *</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleInputChange}
              required
              placeholder="Ingrese el nombre completo"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              placeholder="correo@ejemplo.com"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="telefono">Teléfono</label>
            <input
              type="tel"
              id="telefono"
              name="telefono"
              value={formData.telefono}
              onChange={handleInputChange}
              placeholder="+57 300 123 4567"
            />
          </div>

          <div className="form-group">
            <label htmlFor="tipoDocumento">Tipo de documento</label>
            <select
              id="tipoDocumento"
              name="tipoDocumento"
              value={formData.tipoDocumento}
              onChange={handleInputChange}
            >
              <option value="CC">Cédula de Ciudadanía</option>
              <option value="CE">Cédula de Extranjería</option>
              <option value="NIT">NIT</option>
              <option value="PASAPORTE">Pasaporte</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="numeroDocumento">Número de documento *</label>
            <input
              type="text"
              id="numeroDocumento"
              name="numeroDocumento"
              value={formData.numeroDocumento}
              onChange={handleInputChange}
              required
              placeholder="Número de documento"
            />
          </div>

          <div className="form-group">
            <label htmlFor="estado">Estado</label>
            <select
              id="estado"
              name="estado"
              value={formData.estado}
              onChange={handleInputChange}
            >
              <option value="activo">Activo</option>
              <option value="inactivo">Inactivo</option>
              <option value="suspendido">Suspendido</option>
            </select>
          </div>
        </div>

        <div className="form-group full-width">
          <label htmlFor="direccion">Dirección</label>
          <textarea
            id="direccion"
            name="direccion"
            value={formData.direccion}
            onChange={handleInputChange}
            rows={3}
            placeholder="Dirección de residencia"
          />
        </div>

        <div className="form-group full-width">
          <label>Metadatos adicionales</label>
          <div className="metadata-fields">
            <input
              type="text"
              placeholder="Clave"
              onChange={(e) => handleMetadataChange(e.target.value, '')}
            />
            <input
              type="text"
              placeholder="Valor"
              onBlur={(e) => {
                const inputs = document.querySelectorAll('.metadata-fields input');
                if (inputs.length >= 2) {
                  const key = (inputs[0] as HTMLInputElement).value;
                  const value = (inputs[1] as HTMLInputElement).value;
                  if (key && value) {
                    handleMetadataChange(key, value);
                  }
                }
              }}
            />
          </div>
        </div>

        <div className="form-actions">
          <button
            type="submit"
            className="btn-primary"
            disabled={isLoading}
          >
            {isLoading ? 'Guardando...' : isEditMode ? 'Actualizar' : 'Crear Cliente'}
          </button>
          <button
            type="button"
            className="btn-secondary"
            onClick={handleCancel}
            disabled={isLoading}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

export default ClienteForm;