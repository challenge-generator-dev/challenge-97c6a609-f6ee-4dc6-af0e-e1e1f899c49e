# Implementación de Operaciones CRUD en Bases de Datos

En este reto, debes construir operaciones CRUD (Crear, Leer, Actualizar, Eliminar) en una base de datos SQL y otra NoSQL. Trabajarás con un sistema ficticio de gestión de inventario para una tienda online. Los actores involucrados son el Administrador de Inventario, el Sistema de Ventas y el Cliente. Debes asegurarte de que las operaciones sean eficientes y cumplan con las reglas de negocio definidas.

## Informacion General

| Campo | Valor |
|-------|-------|
| **Tema** | Construye operaciones CRUD en Bases de Datos SQL y NoSQL |
| **Nivel** | trainee-l2 |
| **Tipo** | practical |
| **Tiempo estimado** | 8 horas |

## Fases del Reto

### Fase 0: Configuración del Proyecto

**Objetivo:** Obtener el proyecto base funcional enviando el Código Base a un asistente de IA, que lo analizará, corregirá errores y entregará cada archivo con su ruta.

**Tiempo estimado:** 15-30 minutos

**Instrucciones:**

- Asegúrate de tener instalado para ejecutar el proyecto: Node.js 18+, npm, VS Code o similar.
- Copia todo el contenido del campo **Código Base** de este reto — incluyendo el texto de instrucciones que aparece al inicio.
- Abre un asistente de IA (Claude en claude.ai, ChatGPT o Gemini — se recomienda Claude), pega el contenido copiado en el chat y envíalo.
- El asistente analizará los archivos, corregirá errores y entregará cada archivo con su ruta. Guárdalos en la carpeta donde quieras trabajar, respetando las rutas.
- Ejecuta `npm install && npm run build` (o `npm start`). Si no hay errores, estás listo.

**Entregable:** El proyecto compila/arranca sin errores.

<details>
<summary>Pistas de conocimiento</summary>

- Copia el Código Base completo incluyendo el texto de instrucciones al inicio — esas instrucciones le indican al asistente exactamente qué hacer con los archivos.
- Si el asistente no entrega todos los archivos al terminar el análisis, escríbele: "entrégame todos los archivos con su ruta".
- Si el proyecto tiene errores al arrancar, comparte el mensaje de error con el mismo asistente para que lo corrija.

</details>

### Fase 1: Configuración y Creación de Esquemas

**Objetivo:** Configurar las bases de datos SQL y NoSQL y crear los esquemas necesarios para el inventario.

**Tiempo estimado:** 2 horas

**Instrucciones:**

- Configura una base de datos SQL y otra NoSQL para el sistema de gestión de inventario.
- Crea los esquemas necesarios para almacenar productos, incluyendo campos como nombre, precio, stock y categoría.
- Asegúrate de que las bases de datos estén correctamente configuradas y listas para las siguientes operaciones.

**Entregable:** Bases de datos SQL y NoSQL configuradas con esquemas creados.

<details>
<summary>Pistas de conocimiento</summary>

- Recuerda utilizar las herramientas de depuración adecuadas para verificar la configuración.
- Consulta la documentación de las bases de datos para asegurarte de que los esquemas cumplan con las reglas de negocio.

</details>

### Fase 2: Implementación de Operaciones CRUD en SQL

**Objetivo:** Implementar las operaciones CRUD en la base de datos SQL.

**Tiempo estimado:** 3 horas

**Instrucciones:**

- Implementa las operaciones para crear, leer, actualizar y eliminar productos en la base de datos SQL.
- Asegúrate de que las operaciones cumplan con las reglas de negocio, como la prohibición de precios negativos y nombres duplicados.
- Maneja los errores y casos borde del dominio, como la falta de stock o categorías inválidas.

**Entregable:** Operaciones CRUD implementadas en la base de datos SQL.

<details>
<summary>Pistas de conocimiento</summary>

- Utiliza las herramientas de depuración para verificar el funcionamiento de las operaciones.
- Consulta la documentación de la base de datos para asegurarte de que las operaciones sean eficientes.

</details>

### Fase 3: Implementación de Operaciones CRUD en NoSQL

**Objetivo:** Implementar las operaciones CRUD en la base de datos NoSQL.

**Tiempo estimado:** 3 horas

**Instrucciones:**

- Implementa las operaciones para crear, leer, actualizar y eliminar productos en la base de datos NoSQL.
- Asegúrate de que las operaciones cumplan con las reglas de negocio, como la prohibición de precios negativos y nombres duplicados.
- Maneja los errores y casos borde del dominio, como la falta de stock o categorías inválidas.

**Entregable:** Operaciones CRUD implementadas en la base de datos NoSQL.

<details>
<summary>Pistas de conocimiento</summary>

- Utiliza las herramientas de depuración para verificar el funcionamiento de las operaciones.
- Consulta la documentación de la base de datos para asegurarte de que las operaciones sean eficientes.
- IntelliJ IDEA Debugger: Depura el componente con la run-config de IntelliJ IDEA (menu Run, carpeta .run/): pone breakpoints donde implementas el reto y arranca en modo debug.

</details>

## Dimensiones Evaluadas

- **queEs**: ¿Qué son las operaciones CRUD y por qué son importantes en el manejo de bases de datos?
- **paraQueSirve**: ¿Para qué sirven las operaciones CRUD en el contexto del sistema de gestión de inventario?
- **comoSeUsa**: ¿Cómo se implementan las operaciones CRUD en bases de datos SQL y NoSQL?
- **erroresComunes**: ¿Cuáles son los errores comunes al implementar operaciones CRUD y cómo se manejan?
- **queDecisionesImplica**: ¿Qué decisiones implica la implementación de operaciones CRUD en diferentes tipos de bases de datos?

## Criterios de Evaluacion

- Configuración correcta de las bases de datos SQL y NoSQL.
- Creación de esquemas adecuados para el inventario.
- Implementación correcta de las operaciones CRUD en la base de datos SQL.
- Implementación correcta de las operaciones CRUD en la base de datos NoSQL.
- Manejo adecuado de errores y casos borde del dominio.

## Como trabajar con un asistente de IA

Hay dos caminos, elegi uno:

- **AGENTS.md** (recomendado) — instrucciones nativas del repo. Abri esta carpeta con tu agente local (Claude Code, Cursor, Codex, Copilot, Gemini) y las carga solo. Sabe que archivos faltan y con que comando se verifica, y completa el scaffold escribiendo en disco.
- **PROMPT_MEJORA.md** — para copiar y pegar en un chat (claude.ai, ChatGPT) si no tenes un agente en el IDE. Declara lo mismo que AGENTS.md; los archivos que te devuelva el chat los guardas en esta carpeta respetando las rutas.

Ninguno de los dos resuelve las fases del reto: eso es tu trabajo.

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

## Verificacion

El proyecto esta listo para trabajar cuando este comando corre sin errores:

```bash
(cd api && npm install --no-audit --no-fund && npm run build) && (cd client && npm install --no-audit --no-fund && npm run build) && docker compose config -q
```

---

*Reto generado automaticamente por Challenge Generator - Pragma*
