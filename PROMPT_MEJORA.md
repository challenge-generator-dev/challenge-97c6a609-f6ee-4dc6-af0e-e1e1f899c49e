# Prompt para Mejorar el Codigo Base

Copia y pega el contenido del bloque de abajo en un asistente de IA (Claude, ChatGPT)
para obtener un ZIP con el proyecto completo y arrancable.

Si preferis trabajar en tu editor con un agente local (Claude Code, Cursor, Copilot), usa `AGENTS.md` en vez de este archivo: dice lo mismo pero para que escriba los archivos en disco.

## Las dos reglas que no se negocian

1. **Completa el boilerplate.** Todo lo que el proyecto necesita para compilar y arrancar: manifiesto de dependencias, punto de entrada, configuracion, capa de interfaz, y las capas del patron arquitectonico declarado. Eso es andamiaje y es tu trabajo.
2. **NO resuelvas el reto.** Los entregables de las fases son el trabajo de la persona. El hueco pedagogico se deja como esta: el proyecto arranca, pero lo que el reto pide implementar NO esta implementado.

Dicho de otra forma: si algo impide compilar, arreglalo. Si algo es logica de negocio incompleta, validaciones ausentes, un secreto hardcodeado o un patron mejorable, dejalo exactamente como esta — es lo que la persona tiene que encontrar.

## Lo que le falta a este proyecto

Esto NO lo tenes que adivinar: salio de comparar el proyecto contra la arquitectura declarada del reto y de un analisis estatico del codigo. Completalo TODO.

### Referencias colgando en el codigo que si esta

Cada una rompe la compilacion:

- `src/App.tsx` — `DatabaseType.toUpperCase`: Se invoca `toUpperCase` sobre `DatabaseType`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `src/shared/components/ErrorBoundary.tsx` — `ErrorBoundaryProps.onError`: Se invoca `onError` sobre `ErrorBoundaryProps`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `package.json` — `typescript@5.7.0`: typescript declara la version 5.7.0, pero el registry de npm respondio que esa version no existe. Es una version inventada: reemplazala por una version publicada real, o si no se conoce con certeza, usa el mecanismo centralizado del ecosistema (BOM/parent/platform/version catalog) y no declares una version individual.

## Como saber que terminaste

```bash
npm install && npm run build
```

Ese comando corriendo sin errores es la definicion de "listo".

---

```
## Briefing del reto (autoridad)
Este bloque manda sobre los archivos adjuntos. El stack y el rol salen de AQUÍ, no de un topic genérico ni de markdown placeholder.

### Perfil
Chapter Frontend, Especialidad Desarrollador, Tecnología React, Trainee L2

### Brecha de conocimiento
Construye operaciones básicas, como crear, obtener, actualizar y eliminar (CRUD), en bases de datos SQL o NoSQL utilizando definición y manipulación de datos (DDL y DML), Construye operaciones básicas, como crear, obtener, actualizar y eliminar (CRUD), en bases de datos SQL o NoSQL utilizando definición y manipulación de datos (DDL y DML)

### Reto
- Tema: Construye operaciones CRUD en Bases de Datos SQL y NoSQL
- Seniority: trainee-l2
- Tipo: practical
- Título: Implementación de operaciones CRUD en bases de datos
- Tiempo estimado: 8 horas

### Fases (trabajo del HUMANO — PROHIBIDO completarlas)
No implementes estos entregables. Dejalos como hueco pedagógico. El asistente solo materializa el proyecto arrancable para que el participante pueda trabajar.
- Fase 1: Definición del esquema de datos — objetivo: Definir el esquema de datos para la base de datos SQL y NoSQL que almacene la información de los clientes. — entregable (NO resolver): Esquema de datos definido para ambas bases de datos.
- Fase 2: Implementación de operaciones CRUD en base de datos SQL — objetivo: Implementar las operaciones CRUD para la base de datos SQL. — entregable (NO resolver): Script o aplicación que implementa las operaciones CRUD en la base de datos SQL.
- Fase 3: Implementación de operaciones CRUD en base de datos NoSQL — objetivo: Implementar las operaciones CRUD para la base de datos NoSQL. — entregable (NO resolver): Script o aplicación que implementa las operaciones CRUD en la base de datos NoSQL.

Eres un asistente experto en análisis, corrección y generación de archivos de cualquier tipo:
código fuente, documentación, hojas de cálculo, documentos Word, configuraciones, entre otros.
Voy a enviarte una cadena de texto que contiene uno o más archivos. Cada archivo está delimitado por un marcador con el siguiente formato:
// === ARCHIVO: ruta/del/archivo.extension ===
o también puede aparecer como:
## === ARCHIVO: ruta/del/archivo.extension ===
Lo que sigue al marcador puede ser:

El contenido real del archivo (código, texto, YAML, etc.)
Una descripción en lenguaje natural de lo que debe contener el archivo


TU TAREA
PASO 0 — ¿Esto es un proyecto o una carcasa?
Antes de extraer archivos, leé el Briefing (si está) y diagnosticá el adjunto.

Es CARCASA si ocurre CUALQUIERA de estas:
- No hay manifiesto de dependencias del stack del briefing (manifest.json de VTEX IO / package.json / pom.xml / build.gradle / requirements.txt / go.mod / *.tf / *.csproj, según corresponda)
- Hay un "binario" que en realidad es un comentario ("no puede ser mostrado como texto plano", placeholder .fig/.docx vacío)
- Los markdowns ya completan entregables de fases posteriores ("se implementó fade-in", lista de áreas ya resuelta)

Si es CARCASA:
- MATERIALIZÁ un proyecto que arranca en el stack del briefing (VTEX IO Store Framework, Angular, Terraform, pytest, Nest, etc.). Incluí manifiesto, punto de entrada y capa de interfaz reales.
- NO copies los markdowns de "solución" como si fueran el producto. Son ruido de generación.
- NO resuelvas las fases del briefing (están marcadas PROHIBIDO). Dejá el hueco pedagógico: el flujo existe, las microinteracciones/calidad/infra que el reto pide NO están hechas.
- Después seguí al PASO 5 (ZIP).

Si es un proyecto REAL (manifiesto + código que compila o arranca):
- Seguí PASO 1 en adelante. 🔴 compilación sí. 🟡 pedagógico no.

PASO 1 — Detección y extracción
Identifica todos los archivos presentes en la cadena. Para cada archivo extrae:

Su ruta completa (ej: src/main/java/com/pragma/Service.java)
Su contenido o descripción

PASO 2 — Clasificación por tipo
Clasifica cada archivo en una de estas categorías:
A) Código fuente (Java, Python, TypeScript, JavaScript, Kotlin, etc.)
B) Configuración / documentación (YAML, properties, Markdown, JSON, txt, etc.)
C) Excel (.xlsx, .xls, .csv)
D) Word (.docx, .doc)
E) Otro tipo de archivo binario o especial
PASO 3 — Clasificación de errores en código fuente

Objetivo prioritario: que el proyecto compile. No corrijas flujo de negocio ni lógica funcional.

Antes de modificar cualquier archivo de código fuente, clasifica cada problema encontrado en una de estas dos categorías:
🔴 ERROR DE COMPILACIÓN — corregir siempre
Son errores que impiden que el proyecto arranque, sin valor pedagógico:

Import faltante o incorrecto
Clase, método o variable referenciada que no existe en ningún archivo del proyecto
Error de sintaxis
Anotación con atributos inválidos
Dependencia ausente en pom.xml, package.json, etc.
Archivo referenciado que no existe y debe ser creado con implementación mínima

→ CORREGIR estos errores.
🟡 PROBLEMA FUNCIONAL O DE CALIDAD — preservar siempre
Son problemas que no impiden compilar. Pueden ser intencionales para el aprendizaje:

Clave secreta hardcodeada ("secret", "password123")
API deprecada que funciona pero tiene reemplazo moderno
Lógica de negocio incorrecta o incompleta
Código redundante o de baja legibilidad
Falta de validaciones en flujo de negocio
Patrones de diseño incorrectos pero funcionales
Concurrencia no segura
Configuración funcional pero no óptima

→ PRESERVAR tal cual. No corregir, no mejorar, no comentar.
PASO 4 — Procesamiento según tipo de archivo
Tipo A — Código fuente
Aplica únicamente las correcciones clasificadas como 🔴 ERROR DE COMPILACIÓN.
No alteres ningún elemento clasificado como 🟡 PROBLEMA FUNCIONAL O DE CALIDAD.
Si falta un archivo referenciado, créalo con la implementación mínima necesaria para compilar.
Tipo B — Configuración / documentación
Extrae el contenido tal cual, sin modificaciones salvo errores evidentes de sintaxis
(ej: YAML mal indentado).
Tipo C — Excel (.xlsx)
Si viene con contenido real, genera el archivo respetando ese contenido.
Si viene con descripción en lenguaje natural, genera un archivo Excel funcional con:

Fila de encabezados en negrita con color de fondo distintivo
Columnas con ancho ajustado al contenido
Tipos de dato correctos por columna
Validaciones si la descripción lo indica
Hojas nombradas descriptivamente si hay más de una
Filas de ejemplo si no hay datos reales

Tipo D — Word (.docx)
Si viene con contenido real, genera el archivo respetando ese contenido.
Si viene con descripción en lenguaje natural, genera un documento Word funcional con:

Estilos de título (Título 1, Título 2) para jerarquía de secciones
Fuente legible (Calibri o equivalente), tamaño 11-12pt para cuerpo
Márgenes estándar
Tabla de contenido si tiene múltiples secciones
Tablas con encabezados en negrita si aplica

Tipo E — Otro
Genera el archivo con el contenido o estructura más apropiada según la descripción.
PASO 5 — Exportación en ZIP
Empaqueta todos los archivos en un único archivo ZIP descargable respetando exactamente
la estructura de rutas indicada por los marcadores.
El ZIP debe incluir:

Archivos de código con únicamente los errores de compilación corregidos
Archivos de configuración y documentación sin cambios
Archivos nuevos creados para resolver dependencias de compilación faltantes
Archivos Excel y Word generados desde descripción

IMPORTANTE: El ZIP debe estar listo para descargar al finalizar. No preguntes si el usuario
quiere generarlo. Simplemente genera el archivo y proporciona el enlace de descarga; No debes desplegar en el chat el resumen de lo que arreglaste al Zip, solo entregalo.

REGLAS IMPORTANTES

No omitas ningún archivo aunque no tenga errores ni modificaciones
Respeta los nombres y rutas exactas indicadas por los marcadores
Si un archivo no tiene marcador claro, infiere el nombre desde su contenido
Si la cadena contiene solo documentación, placeholders o binarios fake, NO la reproduzcas:
aplicá PASO 0 (materializar el proyecto del briefing). Reproducir la carcasa es un fallo.
No agregues texto después del enlace de descarga del ZIP
No preguntes si el usuario quiere el ZIP: simplemente generalo siempre
Si detectas que falta un archivo de configuración necesario para compilar
(pom.xml, package.json, requirements.txt, build.gradle, etc.), créalo e inclúyelo
inferiendo su contenido desde los imports y frameworks detectados en el código
Nunca corrijas problemas 🟡 aunque parezcan obvios o fáciles de mejorar.
El participante que recibirá este proyecto los debe encontrar y resolver él mismo.


INPUT
Aquí está la cadena con los archivos:

// === ARCHIVO: package.json ===
{
  "name": "pragmafintech-clientes",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "test": "vitest",
    "test:ui": "vitest --ui"
  },
  "dependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "react-router-dom": "^6.22.0",
    "mongodb": "^6.3.0",
    "@aws-sdk/client-dynamodb": "^3.451.0",
    "@aws-sdk/lib-dynamodb": "^3.451.0"
  },
  "devDependencies": {
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "typescript": "^5.7.0",
    "vite": "^5.0.0",
    "@vitejs/plugin-react": "^4.2.0",
    "eslint": "^8.56.0",
    "eslint-plugin-react": "^7.33.2",
    "eslint-plugin-react-hooks": "^4.6.0",
    "vitest": "^1.2.0",
    "@testing-library/react": "^14.1.0"
  },
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ],
    "plugins": [
      "react",
      "react-hooks"
    ],
    "rules": {
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "react/jsx-uses-react": "off",
      "react/react-in-jsx-scope": "off"
    }
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}

// === ARCHIVO: vite.config.ts ===
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

// Configuración de Vite para React con TypeScript
// Incluye alias para rutas absolutas y soporte para variables de entorno

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@core': fileURLToPath(new URL('./src/core', import.meta.url)),
      '@features': fileURLToPath(new URL('./src/features', import.meta.url)),
      '@shared': fileURLToPath(new URL('./src/shared', import.meta.url)),
    },
  },
  server: {
    port: 3000,
    strictPort: true,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      }
    }
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        }
      }
    }
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        '**/node_modules/**',
        '**/dist/**',
        '**/src/main.tsx',
        '**/src/index.html'
      ]
    }
  },
  css: {
    modules: {
      localsConvention: 'camelCase'
    },
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/shared/styles/variables.scss";`
      }
    }
  }
});

