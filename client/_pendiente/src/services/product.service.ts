import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const API_URL = 'http://localhost:3000/products';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
}

export interface CreateProductDto {
  name: string;
  description: string;
  price: number;
  stock: number;
}

export interface UpdateProductDto {
  name?: string;
  description?: string;
  price?: number;
  stock?: number;
}

const fetchProducts = async (): Promise<Product[]> => {
  const response = await axios.get<Product[]>(API_URL);
  return response.data;
};

const fetchProductById = async (id: string): Promise<Product> => {
  const response = await axios.get<Product>(`${API_URL}/${id}`);
  return response.data;
};

const createProduct = async (product: CreateProductDto): Promise<Product> => {
  const response = await axios.post<Product>(API_URL, product);
  return response.data;
};

const updateProduct = async (id: string, product: UpdateProductDto): Promise<Product> => {
  const response = await axios.put<Product>(`${API_URL}/${id}`, product);
  return response.data;
};

const deleteProduct = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};

export const useProductService = () => {
  const queryClient = useQueryClient();

  const productsQuery = useQuery<Product[], Error>({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  const productQuery = (id: string) =>
    useQuery<Product, Error>({
      queryKey: ['product', id],
      queryFn: () => fetchProductById(id),
    });

  const createMutation = useMutation<Product, Error, CreateProductDto>({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });

  const updateMutation = useMutation<Product, Error, { id: string; product: UpdateProductDto }>({
    mutationFn: ({ id, product }) => updateProduct(id, product),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });

  const deleteMutation = useMutation<void, Error, string>({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });

  return {
    productsQuery,
    productQuery,
    createMutation,
    updateMutation,
    deleteMutation,
  };
};