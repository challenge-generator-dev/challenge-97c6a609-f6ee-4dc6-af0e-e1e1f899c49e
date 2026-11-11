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
  - `GET /products`
  - `GET /products/:id`
  - `PUT /products/:id`
  - `DELETE /products/:id`

## Herramientas

- **IntelliJ IDEA Debugger**: Depura el componente con la run-config de IntelliJ IDEA (menu Run, carpeta .run/): pone breakpoints donde implementas el reto y arranca en modo debug.

## Lo que le falta a este proyecto

Esto NO lo tenes que adivinar: salio de comparar el proyecto contra la arquitectura declarada del reto y de un analisis estatico del codigo. Completalo TODO.

### Archivos que la arquitectura del reto declara y no estan

Creálos con implementacion real, en la capa que les corresponde:

- `api/src/domain/entities/product.entity.ts`
- `api/src/application/dto/create-product.dto.ts`
- `api/src/application/dto/update-product.dto.ts`
- `api/src/infrastructure/repositories/product-sql.repository.ts`
- `api/src/infrastructure/repositories/product-nosql.repository.ts`
- `api/src/infrastructure/repositories/product-dynamodb.repository.ts`
- `api/src/main.ts`
- `api/src/app.module.ts`
- `client/src/services/product.service.ts`
- `client/src/features/products/ProductList.tsx`
- `client/src/features/products/ProductForm.tsx`
- `client/src/shared/components/ErrorMessage.tsx`
- `client/src/shared/components/LoadingSpinner.tsx`

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
- Título: Implementación de Operaciones CRUD en Bases de Datos SQL y NoSQL
- Tiempo estimado: 3 horas

### Fases (trabajo del HUMANO — PROHIBIDO completarlas)
No implementes estos entregables. Dejalos como hueco pedagógico. El asistente solo materializa el proyecto arrancable para que el participante pueda trabajar.
- Fase 1: Configuración Inicial — objetivo: Configurar el entorno de desarrollo y conectarse a las bases de datos SQL y NoSQL. — entregable (NO resolver): Proyecto configurado con conexiones a bases de datos SQL y NoSQL funcionales.
- Fase 2: Implementación de Operaciones CRUD en SQL — objetivo: Implementar operaciones CRUD en una base de datos SQL. — entregable (NO resolver): Operaciones CRUD funcionales en una base de datos SQL.
- Fase 3: Implementación de Operaciones CRUD en NoSQL — objetivo: Implementar operaciones CRUD en una base de datos NoSQL. — entregable (NO resolver): Operaciones CRUD funcionales en una base de datos NoSQL.

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
    "@nestjs/core": "10.4.22",
    "@nestjs/platform-express": "10.4.22",
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


// === ARCHIVO: api/_pendiente/src/domain/entities/product.entity.ts ===
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
@Schema()
export class Product {
  @ApiProperty({ example: '1', description: 'The unique identifier of the product' })
  @PrimaryGeneratedColumn('uuid')
  @Prop({ type: String, required: true, unique: true })
  id: string;

  @ApiProperty({ example: 'Laptop', description: 'The name of the product' })
  @Column()
  @Prop({ required: true })
  name: string;

  @ApiProperty({ example: 'High-performance laptop', description: 'The description of the product' })
  @Column()
  @Prop()
  description: string;

  @ApiProperty({ example: 999.99, description: 'The price of the product' })
  @Column('decimal', { precision: 10, scale: 2 })
  @Prop({ required: true, type: Number })
  price: number;

  @ApiProperty({ example: 10, description: 'The stock quantity of the product' })
  @Column()
  @Prop({ required: true, type: Number })
  stock: number;
}

export type ProductDocument = Product & Document;
export const ProductSchema = SchemaFactory.createForClass(Product);