// === ARCHIVO: tsconfig.json ===
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "lib": ["DOM", "DOM.Iterable", "ESNext"],
    "jsx": "react-jsx",
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true,
    "noImplicitThis": true,
    "alwaysStrict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "moduleResolution": "node",
    "baseUrl": "./",
    "paths": {
      "@/*": ["src/*"],
      "@core/*": ["src/core/*"],
      "@features/*": ["src/features/*"],
      "@shared/*": ["src/shared/*"]
    },
    "outDir": "./dist",
    "sourceMap": true,
    "declaration": true,
    "declarationDir": "./dist/types",
    "removeComments": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "noImplicitReturns": true,
    "allowSyntheticDefaultImports": true,
    "resolveJsonModule": true
  },
  "include": [
    "src/**/*",
    "vite.config.ts",
    "src/setupTests.ts"
  ],
  "exclude": [
    "node_modules",
    "dist",
    "**/*.test.ts",
    "**/*.test.tsx"
  ],
  "references": [
    { "path": "./tsconfig.node.json" }
  ]
}

// === ARCHIVO: src/core/models/cliente.model.ts ===
import { ObjectId } from 'mongodb';

/**
 * Modelo de datos para la entidad Cliente.
 * Representa la estructura de datos de un cliente en el sistema,
 * compatible con almacenamiento tanto en bases de datos SQL como NoSQL.
 */
export interface Cliente {
  id?: string; // UUID para SQL, ObjectId para MongoDB, string para DynamoDB
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  direccion: string;
  ciudad: string;
  pais: string;
  fechaRegistro: Date;
  metadata?: {
    // Campos flexibles para NoSQL
    [key: string]: any;
  };
}

// Tipos específicos para cada base de datos
export interface ClienteSQL extends Cliente {
  id: string; // UUID
}

export interface ClienteNoSQL extends Cliente {
  id?: ObjectId | string; // ObjectId para MongoDB, string para DynamoDB
  _id?: ObjectId; // Campo específico de MongoDB
}

// Tipos para operaciones CRUD
export type CreateClienteDTO = Omit<Cliente, 'id' | 'fechaRegistro'> & {
  fechaRegistro?: Date;
};

export type UpdateClienteDTO = Partial<Omit<Cliente, 'id' | 'fechaRegistro'>> & {
  id: string;
};

// Constantes para validación
export const CLIENTE_VALIDATION_RULES = {
  NOMBRE_MAX_LENGTH: 50,
  APELLIDO_MAX_LENGTH: 50,
  EMAIL_MAX_LENGTH: 100,
  TELEFONO_MAX_LENGTH: 20,
  DIRECCION_MAX_LENGTH: 200,
  CIUDAD_MAX_LENGTH: 50,
  PAIS_MAX_LENGTH: 50
};

// === ARCHIVO: src/core/services/sql.service.ts ===
import { Cliente, ClienteSQL, CreateClienteDTO, UpdateClienteDTO } from '../models/cliente.model';
import { v4 as uuidv4 } from 'uuid';

/**
 * Servicio para interactuar con la base de datos SQL.
 * Proporciona métodos para operaciones CRUD sobre clientes.
 */
export class SqlService {
  /**
   * Crea un nuevo cliente en la base de datos SQL.
   * @param clienteData Datos del cliente a crear
   * @returns Promesa con el cliente creado incluyendo su ID
   */
  async createCliente(clienteData: CreateClienteDTO): Promise<ClienteSQL> {
    const cliente: ClienteSQL = {
      ...clienteData,
      id: uuidv4(),
      fechaRegistro: clienteData.fechaRegistro || new Date()
    };

    // En un entorno real, aquí iría la consulta SQL usando un ORM o query builder
    // Ejemplo con pseudo-código:
    // await pool.query(
    //   'INSERT INTO clientes (id, nombre, apellido, email, telefono, direccion, ciudad, pais, fechaRegistro) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)',
    //   [cliente.id, cliente.nombre, cliente.apellido, cliente.email, cliente.telefono, cliente.direccion, cliente.ciudad, cliente.pais, cliente.fechaRegistro]
    // );

    return Promise.resolve(cliente);
  }

