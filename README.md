# DigiStock - Sistema de Digitalización de Inventario

## 📋 Descripción

DigiStock es un sistema completo de digitalización de inventario que utiliza OCR (Reconocimiento Óptico de Caracteres) para procesar planillas de inventario y extraer información de productos automáticamente. El sistema está construido con una arquitectura de tres capas que separa claramente las responsabilidades entre la presentación, la lógica de negocio y la API.

## 🏗️ Arquitectura

El proyecto está organizado en **tres capas principales**:

### 1. **Frontend** (`frontend/`)
- **Tecnología:** Vue.js 3 + TypeScript
- **Responsabilidad:** Interfaz de usuario y experiencia del usuario
- **Características:**
  - Interfaz moderna con Tailwind CSS
  - Gestión de estado con Pinia
  - Enrutamiento con Vue Router
  - Componentes reutilizables

### 2. **Backend - API Gateway** (`backend/`)
- **Tecnología:** NestJS + TypeScript
- **Responsabilidad:** API REST, autenticación, orquestación
- **Características:**
  - Endpoints REST documentados con Swagger
  - Autenticación JWT
  - Middleware de seguridad
  - Integración con servicios externos

### 3. **Business Logic** (`business-logic/`)
- **Tecnología:** TypeScript puro
- **Responsabilidad:** Lógica de negocio independiente
- **Características:**
  - Servicios de negocio
  - Entidades de dominio
  - DTOs y validaciones
  - Interfaces para desacoplamiento

### 4. **Automatización** (`n8n_flows/`)
- **Tecnología:** n8n
- **Responsabilidad:** Flujos de automatización y procesamiento OCR
- **Características:**
  - Procesamiento automático de imágenes
  - Integración con Google Cloud Vision
  - Sincronización de datos

## 🚀 Características Principales

- ✅ **Procesamiento OCR** via n8n (sin billing en backend)
- ✅ **Gestión de inventario** completa
- ✅ **Autenticación y autorización** robusta
- ✅ **Interfaz moderna** y responsive
- ✅ **Arquitectura escalable** de tres capas
- ✅ **Automatización** con n8n
- ✅ **Documentación completa** de API
- ✅ **Despliegue con Docker**

## 🛠️ Tecnologías Utilizadas

### Frontend
- Vue.js 3 (Composition API)
- TypeScript
- Tailwind CSS
- Pinia (gestión de estado)
- Vue Router
- Axios

### Backend
- NestJS
- TypeScript
- TypeORM
- Passport (JWT)
- Swagger/OpenAPI
- Multer (archivos)

### Business Logic
- TypeScript puro
- Class-validator
- Interfaces para desacoplamiento

### Base de Datos
- PostgreSQL
- TypeORM

### Infraestructura
- Docker & Docker Compose
- n8n (automatización)
- Google Cloud Vision API

## 📦 Instalación y Despliegue

### Prerrequisitos
- Docker y Docker Compose
- Node.js 18+ (para desarrollo local)
- Cuenta de Google Cloud (para OCR)

### Despliegue con Docker

1. **Clonar el repositorio:**
```bash
git clone <repository-url>
cd DigiStock
```

2. **Configurar variables de entorno:**
```bash
cp .env.example .env
# Editar .env con tus configuraciones
```

3. **Ejecutar el sistema completo:**
```bash
docker-compose up -d --build
```

4. **Verificar que todos los servicios estén ejecutándose:**
```bash
docker-compose ps
```

### Servicios Disponibles

- **Frontend:** http://localhost:8080
- **Backend API:** http://localhost:3000
- **API Documentation:** http://localhost:3000/api
- **n8n Interface:** http://localhost:5678
- **PostgreSQL:** localhost:5432

## 🔧 Desarrollo Local

### Instalar dependencias

```bash
# Business Logic
cd business-logic
npm install
npm run build

# Backend
cd ../backend
npm install

# Frontend
cd ../frontend
npm install
```

### Ejecutar en modo desarrollo

```bash
# Terminal 1 - Backend
cd backend
npm run start:dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

## 📚 Documentación

- [Arquitectura del Sistema](docs/architecture.md)
- [Manual de Instalación](docs/manual_instalacion.md)
- [Manual de Usuario](docs/manual_usuario.md)
- [API Documentation](http://localhost:3000/api) (cuando el backend esté ejecutándose)

## 🔐 Configuración de Seguridad

### Variables de Entorno Requeridas

```env
# Base de datos
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=digistock_user
DB_PASSWORD=digistock_password
DB_NAME=digistock_db

# JWT
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=7d

# Google Cloud Vision
GOOGLE_APPLICATION_CREDENTIALS=path/to/service-account.json

# n8n
N8N_BASIC_AUTH_USER=admin
N8N_BASIC_AUTH_PASSWORD=admin123
```

## 📊 Estructura del Proyecto

```
DigiStock/
├── frontend/                 # Interfaz de usuario
├── backend/                  # API Gateway
├── business-logic/           # Lógica de negocio
├── n8n_flows/               # Flujos de automatización
├── docs/                    # Documentación
├── docker-compose.yml       # Orquestación
└── README.md
```

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

## 👥 Equipo

- **DigiStock Team** - Desarrollo y mantenimiento

## 🆘 Soporte

Si tienes problemas o preguntas:

1. Revisa la [documentación](docs/)
2. Busca en los [issues](../../issues) existentes
3. Crea un nuevo issue con detalles del problema

## 🔄 Changelog

### v2.0.0 - Refactorización Arquitectural
- ✅ Separación en tres capas (Frontend, Backend, Business Logic)
- ✅ Implementación del patrón Adapter
- ✅ Mejora en la mantenibilidad y escalabilidad
- ✅ Documentación completa de arquitectura

### v1.0.0 - Versión Inicial
- ✅ Sistema básico de inventario con OCR
- ✅ Autenticación JWT
- ✅ Interfaz Vue.js
- ✅ Integración con n8n

---

**DigiStock** - Digitalizando inventarios de manera inteligente 🚀