# Arquitectura del Sistema DigiStock

## Visión General

DigiStock es un sistema integral para la digitalización y gestión de inventario que utiliza OCR (Reconocimiento Óptico de Caracteres) y automatización mediante n8n para convertir planillas físicas en datos digitales estructurados.

## Componentes Principales

### 1. Frontend (Vue.js 3)
- **Tecnología**: Vue 3 + Vite + Pinia + Tailwind CSS
- **Puerto**: 8080
- **Funcionalidades**:
  - Interfaz de usuario intuitiva
  - Carga de imágenes de planillas
  - Visualización de inventario
  - Dashboard con métricas
  - Autenticación y autorización

### 2. Backend (NestJS)
- **Tecnología**: NestJS + TypeScript + TypeORM
- **Puerto**: 3000
- **Módulos**:
  - **Auth**: Autenticación JWT
  - **Users**: Gestión de usuarios
  - **Inventory**: Gestión de productos y planillas
  - **OCR**: Procesamiento de imágenes con Google Cloud Vision

### 3. Base de Datos (PostgreSQL)
- **Puerto**: 5432
- **Tablas principales**:
  - `users`: Usuarios del sistema
  - `products`: Productos del inventario
  - `planillas`: Registro de planillas procesadas

### 4. n8n (Automatización)
- **Puerto**: 5678
- **Funcionalidades**:
  - Workflows de procesamiento OCR
  - Sincronización automática
  - Notificaciones por email
  - Integración con APIs externas

## Flujo de Datos

1. **Carga de Planilla**:
   - Usuario sube imagen → Frontend → Backend → OCR Service

2. **Procesamiento OCR**:
   - Google Cloud Vision API → Extracción de texto → Estructuración de datos

3. **Automatización**:
   - Backend → n8n webhook → Procesamiento adicional → Notificaciones

4. **Almacenamiento**:
   - Datos estructurados → PostgreSQL → Disponibles para consulta

## Seguridad

- Autenticación basada en JWT
- Roles de usuario (admin/user)
- Validación de archivos
- CORS configurado
- Helmet para headers de seguridad

## Escalabilidad

- Arquitectura modular
- Contenedores Docker
- APIs RESTful bien definidas
- Separación clara de responsabilidades