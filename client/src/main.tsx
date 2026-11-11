import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter, useNavigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ProductList } from './features/products/ProductList';
import { ProductForm } from './features/products/ProductForm';

const queryClient = new QueryClient();

const AddProductPage = () => {
  const navigate = useNavigate();
  
  const handleCancel = () => {
    navigate('/');
  };
  
  const handleSuccess = () => {
    navigate('/');
  };
  
  return <ProductForm onCancel={handleCancel} onSuccess={handleSuccess} />;
};

const EditProductPage = () => {
  const navigate = useNavigate();
  
  const handleCancel = () => {
    navigate('/');
  };
  
  const handleSuccess = () => {
    navigate('/');
  };
  
  return <ProductForm onCancel={handleCancel} onSuccess={handleSuccess} />;
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <ProductList />,
  },
  {
    path: '/add',
    element: <AddProductPage />,
  },
  {
    path: '/edit/:id',
    element: <EditProductPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);