// === ARCHIVO: api/_pendiente/src/application/dto/create-product.dto.ts ===
import { IsNotEmpty, IsNumber, IsPositive, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ example: 'Laptop', description: 'The name of the product' })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @ApiProperty({ example: 'High-performance laptop', description: 'The description of the product' })
  @IsString()
  description: string;

  @ApiProperty({ example: 999.99, description: 'The price of the product' })
  @IsNumber({}, { message: 'Price must be a number' })
  @IsPositive({ message: 'Price must be a positive number' })
  price: number;

  @ApiProperty({ example: 10, description: 'The stock quantity of the product' })
  @IsNumber({}, { message: 'Stock must be a number' })
  @IsPositive({ message: 'Stock must be a positive number' })
  stock: number;

  constructor(name: string, description: string, price: number, stock: number) {
    this.name = name;
    this.description = description;
    this.price = price;
    this.stock = stock;

    const errors = [];
    if (price <= 0) errors.push('Price must be positive');
    if (stock <= 0) errors.push('Stock must be positive');
    if (!name || name.length < 3) errors.push('Name must be at least 3 characters long');

    if (errors.length > 0) {
      throw new Error(`Validation failed: ${errors.join(', ')}`);
    }
  }
}

// === ARCHIVO: api/_pendiente/src/application/dto/update-product.dto.ts ===
import { IsNumber, IsOptional, IsPositive, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProductDto {
  @ApiProperty({ example: 'Laptop', description: 'The name of the product', required: false })
  @IsString()
  @IsOptional()
  @MinLength(3)
  name?: string;

  @ApiProperty({ example: 'High-performance laptop', description: 'The description of the product', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: 999.99, description: 'The price of the product', required: false })
  @IsNumber({}, { message: 'Price must be a number' })
  @IsPositive({ message: 'Price must be a positive number' })
  @IsOptional()
  price?: number;

  @ApiProperty({ example: 10, description: 'The stock quantity of the product', required: false })
  @IsNumber({}, { message: 'Stock must be a number' })
  @IsPositive({ message: 'Stock must be a positive number' })
  @IsOptional()
  stock?: number;

  constructor(
    name?: string,
    description?: string,
    price?: number,
    stock?: number
  ) {
    if (name !== undefined) this.name = name;
    if (description !== undefined) this.description = description;
    if (price !== undefined) this.price = price;
    if (stock !== undefined) this.stock = stock;

    const errors = [];
    if (price !== undefined && price <= 0) errors.push('Price must be positive');
    if (stock !== undefined && stock <= 0) errors.push('Stock must be positive');
    if (name !== undefined && (name.length < 3)) errors.push('Name must be at least 3 characters long');

    if (errors.length > 0) {
      throw new Error(`Validation failed: ${errors.join(', ')}`);
    }
  }
}

// === ARCHIVO: api/_pendiente/src/infrastructure/repositories/product-sql.repository.ts ===
// TODO(reto): Implementar las operaciones CRUD para PostgreSQL usando TypeORM
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../../domain/entities/product.entity';
import { CreateProductDto } from '../../application/dto/create-product.dto';
import { UpdateProductDto } from '../../application/dto/update-product.dto';

@Injectable()
export class ProductSqlRepository {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    // TODO(reto): Implementar la creación de un producto en PostgreSQL
    const product = this.productRepository.create(createProductDto);
    return await this.productRepository.save(product);
  }

  async findAll(): Promise<Product[]> {
    // TODO(reto): Implementar la obtención de todos los productos
    return await this.productRepository.find();
  }

  async findOne(id: string): Promise<Product> {
    // TODO(reto): Implementar la obtención de un producto por ID
    return await this.productRepository.findOne({ where: { id } });
  }

  async update(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
    // TODO(reto): Implementar la actualización de un producto
    await this.productRepository.update(id, updateProductDto);
    return await this.productRepository.findOne({ where: { id } });
  }

  async remove(id: string): Promise<void> {
    // TODO(reto): Implementar la eliminación de un producto
    await this.productRepository.delete(id);
  }
}

// === ARCHIVO: api/_pendiente/src/infrastructure/repositories/product-nosql.repository.ts ===
// TODO(reto): Implementar las operaciones CRUD para MongoDB usando Mongoose
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from '../../domain/entities/product.entity';
import { CreateProductDto } from '../../application/dto/create-product.dto';
import { UpdateProductDto } from '../../application/dto/update-product.dto';