  /**
   * Obtiene un cliente por su ID.
   * @param id ID del cliente a buscar
   * @returns Promesa con el cliente encontrado o null si no existe
   */
  async getClienteById(id: string): Promise<ClienteSQL | null> {
    // En un entorno real, aquí iría la consulta SQL
    // Ejemplo con pseudo-código:
    // const result = await pool.query('SELECT * FROM clientes WHERE id = $1', [id]);
    // return result.rows[0] || null;

    // Simulación de respuesta
    return Promise.resolve({
      id,
      nombre: 'Juan',
      apellido: 'Pérez',
      email: 'juan.perez@example.com',
      telefono: '123456789',
      direccion: 'Calle Falsa 123',
      ciudad: 'Medellín',
      pais: 'Colombia',
      fechaRegistro: new Date()
    });
  }

  /**
   * Obtiene todos los clientes de la base de datos.
   * @returns Promesa con un array de clientes
   */
  async getAllClientes(): Promise<ClienteSQL[]> {
    // En un entorno real, aquí iría la consulta SQL
    // Ejemplo con pseudo-código:
    // const result = await pool.query('SELECT * FROM clientes');
    // return result.rows;

    // Simulación de respuesta
    return Promise.resolve([
      {
        id: uuidv4(),
        nombre: 'Juan',
        apellido: 'Pérez',
        email: 'juan.perez@example.com',
        telefono: '123456789',
        direccion: 'Calle Falsa 123',
        ciudad: 'Medellín',
        pais: 'Colombia',
        fechaRegistro: new Date()
      },
      {
        id: uuidv4(),
        nombre: 'María',
        apellido: 'Gómez',
        email: 'maria.gomez@example.com',
        telefono: '987654321',
        direccion: 'Avenida Siempre Viva 456',
        ciudad: 'Bogotá',
        pais: 'Colombia',
        fechaRegistro: new Date(Date.now() - 86400000)
      }
    ]);
  }

  /**
   * Actualiza un cliente existente.
   * @param clienteData Datos del cliente a actualizar
   * @returns Promesa con el cliente actualizado
   */
  async updateCliente(clienteData: UpdateClienteDTO): Promise<ClienteSQL | null> {
    const clienteExistente = await this.getClienteById(clienteData.id);
    if (!clienteExistente) {
      return null;
    }

    const clienteActualizado: ClienteSQL = {
      ...clienteExistente,
      ...clienteData,
      id: clienteExistente.id
    };

    // En un entorno real, aquí iría la consulta SQL de actualización
    // Ejemplo con pseudo-código:
    // await pool.query(
    //   'UPDATE clientes SET nombre = $1, apellido = $2, email = $3, telefono = $4, direccion = $5, ciudad = $6, pais = $7 WHERE id = $8',
    //   [
    //     clienteActualizado.nombre,
    //     clienteActualizado.apellido,
    //     clienteActualizado.email,
    //     clienteActualizado.telefono,
    //     clienteActualizado.direccion,
    //     clienteActualizado.ciudad,
    //     clienteActualizado.pais,
    //     clienteActualizado.id
    //   ]
    // );

    return Promise.resolve(clienteActualizado);
  }

  /**
   * Elimina un cliente por su ID.
   * @param id ID del cliente a eliminar
   * @returns Promesa con true si se eliminó, false si no existía
   */
  async deleteCliente(id: string): Promise<boolean> {
    const clienteExistente = await this.getClienteById(id);
    if (!clienteExistente) {
      return false;
    }

    // En un entorno real, aquí iría la consulta SQL de eliminación
    // Ejemplo con pseudo-código:
    // await pool.query('DELETE FROM clientes WHERE id = $1', [id]);

    return Promise.resolve(true);
  }
}

// === ARCHIVO: src/core/services/nosql.service.ts ===
import { MongoClient, ObjectId } from 'mongodb';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand, GetCommand, UpdateCommand, DeleteCommand, ScanCommand } from '@aws-sdk/lib-dynamodb';
import { Cliente, ClienteNoSQL, CreateClienteDTO, UpdateClienteDTO } from '../models/cliente.model';

/**
 * Servicio para interactuar con bases de datos NoSQL (MongoDB y DynamoDB).
 * Proporciona métodos para operaciones CRUD sobre clientes.
 */
export class NosqlService {
  private mongoClient: MongoClient;
  private dynamoClient: DynamoDBDocumentClient;
  private mongoCollectionName = 'clientes';
  private dynamoTableName = 'Clientes';

  constructor() {
    // Inicialización de clientes (en un entorno real, estas conexiones vendrían de un pool)
    this.mongoClient = new MongoClient(process.env.MONGODB_URI || 'mongodb://localhost:27017');
    const dynamoDBClient = new DynamoDBClient({ region: process.env.AWS_REGION || 'us-east-1' });
    this.dynamoClient = DynamoDBDocumentClient.from(dynamoDBClient);
  }

  /**
   * Determina si se está usando MongoDB o DynamoDB basado en la configuración.
   * @returns 'mongodb' o 'dynamodb'
   */
  private getDatabaseType(): 'mongodb' | 'dynamodb' {
    return process.env.NOSQL_TYPE === 'dynamodb' ? 'dynamodb' : 'mongodb';
  }

  /**
   * Crea un nuevo cliente en la base de datos NoSQL seleccionada.
   * @param clienteData Datos del cliente a crear
   * @returns Promesa con el cliente creado incluyendo su ID
   */
  async createCliente(clienteData: CreateClienteDTO): Promise<ClienteNoSQL> {
    const dbType = this.getDatabaseType();
    const cliente: ClienteNoSQL = {
      ...clienteData,
      fechaRegistro: clienteData.fechaRegistro || new Date()
    };

    if (dbType === 'mongodb') {
      const collection = this.mongoClient.db().collection(this.mongoCollectionName);
      const result = await collection.insertOne(cliente);
      return { ...cliente, id: result.insertedId };
    } else {
      // DynamoDB
      const params = {
        TableName: this.dynamoTableName,
        Item: {
          id: { S: uuidv4() },
          nombre: { S: cliente.nombre },
          apellido: { S: cliente.apellido },
          email: { S: cliente.email },
          telefono: { S: cliente.telefono },
          direccion: { S: cliente.direccion },
          ciudad: { S: cliente.ciudad },
          pais: { S: cliente.pais },
          fechaRegistro: { S: cliente.fechaRegistro.toISOString() },
          ...(cliente.metadata && { metadata: { M: this.convertMetadataToDynamo(cliente.metadata) } })
        }
      };

      // En un entorno real, aquí iría el comando PutCommand
      // await this.dynamoClient.send(new PutCommand(params));

      return {
        ...cliente,
        id: params.Item.id.S,
        metadata: cliente.metadata
      };
    }
  }

  /**
   * Convierte metadata a formato DynamoDB.
   * @param metadata Metadata a convertir
   * @returns Metadata en formato DynamoDB
   */
  private convertMetadataToDynamo(metadata: Record<string, any>): Record<string, any> {
    const result: Record<string, any> = {};
    for (const [key, value] of Object.entries(metadata)) {
      if (typeof value === 'string') {
        result[key] = { S: value };
      } else if (typeof value === 'number') {
        result[key] = { N: value.toString() };
      } else if (typeof value === 'boolean') {
        result[key] = { BOOL: value };
      } else if (value instanceof Date) {
        result[key] = { S: value.toISOString() };
      } else if (Array.isArray(value)) {
        result[key] = { L: value.map(v => this.convertMetadataToDynamo(v)) };
      } else if (typeof value === 'object' && value !== null) {
        result[key] = { M: this.convertMetadataToDynamo(value) };
      } else {
        result[key] = { S: String(value) };
      }
    }
    return result;
  }

