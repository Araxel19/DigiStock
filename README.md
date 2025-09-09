# DigiStock - Sistema de Digitalización de Inventario

Sistema integral para la digitalización y gestión de inventario a partir de planillas físicas utilizando OCR y flujos de automatización con n8n.

## 🎯 Arquitectura Innovadora

DigiStock utiliza **n8n como motor principal** de procesamiento OCR, mientras que el frontend y backend manejan la interfaz de usuario y persistencia de datos. Esta arquitectura distribuida garantiza:

- ✅ **Procesamiento asíncrono** sin bloquear la interfaz
- ✅ **Actualizaciones en tiempo real** del progreso
- ✅ **Escalabilidad** para múltiples planillas simultáneas
- ✅ **Robustez** con manejo de errores y reintentos

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

### Instalación Automática (Recomendada)

```bash
# Clonar el repositorio
git clone <tu-repositorio> digistock
cd digistock

# Ejecutar script de instalación
./scripts/setup.sh
```

### Instalación Manual

1. **Clonar y configurar**:
   ```bash
   git clone <tu-repositorio> digistock
   cd digistock
   cp .env.example .env
   ```

2. **Configurar Google Cloud Vision API** en `.env`:
   ```bash
   GOOGLE_CLOUD_PROJECT_ID=tu-proyecto-gcp
   GOOGLE_CLOUD_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n..."
   GOOGLE_CLOUD_CLIENT_EMAIL=tu-service@proyecto.iam.gserviceaccount.com
   ```

3. **Levantar servicios**:
   ```bash
   docker-compose up -d
   ```

4. **Configurar n8n**:
   - Acceder a http://localhost:5678 (admin/admin123)
   - Importar workflow desde `n8n_flows/complete_ocr_workflow.json`
   - Configurar variables de entorno en n8n

## 🔄 Flujo de Trabajo

### 1. Usuario Sube Planilla
```
Frontend → Validación → Preview → Botón "Procesar"
```

### 2. Procesamiento Automático en n8n
```
Webhook n8n → Google Vision OCR → Parsing → Base de Datos
```

### 3. Actualizaciones en Tiempo Real
```
n8n → Backend → WebSocket → Frontend (Progreso visual)
```

### 4. Edición y Guardado
```
Resultados OCR → Tabla editable → Guardar en inventario
```

## 📱 Funcionalidades

- ✅ Carga de planillas físicas
- ✅ Procesamiento OCR automático
- ✅ Gestión de inventario
- ✅ Dashboard administrativo
- ✅ Autenticación y autorización
- ✅ Integración con n8n

## 🌐 URLs de Acceso

- **Frontend**: http://localhost:8080
- **Backend API**: http://localhost:3000
- **n8n Interface**: http://localhost:5678
- **API Documentation**: http://localhost:3000/api/docs

## 🔐 Credenciales por Defecto

- **DigiStock**: admin@digistock.com / admin123
- **n8n**: admin / admin123

## 🔧 Configuración

### Variables de Entorno Críticas

```bash
# Google Cloud Vision API (OBLIGATORIO)
GOOGLE_CLOUD_PROJECT_ID=tu-proyecto
GOOGLE_CLOUD_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n..."
GOOGLE_CLOUD_CLIENT_EMAIL=service-account@proyecto.iam.gserviceaccount.com

# JWT Security
JWT_SECRET=clave-super-secreta-generada-automaticamente

# n8n Integration
N8N_WEBHOOK_URL=http://n8n:5678/webhook
```

### Configuración de n8n

1. **Variables de entorno en n8n**:
   ```
   GOOGLE_CLOUD_API_KEY=tu-api-key
   BACKEND_URL=http://backend:3000
   ```

2. **Webhook URL**: `http://localhost:5678/webhook/digistock-ocr`

## 🛠️ Comandos Útiles

```bash
# Ver logs en tiempo real
docker-compose logs -f

# Reiniciar servicios
docker-compose restart

# Backup de base de datos
docker-compose exec postgres pg_dump -U digistock_user digistock_db > backup.sql

# Acceder a la base de datos
docker-compose exec postgres psql -U digistock_user -d digistock_db

# Ver estado de servicios
docker-compose ps
```

## 🔍 Troubleshooting

### Problema: OCR no funciona
```bash
# Verificar configuración de Google Cloud
docker-compose logs backend | grep "GOOGLE_CLOUD"
```

### Problema: n8n no conecta con backend
```bash
# Verificar red de Docker
docker network inspect digistock_digistock_network
```

### Problema: Frontend no carga
```bash
# Reconstruir frontend
docker-compose build frontend
docker-compose up -d frontend
```

## 📚 Documentación

- **[Manual de Instalación](docs/manual_instalacion.md)**: Guía completa paso a paso
- **[Flujo de Arquitectura](docs/flujo_arquitectura.md)**: Detalles técnicos del flujo
- **[Manual de Usuario](docs/manual_usuario.md)**: Guía para usuarios finales

## 🚨 Importante

1. **Configura Google Cloud Vision API** antes de usar el sistema
2. **Importa los workflows de n8n** desde `n8n_flows/`
3. **Cambia las contraseñas por defecto** en producción
4. **Haz backups regulares** de la base de datos

---

**¡Tu sistema DigiStock está listo para digitalizar inventarios con tecnología OCR avanzada! 🚀**