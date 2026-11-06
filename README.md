# Implementación de operaciones CRUD en bases de datos

La empresa PragmaFintech necesita implementar un sistema de gestión de clientes que permita a los usuarios realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre los datos de los clientes almacenados en una base de datos SQL y NoSQL. El sistema debe ser capaz de manejar tanto datos estructurados como no estructurados, asegurando la integridad y consistencia de los datos en ambas bases de datos.

## Informacion General

| Campo | Valor |
|-------|-------|
| **Tema** | Construye operaciones CRUD en Bases de Datos SQL y NoSQL |
| **Nivel** | trainee-l2 |
| **Tipo** | practical |
| **Tiempo estimado** | 8 horas |

## Fases del Reto

### Fase 0: Configuración del Proyecto

**Objetivo:** Obtener el proyecto base funcional enviando el Código Base a un asistente de IA, que lo analizará, corregirá errores y generará un ZIP listo para usar.

**Tiempo estimado:** 15-30 minutos

**Instrucciones:**

- Asegúrate de tener instalado para ejecutar el proyecto: Node.js 18+, npm, VS Code o similar.
- Copia todo el contenido del campo **Código Base** de este reto — incluyendo el texto de instrucciones que aparece al inicio.
- Abre un asistente de IA (Claude en claude.ai, ChatGPT o Gemini — se recomienda Claude), pega el contenido copiado en el chat y envíalo.
- El asistente analizará los archivos, corregirá errores y generará un archivo ZIP descargable. Descárgalo y extráelo en la carpeta donde quieras trabajar.
- Ejecuta `npm install && npm run build` (o `npm start`). Si no hay errores, estás listo.

**Entregable:** El proyecto compila/arranca sin errores.

<details>
<summary>Pistas de conocimiento</summary>

- Copia el Código Base completo incluyendo el texto de instrucciones al inicio — esas instrucciones le indican al asistente exactamente qué hacer con los archivos.
- Si el asistente no genera el ZIP automáticamente al terminar el análisis, escríbele: "genera el ZIP ahora".
- Si el proyecto tiene errores al arrancar, comparte el mensaje de error con el mismo asistente para que lo corrija.

</details>

### Fase 1: Definición del esquema de datos

**Objetivo:** Definir el esquema de datos para la base de datos SQL y NoSQL que almacene la información de los clientes.

**Tiempo estimado:** 2 horas

**Instrucciones:**

- Identifica los atributos necesarios para representar un cliente en la base de datos.
- Define el esquema de datos para la base de datos SQL, incluyendo las tablas y relaciones necesarias.
- Define el esquema de datos para la base de datos NoSQL, incluyendo las colecciones y documentos necesarios.

**Entregable:** Esquema de datos definido para ambas bases de datos.

<details>
<summary>Pistas de conocimiento</summary>

- Considera la naturaleza de los datos y las relaciones entre ellos al definir el esquema.
- Piensa en cómo los datos se relacionan entre sí y cómo se pueden normalizar o desnormalizar según sea necesario.

</details>

### Fase 2: Implementación de operaciones CRUD en base de datos SQL

**Objetivo:** Implementar las operaciones CRUD para la base de datos SQL.

**Tiempo estimado:** 3 horas

**Instrucciones:**

- Crea las consultas SQL necesarias para realizar las operaciones CRUD sobre la tabla de clientes.
- Implementa las operaciones en un script o aplicación que interactúe con la base de datos SQL.

**Entregable:** Script o aplicación que implementa las operaciones CRUD en la base de datos SQL.

<details>
<summary>Pistas de conocimiento</summary>

- Utiliza las consultas DDL y DML apropiadas para definir y manipular los datos.
- Asegúrate de manejar los errores y excepciones que puedan ocurrir durante las operaciones.

</details>

### Fase 3: Implementación de operaciones CRUD en base de datos NoSQL

**Objetivo:** Implementar las operaciones CRUD para la base de datos NoSQL.

**Tiempo estimado:** 3 horas

**Instrucciones:**

- Crea las consultas o comandos necesarios para realizar las operaciones CRUD sobre la colección de clientes en la base de datos NoSQL.
- Implementa las operaciones en un script o aplicación que interactúe con la base de datos NoSQL.

**Entregable:** Script o aplicación que implementa las operaciones CRUD en la base de datos NoSQL.

<details>
<summary>Pistas de conocimiento</summary>

- Utiliza las operaciones apropiadas para la base de datos NoSQL que estés utilizando.
- Asegúrate de manejar los errores y excepciones que puedan ocurrir durante las operaciones.

</details>

## Dimensiones Evaluadas

- **queEs**: ¿Qué son las operaciones CRUD y por qué son importantes en el manejo de bases de datos?
- **paraQueSirve**: ¿Para qué sirve definir un esquema de datos en una base de datos?
- **comoSeUsa**: ¿Cómo se utilizan las consultas DDL y DML para manipular datos en una base de datos SQL?
- **erroresComunes**: ¿Cuáles son los errores comunes que pueden ocurrir durante las operaciones CRUD en bases de datos y cómo se manejan?

## Criterios de Evaluacion

- Definición correcta del esquema de datos para bases de datos SQL y NoSQL.
- Implementación correcta de operaciones CRUD en base de datos SQL.
- Implementación correcta de operaciones CRUD en base de datos NoSQL.
- Manejo adecuado de errores y excepciones durante las operaciones CRUD.

## Como trabajar con un asistente de IA

Hay dos caminos, elegi uno:

- **AGENTS.md** (recomendado) — instrucciones nativas del repo. Abri esta carpeta con tu agente local (Claude Code, Cursor, Codex, Copilot, Gemini) y las carga solo. Sabe que archivos faltan y con que comando se verifica, y completa el scaffold escribiendo en disco.
- **PROMPT_MEJORA.md** — para copiar y pegar en un chat (claude.ai, ChatGPT). Devuelve un ZIP con el proyecto. Sirve si no tenes un agente en el IDE.

Ninguno de los dos resuelve las fases del reto: eso es tu trabajo.

## Verificacion

El proyecto esta listo para trabajar cuando este comando corre sin errores:

```bash
npm install && npm run build
```

---

*Reto generado automaticamente por Challenge Generator - Pragma*