  /**
   * Obtiene un cliente por su ID.
   * @param id ID del cliente a buscar
   * @returns Promesa con el cliente encontrado o null si no existe
   */
  async getClienteById(id: string): Promise<ClienteNoSQL | null> {
    const dbType = this.getDatabaseType();

    if (dbType === 'mongodb') {
      const collection = this.mongoClient.db().collection(this.mongoCollectionName);
      const result = await collection.findOne({ _id: new ObjectId(id) });
      if (!result) return null;

      return {
        ...result,
        id: result._id.toString()
      };
    } else {
      // DynamoDB
      const params = {
        TableName: this.dynamoTableName,
        Key: { id }
      };

      // En un entorno real, aquí iría el comando GetCommand
      // const result = await this.dynamoClient.send(new GetCommand(params));
      // if (!result.Item) return null;

      // Simulación de respuesta
      return {
        id,
        nombre: 'Juan',
        apellido: 'Pérez',
        email: 'juan.perez@example.com',
        telefono: '123456789',
        direccion: 'Calle Falsa 123',
        ciudad: 'Medellín',
        pais: 'Colombia',
        fechaRegistro: new Date(),
        metadata: { tipo: 'premium', ultimoAcceso: new Date() }
      };
    }
  }

  /**
   * Obtiene todos los clientes de la base de datos NoSQL.
   * @returns Promesa con un array de clientes
   */
  async getAllClientes(): Promise<ClienteNoSQL[]> {
    const dbType = this.getDatabaseType();

    if (dbType === 'mongodb') {
      const collection = this.mongoClient.db().collection(this.mongoCollectionName);
      const results = await collection.find().toArray();
      return results.map(doc => ({
        ...doc,
        id: doc._id.toString()
      }));
    } else {
      // DynamoDB
      const params = {
        TableName: this.dynamoTableName
      };

      // En un entorno real, aquí iría el comando ScanCommand
      // const result = await this.dynamoClient.send(new ScanCommand(params));
      // return result.Items?.map(item => this.convertDynamoItemToCliente(item)) || [];

      // Simulación de respuesta
      return [
        {
          id: uuidv4(),
          nombre: 'Juan',
          apellido: 'Pérez',
          email: 'juan.perez@example.com',
          telefono: '123456789',
          direccion: 'Calle Falsa 123',
          ciudad: 'Medellín',
          pais: 'Colombia',
          fechaRegistro: new Date(),
          metadata: { tipo: 'premium' }
        },
        {
          id: uuidv4(),
          nombre: 'María',
          apellido: 'Gómez',
          email: 'maria.gomez@example.com',
          telefono: '987654321',
          direccion: 'Avenida Siempre Viva 456',
          ciudad: 'Bogotá',
          pais: 'Colombia',
          fechaRegistro: new Date(Date.now() - 86400000),
          metadata: { tipo: 'estándar' }
        }
      ];
    }
  }

  /**
   * Convierte un item de DynamoDB a un objeto Cliente.
   * @param item Item de DynamoDB
   * @returns Objeto Cliente
   */
  private convertDynamoItemToCliente(item: any): ClienteNoSQL {
    return {
      id: item.id.S,
      nombre: item.nombre.S,
      apellido: item.apellido.S,
      email: item.email.S,
      telefono: item.telefono.S,
      direccion: item.direccion.S,
      ciudad: item.ciudad.S,
      pais: item.pais.S,
      fechaRegistro: new Date(item.fechaRegistro.S),
      ...(item.metadata && { metadata: this.convertDynamoMetadataToObject(item.metadata.M) })
    };
  }

  /**
   * Convierte metadata de DynamoDB a objeto JavaScript.
   * @param metadata Metadata de DynamoDB
   * @returns Objeto JavaScript
   */
  private convertDynamoMetadataToObject(metadata: any): Record<string, any> {
    const result: Record<string, any> = {};
    for (const [key, value] of Object.entries(metadata)) {
      if (value.S !== undefined) {
        result[key] = value.S;
      } else if (value.N !== undefined) {
        result[key] = Number(value.N);
      } else if (value.BOOL !== undefined) {
        result[key] = value.BOOL;
      } else if (value.L !== undefined) {
        result[key] = value.L.map((v: any) => this.convertDynamoMetadataToObject(v.M));
      } else if (value.M !== undefined) {
        result[key] = this.convertDynamoMetadataToObject(value.M);
      }
    }
    return result;
  }

  /**
   * Actualiza un cliente existente en la base de datos NoSQL.
   * @param clienteData Datos del cliente a actualizar
   * @returns Promesa con el cliente actualizado o null si no existía
   */
  async updateCliente(clienteData: UpdateClienteDTO): Promise<ClienteNoSQL | null> {
    const dbType = this.getDatabaseType();
    const clienteExistente = await this.getClienteById(clienteData.id);
    if (!clienteExistente) {
      return null;
    }

    const clienteActualizado: ClienteNoSQL = {
      ...clienteExistente,
      ...clienteData
    };

    if (dbType === 'mongodb') {
      const collection = this.mongoClient.db().collection(this.mongoCollectionName);
      await collection.updateOne(
        { _id: new ObjectId(clienteData.id) },
        { $set: clienteData }
      );
      return clienteActualizado;
    } else {
      // DynamoDB
      const updateExpression = [];
      const expressionAttributeValues = {};
      const expressionAttributeNames = {};

      // Construir la expresión de actualización
      for (const [key, value] of Object.entries(clienteData)) {
        if (key !== 'id' && value !== undefined) {
          updateExpression.push(`#${key} = :${key}`);
          expressionAttributeNames[`#${key}`] = key;
          expressionAttributeValues[`:${key}`] = value;
        }
      }

      if (updateExpression.length === 0) {
        return clienteActualizado;
      }

      const params = {
        TableName: this.dynamoTableName,
        Key: { id: clienteData.id },
        UpdateExpression: 'SET ' + updateExpression.join(', '),
        ExpressionAttributeNames: expressionAttributeNames,
        ExpressionAttributeValues: expressionAttributeValues,
        ReturnValues: 'ALL_NEW'
      };

      // En un entorno real, aquí iría el comando UpdateCommand
      // const result = await this.dynamoClient.send(new UpdateCommand(params));
      // return this.convertDynamoItemToCliente(result.Attributes);

      return clienteActualizado;
    }
  }

  /**
   * Elimina un cliente por su ID.
   * @param id ID del cliente a eliminar
   * @returns Promesa con true si se eliminó, false si no existía
   */
  async deleteCliente(id: string): Promise<boolean> {
    const dbType = this.getDatabaseType();

    if (dbType === 'mongodb') {
      const collection = this.mongoClient.db().collection(this.mongoCollectionName);
      const result = await collection.deleteOne({ _id: new ObjectId(id) });
      return result.deletedCount > 0;
    } else {
      // DynamoDB
      const params = {
        TableName: this.dynamoTableName,
        Key: { id }
      };

      // En un entorno real, aquí iría el comando DeleteCommand
      // const result = await this.dynamoClient.send(new DeleteCommand(params));
      // return !!result.Attributes;

      return true;
    }
  }

  /**
   * Cierra las conexiones a las bases de datos.
   */
  async closeConnections(): Promise<void> {
    await this.mongoClient.close();
    // DynamoDB no requiere cerrar conexión explícitamente
  }
}

