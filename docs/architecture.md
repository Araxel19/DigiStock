# Arquitectura del Sistema DigiStock

## Visión General

DigiStock es un sistema de digitalización de inventario que ha sido refactorizado para seguir una arquitectura de tres capas claramente separadas, mejorando la mantenibilidad, escalabilidad y separación de responsabilidades.

## Arquitectura de Tres Capas

### 1. Frontend (Vue.js 3 + TypeScript)
**Ubicación:** `frontend/`
**Responsabilidades:**
- Interfaz de usuario
- Gestión de estado (Pinia)
- Comunicación con la API del backend
- Validación de formularios del lado del cliente
- Enrutamiento (Vue Router)

**Tecnologías:**
- Vue 3 con Composition API
- TypeScript
- Tailwind CSS
- Pinia para gestión de estado
- Axios para peticiones HTTP

### 2. Backend - API Gateway (NestJS)
**Ubicación:** `backend/`
**Responsabilidades:**
- Exposición de endpoints REST
- Autenticación y autorización (JWT)
- Middleware de seguridad
- Validación de entrada
- Orquestación de llamadas a business-logic
- Manejo de archivos (upload de imágenes)
- Integración con servicios externos (Google Cloud Vision, n8n)

**Tecnologías:**
- NestJS
- TypeORM para acceso a datos
- Passport para autenticación
- Swagger para documentación de API
- Multer para manejo de archivos

### 3. Business Logic (Lógica de Negocio Independiente)
**Ubicación:** `business-logic/`
**Responsabilidades:**
- Toda la lógica de negocio del sistema
- Validaciones de reglas de negocio
- Entidades de dominio
- DTOs (Data Transfer Objects)
- Servicios de negocio
- Interfaces para repositorios

**Tecnologías:**
- TypeScript puro
- Class-validator para validaciones
- Interfaces para desacoplamiento

### 4. Flujos Externos (n8n)
**Ubicación:** `n8n_flows/`
**Responsabilidades:**
- Automatización de procesos
- Integración con servicios externos
- Procesamiento de datos OCR
- Sincronización de inventario

## Patrón de Arquitectura

### Separación de Responsabilidades

```
┌─────────────────┐    HTTP/REST    ┌─────────────────┐
│    Frontend     │ ──────────────► │   Backend       │
│   (Vue.js 3)    │                 │  (API Gateway)  │
└─────────────────┘                 └─────────────────┘
                                             │
                                             │ Dependencia
                                             ▼
                                    ┌─────────────────┐
                                    │ Business Logic  │
                                    │   (Servicios)   │
                                    └─────────────────┘
                                             │
                                             │ Interfaces
                                             ▼
                                    ┌─────────────────┐
                                    │   Repositorios  │
                                    │   (TypeORM)     │
                                    └─────────────────┘
```

### Patrón Adapter

El backend actúa como un adaptador entre la capa de presentación (frontend) y la lógica de negocio:

- **Adaptadores de Repositorio:** Conectan la business-logic con TypeORM
- **Adaptadores de Servicio:** Conectan servicios externos con la business-logic
- **Servicios Adaptadores:** Envuelven los servicios de business-logic para uso en NestJS

## Estructura de Directorios

```
DigiStock/
├── frontend/                 # Capa de presentación
│   ├── src/
│   │   ├── components/       # Componentes Vue
│   │   ├── views/           # Vistas/páginas
│   │   ├── services/        # Servicios de API
│   │   ├── store/           # Estado global (Pinia)
│   │   └── types/           # Tipos TypeScript
│   └── package.json
├── backend/                 # API Gateway
│   ├── src/
│   │   ├── modules/         # Módulos NestJS
│   │   ├── adapters/        # Adaptadores para business-logic
│   │   ├── config/          # Configuraciones
│   │   └── main.ts
│   └── package.json
├── business-logic/          # Lógica de negocio
│   ├── src/
│   │   ├── entities/        # Entidades de dominio
│   │   ├── dto/            # Data Transfer Objects
│   │   ├── services/       # Servicios de negocio
│   │   └── interfaces/     # Interfaces para desacoplamiento
│   └── package.json
├── n8n_flows/              # Flujos de automatización
├── docker-compose.yml      # Orquestación de contenedores
└── docs/                   # Documentación
```

