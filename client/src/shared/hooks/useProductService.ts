import { useState, useEffect } from 'react';
import ProductService from '../services/ProductService';
import { ProductEntity, CreateProductDto, UpdateProductDto } from '../types/product.type';

/**
 * Hook personalizado para manejar la lógica de productos.
 * Proporciona estado y métodos para interactuar con el servicio de productos.
 */
const useProductService = () => {
  const [products, setProducts] = useState<ProductEntity[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const productService = new ProductService();

  /**
   * Carga la lista de productos.
   */
  const fetchProducts = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await productService.listProducts();
      setProducts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido al cargar productos');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Crea un nuevo producto.
   * @param productData Datos del producto a crear.
   * @returns Producto creado.
   */
  const createProduct = async (productData: CreateProductDto): Promise<ProductEntity | null> => {
    setIsLoading(true);
    setError(null);
    try {
      const newProduct = await productService.createProduct(productData);
      await fetchProducts();
      return newProduct;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido al crear producto');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Actualiza un producto existente.
   * @param id ID del producto a actualizar.
   * @param productData Datos actualizados del producto.
   * @returns Producto actualizado.
   */
  const updateProduct = async (id: string, productData: UpdateProductDto): Promise<ProductEntity | null> => {
    setIsLoading(true);
    setError(null);
    try {
      const updatedProduct = await productService.updateProduct(id, productData);
      await fetchProducts();
      return updatedProduct;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido al actualizar producto');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Elimina un producto por su ID.
   * @param id ID del producto a eliminar.
   */
  const deleteProduct = async (id: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    try {
      await productService.deleteProduct(id);
      await fetchProducts();
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido al eliminar producto');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return {
    products,
    isLoading,
    error,
    createProduct,
    updateProduct,
    deleteProduct,
    refreshProducts: fetchProducts,
  };
};

export default useProductService;