// Helper para generar UUIDs (necesario para DynamoDB)
function uuidv4(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

// === ARCHIVO: src/main.tsx ===
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

// === ARCHIVO: src/App.tsx ===
import React, { useState, useEffect, useCallback } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { Cliente, CreateClienteDTO, UpdateClienteDTO } from './core/models/cliente.model';
import { SqlService } from './core/services/sql.service';
import { NosqlService } from './core/services/nosql.service';
import ClienteList from './features/clientes/components/ClienteList';
import ClienteForm from './features/clientes/components/ClienteForm';

type DatabaseType = 'sql' | 'nosql';

interface AppState {
  clientes: Cliente[];
  loading: boolean;
  error: string | null;
  databaseType: DatabaseType;
}

const initialState: AppState = {
  clientes: [],
  loading: false,
  error: null,
  databaseType: 'sql'
};

const App: React.FC = () => {
  const [state, setState] = useState<AppState>(initialState);
  const navigate = useNavigate();
  
  const sqlService = new SqlService();
  const nosqlService = new NosqlService();

  const getActiveService = useCallback((): { service: SqlService | NosqlService; type: DatabaseType } => {
    return state.databaseType === 'sql' 
      ? { service: sqlService, type: 'sql' } 
      : { service: nosqlService, type: 'nosql' };
  }, [state.databaseType, sqlService, nosqlService]);

  const loadClientes = useCallback(async (): Promise<void> => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const { service, type } = getActiveService();
      let clientesData: Cliente[];
      
      if (type === 'sql') {
        clientesData = await (service as SqlService).getAllClientes();
      } else {
        clientesData = await (service as NosqlService).getAllClientes();
      }
      
      setState(prev => ({
        ...prev,
        clientes: clientesData,
        loading: false
      }));
      
      console.log(`Clientes cargados desde ${type.toUpperCase()}:`, clientesData.length);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido al cargar clientes';
      console.error('Error cargando clientes:', errorMessage);
      setState(prev => ({
        ...prev,
        loading: false,
        error: errorMessage
      }));
    }
  }, [getActiveService]);

  useEffect(() => {
    loadClientes();
  }, [loadClientes]);

  const handleCreateCliente = async (clienteData: CreateClienteDTO): Promise<boolean> => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const { service, type } = getActiveService();
      let nuevoCliente: Cliente | null;
      
      if (type === 'sql') {
        nuevoCliente = await (service as SqlService).createCliente(clienteData);
      } else {
        nuevoCliente = await (service as NosqlService).createCliente(clienteData);
      }
      
      if (nuevoCliente) {
        setState(prev => ({
          ...prev,
          clientes: [...prev.clientes, nuevoCliente as Cliente],
          loading: false
        }));
        console.log('Cliente creado exitosamente:', nuevoCliente.id);
        return true;
      }
      
      setState(prev => ({ ...prev, loading: false, error: 'No se pudo crear el cliente' }));
      return false;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error al crear cliente';
      console.error('Error creando cliente:', errorMessage);
      setState(prev => ({ ...prev, loading: false, error: errorMessage }));
      return false;
    }
  };

  const handleUpdateCliente = async (clienteData: UpdateClienteDTO): Promise<boolean> => {
    if (!clienteData.id) {
      setState(prev => ({ ...prev, error: 'ID de cliente requerido para actualizar' }));
      return false;
    }
    
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const { service, type } = getActiveService();
      let clienteActualizado: Cliente | null;
      
      if (type === 'sql') {
        clienteActualizado = await (service as SqlService).updateCliente(clienteData);
      } else {
        clienteActualizado = await (service as NosqlService).updateCliente(clienteData);
      }
      
      if (clienteActualizado) {
        setState(prev => ({
          ...prev,
          clientes: prev.clientes.map(c => c.id === clienteActualizado!.id ? clienteActualizado as Cliente : c),
          loading: false
        }));
        console.log('Cliente actualizado:', clienteActualizado.id);
        return true;
      }
      
      setState(prev => ({ ...prev, loading: false, error: 'Cliente no encontrado para actualizar' }));
      return false;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error al actualizar cliente';
      console.error('Error actualizando cliente:', errorMessage);
      setState(prev => ({ ...prev, loading: false, error: errorMessage }));
      return false;
    }
  };

  const handleDeleteCliente = async (id: string): Promise<boolean> => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const { service, type } = getActiveService();
      let eliminado: boolean;
      
      if (type === 'sql') {
        eliminado = await (service as SqlService).deleteCliente(id);
      } else {
        eliminado = await (service as NosqlService).deleteCliente(id);
      }
      
      if (eliminado) {
        setState(prev => ({
          ...prev,
          clientes: prev.clientes.filter(c => c.id !== id),
          loading: false
        }));
        console.log('Cliente eliminado:', id);
        return true;
      }
      
      setState(prev => ({ ...prev, loading: false, error: 'No se pudo eliminar el cliente' }));
      return false;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error al eliminar cliente';
      console.error('Error eliminando cliente:', errorMessage);
      setState(prev => ({ ...prev, loading: false, error: errorMessage }));
      return false;
    }
  };

  const handleDatabaseSwitch = (newType: DatabaseType): void => {
    setState(prev => ({ ...prev, databaseType: newType, clientes: [], loading: true, error: null }));
    console.log(`Cambiando a base de datos: ${newType.toUpperCase()}`);
  };

  const handleEditCliente = (cliente: Cliente): void => {
    navigate(`/editar/${cliente.id}`, { state: { cliente } });
  };

  const handleClearError = (): void => {
    setState(prev => ({ ...prev, error: null }));
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#f5f5f5',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <header style={{
        backgroundColor: '#1976d2',
        color: 'white',
        padding: '1rem 2rem',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{ margin: 0, fontSize: '1.5rem' }}>
          PragmaFintech - Gestión de Clientes
        </h1>
        <nav style={{ marginTop: '0.5rem', display: 'flex', gap: '1rem' }}>
          <button
            onClick={() => navigate('/')}
            style={{
              background: state.databaseType === 'sql' ? 'rgba(255,255,255,0.2)' : 'transparent',
              border: '1px solid rgba(255,255,255,0.5)',
              color: 'white',
              padding: '0.5rem 1rem',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Lista de Clientes
          </button>
          <button
            onClick={() => navigate('/crear')}
            style={{
              background: 'transparent',
              border: '1px solid rgba(255,255,255,0.5)',
              color: 'white',
              padding: '0.5rem 1rem',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Nuevo Cliente
          </button>
        </nav>
      </header>

      <main style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ 
          marginBottom: '1rem', 
          padding: '1rem', 
          backgroundColor: 'white', 
          borderRadius: '8px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <label style={{ marginRight: '0.5rem', fontWeight: 500 }}>
              Base de datos activa:
            </label>
            <select
              value={state.databaseType}
              onChange={(e) => handleDatabaseSwitch(e.target.value as DatabaseType)}
              style={{
                padding: '0.5rem',
                borderRadius: '4px',
                border: '1px solid #ccc',
                fontSize: '1rem'
              }}
            >
              <option value="sql">SQL (MySQL/PostgreSQL)</option>
              <option value="nosql">NoSQL (MongoDB/DynamoDB)</option>
            </select>
          </div>
          <div>
            <span style={{ color: '#666' }}>
              Total clientes: {state.clientes.length}
            </span>
          </div>
        </div>

        {state.error && (
          <div style={{
            marginBottom: '1rem',
            padding: '1rem',
            backgroundColor: '#ffebee',
            border: '1px solid #ef5350',
            borderRadius: '4px',
            color: '#c62828',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <span>{state.error}</span>
            <button
              onClick={handleClearError}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#c62828',
                cursor: 'pointer',
                fontSize: '1.25rem'
              }}
            >
              ×
            </button>
          </div>
        )}

        <Routes>
          <Route
            path="/"
            element={
              <ClienteList
                clientes={state.clientes}
                loading={state.loading}
                onEdit={handleEditCliente}
                onDelete={handleDeleteCliente}
              />
            }
          />
          <Route
            path="/crear"
            element={
              <ClienteForm
                onSubmit={handleCreateCliente}
                onCancel={() => navigate('/')}
              />
            }
          />
          <Route
            path="/editar/:id"
            element={
              <ClienteForm
                onSubmit={handleUpdateCliente}
                onCancel={() => navigate('/')}
              />
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <footer style={{
        textAlign: 'center',
        padding: '1rem',
        color: '#666',
        borderTop: '1px solid #e0e0e0',
        marginTop: '2rem'
      }}>
        <p style={{ margin: 0 }}>
          PragmaFintech - Sistema de Gestión de Clientes v0.1.0
        </p>
      </footer>
    </div>
  );
};

export default App;

// === ARCHIVO: src/index.html ===
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="PragmaFintech - Sistema de gestión de clientes con operaciones CRUD en bases de datos SQL y NoSQL" />
  <meta name="theme-color" content="#1976d2" />
  <title>PragmaFintech - Gestión de Clientes</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      background-color: #f5f5f5;
    }
    
    #root {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }
    
    .loading-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      gap: 1rem;
    }
    
    .loading-spinner {
      width: 48px;
      height: 48px;
      border: 4px solid #e0e0e0;
      border-top-color: #1976d2;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }
    
    .loading-text {
      color: #666;
      font-size: 1rem;
    }
    
    .error-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      padding: 2rem;
      text-align: center;
    }
    
    .error-title {
      color: #d32f2f;
      font-size: 1.5rem;
      margin-bottom: 1rem;
    }
    
    .error-message {
      color: #666;
      max-width: 500px;
    }
  </style>
</head>
<body>
  <div id="root">
    <div class="loading-container">
      <div class="loading-spinner"></div>
      <p class="loading-text">Cargando PragmaFintech...</p>
    </div>
  </div>
  <noscript>
    <div class="error-container">
      <h1 class="error-title">JavaScript requerido</h1>
      <p class="error-message">
        Esta aplicación requiere JavaScript para funcionar. 
        Por favor, habilita JavaScript en tu navegador para continuar.
      </p>
    </div>
  </noscript>
  <script type="module" src="/src/main.tsx"></script>
</body>
</html>

// === ARCHIVO: src/core/config/db.config.ts ===
import { MongoClient } from 'mongodb';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';

interface DatabaseConfig {
  sql: {
    host: string;
    port: number;
    database: string;
    user: string;
    password: string;
    maxConnections: number;
    connectionTimeout: number;
  };
  nosql: {
    mongo: {
      uri: string;
      databaseName: string;
      options: {
        maxPoolSize: number;
        minPoolSize: number;
        connectTimeoutMS: number;
        socketTimeoutMS: number;
        serverSelectionTimeoutMS: number;
      };
    };
    dynamodb: {
      region: string;
      endpoint: string;
      tableName: string;
      options: {
        maxAttempts: number;
        tls: boolean;
        computeChecksums: boolean;
      };
    };
  };
}

const getDatabaseConfig = (): DatabaseConfig => {
  const env = import.meta.env;

  return {
    sql: {
      host: env.VITE_SQL_HOST || 'localhost',
      port: parseInt(env.VITE_SQL_PORT || '5432', 10),
      database: env.VITE_SQL_DATABASE || 'pragmafintech_clientes',
      user: env.VITE_SQL_USER || 'postgres',
      password: env.VITE_SQL_PASSWORD || 'postgres',
      maxConnections: parseInt(env.VITE_SQL_MAX_CONNECTIONS || '10', 10),
      connectionTimeout: parseInt(env.VITE_SQL_CONNECTION_TIMEOUT || '5000', 10),
    },
    nosql: {
      mongo: {
        uri: env.VITE_MONGO_URI || 'mongodb://localhost:27017',
        databaseName: env.VITE_MONGO_DATABASE || 'pragmafintech_clientes',
        options: {
          maxPoolSize: parseInt(env.VITE_MONGO_MAX_POOL_SIZE || '10', 10),
          minPoolSize: parseInt(env.VITE_MONGO_MIN_POOL_SIZE || '2', 10),
          connectTimeoutMS: parseInt(env.VITE_MONGO_CONNECT_TIMEOUT || '10000', 10),
          socketTimeoutMS: parseInt(env.VITE_MONGO_SOCKET_TIMEOUT || '45000', 10),
          serverSelectionTimeoutMS: parseInt(env.VITE_MONGO_SERVER_SELECTION_TIMEOUT || '5000', 10),
        },
      },
      dynamodb: {
        region: env.VITE_DYNAMODB_REGION || 'us-east-1',
        endpoint: env.VITE_DYNAMODB_ENDPOINT || 'http://localhost:8000',
        tableName: env.VITE_DYNAMODB_TABLE_NAME || 'Clientes',
        options: {
          maxAttempts: parseInt(env.VITE_DYNAMODB_MAX_ATTEMPTS || '3', 10),
          tls: env.VITE_DYNAMODB_TLS !== 'false',
          computeChecksums: env.VITE_DYNAMODB_COMPUTE_CHECKSUMS !== 'false',
        },
      },
    },
  };
};

const config = getDatabaseConfig();

export const createMongoClient = (): MongoClient => {
  const { uri, options } = config.nosql.mongo;
  return new MongoClient(uri, {
    maxPoolSize: options.maxPoolSize,
    minPoolSize: options.minPoolSize,
    connectTimeoutMS: options.connectTimeoutMS,
    socketTimeoutMS: options.socketTimeoutMS,
    serverSelectionTimeoutMS: options.serverSelectionTimeoutMS,
  });
};

export const createDynamoDBClient = (): DynamoDBClient => {
  const { region, endpoint, options } = config.nosql.dynamodb;
  return new DynamoDBClient({
    region,
    endpoint,
    maxAttempts: options.maxAttempts,
    tls: options.tls,
    computeChecksums: options.computeChecksums,
  });
};

export const createDynamoDBDocumentClient = (
  dynamoClient: DynamoDBClient
): DynamoDBDocumentClient => {
  return DynamoDBDocumentClient.from(dynamoClient, {
    marshallOptions: {
      removeUndefinedValues: true,
      convertClassInstanceToMap: true,
    },
    unmarshallOptions: {
      wrapNumbers: false,
    },
  });
};

export const getSqlConfig = () => config.sql;

export const getMongoConfig = () => config.nosql.mongo;

export const getDynamoDBConfig = () => config.nosql.dynamodb;

export const getDatabaseType = (): 'mongodb' | 'dynamodb' => {
  const env = import.meta.env;
  const dbType = env.VITE_NOSQL_DATABASE_TYPE || 'mongodb';
  if (dbType !== 'mongodb' && dbType !== 'dynamodb') {
    console.warn(` Tipo de base de datos NoSQL no válido: ${dbType}. Usando MongoDB por defecto.`);
    return 'mongodb';
  }
  return dbType;
};

export const validateDatabaseConfig = (): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];
  const sqlConfig = config.sql;

  if (!sqlConfig.host) errors.push('Falta configurar VITE_SQL_HOST');
  if (!sqlConfig.database) errors.push('Falta configurar VITE_SQL_DATABASE');
  if (!sqlConfig.user) errors.push('Falta configurar VITE_SQL_USER');
  if (!sqlConfig.password) errors.push('Falta configurar VITE_SQL_PASSWORD');

  const nosqlConfig = config.nosql;
  const dbType = getDatabaseType();

  if (dbType === 'mongodb') {
    if (!nosqlConfig.mongo.uri) errors.push('Falta configurar VITE_MONGO_URI');
    if (!nosqlConfig.mongo.databaseName) errors.push('Falta configurar VITE_MONGO_DATABASE');
  } else if (dbType === 'dynamodb') {
    if (!nosqlConfig.dynamodb.region) errors.push('Falta configurar VITE_DYNAMODB_REGION');
    if (!nosqlConfig.dynamodb.tableName) errors.push('Falta configurar VITE_DYNAMODB_TABLE_NAME');
  }

  return { valid: errors.length === 0, errors };
};

