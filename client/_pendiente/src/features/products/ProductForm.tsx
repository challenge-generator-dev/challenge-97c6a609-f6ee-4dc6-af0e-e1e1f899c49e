import React, { useState, useEffect } from 'react';
import { Button, TextField, Box, Paper, Typography } from '@mui/material';
import { useProductService } from '../../services/product.service';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../../shared/components/LoadingSpinner';
import ErrorMessage from '../../shared/components/ErrorMessage';

interface ProductFormProps {
  productId?: string;
}

const ProductForm: React.FC<ProductFormProps> = ({ productId }) => {
  const { productQuery, createMutation, updateMutation } = useProductService();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    stock: 0,
  });

  const isEditMode = Boolean(productId);
  const { data: product, error: productError, isLoading: isProductLoading } = productQuery(productId || '');

  useEffect(() => {
    if (isEditMode && product) {
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock,
      });
    }
  }, [isEditMode, product]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'stock' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditMode && productId) {
      updateMutation.mutate({ id: productId, product: formData });
    } else {
      createMutation.mutate(formData);
    }
    navigate('/products');
  };

  if (isProductLoading) {
    return <LoadingSpinner />;
  }

  if (productError) {
    return <ErrorMessage message={`Error al cargar producto: ${productError.message}`} />;
  }

  return (
    <Paper elevation={3} sx={{ padding: 3, maxWidth: 600, margin: 'auto' }}>
      <Typography variant="h5" component="h1" gutterBottom>
        {isEditMode ? 'Editar Producto' : 'Crear Producto'}
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          fullWidth
          margin="normal"
          label="Nombre"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          margin="normal"
          label="Descripción"
          name="description"
          value={formData.description}
          onChange={handleChange}
          multiline
          rows={4}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Precio"
          name="price"
          type="number"
          value={formData.price}
          onChange={handleChange}
          required
          inputProps={{ min: 0, step: 0.01 }}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Stock"
          name="stock"
          type="number"
          value={formData.stock}
          onChange={handleChange}
          required
          inputProps={{ min: 0 }}
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => navigate('/products')}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={createMutation.isPending || updateMutation.isPending}
          >
            {isEditMode ? 'Actualizar' : 'Crear'}
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default ProductForm;