@Injectable()
export class ProductNosqlRepository {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    // TODO(reto): Implementar la creación de un producto en MongoDB
    const createdProduct = new this.productModel(createProductDto);
    return await createdProduct.save();
  }

  async findAll(): Promise<Product[]> {
    // TODO(reto): Implementar la obtención de todos los productos
    return await this.productModel.find().exec();
  }

  async findOne(id: string): Promise<Product> {
    // TODO(reto): Implementar la obtención de un producto por ID
    return await this.productModel.findById(id).exec();
  }

  async update(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
    // TODO(reto): Implementar la actualización de un producto
    return await this.productModel.findByIdAndUpdate(id, updateProductDto, { new: true }).exec();
  }

  async remove(id: string): Promise<void> {
    // TODO(reto): Implementar la eliminación de un producto
    await this.productModel.findByIdAndDelete(id).exec();
  }
}

// === ARCHIVO: api/_pendiente/src/infrastructure/repositories/product-dynamodb.repository.ts ===
// TODO(reto): Implementar las operaciones CRUD para DynamoDB usando AWS SDK
import { Injectable } from '@nestjs/common';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand, ScanCommand, GetCommand, UpdateCommand, DeleteCommand } from '@aws-sdk/lib-dynamodb';
import { CreateProductDto } from '../../application/dto/create-product.dto';
import { UpdateProductDto } from '../../application/dto/update-product.dto';
import { Product } from '../../domain/entities/product.entity';

@Injectable()
export class ProductDynamodbRepository {
  private readonly client: DynamoDBDocumentClient;

  constructor() {
    const dynamoDBClient = new DynamoDBClient({ region: process.env.AWS_REGION || 'us-east-1' });
    this.client = DynamoDBDocumentClient.from(dynamoDBClient);
  }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    // TODO(reto): Implementar la creación de un producto en DynamoDB
    const params = {
      TableName: process.env.DYNAMODB_TABLE || 'Products',
      Item: {
        id: Date.now().toString(),
        ...createProductDto,
      },
    };
    await this.client.send(new PutCommand(params));
    return params.Item as Product;
  }

  async findAll(): Promise<Product[]> {
    // TODO(reto): Implementar la obtención de todos los productos
    const params = {
      TableName: process.env.DYNAMODB_TABLE || 'Products',
    };
    const result = await this.client.send(new ScanCommand(params));
    return result.Items as Product[];
  }

  async findOne(id: string): Promise<Product> {
    // TODO(reto): Implementar la obtención de un producto por ID
    const params = {
      TableName: process.env.DYNAMODB_TABLE || 'Products',
      Key: { id },
    };
    const result = await this.client.send(new GetCommand(params));
    return result.Item as Product;
  }

  async update(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
    // TODO(reto): Implementar la actualización de un producto
    const updateExpressions = [];
    const expressionAttributeValues = {};
    const expressionAttributeNames = {};

    Object.entries(updateProductDto).forEach(([key, value]) => {
      updateExpressions.push(`#${key} = :${key}`);
      expressionAttributeNames[`#${key}`] = key;
      expressionAttributeValues[`:${key}`] = value;
    });

    const params = {
      TableName: process.env.DYNAMODB_TABLE || 'Products',
      Key: { id },
      UpdateExpression: 'SET ' + updateExpressions.join(', '),
      ExpressionAttributeNames: expressionAttributeNames,
      ExpressionAttributeValues: expressionAttributeValues,
      ReturnValues: 'ALL_NEW',
    };

    const result = await this.client.send(new UpdateCommand(params));
    return result.Attributes as Product;
  }

  async remove(id: string): Promise<void> {
    // TODO(reto): Implementar la eliminación de un producto
    const params = {
      TableName: process.env.DYNAMODB_TABLE || 'Products',
      Key: { id },
    };
    await this.client.send(new DeleteCommand(params));
  }
}

// === ARCHIVO: api/_pendiente/src/main.ts ===
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
  }));

  const config = new DocumentBuilder()
    .setTitle('Product API')
    .setDescription('API for managing products in SQL and NoSQL databases')
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
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { Product } from './domain/entities/product.entity';
import { ProductSchema } from './domain/entities/product.entity';
import { ProductSqlRepository } from './infrastructure/repositories/product-sql.repository';
import { ProductNosqlRepository } from './infrastructure/repositories/product-nosql.repository';
import { ProductDynamodbRepository } from './infrastructure/repositories/product-dynamodb.repository';
import { ProductsController } from './api/products.controller';
import { ProductsService } from './application/services/products.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST || 'localhost',
      port: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
      username: process.env.POSTGRES_USER || 'postgres',
      password: process.env.POSTGRES_PASSWORD || 'postgres',
      database: process.env.POSTGRES_DB || 'products',
      entities: [Product],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Product]),
    MongooseModule.forRoot(process.env.MONGODB_URI || 'mongodb://localhost:27017/products'),
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
  ],
  controllers: [ProductsController],
  providers: [
    ProductsService,
    ProductSqlRepository,
    ProductNosqlRepository,
    ProductDynamodbRepository,
  ],
})
export class AppModule {}

