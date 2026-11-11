import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { ProductEntity, CreateProductDto, UpdateProductDto } from '../types/product.type';

/**
 * Servicio para consumir la API de productos.
 * Encapsula las operaciones CRUD y maneja las comunicaciones HTTP.
 */
class ProductService {
  private client: AxiosInstance;

  constructor(baseURL: string = 'http://localhost:3000') {
    this.client = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  /**
   * Crea un nuevo producto.
   * @param productData Datos del producto a crear.
   * @returns Producto creado.
   */
  async createProduct(productData: CreateProductDto): Promise<ProductEntity> {
    const response: AxiosResponse<ProductEntity> = await this.client.post('/products', productData);
    return response.data;
  }

  /**
   * Obtiene un producto por su ID.
   * @param id ID del producto.
   * @returns Producto encontrado.
   */
  async getProduct(id: string): Promise<ProductEntity> {
    const response: AxiosResponse<ProductEntity> = await this.client.get(`/products/${id}`);
    return response.data;
  }

  /**
   * Actualiza un producto existente.
   * @param id ID del producto a actualizar.
   * @param productData Datos actualizados del producto.
   * @returns Producto actualizado.
   */
  async updateProduct(id: string, productData: UpdateProductDto): Promise<ProductEntity> {
    const response: AxiosResponse<ProductEntity> = await this.client.put(`/products/${id}`, productData);
    return response.data;
  }

  /**
   * Elimina un producto por su ID.
   * @param id ID del producto a eliminar.
   */
  async deleteProduct(id: string): Promise<void> {
    await this.client.delete(`/products/${id}`);
  }

  /**
   * Lista todos los productos.
   * @returns Lista de productos.
   */
  async listProducts(): Promise<ProductEntity[]> {
    const response: AxiosResponse<ProductEntity[]> = await this.client.get('/products');
    return response.data;
  }
}

export default ProductService;