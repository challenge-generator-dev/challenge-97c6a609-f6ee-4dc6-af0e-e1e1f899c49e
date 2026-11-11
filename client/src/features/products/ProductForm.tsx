/**
 * Componente de formulario para crear y actualizar productos.
 * Utiliza Formik para manejo de estado del formulario y Yup para validación.
 */

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import useProductService from '../../shared/hooks/useProductService';
import { ProductEntity, CreateProductDto, UpdateProductDto } from '../../shared/types/product.type';

interface ProductFormProps {
  product?: ProductEntity | null;
  onCancel: () => void;
  onSuccess: () => void;
}

const validationSchema = Yup.object({
  name: Yup.string()
    .required('El nombre es obligatorio')
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(100, 'El nombre no puede exceder 100 caracteres'),
  price: Yup.number()
    .required('El precio es obligatorio')
    .positive('El precio debe ser positivo')
    .min(0.01, 'El precio mínimo es 0.01'),
  stock: Yup.number()
    .required('El stock es obligatorio')
    .integer('El stock debe ser un número entero')
    .min(0, 'El stock no puede ser negativo'),
  category: Yup.string()
    .required('La categoría es obligatoria')
    .min(2, 'La categoría debe tener al menos 2 caracteres')
    .max(50, 'La categoría no puede exceder 50 caracteres'),
});

export const ProductForm = ({ product, onCancel, onSuccess }: ProductFormProps) => {
  const { createProduct, updateProduct } = useProductService();
  const isEditing = !!product;

  const initialValues: CreateProductDto | UpdateProductDto = product
    ? {
        name: product.name,
        price: product.price,
        stock: product.stock,
        category: product.category,
      }
    : {
        name: '',
        price: 0,
        stock: 0,
        category: '',
      };

  const handleSubmit = async (values: CreateProductDto | UpdateProductDto) => {
    try {
      if (isEditing && product) {
        await updateProduct(product.id, values as UpdateProductDto);
      } else {
        await createProduct(values as CreateProductDto);
      }
      onSuccess();
    } catch (err) {
      console.error('Error al guardar producto:', err);
    }
  };

  return (
    <div className="product-form-container">
      <h3>{isEditing ? 'Editar Producto' : 'Crear Producto'}</h3>
      
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ isSubmitting, isValid, dirty }) => (
          <Form className="product-form">
            <div className="form-group">
              <label htmlFor="name">Nombre</label>
              <Field
                type="text"
                id="name"
                name="name"
                className="form-input"
                placeholder="Ingrese el nombre del producto"
              />
              <ErrorMessage name="name" component="div" className="error-message" />
            </div>

            <div className="form-group">
              <label htmlFor="price">Precio</label>
              <Field
                type="number"
                id="price"
                name="price"
                className="form-input"
                step="0.01"
                min="0"
                placeholder="Ingrese el precio"
              />
              <ErrorMessage name="price" component="div" className="error-message" />
            </div>

            <div className="form-group">
              <label htmlFor="stock">Stock</label>
              <Field
                type="number"
                id="stock"
                name="stock"
                className="form-input"
                min="0"
                placeholder="Ingrese la cantidad en stock"
              />
              <ErrorMessage name="stock" component="div" className="error-message" />
            </div>

            <div className="form-group">
              <label htmlFor="category">Categoría</label>
              <Field
                type="text"
                id="category"
                name="category"
                className="form-input"
                placeholder="Ingrese la categoría"
              />
              <ErrorMessage name="category" component="div" className="error-message" />
            </div>

            <div className="form-actions">
              <button
                type="submit"
                disabled={isSubmitting || !isValid || !dirty}
                className="btn-submit"
              >
                {isSubmitting ? 'Guardando...' : 'Guardar'}
              </button>
              <button
                type="button"
                onClick={onCancel}
                className="btn-cancel-form"
              >
                Cancelar
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};