// === ARCHIVO: api/_pendiente/src/api/products.controller.ts ===
import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { ProductsService } from '../application/services/products.service';
import { CreateProductDto } from '../application/dto/create-product.dto';
import { UpdateProductDto } from '../application/dto/update-product.dto';
import { Product } from '../domain/entities/product.entity';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new product' })
  @ApiResponse({ status: 201, description: 'The product has been successfully created.', type: Product })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return this.productsService.createProduct(createProductDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all products' })
  @ApiResponse({ status: 200, description: 'Return all products.', type: [Product] })
  async findAll(): Promise<Product[]> {
    return this.productsService.findAllProducts();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a product by ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, description: 'Return the product.', type: Product })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  async findOne(@Param('id') id: string): Promise<Product> {
    return this.productsService.findProductById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a product by ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, description: 'The product has been successfully updated.', type: Product })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto): Promise<Product> {
    return this.productsService.updateProduct(id, updateProductDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a product by ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, description: 'The product has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  async remove(@Param('id') id: string): Promise<void> {
    return this.productsService.deleteProduct(id);
  }
}

// === ARCHIVO: api/_pendiente/src/application/services/products.service.ts ===
import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductSqlRepository } from '../../infrastructure/repositories/product-sql.repository';
import { ProductNosqlRepository } from '../../infrastructure/repositories/product-nosql.repository';
import { ProductDynamodbRepository } from '../../infrastructure/repositories/product-dynamodb.repository';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { Product } from '../../domain/entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    private readonly productSqlRepository: ProductSqlRepository,
    private readonly productNosqlRepository: ProductNosqlRepository,
    private readonly productDynamodbRepository: ProductDynamodbRepository,
  ) {}

  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    // Usamos SQL como fuente principal para este ejemplo
    return this.productSqlRepository.create(createProductDto);
  }

  async findAllProducts(): Promise<Product[]> {
    // Usamos SQL como fuente principal para este ejemplo
    return this.productSqlRepository.findAll();
  }

  async findProductById(id: string): Promise<Product> {
    // Usamos SQL como fuente principal para este ejemplo
    const product = await this.productSqlRepository.findOne(id);
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  async updateProduct(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
    // Usamos SQL como fuente principal para este ejemplo
    const product = await this.productSqlRepository.findOne(id);
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return this.productSqlRepository.update(id, updateProductDto);
  }

  async deleteProduct(id: string): Promise<void> {
    // Usamos SQL como fuente principal para este ejemplo
    const product = await this.productSqlRepository.findOne(id);
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return this.productSqlRepository.remove(id);
  }
}

// === ARCHIVO: api/src/sample.module.ts ===
import 'reflect-metadata';
import { Controller, Get, Module } from '@nestjs/common';

@Controller('health')
export class HealthController {
    @Get()
    check(): { status: string } {
        return { status: 'ok' };
    }
}

@Module({ controllers: [HealthController] })
export class SampleModule {}


// === ARCHIVO: api/README.md ===
# Piso de compilacion
## Codigo en cuarentena
- src/domain/entities/product.entity.ts -> _pendiente/src/domain/entities/product.entity.ts
- src/application/dto/create-product.dto.ts -> _pendiente/src/application/dto/create-product.dto.ts
- src/application/dto/update-product.dto.ts -> _pendiente/src/application/dto/update-product.dto.ts
- src/infrastructure/repositories/product-sql.repository.ts -> _pendiente/src/infrastructure/repositories/product-sql.repository.ts
- src/infrastructure/repositories/product-nosql.repository.ts -> _pendiente/src/infrastructure/repositories/product-nosql.repository.ts
- src/infrastructure/repositories/product-dynamodb.repository.ts -> _pendiente/src/infrastructure/repositories/product-dynamodb.repository.ts
- src/main.ts -> _pendiente/src/main.ts
- src/app.module.ts -> _pendiente/src/app.module.ts
- src/api/products.controller.ts -> _pendiente/src/api/products.controller.ts
- src/application/services/products.service.ts -> _pendiente/src/application/services/products.service.ts


