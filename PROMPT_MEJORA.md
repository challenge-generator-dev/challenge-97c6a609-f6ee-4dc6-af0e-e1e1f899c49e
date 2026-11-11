# Prompt para Mejorar el Codigo Base

Copia y pega el contenido del bloque de abajo en un asistente de IA (Claude, ChatGPT)
para obtener el proyecto completo y arrancable. Guarda los archivos que te devuelva en la
carpeta del repo, respetando exactamente las rutas.

Si preferis trabajar en tu editor con un agente local (Claude Code, Cursor, Copilot), usa `AGENTS.md` en vez de este archivo: dice lo mismo pero para que escriba los archivos en disco.

## Las dos reglas que no se negocian

1. **Completa el boilerplate.** Todo lo que el proyecto necesita para compilar y arrancar: manifiesto de dependencias, punto de entrada, configuracion, capa de interfaz, y las capas del patron arquitectonico declarado. Eso es andamiaje y es tu trabajo.
2. **NO resuelvas el reto.** Los entregables de las fases son el trabajo de la persona. El hueco pedagogico se deja como esta: el proyecto arranca, pero lo que el reto pide implementar NO esta implementado.

Dicho de otra forma: si algo impide compilar, arreglalo. Si algo es logica de negocio incompleta, validaciones ausentes, un secreto hardcodeado o un patron mejorable, dejalo exactamente como esta — es lo que la persona tiene que encontrar.

## Mapa de componentes

El repo tiene una carpeta por componente. Cada uno se instala y verifica dentro de la suya.

| Componente | Carpeta | Rol | Capa | Track | Tecnologias |
|---|---|---|---|---|---|
| `api` | `api/` | practice | server | Node | DynamoDB, MongoDB |
| `client` | `client/` | chapter, support | client | React | - |
| `infra-local` | (raiz) | support | infra | Compose local | DynamoDB, MongoDB |

## Orden de arranque

1. `docker compose up -d` (en la raiz) — levanta la infraestructura local.
2. `cd api && npm install --no-audit --no-fund && npm run build` — componente `api` (practice).
3. `cd client && npm install --no-audit --no-fund && npm run build` — componente `client` (chapter, support).

### Contratos entre componentes