## Flujo de Datos

### 1. Petición del Frontend
1. Usuario interactúa con la interfaz
2. Frontend hace petición HTTP al backend
3. Backend valida autenticación/autorización

### 2. Procesamiento en Backend
1. Controlador recibe la petición
2. Valida datos de entrada (DTOs)
3. Llama al servicio adaptador correspondiente
4. Servicio adaptador instancia servicio de business-logic

### 3. Lógica de Negocio
1. Servicio de business-logic ejecuta reglas de negocio
2. Utiliza repositorio adaptador para acceso a datos
3. Retorna resultado al servicio adaptador

### 4. Respuesta
1. Servicio adaptador retorna resultado al controlador
2. Controlador formatea respuesta
3. Frontend recibe y procesa la respuesta

## Ventajas de esta Arquitectura

### 1. Separación Clara de Responsabilidades
- **Frontend:** Solo se encarga de la presentación
- **Backend:** Solo maneja HTTP, autenticación y orquestación
- **Business Logic:** Contiene toda la lógica de negocio

### 2. Mantenibilidad
- Cambios en la lógica de negocio no afectan el frontend
- El backend puede ser reemplazado sin afectar la business-logic
- Cada capa puede evolucionar independientemente

### 3. Testabilidad
- La business-logic puede ser probada independientemente
- Mocks fáciles de implementar mediante interfaces
- Tests unitarios más simples y enfocados

### 4. Escalabilidad
- Cada capa puede escalarse independientemente
- Posibilidad de microservicios en el futuro
- Reutilización de business-logic en diferentes interfaces

### 5. Reutilización
- La business-logic puede ser reutilizada en otros proyectos
- Interfaces claras para integración
- Código más limpio y organizado

## Docker y Despliegue

### Orquestación
El sistema utiliza Docker Compose para orquestar todos los servicios:

```yaml
services:
  postgres:     # Base de datos
  backend:      # API Gateway (incluye business-logic)
  frontend:     # Interfaz de usuario
  n8n:         # Automatización
```

### Construcción
1. **Business-logic** se construye primero
2. **Backend** se construye incluyendo business-logic
3. **Frontend** se construye independientemente
4. Todos los servicios se ejecutan con `docker-compose up -d --build`

## Consideraciones de Seguridad

### 1. Autenticación
- JWT tokens para autenticación
- Guards de NestJS para protección de rutas
- Validación de roles y permisos

### 2. Validación
- Validación en múltiples capas
- DTOs con class-validator
- Sanitización de datos de entrada

### 3. Comunicación
- HTTPS en producción
- Headers de seguridad
- CORS configurado apropiadamente

## Monitoreo y Logging

### 1. Logs Estructurados
- Logs separados por capa
- Información de contexto en cada log
- Niveles de log apropiados

### 2. Métricas
- Métricas de performance por capa
- Monitoreo de errores
- Alertas automáticas

## Futuras Mejoras

### 1. Microservicios
- Separar business-logic en microservicios independientes
- API Gateway más robusto
- Service mesh para comunicación

### 2. Caching
- Redis para cache de datos frecuentes
- Cache en múltiples capas
- Invalidación inteligente de cache

### 3. Event Sourcing
- Eventos de dominio para auditoría
- CQRS para separar comandos y consultas
- Proyecciones para diferentes vistas

## Conclusión

Esta arquitectura de tres capas proporciona una base sólida para el crecimiento y mantenimiento del sistema DigiStock. La separación clara de responsabilidades, combinada con el patrón adapter, permite una evolución independiente de cada capa mientras mantiene la cohesión del sistema completo.

La implementación con Docker asegura un despliegue consistente y escalable, mientras que la documentación clara facilita el mantenimiento y la incorporación de nuevos desarrolladores al proyecto.
