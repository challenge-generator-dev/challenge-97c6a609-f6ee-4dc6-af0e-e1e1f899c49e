import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import ErrorBoundary from './shared/components/ErrorBoundary';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error(
    'No se encontró el elemento root en el DOM. Asegúrate de que index.html tenga <div id="root"></div>'
  );
}

const renderApp = (): void => {
  try {
    const root = ReactDOM.createRoot(rootElement);
    
    root.render(
      <React.StrictMode>
        <ErrorBoundary>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ErrorBoundary>
      </React.StrictMode>
    );
    
    console.log('PragmaFintech - Aplicación de gestión de clientes iniciada correctamente');
  } catch (error) {
    console.error('Error crítico al iniciar la aplicación:', error);
    
    rootElement.innerHTML = `
      <div style="padding: 2rem; font-family: system-ui, sans-serif; text-align: center;">
        <h1 style="color: #d32f2f;">Error de inicialización</h1>
        <p>No se pudo cargar la aplicación. Por favor, recarga la página.</p>
        <pre style="background: #f5f5f5; padding: 1rem; text-align: left; overflow: auto;">${error instanceof Error ? error.message : 'Error desconocido'}</pre>
      </div>
    `;
  }
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', renderApp);
} else {
  renderApp();
}

if (import.meta.hot) {
  import.meta.hot.dispose(() => {
    console.log('PragmaFintech - HMR: Recargando aplicación...');
  });
}

window.addEventListener('error', (event) => {
  console.error('Error global capturado:', event.error);
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('Promesa rechazada no manejada:', event.reason);
});