- `api` expone http (api: http://localhost:3000):
  - `POST /products`
  - `GET /products/:id`
  - `PUT /products/:id`
  - `DELETE /products/:id`
  - `GET /products`

## Herramientas

- **IntelliJ IDEA Debugger**: Depura el componente con la run-config de IntelliJ IDEA (menu Run, carpeta .run/): pone breakpoints donde implementas el reto y arranca en modo debug.

## Lo que le falta a este proyecto

Esto NO lo tenes que adivinar: salio de comparar el proyecto contra la arquitectura declarada del reto y de un analisis estatico del codigo. Completalo TODO.

### Archivos que la arquitectura del reto declara y no estan

Creálos con implementacion real, en la capa que les corresponde:

- `api/src/infrastructure/repositories/sql/product-sql.repository.ts`
- `api/src/main.ts`
- `api/src/app.module.ts`

## Como saber que terminaste

```bash
(cd api && npm install --no-audit --no-fund && npm run build) && (cd client && npm install --no-audit --no-fund && npm run build) && docker compose config -q
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
- Título: Implementación de Operaciones CRUD en Bases de Datos
- Tiempo estimado: 8 horas

### Fases (trabajo del HUMANO — PROHIBIDO completarlas)
No implementes estos entregables. Dejalos como hueco pedagógico. El asistente solo materializa el proyecto arrancable para que el participante pueda trabajar.
- Fase 1: Configuración y Creación de Esquemas — objetivo: Configurar las bases de datos SQL y NoSQL y crear los esquemas necesarios para el inventario. — entregable (NO resolver): Bases de datos SQL y NoSQL configuradas con esquemas creados.
- Fase 2: Implementación de Operaciones CRUD en SQL — objetivo: Implementar las operaciones CRUD en la base de datos SQL. — entregable (NO resolver): Operaciones CRUD implementadas en la base de datos SQL.
- Fase 3: Implementación de Operaciones CRUD en NoSQL — objetivo: Implementar las operaciones CRUD en la base de datos NoSQL. — entregable (NO resolver): Operaciones CRUD implementadas en la base de datos NoSQL.

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
- Después seguí al PASO 5 (entrega de archivos).

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
PASO 5 — Entrega de archivos
Entregá cada archivo con su ruta completa, respetando exactamente la estructura de rutas
indicada por los marcadores: un bloque por archivo, precedido por su ruta. No generes ZIPs
ni archivos adjuntos.
La entrega debe incluir:

Archivos de código con únicamente los errores de compilación corregidos
Archivos de configuración y documentación sin cambios
Archivos nuevos creados para resolver dependencias de compilación faltantes
Archivos Excel y Word generados desde descripción

IMPORTANTE: Entregá los archivos completos al finalizar. No preguntes si el usuario
quiere recibirlos. Simplemente entregalos; No debes desplegar en el chat el resumen de lo que arreglaste, solo entregá los archivos.

REGLAS IMPORTANTES

No omitas ningún archivo aunque no tenga errores ni modificaciones
Respeta los nombres y rutas exactas indicadas por los marcadores
Si un archivo no tiene marcador claro, infiere el nombre desde su contenido
Si la cadena contiene solo documentación, placeholders o binarios fake, NO la reproduzcas:
aplicá PASO 0 (materializar el proyecto del briefing). Reproducir la carcasa es un fallo.
No agregues texto después del último archivo entregado
No preguntes si el usuario quiere los archivos: simplemente entregalos siempre
Si detectas que falta un archivo de configuración necesario para compilar
(pom.xml, package.json, requirements.txt, build.gradle, etc.), créalo e inclúyelo
inferiendo su contenido desde los imports y frameworks detectados en el código
Nunca corrijas problemas 🟡 aunque parezcan obvios o fáciles de mejorar.
El participante que recibirá este proyecto los debe encontrar y resolver él mismo.


INPUT
Aquí está la cadena con los archivos:

// === ARCHIVO: api/package.json ===
{
  "name": "reto-nest",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "build": "tsc -p tsconfig.json"
  },
  "dependencies": {
    "@nestjs/common": "10.4.22",
    "@nestjs/config": "4.0.4",
    "@nestjs/core": "10.4.22",
    "@nestjs/mongoose": "11.0.4",
    "@nestjs/platform-express": "10.4.22",
    "@nestjs/swagger": "8.1.1",
    "class-transformer": "0.5.1",
    "class-validator": "0.15.1",
    "mongoose": "9.12.1",
    "pg": "8.23.1",
    "reflect-metadata": "0.2.2",
    "rxjs": "7.8.2"
  },
  "devDependencies": {
    "@types/express": "4.17.25",
    "@types/node": "22.20.5",
    "typescript": "5.7.3"
  }
}

// === ARCHIVO: api/tsconfig.json ===
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "commonjs",
    "moduleResolution": "node",
    "outDir": "dist",
    "strict": true,
    "strictPropertyInitialization": false,
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "resolveJsonModule": true,
    "forceConsistentCasingInFileNames": true,
    "types": [
      "node"
    ]
  },
  "include": [
    "src"
  ],
  "exclude": [
    "node_modules",
    "dist",
    "_pendiente",
    "tests",
    "test",
    "src/**/*.spec.ts",
    "src/**/*.test.ts"
  ]
}

// === ARCHIVO: api/src/domain/entities/product.entity.ts ===
import { IsNumber, IsPositive, IsString, Min } from 'class-validator';

export class ProductEntity {
  id: string;

  @IsString()
  name: string;

  @IsNumber()
  @IsPositive()
  price: number;

  @IsNumber()
  @Min(0)
  stock: number;

  @IsString()
  category: string;

  constructor(id: string, name: string, price: number, stock: number, category: string) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.stock = stock;
    this.category = category;
    this.validateInvariants();
  }

  private validateInvariants(): void {
    if (this.price <= 0) {
      throw new Error('Price must be positive');
    }
    if (this.stock < 0) {
      throw new Error('Stock cannot be negative');
    }
    if (!this.name || this.name.trim().length === 0) {
      throw new Error('Name is required');
    }
    if (!this.category || this.category.trim().length === 0) {
      throw new Error('Category is required');
    }
  }

  updateDetails(updateData: { name?: string; price?: number; stock?: number; category?: string }): void {
    if (updateData.name !== undefined) {
      this.name = updateData.name;
    }
    if (updateData.price !== undefined) {
      this.price = updateData.price;
    }
    if (updateData.stock !== undefined) {
      this.stock = updateData.stock;
    }
    if (updateData.category !== undefined) {
      this.category = updateData.category;
    }
    this.validateInvariants();
  }
}

// === ARCHIVO: api/src/domain/repositories/product.repository.ts ===
import { ProductEntity } from '../entities/product.entity';

export interface ProductRepository {
  create(product: Omit<ProductEntity, 'id'>): Promise<ProductEntity>;
  findById(id: string): Promise<ProductEntity | null>;
  update(id: string, updateData: Partial<Omit<ProductEntity, 'id'>>): Promise<ProductEntity>;
  delete(id: string): Promise<void>;
  list(): Promise<ProductEntity[]>;
}

// === ARCHIVO: api/_pendiente/src/infrastructure/repositories/sql/product-sql.repository.ts ===
import { Injectable } from '@nestjs/common';
import { ProductRepository } from '../../../domain/repositories/product.repository';
import { ProductEntity } from '../../../domain/entities/product.entity';
import pg from 'pg';
import { ConfigService } from '@nestjs/config';

const { Pool } = pg;

@Injectable()
export class ProductSqlRepository implements ProductRepository {
  private pool: pg.Pool;

  constructor(private configService: ConfigService) {
    this.pool = new Pool({
      host: this.configService.get<string>('DB_HOST'),
      port: this.configService.get<number>('DB_PORT'),
      user: this.configService.get<string>('DB_USER'),
      password: this.configService.get<string>('DB_PASSWORD'),
      database: this.configService.get<string>('DB_NAME'),
    });
  }

  async create(product: Omit<ProductEntity, 'id'>): Promise<ProductEntity> {
    const query = `
      INSERT INTO products (name, price, stock, category)
      VALUES ($1, $2, $3, $4)
      RETURNING id, name, price, stock, category
    `;
    const values = [product.name, product.price, product.stock, product.category];
    const result = await this.pool.query(query, values);
    return new ProductEntity(
      result.rows[0].id,
      result.rows[0].name,
      result.rows[0].price,
      result.rows[0].stock,
      result.rows[0].category
    );
  }

  async findById(id: string): Promise<ProductEntity | null> {
    const query = 'SELECT id, name, price, stock, category FROM products WHERE id = $1';
    const result = await this.pool.query(query, [id]);
    if (result.rows.length === 0) {
      return null;
    }
    return new ProductEntity(
      result.rows[0].id,
      result.rows[0].name,
      result.rows[0].price,
      result.rows[0].stock,
      result.rows[0].category
    );
  }

  async update(id: string, updateData: Partial<Omit<ProductEntity, 'id'>>): Promise<ProductEntity> {
    const setClauses: string[] = [];
    const values: (string | number)[] = [];
    let paramIndex = 1;

    if (updateData.name !== undefined) {
      setClauses.push(`name = $${paramIndex}`);
      values.push(updateData.name);
      paramIndex++;
    }
    if (updateData.price !== undefined) {
      setClauses.push(`price = $${paramIndex}`);
      values.push(updateData.price);
      paramIndex++;
    }
    if (updateData.stock !== undefined) {
      setClauses.push(`stock = $${paramIndex}`);
      values.push(updateData.stock);
      paramIndex++;
    }
    if (updateData.category !== undefined) {
      setClauses.push(`category = $${paramIndex}`);
      values.push(updateData.category);
      paramIndex++;
    }

    if (setClauses.length === 0) {
      throw new Error('No update data provided');
    }

    values.push(id);
    const query = `
      UPDATE products
      SET ${setClauses.join(', ')}
      WHERE id = $${paramIndex}
      RETURNING id, name, price, stock, category
    `;

    const result = await this.pool.query(query, values);
    if (result.rows.length === 0) {
      throw new Error('Product not found');
    }
    return new ProductEntity(
      result.rows[0].id,
      result.rows[0].name,
      result.rows[0].price,
      result.rows[0].stock,
      result.rows[0].category
    );
  }

  async delete(id: string): Promise<void> {
    const query = 'DELETE FROM products WHERE id = $1';
    await this.pool.query(query, [id]);
  }

  async list(): Promise<ProductEntity[]> {
    const query = 'SELECT id, name, price, stock, category FROM products';
    const result = await this.pool.query(query);
    return result.rows.map((row: pg.QueryResultRow) =>
      new ProductEntity(row.id, row.name, row.price, row.stock, row.category)
    );
  }
}

// === ARCHIVO: api/src/infrastructure/repositories/nosql/product-nosql.repository.ts ===
import { Injectable } from '@nestjs/common';
import { ProductRepository } from '../../../domain/repositories/product.repository';
import { ProductEntity } from '../../../domain/entities/product.entity';

@Injectable()
export class ProductNosqlRepository implements ProductRepository {
  async create(product: Omit<ProductEntity, 'id'>): Promise<ProductEntity> {
    throw new Error('Not implemented');
  }

  async findById(id: string): Promise<ProductEntity | null> {
    throw new Error('Not implemented');
  }

  async update(
    id: string,
    updateData: Partial<Omit<ProductEntity, 'id'>>,
  ): Promise<ProductEntity> {
    throw new Error('Not implemented');
  }

  async delete(id: string): Promise<void> {
    throw new Error('Not implemented');
  }

  async list(): Promise<ProductEntity[]> {
    throw new Error('Not implemented');
  }
}

// === ARCHIVO: api/src/shared/dto/create-product.dto.ts ===
import { IsNumber, IsPositive, IsString, Min } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsNumber()
  @IsPositive()
  price: number;

  @IsNumber()
  @Min(0)
  stock: number;

  @IsString()
  category: string;

  constructor(name: string, price: number, stock: number, category: string) {
    this.name = name;
    this.price = price;
    this.stock = stock;
    this.category = category;
  }
}

// === ARCHIVO: api/src/shared/dto/update-product.dto.ts ===
import { IsNumber, IsOptional, IsPositive, IsString, Min } from 'class-validator';

export class UpdateProductDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  price?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  stock?: number;

  @IsString()
  @IsOptional()
  category?: string;

  constructor(updateData: { name?: string; price?: number; stock?: number; category?: string }) {
    if (updateData.name !== undefined) {
      this.name = updateData.name;
    }
    if (updateData.price !== undefined) {
      this.price = updateData.price;
    }
    if (updateData.stock !== undefined) {
      this.stock = updateData.stock;
    }
    if (updateData.category !== undefined) {
      this.category = updateData.category;
    }
  }
}

// === ARCHIVO: api/_pendiente/src/main.ts ===
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Inventory API')
    .setDescription('API for managing inventory products')
    .setVersion('1.0')
    .addTag('products')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();

// === ARCHIVO: api/_pendiente/src/app.module.ts ===
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProductSqlRepository } from './infrastructure/repositories/sql/product-sql.repository';
import { ProductNosqlRepository } from './infrastructure/repositories/nosql/product-nosql.repository';
import { ProductRepository } from './domain/repositories/product.repository';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [],
  providers: [
    {
      provide: 'ProductRepository',
      useFactory: (configService: ConfigService): ProductRepository => {
        const dbType = configService.get<string>('DB_TYPE', 'sql');
        const mongoUri = configService.get<string>('MONGO_URI');
        
        if (dbType === 'nosql' && mongoUri) {
          return new ProductNosqlRepository(mongoUri);
        }
        return new ProductSqlRepository(configService);
      },
      inject: [ConfigService],
    },
  ],
})
export class AppModule {}

// === ARCHIVO: api/src/types/pg.d.ts ===
declare module 'pg';


// === ARCHIVO: api/README.md ===
# Piso de compilacion
## Codigo en cuarentena
- src/infrastructure/repositories/sql/product-sql.repository.ts -> _pendiente/src/infrastructure/repositories/sql/product-sql.repository.ts
- src/main.ts -> _pendiente/src/main.ts
- src/app.module.ts -> _pendiente/src/app.module.ts


// === ARCHIVO: client/src/main.tsx ===
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

// === ARCHIVO: client/package.json ===
{
  "name": "reto-react",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "build": "tsc --noEmit && vite build"
  },
  "dependencies": {
    "@tanstack/react-query": "5.107.1",
    "axios": "1.21.1",
    "formik": "2.4.9",
    "react": "18.3.1",
    "react-dom": "18.3.1",
    "react-router-dom": "7.18.5",
    "yup": "1.7.1"
  },
  "devDependencies": {
    "@types/react": "18.3.31",
    "@types/react-dom": "18.3.7",
    "@vitejs/plugin-react": "4.7.0",
    "typescript": "5.7.3",
    "vite": "5.4.21"
  }
}

// === ARCHIVO: client/tsconfig.json ===
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": [
      "ES2020",
      "DOM",
      "DOM.Iterable"
    ],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "strict": true,
    "strictPropertyInitialization": false,
    "noEmit": true,
    "isolatedModules": true,
    "skipLibCheck": true,
    "resolveJsonModule": true,
    "allowImportingTsExtensions": true,
    "useDefineForClassFields": true,
    "types": [
      "vite/client"
    ]
  },
  "include": [
    "src"
  ],
  "exclude": [
    "node_modules",
    "dist",
    "_pendiente",
    "tests",
    "src/**/*.test.ts",
    "src/**/*.test.tsx",
    "src/**/*.spec.ts",
    "src/**/*.spec.tsx"
  ]
}

// === ARCHIVO: client/vite.config.ts ===
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({ plugins: [react()] });

// === ARCHIVO: client/index.html ===
<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Reto</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>

// === ARCHIVO: client/src/vite-env.d.ts ===
/// <reference types="vite/client" />

// === ARCHIVO: client/src/shared/types/product.type.ts ===
/**
 * Tipos TypeScript para Producto.
 * Define las estructuras de datos utilizadas en las operaciones CRUD de productos.
 */

export interface ProductEntity {
  id: string;
  name: string;
  price: number;
  stock: number;
  category: string;
}

export interface CreateProductDto {
  name: string;
  price: number;
  stock: number;
  category: string;
}

export interface UpdateProductDto {
  name?: string;
  price?: number;
  stock?: number;
  category?: string;
}

// === ARCHIVO: client/src/shared/services/ProductService.ts ===
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

// === ARCHIVO: client/src/shared/hooks/useProductService.ts ===
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

// === ARCHIVO: client/src/features/products/ProductList.tsx ===
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

// === ARCHIVO: client/src/features/products/ProductForm.tsx ===
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

// === ARCHIVO: .run/api.run.xml ===
<component name="ProjectRunConfigurationManager">
  <configuration default="false" name="api" type="js.build_tools.npm" nameIsGenerated="false">
    <package-json value="$PROJECT_DIR$/api/package.json" />
    <command value="run" />
    <scripts>
      <script value="start" />
    </scripts>
    <node-interpreter value="project" />
    <envs>
      <env name="DYNAMODB_ENDPOINT" value="http://localhost:8000" />
      <env name="AWS_REGION" value="us-east-1" />
      <env name="AWS_ACCESS_KEY_ID" value="local" />
      <env name="AWS_SECRET_ACCESS_KEY" value="local" />
      <env name="MONGODB_URI" value="mongodb://localhost:27017/app" />
    </envs>
    <method v="2" />
  </configuration>
</component>


// === ARCHIVO: docker-compose.yml ===
# Infraestructura local del reto. SOLO desarrollo: credenciales de ejemplo (local-dev-only), puertos en loopback.
# Levantar: docker compose up -d --wait
name: infra-local
services:
  dynamodb-local:
    image: "amazon/dynamodb-local:2.5.2"
    command: ["-jar","DynamoDBLocal.jar","-sharedDb","-inMemory"]
    ports:
      - "127.0.0.1:8000:8000"
    healthcheck:
      test: ["CMD-SHELL","bash -c ':> /dev/tcp/127.0.0.1/8000' || exit 1"]
      interval: 10s
      timeout: 5s
      retries: 10
      start_period: 5s
  mongo:
    image: "mongo:7.0.14"
    ports:
      - "127.0.0.1:27017:27017"
    environment:
      MONGO_INITDB_DATABASE: "app"
    volumes:
      - "./infra-local/mongo/init.js:/docker-entrypoint-initdb.d/init.js:ro"
    healthcheck:
      test: ["CMD","mongosh","--quiet","--eval","db.adminCommand('ping').ok"]
      interval: 10s
      timeout: 10s
      retries: 10
      start_period: 20s


// === ARCHIVO: infra-local/README.md ===
# Infraestructura local

Servicios de soporte para el reto, definidos en `docker-compose.yml` (raiz del repo).

```bash
docker compose up -d --wait
```

| Servicio | Imagen | Puertos (host) |
|---|---|---|
| DynamoDB Local | `amazon/dynamodb-local:2.5.2` | 8000 |
| MongoDB | `mongo:7.0.14` | 27017 |

Credenciales: solo de desarrollo local (`local-dev-only`, `local`). No son secretos ni deben reutilizarse.
Los scripts de `infra-local/` (tablas, topics) se ejecutan con el compose en estado healthy.


// === ARCHIVO: infra-local/dynamodb/create-tables.sh ===
#!/usr/bin/env bash
# Crea las tablas en DynamoDB Local (idempotente). Credenciales dummy: DynamoDB Local no valida firmas.
set -euo pipefail

export AWS_ACCESS_KEY_ID=local
export AWS_SECRET_ACCESS_KEY=local
export AWS_REGION=us-east-1
ENDPOINT="${DYNAMODB_ENDPOINT:-http://localhost:8000}"

create_table() {
  local name="$1" pk="$2" sk="${3:-}"
  if aws dynamodb describe-table --table-name "$name" --endpoint-url "$ENDPOINT" >/dev/null 2>&1; then
    echo "Tabla $name ya existe"
    return
  fi
  local attrs="AttributeName=$pk,AttributeType=S"
  local keys="AttributeName=$pk,KeyType=HASH"
  if [ -n "$sk" ]; then
    attrs="$attrs AttributeName=$sk,AttributeType=S"
    keys="$keys AttributeName=$sk,KeyType=RANGE"
  fi
  # shellcheck disable=SC2086
  aws dynamodb create-table --table-name "$name" --attribute-definitions $attrs --key-schema $keys \
    --billing-mode PAY_PER_REQUEST --endpoint-url "$ENDPOINT" >/dev/null
  echo "Tabla $name creada"
}

create_table "app-items" "id"


// === ARCHIVO: infra-local/mongo/init.js ===
// Se ejecuta una sola vez al crear el volumen de MongoDB (docker-entrypoint-initdb.d).
db = db.getSiblingDB('app');
db.createCollection('items');
db.items.createIndex({ name: 1 });

```