export default config;

// === ARCHIVO: src/features/clientes/components/ClienteForm.tsx ===
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

// === ARCHIVO: src/features/clientes/components/ClienteList.tsx ===
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

// === ARCHIVO: src/features/clientes/hooks/useClientes.ts ===
import { useState, useEffect, useCallback } from 'react';
import { Cliente, CreateClienteDTO, UpdateClienteDTO } from '@core/models/cliente.model';
import { SqlService } from '@core/services/sql.service';
import { NosqlService } from '@core/services/nosql.service';

interface UseClientesOptions {
  autoLoad?: boolean;
  syncDatabases?: boolean;
}

interface ClienteState {
  clientes: Cliente[];
  isLoading: boolean;
  error: string | null;
}

interface UseClientesReturn extends ClienteState {
  createCliente: (data: CreateClienteDTO) => Promise<Cliente | null>;
  updateCliente: (data: UpdateClienteDTO) => Promise<Cliente | null>;
  deleteCliente: (id: string) => Promise<boolean>;
  getClienteById: (id: string) => Promise<Cliente | null>;
  refreshClientes: () => Promise<void>;
  clearError: () => void;
}

export function useClientes(options: UseClientesOptions = {}): UseClientesReturn {
  const { autoLoad = true, syncDatabases = true } = options;
  
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sqlService = new SqlService();
  const nosqlService = new NosqlService();

  const loadClientes = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const [clientesSQL, clientesNoSQL] = await Promise.all([
        sqlService.getAllClientes(),
        nosqlService.getAllClientes()
      ]);

      const merged = mergeClientesById(clientesSQL, clientesNoSQL);
      setClientes(merged);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
      setError(`Error al cargar clientes: ${errorMessage}`);
      console.error('Error loading clientes:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  function mergeClientesById(sql: Cliente[], nosql: Cliente[]): Cliente[] {
    const mergedMap = new Map<string, Cliente>();
    
    sql.forEach(cliente => {
      mergedMap.set(cliente.id, cliente);
    });
    
    nosql.forEach(cliente => {
      if (!mergedMap.has(cliente.id)) {
        mergedMap.set(cliente.id, cliente);
      }
    });
    
    return Array.from(mergedMap.values());
  }

  useEffect(() => {
    if (autoLoad) {
      loadClientes();
    }
  }, [autoLoad, loadClientes]);

  const createCliente = useCallback(async (data: CreateClienteDTO): Promise<Cliente | null> => {
    setIsLoading(true);
    setError(null);

    try {
      validateClienteData(data);

      if (syncDatabases) {
        const [sqlResult, nosqlResult] = await Promise.all([
          sqlService.createCliente(data),
          nosqlService.createCliente(data)
        ]);

        const newCliente: Cliente = {
          ...data,
          id: sqlResult.id,
          fechaRegistro: sqlResult.fechaRegistro
        };

        setClientes(prev => [...prev, newCliente]);
        return newCliente;
      } else {
        const sqlResult = await sqlService.createCliente(data);
        const newCliente: Cliente = {
          ...data,
          id: sqlResult.id,
          fechaRegistro: sqlResult.fechaRegistro
        };
        setClientes(prev => [...prev, newCliente]);
        return newCliente;
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al crear cliente';
      setError(errorMessage);
      console.error('Error creating cliente:', err);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [syncDatabases]);

  const updateCliente = useCallback(async (data: UpdateClienteDTO): Promise<Cliente | null> => {
    if (!data.id) {
      setError('ID de cliente es requerido para actualizar');
      return null;
    }

    setIsLoading(true);
    setError(null);

    try {
      validateClienteData(data as CreateClienteDTO);

      let updatedCliente: Cliente | null = null;

      if (syncDatabases) {
        const [sqlResult, nosqlResult] = await Promise.all([
          sqlService.updateCliente(data),
          nosqlService.updateCliente(data)
        ]);

        updatedCliente = sqlResult || nosqlResult;
      } else {
        updatedCliente = await sqlService.updateCliente(data);
      }

      if (updatedCliente) {
        setClientes(prev =>
          prev.map(c => c.id === updatedCliente!.id ? updatedCliente! : c)
        );
      }

      return updatedCliente;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al actualizar cliente';
      setError(errorMessage);
      console.error('Error updating cliente:', err);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [syncDatabases]);

  const deleteCliente = useCallback(async (id: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      if (syncDatabases) {
        await Promise.all([
          sqlService.deleteCliente(id),
          nosqlService.deleteCliente(id)
        ]);
      } else {
        await sqlService.deleteCliente(id);
      }

      setClientes(prev => prev.filter(c => c.id !== id));
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al eliminar cliente';
      setError(errorMessage);
      console.error('Error deleting cliente:', err);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [syncDatabases]);

  const getClienteById = useCallback(async (id: string): Promise<Cliente | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const [sqlCliente, nosqlCliente] = await Promise.all([
        sqlService.getClienteById(id),
        nosqlService.getClienteById(id)
      ]);

      return sqlCliente || nosqlCliente;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al obtener cliente';
      setError(errorMessage);
      console.error('Error getting cliente by id:', err);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const refreshClientes = useCallback(async () => {
    await loadClientes();
  }, [loadClientes]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  function validateClienteData(data: CreateClienteDTO): void {
    if (!data.nombre || data.nombre.trim().length === 0) {
      throw new Error('El nombre es requerido');
    }

    if (!data.email || data.email.trim().length === 0) {
      throw new Error('El email es requerido');
    }

    if (!data.email.includes('@')) {
      throw new Error('El email debe tener un formato válido');
    }

    if (!data.numeroDocumento || data.numeroDocumento.trim().length === 0) {
      throw new Error('El número de documento es requerido');
    }

    const validTiposDocumento = ['CC', 'CE', 'NIT', 'PASAPORTE'];
    if (data.tipoDocumento && !validTiposDocumento.includes(data.tipoDocumento)) {
      throw new Error('Tipo de documento inválido');
    }

    const validEstados = ['activo', 'inactivo', 'suspendido'];
    if (data.estado && !validEstados.includes(data.estado)) {
      throw new Error('Estado inválido');
    }
  }

  return {
    clientes,
    isLoading,
    error,
    createCliente,
    updateCliente,
    deleteCliente,
    getClienteById,
    refreshClientes,
    clearError
  };
}

export default useClientes;

// === ARCHIVO: src/features/clientes/services/cliente.service.ts ===
import { Cliente, ClienteSQL, ClienteNoSQL, CreateClienteDTO, UpdateClienteDTO } from '@core/models/cliente.model';
import { SqlService } from '@core/services/sql.service';
import { NosqlService } from '@core/services/nosql.service';

export interface ClienteServiceConfig {
  preferNoSQL: boolean;
  syncBothDatabases: boolean;
}

export class ClienteService {
  private sqlService: SqlService;
  private nosqlService: NosqlService;
  private config: ClienteServiceConfig;

  constructor(config: ClienteServiceConfig = { preferNoSQL: false, syncBothDatabases: false }) {
    this.sqlService = new SqlService();
    this.nosqlService = new NosqlService();
    this.config = config;
  }

  private async syncToBothDatabases(clienteData: CreateClienteDTO): Promise<{ sql: ClienteSQL | null; nosql: ClienteNoSQL | null }> {
    const results = { sql: null as ClienteSQL | null, nosql: null as ClienteNoSQL | null };
    
    try {
      results.sql = await this.sqlService.createCliente(clienteData);
    } catch (error) {
      console.error('Error syncing to SQL:', error);
    }

    try {
      results.nosql = await this.nosqlService.createCliente(clienteData);
    } catch (error) {
      console.error('Error syncing to NoSQL:', error);
    }

    return results;
  }

  async createCliente(clienteData: CreateClienteDTO): Promise<{ sql?: ClienteSQL; nosql?: ClienteNoSQL }> {
    if (this.config.syncBothDatabases) {
      const results = await this.syncToBothDatabases(clienteData);
      return { sql: results.sql ?? undefined, nosql: results.nosql ?? undefined };
    }

    if (this.config.preferNoSQL) {
      try {
        const nosqlResult = await this.nosqlService.createCliente(clienteData);
        return { nosql: nosqlResult };
      } catch (error) {
        console.error('NoSQL creation failed, falling back to SQL:', error);
        const sqlResult = await this.sqlService.createCliente(clienteData);
        return { sql: sqlResult };
      }
    }

    try {
      const sqlResult = await this.sqlService.createCliente(clienteData);
      return { sql: sqlResult };
    } catch (error) {
      console.error('SQL creation failed, falling back to NoSQL:', error);
      const nosqlResult = await this.nosqlService.createCliente(clienteData);
      return { nosql: nosqlResult };
    }
  }

  async getClienteById(id: string): Promise<Cliente | null> {
    if (this.config.preferNoSQL) {
      try {
        const nosqlResult = await this.nosqlService.getClienteById(id);
        if (nosqlResult) return nosqlResult;
      } catch (error) {
        console.error('NoSQL query failed:', error);
      }
      return this.sqlService.getClienteById(id);
    }

    try {
      const sqlResult = await this.sqlService.getClienteById(id);
      if (sqlResult) return sqlResult;
    } catch (error) {
      console.error('SQL query failed:', error);
    }
    return this.nosqlService.getClienteById(id);
  }

  async getAllClientes(): Promise<Cliente[]> {
    if (this.config.preferNoSQL) {
      try {
        const nosqlResults = await this.nosqlService.getAllClientes();
        if (nosqlResults.length > 0) return nosqlResults;
      } catch (error) {
        console.error('NoSQL query failed:', error);
      }
      return this.sqlService.getAllClientes();
    }

    try {
      const sqlResults = await this.sqlService.getAllClientes();
      if (sqlResults.length > 0) return sqlResults;
    } catch (error) {
      console.error('SQL query failed:', error);
    }
    return this.nosqlService.getAllClientes();
  }

  async updateCliente(id: string, clienteData: UpdateClienteDTO): Promise<Cliente | null> {
    if (this.config.preferNoSQL) {
      try {
        const nosqlResult = await this.nosqlService.updateCliente({ ...clienteData, id });
        if (nosqlResult) return nosqlResult;
      } catch (error) {
        console.error('NoSQL update failed:', error);
      }
      return this.sqlService.updateCliente({ ...clienteData, id });
    }

    try {
      const sqlResult = await this.sqlService.updateCliente({ ...clienteData, id });
      if (sqlResult) return sqlResult;
    } catch (error) {
      console.error('SQL update failed:', error);
    }
    return this.nosqlService.updateCliente({ ...clienteData, id });
  }

  async deleteCliente(id: string): Promise<boolean> {
    let success = false;

    if (this.config.syncBothDatabases) {
      try {
        const sqlDeleted = await this.sqlService.deleteCliente(id);
        const nosqlDeleted = await this.nosqlService.deleteCliente(id);
        return sqlDeleted || nosqlDeleted;
      } catch (error) {
        console.error('Error deleting from both databases:', error);
        return false;
      }
    }

    if (this.config.preferNoSQL) {
      try {
        success = await this.nosqlService.deleteCliente(id);
        if (!success) {
          success = await this.sqlService.deleteCliente(id);
        }
      } catch (error) {
        console.error('NoSQL delete failed:', error);
        success = await this.sqlService.deleteCliente(id);
      }
    } else {
      try {
        success = await this.sqlService.deleteCliente(id);
        if (!success) {
          success = await this.nosqlService.deleteCliente(id);
        }
      } catch (error) {
        console.error('SQL delete failed:', error);
        success = await this.nosqlService.deleteCliente(id);
      }
    }

    return success;
  }

  async closeConnections(): Promise<void> {
    await this.nosqlService.closeConnections();
  }

  setConfig(config: Partial<ClienteServiceConfig>): void {
    this.config = { ...this.config, ...config };
  }

  getConfig(): ClienteServiceConfig {
    return { ...this.config };
  }
}

export const clienteService = new ClienteService();

// === ARCHIVO: src/shared/components/ErrorBoundary.tsx ===
import React, { Component, ReactNode, ErrorInfo } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  resetKeys?: unknown[];
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return {
      hasError: true,
      error
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.setState({
      error,
      errorInfo
    });

    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  componentDidUpdate(prevProps: ErrorBoundaryProps): void {
    if (this.state.hasError && this.props.resetKeys) {
      const hasResetKeyChanged = this.props.resetKeys.some(
        (key, index) => key !== prevProps.resetKeys?.[index]
      );
      
      if (hasResetKeyChanged) {
        this.reset();
      }
    }
  }

  reset = (): void => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div style={{
          padding: '2rem',
          margin: '1rem',
          border: '2px solid #dc3545',
          borderRadius: '8px',
          backgroundColor: '#fff5f5',
          fontFamily: 'system-ui, -apple-system, sans-serif'
        }}>
          <h2 style={{ color: '#dc3545', marginTop: 0 }}>Algo salió mal</h2>
          <p style={{ color: '#6c757d' }}>
            Ha ocurrido un error inesperado en la aplicación.
          </p>
          {this.state.error && (
            <details style={{ 
              marginTop: '1rem', 
              padding: '1rem', 
              backgroundColor: '#f8f9fa',
              borderRadius: '4px',
              overflow: 'auto'
            }}>
              <summary style={{ cursor: 'pointer', fontWeight: 600 }}>
                Detalles del error
              </summary>
              <pre style={{ 
                marginTop: '0.5rem', 
                fontSize: '0.875rem',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word'
              }}>
                {this.state.error.toString()}
                {this.state.errorInfo?.componentStack}
              </pre>
            </details>
          )}
          <button
            onClick={this.reset}
            style={{
              marginTop: '1rem',
              padding: '0.5rem 1rem',
              backgroundColor: '#0d6efd',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '1rem'
            }}
          >
            Reintentar
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export class AsyncErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return {
      hasError: true,
      error
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.setState({ error, errorInfo });
    
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  reset = (): void => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div style={{ padding: '2rem', textAlign: 'center' }}>
          <h3>Error de carga</h3>
          <p>No se pudieron cargar los datos requeridos.</p>
          <button onClick={this.reset}>Reintentar</button>
        </div>
      );
    }

    return this.props.children;
  }
}

// === ARCHIVO: src/shared/utils/validation.ts ===
export interface ValidationRule<T = unknown> {
  validate: (value: T) => boolean;
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const phoneRegex = /^\+?[1-9]\d{1,14}$/;
export const documentRegex = /^\d{6,12}$/;

export function validateEmail(email: string): boolean {
  if (!email || typeof email !== 'string') return false;
  return emailRegex.test(email.trim());
}

export function validatePhone(phone: string): boolean {
  if (!phone || typeof phone !== 'string') return false;
  return phoneRegex.test(phone.replace(/[\s()-]/g, ''));
}

export function validateDocument(document: string): boolean {
  if (!document || typeof document !== 'string') return false;
  return documentRegex.test(document.replace(/\D/g, ''));
}

export function validateRequired(value: unknown): boolean {
  if (value === null || value === undefined) return false;
  if (typeof value === 'string') return value.trim().length > 0;
  if (Array.isArray(value)) return value.length > 0;
  return true;
}

export function validateMinLength(min: number): ValidationRule<string> {
  return {
    validate: (value: string) => typeof value === 'string' && value.length >= min,
    message: `El campo debe tener al menos ${min} caracteres`
  };
}

export function validateMaxLength(max: number): ValidationRule<string> {
  return {
    validate: (value: string) => typeof value === 'string' && value.length <= max,
    message: `El campo debe tener como máximo ${max} caracteres`
  };
}

export function validateRange(min: number, max: number): ValidationRule<number> {
  return {
    validate: (value: number) => typeof value === 'number' && value >= min && value <= max,
    message: `El valor debe estar entre ${min} y ${max}`
  };
}

export function validatePattern(pattern: RegExp, message: string): ValidationRule<string> {
  return {
    validate: (value: string) => typeof value === 'string' && pattern.test(value),
    message
  };
}

export function validateEmailField(value: string): ValidationResult {
  const errors: string[] = [];
  
  if (!validateRequired(value)) {
    errors.push('El correo electrónico es requerido');
  } else if (!validateEmail(value)) {
    errors.push('El formato del correo electrónico no es válido');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

export function validatePhoneField(value: string): ValidationResult {
  const errors: string[] = [];
  
  if (!validateRequired(value)) {
    errors.push('El teléfono es requerido');
  } else if (!validatePhone(value)) {
    errors.push('El formato del teléfono no es válido');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

export function validateDocumentField(value: string): ValidationResult {
  const errors: string[] = [];
  
  if (!validateRequired(value)) {
    errors.push('El documento es requerido');
  } else if (!validateDocument(value)) {
    errors.push('El documento debe tener entre 6 y 12 dígitos');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

export function validateField<T>(value: T, rules: ValidationRule<T>[]): ValidationResult {
  const errors: string[] = [];

  for (const rule of rules) {
    if (!rule.validate(value)) {
      errors.push(rule.message);
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

export function validateForm<T extends Record<string, unknown>>(
  formData: T,
  validationRules: Partial<Record<keyof T, ValidationRule<unknown>[]>>
): ValidationResult {
  const errors: string[] = [];

  for (const [fieldName, rules] of Object.entries(validationRules)) {
    if (rules && Array.isArray(rules)) {
      const fieldValue = formData[fieldName as keyof T];
      const fieldResult = validateField(fieldValue, rules as ValidationRule<unknown>[]);
      
      if (!fieldResult.isValid) {
        errors.push(...fieldResult.errors.map(err => `${fieldName}: ${err}`));
      }
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

export function sanitizeString(value: string): string {
  if (typeof value !== 'string') return '';
  return value.trim().replace(/[<>]/g, '');
}

export function sanitizeNumber(value: unknown): number | null {
  if (value === null || value === undefined) return null;
  const num = Number(value);
  return isNaN(num) ? null : num;
}

export function validateDateRange(startDate: Date, endDate: Date): boolean {
  return startDate <= endDate;
}

export function validateAge(birthDate: Date, minAge: number = 18): boolean {
  const today = new Date();
  const age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    return age - 1 >= minAge;
  }
  
  return age >= minAge;
}

export class FormValidator<T extends Record<string, unknown>> {
  private rules: Partial<Record<keyof T, ValidationRule<unknown>[]>> = {};
  private errors: Record<string, string[]> = {};

  setRules(rules: Partial<Record<keyof T, ValidationRule<unknown>[]>>): void {
    this.rules = rules;
  }

  validate(formData: T): boolean {
    this.errors = {};
    let isValid = true;

    for (const [fieldName, fieldRules] of Object.entries(this.rules)) {
      if (fieldRules && Array.isArray(fieldRules)) {
        const fieldValue = formData[fieldName as keyof T];
        const result = validateField(fieldValue, fieldRules as ValidationRule<unknown>[]);
        
        if (!result.isValid) {
          this.errors[fieldName] = result.errors;
          isValid = false;
        }
      }
    }

    return isValid;
  }

  getErrors(): Record<string, string[]> {
    return { ...this.errors };
  }

  getFieldError(fieldName: string): string | undefined {
    return this.errors[fieldName]?.[0];
  }

  clearErrors(): void {
    this.errors = {};
  }
}
```