// === ARCHIVO: client/_pendiente/src/main.tsx ===
import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { theme } from './shared/theme';
import ProductList from './features/products/ProductList';
import ProductForm from './features/products/ProductForm';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <ProductList />,
  },
  {
    path: '/new',
    element: <ProductForm />,
  },
  {
    path: '/edit/:id',
    element: <ProductForm />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
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
    "react": "18.3.1",
    "react-dom": "18.3.1"
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


// === ARCHIVO: client/_pendiente/src/services/product.service.ts ===
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

// === ARCHIVO: client/_pendiente/src/features/products/ProductList.tsx ===
import React from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useProductService } from '../../services/product.service';
import LoadingSpinner from '../../shared/components/LoadingSpinner';
import ErrorMessage from '../../shared/components/ErrorMessage';

const ProductList: React.FC = () => {
  const { productsQuery, deleteMutation } = useProductService();
  const { data: products, error, isLoading } = productsQuery;

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={`Error al cargar productos: ${error.message}`} />;
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell>Descripción</TableCell>
            <TableCell>Precio</TableCell>
            <TableCell>Stock</TableCell>
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products?.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.description}</TableCell>
              <TableCell>${product.price.toFixed(2)}</TableCell>
              <TableCell>{product.stock}</TableCell>
              <TableCell>
                <IconButton aria-label="editar" onClick={() => { /* TODO(reto): Implementar navegación a formulario de edición */ }}>
                  <EditIcon />
                </IconButton>
                <IconButton
                  aria-label="eliminar"
                  onClick={() => deleteMutation.mutate(product.id)}
                  disabled={deleteMutation.isPending}
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button
        variant="contained"
        color="primary"
        onClick={() => { /* TODO(reto): Implementar navegación a formulario de creación */ }}
        sx={{ margin: 2 }}
      >
        Crear Nuevo Producto
      </Button>
    </TableContainer>
  );
};

export default ProductList;

// === ARCHIVO: client/_pendiente/src/features/products/ProductForm.tsx ===
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

// === ARCHIVO: client/_pendiente/src/shared/components/ErrorMessage.tsx ===
import React from 'react';
import { Alert, AlertTitle, Box, Button } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import RefreshIcon from '@mui/icons-material/Refresh';

export interface ErrorMessageProps {
  message: string;
  title?: string;
  severity?: 'error' | 'warning' | 'info' | 'success';
  onRetry?: () => void;
  fullWidth?: boolean;
  showIcon?: boolean;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  title = 'Ha ocurrido un error',
  severity = 'error',
  onRetry,
  fullWidth = false,
  showIcon = true,
}) => {
  const handleRetry = () => {
    if (onRetry) {
      onRetry();
    }
  };

  return (
    <Box
      sx={{
        width: fullWidth ? '100%' : 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
        p: 2,
      }}
    >
      <Alert
        severity={severity}
        sx={{
          width: '100%',
          maxWidth: 500,
          '& .MuiAlert-message': {
            width: '100%',
          },
        }}
        icon={showIcon ? <ErrorOutlineIcon fontSize="inherit" /> : undefined}
      >
        <AlertTitle sx={{ fontWeight: 600, mb: 1 }}>
          {title}
        </AlertTitle>
        <Box
          component="span"
          sx={{
            display: 'block',
            fontSize: '0.9rem',
            lineHeight: 1.6,
            color: 'text.secondary',
          }}
        >
          {message}
        </Box>
        {onRetry && (
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant="outlined"
              color="inherit"
              size="small"
              onClick={handleRetry}
              startIcon={<RefreshIcon />}
              sx={{
                textTransform: 'none',
                fontWeight: 500,
                borderColor: 'rgba(0, 0, 0, 0.23)',
                '&:hover': {
                  borderColor: 'rgba(0, 0, 0, 0.5)',
                  backgroundColor: 'rgba(0, 0, 0, 0.04)',
                },
              }}
            >
              Reintentar
            </Button>
          </Box>
        )}
      </Alert>
    </Box>
  );
};

