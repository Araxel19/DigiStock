# DigiStock - Sistema de Digitalización de Inventario

Sistema integral para la digitalización y gestión de inventario a partir de planillas físicas utilizando OCR y flujos de automatización con n8n.

## 🚀 Tecnologías

- **Backend**: NestJS (TypeScript)
- **Frontend**: Vue.js 3 + Vite + Pinia
- **Base de datos**: PostgreSQL
- **OCR**: Google Cloud Vision API
- **Automatización**: n8n
- **Autenticación**: JWT
- **Contenedores**: Docker + Docker Compose

## 📂 Estructura del Proyecto

```
DigiStock/
├── backend/                        # NestJS API
├── frontend/                       # Vue.js + Vite
├── database/                       # Migraciones y esquemas
├── n8n_flows/                     # Flujos exportados de n8n
├── docs/                          # Documentación
├── docker-compose.yml
└── README.md
```

## 🚀 Inicio Rápido

1. Clonar el repositorio
2. Copiar `.env.example` a `.env` y configurar variables
3. Ejecutar con Docker Compose:
   ```bash
   docker-compose up -d
   ```

## 📱 Funcionalidades

- ✅ Carga de planillas físicas
- ✅ Procesamiento OCR automático
- ✅ Gestión de inventario
- ✅ Dashboard administrativo
- ✅ Autenticación y autorización
- ✅ Integración con n8n

## 🔧 Configuración

Ver archivos `.env.example` para configuración de servicios externos.

## 📚 Documentación

Consultar la carpeta `docs/` para documentación técnica y manual de usuario.