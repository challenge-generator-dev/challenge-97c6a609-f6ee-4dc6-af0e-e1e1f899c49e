/**
 * Componente de lista de productos.
 * Muestra todos los productos y permite operaciones de edición y eliminación.
 */

import { useState } from 'react';
import useProductService from '../../shared/hooks/useProductService';
import { ProductEntity } from '../../shared/types/product.type';
import { ProductForm } from './ProductForm';

export const ProductList = () => {
  const { products, isLoading, error, deleteProduct, refreshProducts } = useProductService();
  const [editingProduct, setEditingProduct] = useState<ProductEntity | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    try {
      await deleteProduct(id);
      setDeleteConfirm(null);
      refreshProducts();
    } catch (err) {
      console.error('Error al eliminar producto:', err);
    }
  };

  const handleEdit = (product: ProductEntity) => {
    setEditingProduct(product);
    setIsCreating(false);
  };

  const handleCreate = () => {
    setIsCreating(true);
    setEditingProduct(null);
  };

  const handleCancel = () => {
    setEditingProduct(null);
    setIsCreating(false);
  };

  const handleSuccess = () => {
    setEditingProduct(null);
    setIsCreating(false);
    refreshProducts();
  };

  if (isLoading) {
    return (
      <div className="product-list-loading">
        <p>Cargando productos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="product-list-error">
        <p>Error al cargar productos: {error}</p>
        <button onClick={refreshProducts}>Reintentar</button>
      </div>
    );
  }

  return (
    <div className="product-list-container">
      <div className="product-list-header">
        <h2>Gestión de Productos</h2>
        <button onClick={handleCreate} className="btn-primary">
          Nuevo Producto
        </button>
      </div>

      {(isCreating || editingProduct) && (
        <div className="product-form-modal">
          <ProductForm
            product={editingProduct}
            onCancel={handleCancel}
            onSuccess={handleSuccess}
          />
        </div>
      )}

      <table className="product-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Categoría</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 ? (
            <tr>
              <td colSpan={6} className="no-products">
                No hay productos disponibles
              </td>
            </tr>
          ) : (
            products.map((product: ProductEntity) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>${product.price.toFixed(2)}</td>
                <td>{product.stock}</td>
                <td>{product.category}</td>
                <td className="actions">
                  <button
                    onClick={() => handleEdit(product)}
                    className="btn-edit"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => setDeleteConfirm(product.id)}
                    className="btn-delete"
                  >
                    Eliminar
                  </button>
                  {deleteConfirm === product.id && (
                    <div className="delete-confirm">
                      <p>¿Confirmar eliminación?</p>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="btn-confirm"
                      >
                        Sí
                      </button>
                      <button
                        onClick={() => setDeleteConfirm(null)}
                        className="btn-cancel"
                      >
                        No
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};