export default ErrorMessage;

// === ARCHIVO: client/_pendiente/src/shared/components/LoadingSpinner.tsx ===
import React from 'react';
import { Box, CircularProgress, Typography, Backdrop } from '@mui/material';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';

export interface LoadingSpinnerProps {
  message?: string;
  size?: 'small' | 'medium' | 'large';
  fullScreen?: boolean;
  overlay?: boolean;
  showIcon?: boolean;
}

const getSizeValue = (size: 'small' | 'medium' | 'large'): number => {
  switch (size) {
    case 'small':
      return 24;
    case 'large':
      return 56;
    case 'medium':
    default:
      return 40;
  }
};

const getIconSize = (size: 'small' | 'medium' | 'large'): number => {
  switch (size) {
    case 'small':
      return 20;
    case 'large':
      return 48;
    case 'medium':
    default:
      return 32;
  }
};

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  message = 'Cargando...',
  size = 'medium',
  fullScreen = false,
  overlay = false,
  showIcon = true,
}) => {
  const spinnerSize = getSizeValue(size);
  const iconSize = getIconSize(size);

  const spinnerContent = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        p: 3,
      }}
    >
      <Box sx={{ position: 'relative', display: 'inline-flex' }}>
        {showIcon && (
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 1,
            }}
          >
            <ShoppingBagIcon
              sx={{
                fontSize: iconSize,
                color: 'primary.main',
                opacity: 0.8,
              }}
            />
          </Box>
        )}
        <CircularProgress
          size={spinnerSize}
          thickness={4}
          sx={{
            color: 'primary.light',
            '& .MuiCircularProgress-circle': {
              strokeLinecap: 'round',
            },
          }}
        />
      </Box>
      {message && (
        <Typography
          variant="body2"
          sx={{
            color: 'text.secondary',
            fontWeight: 500,
            letterSpacing: 0.5,
          }}
        >
          {message}
        </Typography>
      )}
    </Box>
  );

  if (fullScreen) {
    return (
      <Backdrop
        open={true}
        sx={{
          color: '#fff',
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          backdropFilter: 'blur(4px)',
        }}
      >
        {spinnerContent}
      </Backdrop>
    );
  }

  if (overlay) {
    return (
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
          borderRadius: 1,
          zIndex: 10,
        }}
      >
        {spinnerContent}
      </Box>
    );
  }

  return spinnerContent;
};

export default LoadingSpinner;

// === ARCHIVO: client/_pendiente/src/shared/theme.ts ===
import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
      light: '#42a5f5',
      dark: '#1565c0',
    },
    secondary: {
      main: '#9c27b0',
      light: '#ba68c8',
      dark: '#7b1fa2',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
    error: {
      main: '#d32f2f',
    },
    warning: {
      main: '#ed6c02',
    },
    info: {
      main: '#0288d1',
    },
    success: {
      main: '#2e7d32',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 500,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 500,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 500,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 500,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          padding: '16px',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          fontWeight: 600,
          backgroundColor: '#f5f5f5',
        },
      },
    },
  },
});

// === ARCHIVO: client/src/main.tsx ===
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
);


// === ARCHIVO: client/src/App.tsx ===
export default function App(): JSX.Element {
    return <h1>Reto</h1>;
}


// === ARCHIVO: client/README.md ===
# Piso de compilacion
## Codigo en cuarentena
- src/main.tsx -> _pendiente/src/main.tsx
- src/services/product.service.ts -> _pendiente/src/services/product.service.ts
- src/features/products/ProductList.tsx -> _pendiente/src/features/products/ProductList.tsx
- src/features/products/ProductForm.tsx -> _pendiente/src/features/products/ProductForm.tsx
- src/shared/components/ErrorMessage.tsx -> _pendiente/src/shared/components/ErrorMessage.tsx
- src/shared/components/LoadingSpinner.tsx -> _pendiente/src/shared/components/LoadingSpinner.tsx
- src/shared/theme.ts -> _pendiente/src/shared/theme.ts


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
